import { json, str, isEmail, insertRow, notify } from './_shared';

export const config = { runtime: 'edge' };

/** Captures interest while SYSTEMS_LIVE is false. */
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  // Honeypot. Return success so bots do not learn they were caught, but log
  // it: a silent discard here is indistinguishable from a working form.
  if (str(body.honeypot, 200) !== '') {
    console.warn('honeypot triggered — submission discarded');
    return json({ ok: true }, 200);
  }

  const email = str(body.email, 254);
  const systemId = str(body.systemId, 20).toUpperCase();
  const systemName = str(body.systemName, 160);

  if (!isEmail(email)) return json({ error: 'Please enter a valid email address.' }, 400);

  const stored = await insertRow('system_waitlist', {
    email,
    system_id: systemId || null,
    system_name: systemName || null,
  });

  if (stored === 'error') {
    return json({ error: 'Could not save your request. Please email sales@botlane.io.' }, 502);
  }

  // Already on the list for this system — succeed quietly, no second alert.
  if (stored === 'duplicate') return json({ ok: true }, 200);

  await notify(
    `Waitlist — ${systemName || 'all systems'}`,
    [
      ['Email', email],
      ['System', systemName ? `${systemName} (${systemId})` : 'No specific system'],
    ],
    email
  );

  return json({ ok: true }, 200);
}
