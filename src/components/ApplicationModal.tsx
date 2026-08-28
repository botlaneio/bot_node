import React, { useState } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BotlaneLogo } from './BotlaneLogo';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    consultancyName: '',
    website: '',
    cloudFocus: 'AWS & Kubernetes',
    currentTeamSize: '5-15 engineers',
    notes: ''
  });

  if (!isOpen) return null;

  const triggerConfetti = () => {
    // Subtle, elegant particle burst with brand-aligned tones
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#18181b', '#059669', '#10b981', '#71717a', '#e4e4e7'],
      ticks: 200,
      gravity: 1.1,
      scalar: 0.85,
      disableForReducedMotion: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    triggerConfetti();
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-[#E5E5E0] shadow-2xl max-w-lg w-full p-6 sm:p-8 relative text-zinc-900 font-['Plus_Jakarta_Sans',sans-serif]">
        <button
          onClick={onClose}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-950 text-xs bg-[#FBFBFA]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 font-medium mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@devopsconsultancy.com"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-950 text-xs bg-[#FBFBFA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 font-medium mb-1">Consultancy Name</label>
                  <input
                    type="text"
                    required
                    value={formData.consultancyName}
                    onChange={(e) => setFormData({ ...formData, consultancyName: e.target.value })}
                    placeholder="e.g. CloudArc Systems"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-950 text-xs bg-[#FBFBFA]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 font-medium mb-1">Website URL</label>
                  <input
                    type="url"
                    required
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://cloudarc.io"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-950 text-xs bg-[#FBFBFA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 font-medium mb-1">Primary Cloud & Stack Specialization</label>
                <select
                  value={formData.cloudFocus}
                  onChange={(e) => setFormData({ ...formData, cloudFocus: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-950 text-xs bg-[#FBFBFA]"
                >
                  <option value="AWS & Kubernetes">AWS, Kubernetes (EKS), Terraform</option>
                  <option value="GCP & Cloud Native">GCP, GKE, BigQuery, Observability</option>
                  <option value="Azure & Enterprise Cloud">Azure, AKS, Enterprise Migrations</option>
                  <option value="Multi-Cloud / SRE">Multi-Cloud, Site Reliability & Platform Eng</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-700 font-medium mb-1">Additional Context (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Target geographies, specific exclusions, or project minimums..."
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-950 text-xs bg-[#FBFBFA]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-zinc-950 text-white font-medium text-xs hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                >
                  Submit inquiry for slot review
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F2F8F4] border border-[#D1E6D8] text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-['Newsreader',serif] text-2xl font-medium text-zinc-950">
              Inquiry received
            </h3>
            <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed">
              Thanks {formData.name}. We will review {formData.consultancyName} for territory compatibility and reply to <strong>{formData.email}</strong> within 24 hours.
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
