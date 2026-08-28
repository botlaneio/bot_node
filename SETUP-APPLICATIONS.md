# Wiring up the site's two forms

Files changed:

- `api/_shared.ts` — **new.** Validation, insert, and email helpers used by both routes.
- `api/apply.ts` — **new.** Handles the application modal.
- `api/list-request.ts` — **new.** Handles the footer "Get the list" form.
- `src/components/ApplicationModal.tsx` — **replaced.** Now actually submits.
- `src/components/MinimalFooter.tsx` — **edited.** No longer relies on `mailto:`.

Both tables (`applications` and `list_requests`) already exist in Supabase.
Nothing to run there.

---

## 1. Environment variables

In Vercel: **Project → Settings → Environment Variables**. Add all five to
Production, Preview, and Development.

| Name | Value |
|---|---|
| `SUPABASE_URL` | `https://btjusdaleigmnvpvdxgj.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → `service_role` (secret) |
| `RESEND_API_KEY` | resend.com → API Keys → Create |
| `NOTIFY_EMAIL` | Where you want the alerts — your inbox |
| `NOTIFY_FROM` | e.g. `Botlane <notifications@botlane.io>` — must be a domain verified in Resend |

**The service role key bypasses row-level security.** It belongs only in Vercel's
settings panel. Never in the repo, never in a `VITE_` variable, never pasted into a
chat. If it ever leaks, rotate it in Supabase immediately.

If `RESEND_API_KEY`, `NOTIFY_EMAIL`, or `NOTIFY_FROM` are missing, the form still
works and still stores leads — you just won't get the email. Supabase is the
source of truth; email is the convenience layer.

## 2. Resend domain

Resend will only send from a domain you've verified. Add `botlane.io` in their
dashboard and set the DNS records they give you. Until then, use their sandbox
sender to test.

Worth noting: you're about to add sending DNS for `botlane.io` while your whole
pitch is that cold outreach runs on *isolated* domains. Keep this transactional
sending separate from anything the outbound campaigns touch.

## 3. Deploy

```bash
git add api/ src/components/ApplicationModal.tsx src/components/MinimalFooter.tsx SETUP-APPLICATIONS.md
git commit -m "Wire both forms to Supabase with email notification"
git push
```

Vercel builds on push. The `api/` directory is picked up automatically — no
config needed, and Vite ignores it.

## 4. Verify

Submit a real entry on the live site, then check:

- Supabase → Table Editor → `applications` — the row is there
- Your inbox — notification arrived
- Vercel → the deployment → Runtime Logs — no errors

Then repeat for the footer form and check `list_requests`. Submit the same email
twice: the second one should still show success but must not create a duplicate
row or send a second alert.

Then test the failure path: temporarily rename `SUPABASE_URL`, redeploy, submit.
You should see a red error in the modal rather than a false success. Put it back
afterwards.

---

## Getting leads into Numbers

Supabase → Table Editor → pick `applications` or `list_requests` → **Export CSV**.
Numbers opens either file directly. There is no live sync — Numbers has no API — so this is a manual
download whenever you want a fresh copy.

---

## What the code does

**Security**
- RLS is on with zero policies, so `anon` cannot read or write the table at all.
  Only the server-side function, using the service role key, can insert.
- Honeypot field catches naive bots and returns a fake success so they don't learn.
- All inputs are length-capped and trimmed server-side; `cloud_focus` is checked
  against an allowlist in both the function and a database constraint.
- Email content is HTML-escaped, so a hostile submission can't inject markup into
  your inbox.

**Behaviour**
- The button disables and shows a spinner while sending.
- Failures show a real error with a fallback email address — the old code showed
  success unconditionally.
- If the database write succeeds but the email fails, the visitor still sees
  success, because the lead is safely stored. The email error goes to Vercel's logs.
- Form state resets on close, so a second visitor at the same machine doesn't see
  the previous entry.

**Also fixed while in here**
- `currentTeamSize` was in component state with no input rendered — it could never
  be anything but the default. It now has a select, and a `team_size` column.
- Added `id`/`htmlFor` pairs on every field. They were missing, which broke label
  clicking and screen readers.
- Removed the hardcoded `Plus_Jakarta_Sans` class from the modal. That font is
  never loaded (finding 12), so it was silently falling back anyway.

## Footer form specifics

- The `mailto:` is gone. It posts to `/api/list-request` instead, so it works for
  webmail and mobile users who have no mail client configured.
- The confirmation no longer says "Check your email client" — it now names the
  address the list is going to.
- The heading promises "Tell me your target market", but the form only ever
  collected an email. There is now an optional target-market field, so the copy
  is true. If you would rather keep the single-field look, delete that input and
  soften the heading instead — do not leave the promise unmatched.
- The button reads "Send the list" rather than "Subscribe". Nothing about this is
  a newsletter subscription, and calling it one invites unsubscribe expectations
  you have no mechanism for.
- `list_requests` has a unique index on the lowercased email. A repeat submission
  returns success to the visitor but creates no duplicate row and sends no second
  alert.

## Not done

Findings 3 through 23 in the audit PDF are untouched.

---

# Phase 2 — Selling the systems

Nothing is on sale until you flip a flag. Everything below can be built,
deployed, and tested against Stripe test mode first.

## The flag

Two variables, both must be `true` to take real money:

| Name | Where | Purpose |
|---|---|---|
| `SYSTEMS_LIVE` | Vercel env | Server side. `/api/checkout` refuses unless this is `true`. |
| `VITE_SYSTEMS_LIVE` | Vercel env | Client side. Shows buy buttons instead of the waitlist. |

They are deliberately separate. If only the client one is set, buttons appear
but checkout refuses — visible but harmless. If only the server one is set,
nothing is exposed. Leave **both unset** until the repos are tested, and the
site shows "Available soon" with email capture on every system.

## New environment variables

| Name | Value |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys. Use `sk_test_...` first. |
| `STRIPE_WEBHOOK_SECRET` | Given when you create the webhook endpoint (`whsec_...`). |
| `GITHUB_TOKEN` | Fine-grained PAT with **Administration: read & write** on the eight repos only. |
| `SITE_URL` | `https://botnode.vercel.app` — fallback for the Stripe redirect. |

