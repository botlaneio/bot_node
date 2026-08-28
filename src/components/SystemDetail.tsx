import { BuySystem } from './BuySystem';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Terminal, Zap, Server, Code, FileJson, Layers } from 'lucide-react';
import { FEATURED_SYSTEMS, LIBRARY, SystemData } from '../data/systemsData';

interface SystemDetailProps {
  systemId: string;
  onBack: () => void;
  onOpenBooking: () => void;
}

export const SystemDetail: React.FC<SystemDetailProps> = ({ systemId, onBack, onOpenBooking }) => {
  const [system, setSystem] = useState<SystemData | null>(null);

  useEffect(() => {
    // Small timeout ensures the DOM has updated before forcing scroll
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 10);
    const found = [...FEATURED_SYSTEMS, ...LIBRARY].find(s => s.id === systemId);
    setSystem(found || null);
  }, [systemId]);

  if (!system) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-[var(--color-page)]">
        <p className="text-[#a3a3a0]">System not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-page)] pt-24 pb-16 md:pb-32 border-b border-[#e3e3e0]">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Systems
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20">
          
          {/* Left Column: Details */}
          <div>
            <span className="eyebrow inline-flex items-center gap-2 rounded-[var(--radius-control)] border px-3 py-1.5 border-[var(--color-line)] bg-white text-[var(--color-ink-muted)] mb-6 shadow-sm">
              {system.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--color-ink)] mb-6">
              {system.name}
            </h1>
            
            <p className="text-xl text-[var(--color-ink-muted)] leading-relaxed mb-12">
              {system.longDescription || system.description || system.solution || "An enterprise-grade system designed specifically for DevOps consultancies."}
            </p>

            <div className="space-y-12">
              {system.problem && (
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-ink-muted)] mb-4">The Problem</h3>
                  <div className="bg-[var(--color-card)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-6 md:p-8">
                    <p className="text-[var(--color-ink)] leading-relaxed">
                      {system.problem}
                    </p>
                  </div>
                </section>
              )}

              {system.outcome && (
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-ink-muted)] mb-4">The Outcome</h3>
                  <div className="bg-[var(--color-card)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-6 md:p-8">
                    <p className="text-[var(--color-ink)] leading-relaxed font-medium">
                      {system.outcome}
                    </p>
                  </div>
                </section>
              )}

              
              {system.howItWorks && (
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-ink-muted)] mb-4">How it Works</h3>
                  <div className="bg-[var(--color-card)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-6 md:p-8">
                    <p className="text-[var(--color-ink)] leading-relaxed font-light">
                      {system.howItWorks}
                    </p>
                  </div>
                </section>
              )}

              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-ink-muted)] mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(system.keyFeatures || [
                    "Zero-maintenance architecture",
                    "Fully white-labeled for your agency",
                    "Seamless CI/CD integration",
                    "Enterprise-grade security defaults",
                    "Customizable webhooks & alerts",
                    "Comprehensive documentation included"
                  ]).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-[#0a0a0a] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[0.9375rem] text-[var(--color-ink-subtle)] leading-snug">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Right Column: Pricing & Specs Card */}
          <div className="relative">
            <div className="sticky top-24 bg-[var(--color-card)] border border-[var(--color-line)] rounded-[var(--radius-panel)] p-8 shadow-sm">
              <div className="mb-6">
                <p className="text-sm text-[var(--color-ink-muted)] font-medium mb-1">One-time license</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-[var(--color-ink)]">{system.price}</span>
                </div>
              </div>
              
              <BuySystem
                systemId={system.id}
                systemName={system.name}
                price={system.price}
              />

              <button
                onClick={onOpenBooking}
                className="w-full h-12 rounded-[var(--radius-control)] bg-transparent border border-[var(--color-line)] text-[var(--color-ink)] font-medium transition-colors hover:bg-[var(--color-sunken)] mb-8 flex items-center justify-center gap-2"
              >
                Have it run for you instead
              </button>

              <div className="space-y-4 pt-6 border-t border-[var(--color-line)]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-ink-muted)]">Target Audience</span>
                  <span className="font-medium text-[var(--color-ink)] text-right">{system.builtFor || "DevOps Consultancies"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-ink-muted)]">Integrations</span>
                  <span className="font-medium text-[var(--color-ink)] text-right">{system.connectsTo || "AWS, GCP, Azure"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-ink-muted)]">Output Format</span>
                  <span className="font-medium text-[var(--color-ink)] text-right">{system.output || "Custom Dashboards"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-ink-muted)]">Deployment Time</span>
                  <span className="font-medium text-[var(--color-ink)] text-right">{system.deployment || "< 1 hour"}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
