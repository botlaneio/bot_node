-- Close anon/authenticated access to the NextAuth/Prisma tables.
--
-- Applied to production on 2026-08-30. This file is the record of that change
-- so the database can be rebuilt from the repo. It is independent of
-- rate-limits.sql and can be run in either order.
--
-- Idempotent, and safe to run on a database where these tables do not exist:
-- each is skipped if absent rather than raising.
--
--
-- What was wrong
--
-- Nine tables had row level security disabled, no policies, and table grants
-- to `anon` and `authenticated`. The publishable anon key ships in frontend
-- JavaScript, so anyone holding it could read and write them over PostgREST.
-- "User" held real rows. "Session" and "VerificationToken" being writable is
-- the shape of a login-forgery hole, whether or not anything used them yet.
--
--
-- Why enabling RLS here does not break the owning application
--
-- All nine are owned by `postgres`, and none has FORCE ROW LEVEL SECURITY set.
-- A table owner bypasses RLS by default, so a Prisma app connecting over a
-- direct Postgres connection string is unaffected. Only `anon` and
-- `authenticated` going through PostgREST are blocked, which is the hole.
--
-- Closed at two layers deliberately: the grants are revoked, and RLS is
-- enabled with no policies, so nothing gets through even if a grant is
-- restored later by a default-privileges rule.

do $$
declare
  target text;
  targets text[] := array[
    'User',
    'Account',
    'Session',
    'VerificationToken',
    'Lead',
    'Project',
    'Event',
    'AuditLog',
    '_prisma_migrations'
  ];
begin
  foreach target in array targets loop
    if to_regclass(format('public.%I', target)) is null then
      raise notice 'skipping public.%: not present in this database', target;
      continue;
    end if;

    execute format('alter table public.%I enable row level security', target);
    execute format('revoke all on public.%I from anon, authenticated', target);
    raise notice 'locked down public.%', target;
  end loop;
end $$;

/*
  rate_limits already had RLS enabled with no policies, so it was never
  exposed, but it carried anon and authenticated grants that its sibling
  tables (applications, list_requests, purchases, system_waitlist) do not.
  Harmless while RLS blocks every row, but it would matter the moment a
  permissive policy was added. Brought in line here.
*/
do $$
begin
  if to_regclass('public.rate_limits') is not null then
    revoke all on public.rate_limits from anon, authenticated;
  end if;
end $$;

/*
  Verification. Expect zero rows: nothing in the public schema should be
  reachable by anon, and nothing should have RLS switched off.

    select c.relname,
           c.relrowsecurity as rls_enabled,
           string_agg(distinct g.grantee, ', ') as exposed_to
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    left join information_schema.role_table_grants g
           on g.table_schema = 'public' and g.table_name = c.relname
          and g.grantee = 'anon'
    where n.nspname = 'public'
      and c.relkind = 'r'
      and (c.relrowsecurity = false or g.grantee is not null)
    group by c.relname, c.relrowsecurity;

  Note that `customers`, `orders`, `payments`, `engagements` and `documents`
  intentionally keep an `authenticated` grant: each has a policy attached so a
  signed-in user reads only their own rows. Those are configured, not exposed,
  and this file does not touch them.
*/
