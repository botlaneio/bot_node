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
