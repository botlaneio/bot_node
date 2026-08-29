import React, { useState } from 'react';
import { ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';
import { BotlaneLogo } from './BotlaneLogo';

interface MinimalFooterProps {
  onOpenBooking: () => void;
}

export const MinimalFooter: React.FC<MinimalFooterProps> = ({ onOpenBooking }) => {
  const [email, setEmail] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

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
    <footer className="bg-[#0a0a0a] pt-16 pb-8 md:pt-24 md:pb-10 text-[#fafafa]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <div className="relative">
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
            
            {/* Brand & Description */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-[-0.02em] text-white">
                  <BotlaneLogo size={24} theme="monochrome" showSquircle={false} className="opacity-100" />
                  Botlane
                </span>
                <p className="mt-6 max-w-[280px] text-[15px] leading-[1.6] text-white/60 font-light">
                  Outbound architecture for DevOps consultancies. Built on public, dated hiring signals rather than guesswork.
                </p>
              </div>

              {/* Newsletter Form */}
              <div className="mt-12 lg:mt-24">
                <h3 className="text-sm font-medium text-white mb-3">Get the list</h3>
                <p className="text-[13px] text-white/50 mb-5 font-light">
                  Tell me your target market and I'll send forty companies.
                </p>
                {submitted ? (
                  <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-white/5 border border-white/10 text-sm text-white/90">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Got it. The list is on its way to {email}.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-2.5">
                    {/* Honeypot with a meaningless name, so browser autofill
                        cannot trip it and discard a genuine submission. */}
                    <div className="absolute w-px h-px overflow-hidden -left-full" aria-hidden="true">
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

                    <label htmlFor="target-market" className="sr-only">Your target market</label>
                    <input
                      id="target-market"
                      type="text"
                      disabled={submitting}
                      placeholder="Target market — e.g. AWS / EKS, US Series B"
                      value={targetMarket}
                      onChange={(e) => setTargetMarket(e.target.value)}
                      className="w-full h-12 rounded-full border border-white/15 bg-white/5 px-5 text-sm text-white placeholder:text-white/40 outline-none transition-all focus:border-white/40 focus:bg-white/10 disabled:opacity-60"
                    />

                    <div className="relative flex w-full items-center group">
                      <label htmlFor="subscribe-email" className="sr-only">Your email address</label>
                      <input
                        id="subscribe-email"
                        type="email"
                        required
                        disabled={submitting}
                        placeholder="you@consultancy.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 rounded-full border border-white/15 bg-white/5 pl-5 pr-[130px] text-sm text-white placeholder:text-white/40 outline-none transition-all focus:border-white/40 focus:bg-white/10 disabled:opacity-60"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="absolute right-1 top-1 bottom-1 px-5 rounded-full bg-white text-[13px] font-medium text-black transition-transform hover:scale-[0.97] active:scale-[0.95] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-1.5"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Sending
                          </>
                        ) : (
                          'Send the list'
                        )}
                      </button>
                    </div>

                    {error && (
                      <div
                        role="alert"
                        className="flex items-start gap-2 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/25 text-[13px] text-red-200"
                      >
                        <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{error}</span>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* Spacer */}
            <div className="hidden lg:block lg:col-span-1"></div>

            {/* Navigation Links */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-6">
              
              {/* Platform */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">Platform</h3>
                <ul className="flex flex-col gap-4">
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="/#features">Features</a></li>
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="/#how-it-works">How It Works</a></li>
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="/#pricing">Pricing</a></li>
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#integrations">Integrations</a></li>
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#changelog">Changelog</a></li>
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">Solutions</h3>
                <ul className="flex flex-col gap-4">
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#devops">DevOps Agencies</a></li>
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#cloud">Cloud Consultancies</a></li>
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#freelance">Independent Experts</a></li>
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#partners">Partner Program</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">Resources</h3>
                <ul className="flex flex-col gap-4">
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#documentation">Documentation</a></li>
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#api">API Reference</a></li>
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="/#faq">Knowledge Base</a></li>
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#guides">Deployment Guides</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">Company</h3>
                <ul className="flex flex-col gap-4">
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#about">About Us</a></li>
                  <li>
                    <button type="button" onClick={onOpenBooking} className="text-[14px] text-white/70 transition-colors hover:text-white text-left">
                      Contact Sales
                    </button>
                  </li>
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#privacy">Privacy Policy</a></li>
                  <li><a className="text-[14px] text-white/70 transition-colors hover:text-white" href="#terms">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/10 mb-8"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[13px] text-white/40 font-light">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <p>© {new Date().getFullYear()} Botlane Inc. All rights reserved.</p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-white/60">All systems operational</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
