// Shared helpers for the /api routes.
// Files prefixed with an underscore are not exposed as routes by Vercel.

export const json = (payload: unknown, status: number): Response =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const str = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

export const isEmail = (v: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;

export const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  );

export function supabaseConfig(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('missing Supabase environment variables');
    return null;
  }
  return { url, key };
}

/**
 * Inserts a row via PostgREST using the service role key, which bypasses RLS.
 * Returns 'ok', 'duplicate' (unique constraint hit), or 'error'.
 */
export async function insertRow(
  table: string,
  row: Record<string, unknown>
): Promise<'ok' | 'duplicate' | 'error'> {
  const cfg = supabaseConfig();
  if (!cfg) return 'error';

  const res = await fetch(`${cfg.url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  });

  if (res.ok) return 'ok';
  if (res.status === 409) return 'duplicate';

  console.error(`insert into ${table} failed`, res.status, await res.text());
  return 'error';
}

/**
 * Fires a notification email. Never throws and never affects the response
 * status — if this fails the row is already stored, so the visitor should
 * still see success. Failures go to the Vercel runtime logs.
 */
export async function notify(subject: string, rows: [string, string][], replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  const from = process.env.NOTIFY_FROM;
  if (!key || !to || !from) return;

  const html = `
    <h2 style="margin:0 0 12px;font-family:sans-serif">${escapeHtml(subject)}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td valign="top"><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(
              value || '—'
            ).replace(/\n/g, '<br>')}</td></tr>`
        )
        .join('')}
    </table>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        html,
      }),
    });
    if (!res.ok) console.error('resend failed', res.status, await res.text());
  } catch (err) {
    console.error('resend threw', err);
  }
}

/* ------------------------------------------------------------------ *
 * Rate limiting
 * ------------------------------------------------------------------ */

/**
 * The true client address. Vercel sets both of these at the edge, so they
 * cannot be spoofed by the caller the way a bare X-Forwarded-For could be
 * behind an untrusted proxy. `x-forwarded-for` may be a chain — the client is
 * the leftmost entry.
 */
const clientIp = (req: Request): string =>
  req.headers.get('x-real-ip')?.trim() ||
  (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
  'unknown';

/** SHA-256, truncated. Enough to key a counter, not enough to be a rainbow target. */
async function hashKey(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)]
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Counts one hit against `${name}:${caller}` and reports whether it is allowed.
 *
 * The counting happens in Postgres (see supabase/rate-limits.sql) because edge
 * isolates are per-region and short-lived — an in-process counter would reset
 * constantly and never see the requests handled by a sibling isolate, which
 * makes it protection in appearance only.
 *
 * The address is hashed before it is stored, so the table holds no raw IPs.
 *
 * Fails OPEN. If Supabase is unreachable the visitor is let through and the
 * failure goes to the runtime logs: turning an outage into a site that refuses
 * every genuine inquiry is worse than briefly losing the ceiling. This matches
 * how `notify` already treats a failed email.
 */
export async function rateLimit(
  name: string,
  req: Request,
  maxHits: number,
  windowSeconds: number
): Promise<boolean> {
  const cfg = supabaseConfig();
  if (!cfg) return true;

  try {
    const bucket = `${name}:${await hashKey(clientIp(req))}`;

    const res = await fetch(`${cfg.url}/rest/v1/rpc/check_rate_limit`, {
      method: 'POST',
      headers: {
        apikey: cfg.key,
        Authorization: `Bearer ${cfg.key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        p_bucket: bucket,
        p_max_hits: maxHits,
        p_window_seconds: windowSeconds,
      }),
    });

    if (!res.ok) {
      console.error('rate limit check failed', res.status, await res.text());
      return true;
    }

    // PostgREST returns a scalar-returning function's value as bare JSON.
    return (await res.json()) === true;
  } catch (err) {
    console.error('rate limit check threw', err);
    return true;
  }
}

/**
 * 429 with a Retry-After, so a well-behaved client knows when to come back
 * rather than retrying into the same wall.
 */
export const tooManyRequests = (retryAfterSeconds: number, message: string): Response =>
  new Response(JSON.stringify({ error: message }), {
    status: 429,
    headers: {
      'Content-Type': 'application/json',
      'Retry-After': String(retryAfterSeconds),
    },
  });
