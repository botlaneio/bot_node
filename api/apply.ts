import {
  json,
  str,
  isEmail,
  insertRow,
  notify,
  rateLimit,
  tooManyRequests,
} from './_shared';

export const config = { runtime: 'edge' };

const CLOUD_FOCUS_OPTIONS = [
  'AWS & Kubernetes',
  'GCP & Cloud Native',
  'Azure & Enterprise Cloud',
  'Multi-Cloud / SRE',
];

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  // Checked before the body is even parsed, so a flood cannot reach the JSON
  // parse, the insert, or the notification email. Nobody applies for a client
  // slot five times in an hour; anything at that rate is not a prospect.
  if (!(await rateLimit('apply', req, 5, 3600))) {
    return tooManyRequests(
      3600,
      'Too many inquiries from this connection. Please wait an hour, or email sales@botlane.io.'
    );
  }

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

  const name = str(body.name, 120);
  const email = str(body.email, 254);
  const consultancyName = str(body.consultancyName, 160);
  const website = str(body.website, 500);
  const cloudFocus = str(body.cloudFocus, 60);
  const teamSize = str(body.currentTeamSize, 60);
  const notes = str(body.notes, 4000);

  const invalid: string[] = [];
  if (!name) invalid.push('name');
  if (!isEmail(email)) invalid.push('email');
  if (!consultancyName) invalid.push('consultancy name');
  if (!website) invalid.push('website');
  if (!CLOUD_FOCUS_OPTIONS.includes(cloudFocus)) invalid.push('cloud focus');

  if (invalid.length > 0) {
    return json({ error: `Please check these fields: ${invalid.join(', ')}.` }, 400);
  }

  const result = await insertRow('applications', {
    name,
    email,
    consultancy_name: consultancyName,
    website,
    cloud_focus: cloudFocus,
    team_size: teamSize || null,
    notes: notes || null,
    user_agent: (req.headers.get('user-agent') || '').slice(0, 500) || null,
  });

  if (result === 'error') {
    return json({ error: 'We could not save your inquiry. Please email sales@botlane.io.' }, 502);
  }

  await notify(
    `New inquiry — ${consultancyName}`,
    [
      ['Name', name],
      ['Email', email],
      ['Consultancy', consultancyName],
      ['Website', website],
      ['Cloud focus', cloudFocus],
      ['Team size', teamSize],
      ['Notes', notes],
    ],
    email
  );

  return json({ ok: true }, 200);
}
