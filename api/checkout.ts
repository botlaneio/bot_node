import { json, str, isEmail, rateLimit, tooManyRequests } from './_shared';
import { SYSTEM_FULFILMENT, isSellable } from './_fulfilment';

export const config = { runtime: 'edge' };

const stripSlash = (s: string): string => s.replace(/\/+$/, '');

/**
 * The origin Stripe's redirect URLs are built from.
 *
 * The Origin header is set by the caller, not by us. Trusting it meant anyone
 * could POST here with `Origin: https://evil.com` and be handed a genuine
 * Stripe session whose success_url pointed at their own page — a payment flow
 * that looks entirely legitimate right up to the moment it hands the buyer to
 * an attacker. So it is honoured only when it matches somewhere we serve.
 *
 * VERCEL_URL is the current deployment's own hostname, which keeps preview
 * deployments working without hardcoding their generated URLs.
 *
 * An unrecognised origin is not an error: it falls back to the canonical site
 * rather than refusing the sale. The redirect is safe either way, and a buyer
 * should not lose a purchase because their browser sent something unexpected.
 */
function trustedOrigin(req: Request): string | null {
  const canonical = process.env.SITE_URL ? stripSlash(process.env.SITE_URL) : '';
  const deployment = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  const allowed = [canonical, deployment].filter(Boolean);

  const sent = req.headers.get('origin');
  if (sent) {
    const normalised = stripSlash(sent.trim());
    if (allowed.includes(normalised)) return normalised;
    console.warn(`checkout: ignoring untrusted origin ${normalised}`);
  }

  return canonical || deployment || null;
}

/**
 * Creates a Stripe Checkout Session for one system.
 * Refuses if SYSTEMS_LIVE is not 'true', or if the system has no configured
 * price and repo — better a clear error than money taken for something that
 * cannot be delivered.
 */
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  if (process.env.SYSTEMS_LIVE !== 'true') {
    return json({ error: 'Systems are not on sale yet.' }, 403);
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    console.error('checkout: STRIPE_SECRET_KEY missing');
    return json({ error: 'Checkout is not configured.' }, 500);
  }

  // Placed after the SYSTEMS_LIVE and key checks because those are pure env
  // reads that refuse for free; there is no work worth protecting above this
  // line. Ten an hour leaves room to retry a failed card or buy more than one
  // system, while capping how fast sessions can be minted against the Stripe key.
  if (!(await rateLimit('checkout', req, 10, 3600))) {
    return tooManyRequests(
      3600,
      'Too many checkout attempts. Please wait an hour, or email sales@botlane.io.'
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const systemId = str(body.systemId, 20).toUpperCase();
  const systemName = str(body.systemName, 160);

  if (!isSellable(systemId)) {
    return json({ error: 'This system is not available for purchase yet.' }, 400);
  }

  const { stripePriceId } = SYSTEM_FULFILMENT[systemId];

  const origin = trustedOrigin(req);
  if (!origin) {
    console.error('checkout: neither SITE_URL nor VERCEL_URL is set');
    return json({ error: 'Checkout is not configured.' }, 500);
  }

  // Stripe's API takes form-encoded bodies, not JSON.
  const form = new URLSearchParams();
  form.set('mode', 'payment');
  form.set('line_items[0][price]', stripePriceId);
  form.set('line_items[0][quantity]', '1');
  form.set('success_url', `${origin}/systems/${systemId.toLowerCase()}/complete?session_id={CHECKOUT_SESSION_ID}`);
  form.set('cancel_url', `${origin}/systems/${systemId.toLowerCase()}`);
  form.set('client_reference_id', systemId);
  form.set('metadata[system_id]', systemId);
  form.set('metadata[system_name]', systemName);
  form.set('payment_intent_data[metadata][system_id]', systemId);

  // Collected at checkout so the webhook can grant repo access immediately.
  form.set('custom_fields[0][key]', 'github_username');
  form.set('custom_fields[0][label][type]', 'custom');
  form.set('custom_fields[0][label][custom]', 'GitHub username');
  form.set('custom_fields[0][type]', 'text');
  form.set('custom_fields[0][text][minimum_length]', '1');
  form.set('custom_fields[0][text][maximum_length]', '39');

  const email = str(body.email, 254);
  if (email && isEmail(email)) form.set('customer_email', email);

  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    });

    const data = (await res.json()) as { url?: string; error?: { message?: string } };

    if (!res.ok || !data.url) {
      console.error('checkout: stripe rejected', res.status, data?.error?.message);
      return json({ error: 'Could not start checkout. Please try again.' }, 502);
    }

    return json({ url: data.url }, 200);
  } catch (err) {
    console.error('checkout: stripe threw', err);
    return json({ error: 'Could not start checkout. Please try again.' }, 502);
  }
}
