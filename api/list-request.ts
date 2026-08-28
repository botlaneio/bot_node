import { json, str, isEmail, insertRow, notify } from './_shared';

export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  // Honeypot. Return success so bots do not learn they were caught.
  if (str(body.company, 200) !== '') return json({ ok: true }, 200);

  const email = str(body.email, 254);
  const targetMarket = str(body.targetMarket, 1000);

  if (!isEmail(email)) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }

  const result = await insertRow('list_requests', {
    email,
    target_market: targetMarket || null,
    user_agent: (req.headers.get('user-agent') || '').slice(0, 500) || null,
  });

  if (result === 'error') {
    return json({ error: 'Could not save your request. Please email sales@botlane.io.' }, 502);
  }

  // Already on the list. Treat as success rather than exposing that the
  // address is known, and skip the duplicate notification.
  if (result === 'duplicate') return json({ ok: true }, 200);

  await notify(
    `List request — ${email}`,
    [
      ['Email', email],
      ['Target market', targetMarket],
    ],
    email
  );

  return json({ ok: true }, 200);
}