The GitHub token should be scoped to those eight repos and nothing else. It can
add collaborators, so it is not a token to be generous with.

## Fill in `api/_fulfilment.ts`

One line per system:

```ts
'SYS-01': { stripePriceId: 'price_1AbC...', repo: 'botlaneio/client-status-report-agent' },
```

Both fields must be filled or `/api/checkout` refuses that system by name. A
half-configured system cannot take money.

## Stripe webhook

Stripe → Developers → Webhooks → Add endpoint:

- URL: `https://botnode.vercel.app/api/stripe-webhook`
- Event: `checkout.session.completed` only

## Testing before going live

1. Set `SYSTEMS_LIVE` and `VITE_SYSTEMS_LIVE` to `true` in **Preview only**,
   with `sk_test_` keys.
2. Buy a system on the preview URL using card `4242 4242 4242 4242`.
3. Check: a row in `purchases` with `access_granted = true`, a GitHub invite on
   the test account, a receipt email, and your sale alert.
4. Test the failure path: put a nonsense repo in `_fulfilment.ts` and buy again.
   The row should record `access_granted = false` with the error, you should get
   an **ACTION NEEDED** alert, and the buyer should get *no* receipt claiming
   access they don't have.
5. Only then set both flags in Production with live keys.

## How fulfilment works

Stripe collects a GitHub username as a required custom field at checkout. The
webhook verifies the signature, records the purchase, then calls the GitHub API
to add that user as a read-only collaborator on the system's repo.

- `stripe_session_id` is unique, so Stripe retrying an event cannot double-grant
  or double-email.
- If recording the purchase fails, the endpoint returns 500 so Stripe retries.
  A payment is never silently lost.
- If GitHub access fails, the purchase is still recorded with the error, you get
  an ACTION NEEDED alert, and no misleading receipt goes to the buyer.
- The success page never claims access has been granted, because the webhook may
  land a second later. It says what to expect and who to email.

## Refunds

Refunding in Stripe does **not** revoke repo access. Remove the collaborator
manually. There is no automation for this and it would be a bad thing to guess at.
