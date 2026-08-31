import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM = {
  name: '',
  email: '',
  consultancyName: '',
  website: '',
  cloudFocus: 'AWS & Kubernetes',
  currentTeamSize: '5-15 engineers',
  notes: '',
};

/** Flat and hairlined, like every other panel on the sheet. */
const FIELD =
  'w-full border border-[var(--sheet-rule)] bg-[#fcfcfb] px-3 py-2.5 text-[0.8125rem] ' +
  'text-[var(--sheet-ink)] outline-none transition-colors ' +
  'placeholder:text-[#9a9a96] focus:border-[var(--sheet-accent)] disabled:opacity-60';

const LABEL =
  'bl-mono mb-1.5 block text-[0.5625rem] uppercase tracking-[0.14em] text-[#9a9a96]';

const Field: React.FC<{ id: string; label: string; children: React.ReactNode }> = ({
  id,
  label,
  children,
}) => (
  <div>
    <label htmlFor={id} className={LABEL}>
      {label}
    </label>
    {children}
  </div>
);

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM);

  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    if (submitted) {
      setSubmitted(false);
      setError(null);
      setFormData(EMPTY_FORM);
    }
    onClose();
  }, [submitted, onClose]);

  /*
   * A dialog needs to take focus, give it back, close on Escape, and stop the
   * page behind it scrolling. None of that was here before.
   */
  useEffect(() => {
    if (!isOpen) return;

    returnFocus.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      returnFocus.current?.focus?.();
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, honeypot }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || 'Something went wrong. Please try again, or email sales@botlane.io.');
        return;
      }

      setSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        // Hex, not CSS variables: this is a canvas, and it parses the strings
        // itself. A var() here silently produces no colour at all.
        colors: ['#101010', '#3f3f46', '#71717a', '#a1a1aa', '#e4e4e7'],
        ticks: 200,
        gravity: 1.1,
        scalar: 0.85,
        disableForReducedMotion: true,
      });
    } catch {
      setError('Could not reach the server. Please check your connection, or email sales@botlane.io.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-title"
        tabIndex={-1}
        className="bl-display relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-[var(--sheet-rule)] bg-white outline-none"
      >
        <span className="bl-x" style={{ left: -6, top: -6 }} aria-hidden="true" />
        <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />
        <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
        <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

        <div className="flex items-center justify-between gap-4 border-b border-[var(--sheet-rule)] px-5 py-3">
          <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
            {submitted ? 'Application — received' : 'Application — client slot'}
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="text-[#9a9a96] transition-colors hover:text-[var(--sheet-ink)]"
          >
            <X className="size-4" />
          </button>
        </div>

        {!submitted ? (
          <div className="px-5 py-6 md:px-7">
            <h3
              id="application-title"
              className="text-xl font-bold tracking-[-0.03em] text-[var(--sheet-ink)] md:text-2xl"
            >
              Check client slot availability
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6b6b68]">
              Applications are reviewed within 24 hours, so no two clients ever end up chasing the
              same opening.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              {/* Honeypot. The name is deliberately meaningless: fields named
                  "company", "email" or similar get autofilled by browsers, which
                  would silently discard a real submission. */}
              <div className="absolute -left-full h-px w-px overflow-hidden" aria-hidden="true">
                <input
                  id="hp-xq7"
                  name="hp-xq7"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="app-name" label="Your name">
                  <input
                    id="app-name"
                    type="text"
                    required
                    disabled={submitting}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className={FIELD}
                  />
                </Field>
                <Field id="app-email" label="Work email">
                  <input
                    id="app-email"
                    type="email"
                    required
                    disabled={submitting}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@devopsconsultancy.com"
                    className={FIELD}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="app-consultancy" label="Consultancy">
                  <input
                    id="app-consultancy"
                    type="text"
                    required
                    disabled={submitting}
                    value={formData.consultancyName}
                    onChange={(e) => setFormData({ ...formData, consultancyName: e.target.value })}
                    placeholder="CloudArc Systems"
                    className={FIELD}
                  />
                </Field>
                <Field id="app-website" label="Website">
                  <input
                    id="app-website"
                    type="url"
                    required
                    disabled={submitting}
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://cloudarc.io"
                    className={FIELD}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="app-cloud" label="Primary cloud & stack">
                  <select
                    id="app-cloud"
                    disabled={submitting}
                    value={formData.cloudFocus}
                    onChange={(e) => setFormData({ ...formData, cloudFocus: e.target.value })}
                    className={FIELD}
                  >
                    <option value="AWS & Kubernetes">AWS, Kubernetes (EKS), Terraform</option>
                    <option value="GCP & Cloud Native">GCP, GKE, BigQuery, Observability</option>
                    <option value="Azure & Enterprise Cloud">Azure, AKS, Enterprise Migrations</option>
                    <option value="Multi-Cloud / SRE">Multi-Cloud, Site Reliability &amp; Platform Eng</option>
                  </select>
                </Field>
                <Field id="app-team" label="Team size">
                  <select
                    id="app-team"
                    disabled={submitting}
                    value={formData.currentTeamSize}
                    onChange={(e) => setFormData({ ...formData, currentTeamSize: e.target.value })}
                    className={FIELD}
                  >
                    <option value="Solo / independent">Solo / independent</option>
                    <option value="2-4 engineers">2-4 engineers</option>
                    <option value="5-15 engineers">5-15 engineers</option>
                    <option value="16+ engineers">16+ engineers</option>
                  </select>
                </Field>
              </div>

              <Field id="app-notes" label="Anything else (optional)">
                <textarea
                  id="app-notes"
                  rows={2}
                  disabled={submitting}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Target geographies, exclusions, or project minimums"
                  className={FIELD}
                />
              </Field>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 border border-red-300 bg-red-50 px-3.5 py-3 text-[0.8125rem] text-red-800"
                >
                  <span className="mt-[0.4rem] block size-2 shrink-0 bg-red-500" aria-hidden="true" />
                  <span className="leading-relaxed">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[var(--sheet-accent)] text-[0.9375rem] font-semibold text-[#fafafa] transition-colors hover:bg-[var(--sheet-accent-hover)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Sending…' : 'Submit for slot review'}
              </button>
            </form>
          </div>
        ) : (
          <div className="px-5 py-8 md:px-7">
            <span className="block size-2.5 bg-[var(--sheet-ink)]" aria-hidden="true" />
            <h3
              id="application-title"
              className="mt-4 text-xl font-bold tracking-[-0.03em] text-[var(--sheet-ink)] md:text-2xl"
            >
              Application received
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#6b6b68]">
              Thanks {formData.name}. We&rsquo;ll review {formData.consultancyName} for territory
              compatibility and reply to{' '}
              <b className="font-semibold text-[var(--sheet-ink)]">{formData.email}</b> within 24
              hours.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-7 inline-flex h-11 items-center justify-center rounded-lg border border-[var(--sheet-rule)] bg-white px-5 text-sm font-semibold text-[var(--sheet-ink)] transition-colors hover:border-[var(--sheet-accent)] hover:text-[var(--sheet-accent)]"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
