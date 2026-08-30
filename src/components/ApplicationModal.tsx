import React, { useState } from 'react';
import { X, Check, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BotlaneLogo } from './BotlaneLogo';

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

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#0a0a0a', '#3f3f46', '#71717a', '#a1a1aa', '#e4e4e7'],
      ticks: 200,
      gravity: 1.1,
      scalar: 0.85,
      disableForReducedMotion: true,
    });
  };

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
      triggerConfetti();
    } catch {
      setError('Could not reach the server. Please check your connection, or email sales@botlane.io.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError(null);
    setFormData(EMPTY_FORM);
    onClose();
  };

  const inputClass =
    'w-full px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-950 text-xs bg-[#FBFBFA] disabled:opacity-60';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-[#E5E5E0] shadow-2xl max-w-lg w-full p-6 sm:p-8 relative text-zinc-900">
        <button
          onClick={submitted ? handleReset : onClose}
          className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <BotlaneLogo size={24} theme="dark" />
                <span className="text-xs font-mono font-medium text-zinc-500">BOTLANE ENGINE</span>
              </div>
              <h3 className="font-['Newsreader',serif] text-2xl font-normal text-zinc-950">
                Check client slot availability
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                We review applications within 24 hours to ensure zero territory conflict with existing clients.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Honeypot: hidden from users, catches naive bots. */}
              {/* Honeypot. The name is deliberately meaningless: fields named
                  "company", "email" or similar get autofilled by browsers, which
                  would silently discard a real submission. */}
              <div className="absolute w-px h-px overflow-hidden -left-full" aria-hidden="true">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="app-name" className="block text-zinc-700 font-medium mb-1">Your Name</label>
                  <input
                    id="app-name"
                    type="text"
                    required
                    disabled={submitting}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="app-email" className="block text-zinc-700 font-medium mb-1">Work Email</label>
                  <input
                    id="app-email"
                    type="email"
                    required
                    disabled={submitting}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@devopsconsultancy.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="app-consultancy" className="block text-zinc-700 font-medium mb-1">Consultancy Name</label>
                  <input
                    id="app-consultancy"
                    type="text"
                    required
                    disabled={submitting}
                    value={formData.consultancyName}
                    onChange={(e) => setFormData({ ...formData, consultancyName: e.target.value })}
                    placeholder="e.g. CloudArc Systems"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="app-website" className="block text-zinc-700 font-medium mb-1">Website URL</label>
                  <input
                    id="app-website"
                    type="url"
                    required
                    disabled={submitting}
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://cloudarc.io"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="app-cloud" className="block text-zinc-700 font-medium mb-1">Primary Cloud &amp; Stack</label>
                  <select
                    id="app-cloud"
                    disabled={submitting}
                    value={formData.cloudFocus}
                    onChange={(e) => setFormData({ ...formData, cloudFocus: e.target.value })}
                    className={inputClass}
                  >
                    <option value="AWS & Kubernetes">AWS, Kubernetes (EKS), Terraform</option>
                    <option value="GCP & Cloud Native">GCP, GKE, BigQuery, Observability</option>
                    <option value="Azure & Enterprise Cloud">Azure, AKS, Enterprise Migrations</option>
                    <option value="Multi-Cloud / SRE">Multi-Cloud, Site Reliability &amp; Platform Eng</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="app-team" className="block text-zinc-700 font-medium mb-1">Current Team Size</label>
                  <select
                    id="app-team"
                    disabled={submitting}
                    value={formData.currentTeamSize}
                    onChange={(e) => setFormData({ ...formData, currentTeamSize: e.target.value })}
                    className={inputClass}
                  >
                    <option value="Solo / independent">Solo / independent</option>
                    <option value="2-4 engineers">2-4 engineers</option>
                    <option value="5-15 engineers">5-15 engineers</option>
                    <option value="16+ engineers">16+ engineers</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="app-notes" className="block text-zinc-700 font-medium mb-1">Additional Context (Optional)</label>
                <textarea
                  id="app-notes"
                  rows={2}
                  disabled={submitting}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Target geographies, specific exclusions, or project minimums..."
                  className={inputClass}
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800"
                >
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{error}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-zinc-950 text-white font-medium text-xs hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Submit inquiry for slot review
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-invert)] text-[var(--color-ink-invert)] flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-['Newsreader',serif] text-2xl font-medium text-zinc-950">
              Inquiry received
            </h3>
            <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed">
              Thanks {formData.name}. We will review {formData.consultancyName} for territory
              compatibility and reply to <strong>{formData.email}</strong> within 24 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-lg bg-zinc-950 text-white text-xs font-medium hover:bg-zinc-800 transition-all"
              >
                Close window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
