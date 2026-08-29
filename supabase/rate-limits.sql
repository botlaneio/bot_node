-- Rate limiting for the four public POST endpoints.
--
-- Run this once in Supabase → SQL Editor. It is idempotent: re-running it is
-- safe and will not clear existing counters.
--
-- The counters live here rather than in a new service because the service role
-- key is already wired up. One PostgREST round-trip per request.

create table if not exists public.rate_limits (
  bucket       text primary key,
  hits         integer     not null default 0,
  window_start timestamptz not null default now()
);

-- Consistent with `applications` and `list_requests`: RLS on, zero policies,
-- so anon cannot read or write. Only the service role reaches this table.
alter table public.rate_limits enable row level security;

-- Supports the cleanup function below.
create index if not exists rate_limits_window_start_idx
  on public.rate_limits (window_start);

/*
  Atomically counts one hit against a bucket and reports whether it is allowed.

  INSERT ... ON CONFLICT DO UPDATE ... RETURNING takes a row lock, so two
  concurrent requests for the same bucket cannot both read the same count and
  both decide they are under the limit. A read-then-write in the application
  would have that race; this does not.

  Returns true when the request is within the limit, false when it is over.
*/
create or replace function public.check_rate_limit(
  p_bucket         text,
  p_max_hits       integer,
  p_window_seconds integer
) returns boolean
language plpgsql
as $$
declare
  v_hits integer;
begin
  insert into public.rate_limits as rl (bucket, hits, window_start)
  values (p_bucket, 1, now())
  on conflict (bucket) do update
    set hits = case
          -- Window has expired: this hit starts a fresh one.
          when rl.window_start < now() - make_interval(secs => p_window_seconds)
            then 1
          else rl.hits + 1
        end,
        window_start = case
          when rl.window_start < now() - make_interval(secs => p_window_seconds)
            then now()
          else rl.window_start
        end
  returning rl.hits into v_hits;

  return v_hits <= p_max_hits;
end;
$$;

-- Postgres grants EXECUTE on new functions to PUBLIC by default, which would
-- let anon call this over PostgREST and poison buckets for real visitors.
-- Lock it to the service role, which is the only caller.
revoke all on function public.check_rate_limit(text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.check_rate_limit(text, integer, integer)
  to service_role;

/*
  Optional housekeeping. The table holds one row per (endpoint, IP hash) and
  grows slowly; at this site's volume it is measured in thousands of rows a
  year, so this is tidiness rather than necessity.

  Run it manually, or schedule it if pg_cron is enabled:
    select cron.schedule('rate-limit-cleanup', '0 4 * * *',
                         'select public.cleanup_rate_limits()');
*/
create or replace function public.cleanup_rate_limits() returns void
language sql
as $$
  delete from public.rate_limits where window_start < now() - interval '24 hours';
$$;

revoke all on function public.cleanup_rate_limits() from public, anon, authenticated;
grant execute on function public.cleanup_rate_limits() to service_role;
