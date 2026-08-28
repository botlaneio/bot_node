import { json, insertRow, notify, escapeHtml } from './_shared';
import { SYSTEM_FULFILMENT } from './_fulfilment';

export const config = { runtime: 'edge' };

const enc = new TextEncoder();

/** Constant-time comparison, so a wrong signature leaks no timing information. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verifies Stripe's signature header without the Node SDK, which is not
 * available in the edge runtime. Anyone can POST to this URL, so an
 * unverified body must never be trusted.
 */
async function verify(raw: string, header: string, secret: string): Promise<boolean> {
  const parts = Object.fromEntries(
    header.split(',').map((kv) => kv.split('=').map((s) => s.trim()) as [string, string])
  );
  const timestamp = parts['t'];
  const signature = parts['v1'];
  if (!timestamp || !signature) return false;

  // Reject replays of old payloads (5 minute tolerance).
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(`${timestamp}.${raw}`));
  return safeEqual(toHex(mac), signature);
}

/** Invites the buyer to the private repo as a read-only collaborator. */
async function grantRepoAccess(repo: string, username: string): Promise<string | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return 'GITHUB_TOKEN not configured';

  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/collaborators/${encodeURIComponent(username)}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ permission: 'pull' }),
      }
    );

    // 201 = invitation created, 204 = already a collaborator.
    if (res.status === 201 || res.status === 204) return null;
    return `GitHub responded ${res.status}: ${(await res.text()).slice(0, 300)}`;
  } catch (err) {
    return `GitHub request failed: ${String(err).slice(0, 300)}`;
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get('stripe-signature');
  if (!secret || !signature) return json({ error: 'Unsigned request.' }, 400);

  const raw = await req.text();
  if (!(await verify(raw, signature, secret))) {
    console.error('webhook: signature verification failed');
    return json({ error: 'Invalid signature.' }, 400);
  }

  let event: any;
  try {
    event = JSON.parse(raw);
  } catch {
    return json({ error: 'Invalid payload.' }, 400);
  }

  // Acknowledge anything else so Stripe stops retrying it.
  if (event.type !== 'checkout.session.completed') return json({ received: true }, 200);

  const session = event.data?.object ?? {};
  const systemId = String(session.metadata?.system_id || '').toUpperCase();
  const systemName = String(session.metadata?.system_name || systemId);
  const email = String(session.customer_details?.email || session.customer_email || '');

  const githubField = (session.custom_fields || []).find(
    (f: any) => f?.key === 'github_username'
  );
  const githubUsername = String(githubField?.text?.value || '').trim();

  let accessError: string | null = null;
  const repo = SYSTEM_FULFILMENT[systemId]?.repo;

  if (!repo) {
    accessError = `No repo configured for ${systemId}`;
  } else if (!githubUsername) {
    accessError = 'No GitHub username supplied at checkout';
  } else {
    accessError = await grantRepoAccess(repo, githubUsername);
  }

  // stripe_session_id is unique, so a retry of the same event is a no-op.
  const stored = await insertRow('purchases', {
    stripe_session_id: session.id,
    stripe_payment_intent: session.payment_intent || null,
    system_id: systemId,
    system_name: systemName,
    email,
    github_username: githubUsername || null,
    amount_total: session.amount_total ?? 0,
    currency: session.currency || 'usd',
    access_granted: accessError === null,
    access_error: accessError,
    fulfilled_at: accessError === null ? new Date().toISOString() : null,
  });

  if (stored === 'duplicate') return json({ received: true }, 200);

  if (stored === 'error') {
    // Returning non-2xx makes Stripe retry, which is what we want: the payment
    // succeeded and we must not silently lose the record.
    console.error('webhook: failed to record purchase', session.id);
    return json({ error: 'Could not record purchase.' }, 500);
  }

  await notify(
    accessError ? `ACTION NEEDED — ${systemName}` : `Sale — ${systemName}`,
    [
      ['System', `${systemName} (${systemId})`],
      ['Email', email],
      ['GitHub', githubUsername || '— not supplied —'],
      ['Amount', `${((session.amount_total ?? 0) / 100).toFixed(2)} ${String(session.currency || 'usd').toUpperCase()}`],
      ['Repo access', accessError ? `FAILED: ${accessError}` : 'Granted'],
      ['Session', session.id],
    ],
    email || undefined
  );

  // Receipt to the buyer, only if access actually worked. If it did not, the
  // alert above tells you to sort it manually rather than sending a confusing
  // "you have access" email to someone who does not.
  if (!accessError && email) {
    const key = process.env.RESEND_API_KEY;
    const from = process.env.NOTIFY_FROM;
    if (key && from) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from,
            to: [email],
            subject: `Your access to ${systemName}`,
            html: `
              <p style="font-family:sans-serif;font-size:15px">Thanks for buying <strong>${escapeHtml(systemName)}</strong>.</p>
              <p style="font-family:sans-serif;font-size:15px">
                A GitHub invitation has been sent to <strong>${escapeHtml(githubUsername)}</strong>.
                Accept it and you will have the repository, Dockerfile, and integration runbook.
              </p>
              <p style="font-family:sans-serif;font-size:15px">Reply to this email if anything is missing.</p>`,
          }),
        });
      } catch (err) {
        console.error('webhook: receipt email failed', err);
      }
    }
  }

  return json({ received: true }, 200);
}
