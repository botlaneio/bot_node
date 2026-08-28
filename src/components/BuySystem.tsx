import React, { useState } from 'react';
import { ArrowRight, Loader2, AlertCircle, Check, Lock } from 'lucide-react';

/**
 * Whether systems are actually on sale. Set VITE_SYSTEMS_LIVE=true in Vercel
 * once the repos are tested and the Stripe prices exist. The server checks
 * SYSTEMS_LIVE independently, so flipping only this one does not enable sales.
 */
export const SYSTEMS_LIVE = import.meta.env.VITE_SYSTEMS_LIVE === 'true';

interface BuySystemProps {
  systemId: string;
  systemName: string;
  price: string;
}

export const BuySystem: React.FC<BuySystemProps> = ({ systemId, systemName, price }) => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const startCheckout = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemId, systemName }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.url) {
        setError(data?.error || 'Could not start checkout. Please try again.');
        return;
      }
      // Hand off to Stripe's hosted page.
      window.location.href = data.url;
    } catch {
      setError('Could not reach the server. Please email sales@botlane.io.');
    } finally {
      setBusy(false);
    }
  };

  const joinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, systemId, systemName, company: honeypot }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || 'Something went wrong. Please try again.');
        return;
      }
      setJoined(true);
    } catch {
      setError('Could not reach the server. Please email sales@botlane.io.');
    } finally {
      setBusy(false);
    }
  };

  if (SYSTEMS_LIVE) {
    return (
      <div className="mb-4">
        <button
          onClick={startCheckout}
          disabled={busy}
          className="w-full h-12 rounded-[var(--radius-control)] bg-[var(--color-invert)] text-[var(--color-ink-invert)] font-medium transition-colors hover:bg-[var(--color-invert-raised)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {busy ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Starting checkout
            </>
          ) : (
            <>
              Buy for {price} <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        <p className="mt-2 text-center text-xs text-[var(--color-ink-muted)]">
          Secure checkout via Stripe. You'll be asked for your GitHub username.
        </p>
        {error && (
          <div
            role="alert"
            className="mt-3 flex items-start gap-2 rounded-[var(--radius-control)] border border-red-200 bg-red-50 p-3 text-xs text-red-800"
          >
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}
      </div>
    );
  }

  // Not on sale yet.
  if (joined) {
    return (
      <div className="mb-4 flex items-center gap-2.5 rounded-[var(--radius-control)] border border-[var(--color-line)] bg-[var(--color-sunken)] p-4 text-sm text-[var(--color-ink)]">
        <Check className="w-4 h-4 shrink-0" />
        <span>You're on the list. I'll email you the moment this one ships.</span>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="mb-3 flex items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-line)] bg-[var(--color-sunken)] py-2.5 text-sm font-medium text-[var(--color-ink-muted)]">
        <Lock className="w-3.5 h-3.5" /> Available soon
      </div>
      <form onSubmit={joinWaitlist} className="space-y-2">
        <div className="absolute w-px h-px overflow-hidden -left-full" aria-hidden="true">
          <label htmlFor={`hp-${systemId}`}>Company (leave blank)</label>
          <input
            id={`hp-${systemId}`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>
        <label htmlFor={`wl-${systemId}`} className="sr-only">
          Your email address
        </label>
        <input
          id={`wl-${systemId}`}
          type="email"
          required
          disabled={busy}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@consultancy.com"
          className="w-full h-11 rounded-[var(--radius-control)] border border-[var(--color-line)] bg-[var(--color-page)] px-4 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-ink)] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full h-11 rounded-[var(--radius-control)] bg-[var(--color-invert)] text-[var(--color-ink-invert)] text-sm font-medium transition-colors hover:bg-[var(--color-invert-raised)] flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Tell me when it ships'}
        </button>
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-[var(--radius-control)] border border-red-200 bg-red-50 p-3 text-xs text-red-800"
          >
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};
