import React, { useState } from 'react';
import { BotlaneLogo } from './BotlaneLogo';

interface MinimalFooterProps {
  onOpenBooking: () => void;
}

const COLUMNS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Integrations', href: '#integrations' },
      { label: 'Changelog', href: '#changelog' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'DevOps Agencies', href: '#devops' },
      { label: 'Cloud Consultancies', href: '#cloud' },
      { label: 'Independent Experts', href: '#freelance' },
      { label: 'Partner Program', href: '#partners' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '#documentation' },
      { label: 'API Reference', href: '#api' },
      { label: 'Knowledge Base', href: '/#faq' },
      { label: 'Deployment Guides', href: '#guides' },
    ],
  },
];

/** Shared by both inputs — flat and hairlined, like every other panel. */
const FIELD =
  'h-11 w-full border border-white/15 bg-white/[0.04] px-3.5 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/35 focus:border-white/35 focus:bg-white/[0.07] disabled:opacity-60';

export const MinimalFooter: React.FC<MinimalFooterProps> = ({ onOpenBooking }) => {
  const [email, setEmail] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  // The target-market field only appears once a plausible email is entered,
  // so the initial state is a single input rather than a two-field form.
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/list-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, targetMarket, honeypot }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || 'Something went wrong. Please email sales@botlane.io.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Could not reach the server. Please email sales@botlane.io.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bl-display bg-[var(--sheet-ink)] pt-16 pb-8 text-[#fafafa] md:pt-24 md:pb-10">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="relative">
          <div className="mb-20 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
            {/* brand + list request */}
            <div className="flex flex-col justify-between lg:col-span-4">
              <div>
                <span className="inline-flex items-center gap-2.5 text-lg font-bold tracking-[-0.03em] text-white">
                  <BotlaneLogo size={24} theme="monochrome" showSquircle={false} />
                  Botlane
                </span>
                <p className="mt-6 max-w-[280px] text-[15px] leading-[1.6] text-white/60">
                  Outbound architecture for DevOps consultancies. Built on public, dated hiring
                  signals rather than guesswork.
                </p>
              </div>

              <div className="mt-12 lg:mt-24">
                <h3 className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/40">
                  Get the list
                </h3>
                <p className="mt-3 mb-5 text-[13px] text-white/50">
                  Tell me your target market and I&rsquo;ll send forty companies.
                </p>

                {submitted ? (
                  <div className="flex max-w-sm items-start gap-3 border border-white/15 bg-white/[0.04] p-4 text-sm text-white/90">
                    <span className="mt-[0.4rem] block size-2 shrink-0 bg-white" aria-hidden="true" />
                    <span className="leading-relaxed">
                      Got it. The list is on its way to {email}.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    {/* Honeypot with a meaningless name, so browser autofill
                        cannot trip it and discard a genuine submission. */}
                    <div className="absolute -left-full h-px w-px overflow-hidden" aria-hidden="true">
                      <input
                        id="hp-xq7-footer"
                        name="hp-xq7-footer"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <label htmlFor="subscribe-email" className="sr-only">
                      Your email address
                    </label>
                    <input
                      id="subscribe-email"
                      type="email"
                      required
                      disabled={submitting}
                      placeholder="you@consultancy.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={FIELD}
                    />

                    {/* Revealed only once the email is plausible, so the form
                        opens as a single field and earns the second one. */}
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        emailLooksValid
                          ? 'mt-2 grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <label htmlFor="target-market" className="sr-only">
                          Your target market
                        </label>
                        <input
                          id="target-market"
                          type="text"
                          disabled={submitting}
                          tabIndex={emailLooksValid ? 0 : -1}
                          placeholder="Target market — optional"
                          value={targetMarket}
                          onChange={(e) => setTargetMarket(e.target.value)}
                          className={FIELD}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-white text-sm font-semibold text-[var(--sheet-ink)] transition-colors duration-200 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting ? 'Sending…' : 'Send the list'}
                    </button>

                    {error && (
                      <div
                        role="alert"
                        className="mt-2 flex items-start gap-3 border border-red-500/30 bg-red-500/10 px-3.5 py-3 text-[13px] text-red-200"
                      >
                        <span
                          className="mt-[0.4rem] block size-2 shrink-0 bg-red-300"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{error}</span>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>

            <div className="hidden lg:col-span-1 lg:block" />

            {/* navigation */}
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-6 lg:col-span-7">
              {COLUMNS.map((col) => (
                <div key={col.heading}>
                  <h3 className="bl-mono mb-6 text-[0.625rem] uppercase tracking-[0.16em] text-white/40">
                    {col.heading}
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a
                          className="text-[14px] text-white/70 transition-colors hover:text-white"
                          href={l.href}
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="bl-mono mb-6 text-[0.625rem] uppercase tracking-[0.16em] text-white/40">
                  Company
                </h3>
                <ul className="flex flex-col gap-4">
                  <li>
                    <a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#about">
                      About Us
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="text-left text-[14px] text-white/70 transition-colors hover:text-white"
                    >
                      Contact Sales
                    </button>
                  </li>
                  <li>
                    <a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#privacy">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#terms">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8 h-px w-full bg-white/12" />

          <div className="flex flex-col items-start justify-between gap-6 text-[13px] text-white/40 md:flex-row md:items-center">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
              <p>© {new Date().getFullYear()} Botlane Inc. All rights reserved.</p>
              <span className="bl-mono flex items-center gap-2.5 text-[0.625rem] uppercase tracking-[0.14em] text-white/60">
                <i className="block size-2 bg-white" aria-hidden="true" />
                All systems operational
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="transition-colors hover:text-white">Twitter</a>
              <a href="#" className="transition-colors hover:text-white">LinkedIn</a>
              <a href="#" className="transition-colors hover:text-white">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
