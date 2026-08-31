import React, { useState } from 'react';
import { BotlaneLogo } from './BotlaneLogo';

interface MinimalFooterProps {
  onOpenBooking: () => void;
}

/*
 * The full index. `href` is present only where a destination actually exists;
 * everything else is listed but not made clickable, so the footer can show the
 * shape of the company without shipping links that do nothing.
 *
 * Giving one of these a page is just a matter of adding its href.
 */
type FooterLink = { label: string; href?: string };

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Platform',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Our systems', href: '/systems' },
      { label: 'Integrations' },
      { label: 'Changelog' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'DevOps agencies' },
      { label: 'Cloud consultancies' },
      { label: 'Independent experts' },
      { label: 'Partner programme' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Knowledge base', href: '/#faq' },
      { label: 'API reference' },
      { label: 'Deployment guides', href: '/systems' },
    ],
  },
];




/**
 * Contact glyphs, drawn inline rather than pulled from an icon set. The rest
 * of the sheet is icon-free, so these two exist only because a phone number
 * and a WhatsApp number need telling apart at a glance.
 */
const PhoneGlyph: React.FC = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
       className="shrink-0" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

const WhatsAppGlyph: React.FC = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"
       className="shrink-0" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.25-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.03 1.02-1.03 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.35" />
    <path d="M12.05 21.79a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.17 6.44 6.6 2 12.05 2a9.82 9.82 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.9m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.44c6.55 0 11.89-5.33 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z" />
  </svg>
);

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
    <footer className="bl-display bl-on-dark bg-[var(--sheet-ink)] pt-16 pb-8 text-[#fafafa] md:pt-24 md:pb-10">
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

                {/* address, not a div: this is the contact information for the
                    site, and the element says so. not-italic because address
                    is italic by default. */}
                <address className="mt-8 not-italic">
                  <span className="bl-mono block text-[0.625rem] uppercase tracking-[0.16em] text-white/40">
                    Registered office
                  </span>
                  <p className="mt-2.5 text-[13px] leading-[1.7] text-white/60">
                    30 N Gould St Ste R
                    <br />
                    Sheridan, WY 82801
                  </p>

                  <div className="mt-4 flex flex-col gap-2.5">
                    <a
                      href="tel:+13072185175"
                      className="inline-flex w-fit items-center gap-2.5 text-[13px] text-white/70 transition-colors hover:text-white"
                    >
                      <PhoneGlyph />
                      <span>+1 307 218 5175</span>
                    </a>
                    <a
                      href="https://wa.me/919979972714"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2.5 text-[13px] text-white/70 transition-colors hover:text-white"
                    >
                      <WhatsAppGlyph />
                      <span>+91 9979972714</span>
                      <span className="sr-only">on WhatsApp</span>
                    </a>
                  </div>
                </address>
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
                      className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[var(--sheet-accent-on-dark)] text-sm font-semibold text-[#fafafa] transition-colors duration-200 hover:bg-[var(--sheet-accent-on-dark-hover)] disabled:cursor-not-allowed disabled:opacity-70"
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
                        {l.href ? (
                          <a
                            className="text-[14px] text-white/70 transition-colors hover:text-white"
                            href={l.href}
                          >
                            {l.label}
                          </a>
                        ) : (
                          <span className="flex items-baseline gap-2 text-[14px] text-white/35">
                            {l.label}
                            <span className="bl-mono text-[0.5rem] uppercase tracking-[0.16em] text-white/25">
                              soon
                            </span>
                          </span>
                        )}
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
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="text-left text-[14px] text-white/70 transition-colors hover:text-white"
                    >
                      Contact sales
                    </button>
                  </li>
                  <li>
                    <a
                      className="text-[14px] text-white/70 transition-colors hover:text-white"
                      href="mailto:sales@botlane.io"
                    >
                      sales@botlane.io
                    </a>
                  </li>
                  <li>
                    <span className="flex items-baseline gap-2 text-[14px] text-white/35">
                      About
                      <span className="bl-mono text-[0.5rem] uppercase tracking-[0.16em] text-white/25">
                        soon
                      </span>
                    </span>
                  </li>
                  <li>
                    <a
                      className="text-[14px] text-white/70 transition-colors hover:text-white"
                      href="/privacy"
                    >
                      Privacy policy
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[14px] text-white/70 transition-colors hover:text-white"
                      href="/terms"
                    >
                      Terms of service
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

          </div>
        </div>
      </div>
    </footer>
  );
};
