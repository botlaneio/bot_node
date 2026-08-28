import React, { useState } from 'react';
import { Database, ShieldAlert, Cpu, Filter, Send, MailCheck, ArrowRight, CheckCircle2, RefreshCw, Zap, Workflow } from 'lucide-react';
import { motion } from 'motion/react';

export const ArchitectureFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 0,
      title: 'Signal Radar',
      subtitle: '60+ Day Job Board Scraping',
      icon: Database,
      badge: 'Continuous Scraping',
      metric: '500+ daily tech roles analyzed',
      visualNode: {
        headline: 'Automated Signal Filters',
        tags: ['Platform Engineer', 'Site Reliability', 'Kubernetes Lead', 'Cloud Architect'],
        highlight: 'Filters out recruiters & only tracks roles open > 60 days with multiple reposts.'
      }
    },
    {
      id: 1,
      title: 'Domain Insulation',
      subtitle: 'Isolated Lookalike Domains',
      icon: ShieldAlert,
      badge: 'Zero Risk to Your Domain',
      metric: '3-week DNS warmup protocol',
      visualNode: {
        headline: 'DNS Security & Insulation',
        tags: ['SPF Pass', 'DKIM 2048-bit', 'DMARC Strict', 'Google Workspace Tenants'],
        highlight: 'Primary domain is never touched. Outreach runs on warmed secondary domains.'
      }
    },
    {
      id: 2,
      title: 'Technical Copywriting',
      subtitle: 'Engineer-to-Engineer Messaging',
      icon: Cpu,
      badge: 'Custom Architecture Context',
      metric: '1-to-1 tailored outreach',
      visualNode: {
        headline: 'Contextual Problem Framing',
        tags: ['Terraform Modularization', 'Multi-tenant EKS', 'OTel Observability', 'SOC2 Readiness'],
        highlight: 'No generic sales fluff. Written directly to the specific technical roadblock.'
      }
    },
    {
      id: 3,
      title: 'Direct Inbox Routing',
      subtitle: 'Warm Discovery Calls',
      icon: MailCheck,
      badge: 'Zero CRM Overhead',
      metric: 'Direct to your calendar',
      visualNode: {
        headline: 'Direct Executive Replies',
        tags: ['VP Engineering', 'Chief Technology Officer', 'Head of Infrastructure'],
        highlight: 'Positive replies route straight to you. Unsubscribes and bounces handled automatically.'
      }
    }
  ];

  return (
    <div className="py-20 border-b border-[#EAEAEA] bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-left sm:text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-600 text-xs font-mono font-medium mb-3">
            <Workflow className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
            <span>HOW IT WORKS · SYSTEM PIPELINE</span>
          </div>
          <h2 className="font-['Newsreader',serif] text-3xl sm:text-4xl font-normal text-zinc-950 flex items-center justify-start sm:justify-center gap-2.5">
            <Workflow className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 shrink-0 inline-block" strokeWidth={1.5} />
            <span>How the machine operates end-to-end.</span>
          </h2>
          <p className="text-sm text-zinc-600 mt-2">
            A fully managed, four-stage technical pipeline running quietly in the background.
          </p>
        </motion.div>

        {/* Visual Pipeline Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-lg text-left transition-all border relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-950 text-white border-zinc-950 shadow-md ring-2 ring-zinc-950/20'
                    : 'bg-zinc-50 hover:bg-zinc-100/80 text-zinc-900 border-zinc-200/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-800 border border-zinc-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className={`text-[10px] font-mono font-medium ${
                      isSelected ? 'text-zinc-400' : 'text-zinc-400'
                    }`}>
                      0{idx + 1}
                    </span>
                  </div>
                  <h4 className={`text-sm font-semibold leading-tight ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                    {step.title}
                  </h4>
                  <p className={`text-[11px] mt-1 leading-snug ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {step.subtitle}
                  </p>
                </div>

                <div className={`mt-4 pt-2 border-t text-[10px] font-mono flex items-center gap-1 ${
                  isSelected ? 'border-zinc-800 text-emerald-400' : 'border-zinc-200 text-zinc-500'
                }`}>
                  <Zap className="w-3 h-3" />
                  <span>{step.badge}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Flow Stage Inspector */}
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Detail Description */}
            <div className="md:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/70 text-zinc-800 text-xs font-mono">
                <span>STAGE 0{activeStep + 1} / 04</span>
                <span>•</span>
                <span className="font-semibold">{steps[activeStep].title}</span>
              </div>

              <h3 className="font-['Newsreader',serif] text-2xl sm:text-3xl font-medium text-zinc-950">
                {steps[activeStep].visualNode.headline}
              </h3>

              <p className="text-sm text-zinc-600 leading-relaxed">
                {steps[activeStep].visualNode.highlight}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {steps[activeStep].visualNode.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-xs text-zinc-700 font-mono shadow-2xs"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 text-xs font-mono text-zinc-500 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-zinc-700 animate-spin-slow" />
                <span>Performance Metric: <strong>{steps[activeStep].metric}</strong></span>
              </div>
            </div>

            {/* Right: Graphic Schematic / Micro UI */}
            <div className="md:col-span-6">
              <div className="bg-white rounded-xl border border-zinc-200/90 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <span className="text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider">
                    Visual Inspector
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    System State: Operational
                  </span>
                </div>

                {activeStep === 0 && (
                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                      <span className="text-zinc-700">Scraping Job Boards:</span>
                      <span className="text-emerald-600 font-bold">542 Active Queries</span>
                    </div>
                    <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                      <span className="text-zinc-700">Days Open Threshold:</span>
                      <span className="text-amber-700 font-bold">≥ 60 Days Only</span>
                    </div>
                    <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                      <span className="text-zinc-700">Executive Enrichment:</span>
                      <span className="text-zinc-900 font-bold">Verified VP Eng / CTO</span>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between">
                      <span>Primary Domain Status:</span>
                      <span className="font-bold">100% Insulated (Untouched)</span>
                    </div>
                    <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                      <span>Secondary Domain Warmup:</span>
                      <span className="text-zinc-900 font-bold">21 Days Protocol (99% Score)</span>
                    </div>
                    <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                      <span>DNS Protocol Authentication:</span>
                      <span className="text-emerald-700 font-bold">SPF + DKIM + DMARC Pass</span>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-2.5 font-sans text-xs">
                    <div className="p-3 rounded bg-zinc-50 border border-zinc-200 space-y-1">
                      <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                        <span>Pattern Matcher</span>
                        <span className="text-blue-600 font-bold">Kubernetes/EKS Bottleneck</span>
                      </div>
                      <p className="text-zinc-800 text-[11px] leading-relaxed">
                        "Saw your EKS role is open for 78 days. We embed senior platform engineers to unblock cluster migrations while your recruiter finishes hiring."
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                      <span>Tone: Engineer-to-Engineer</span>
                      <span className="text-emerald-600 font-medium">Zero Pitch Deck Fluff</span>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-2.5 font-sans text-xs">
                    <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 space-y-1">
                      <div className="flex items-center justify-between font-mono text-[10px] text-emerald-800">
                        <span className="font-bold">Direct Forwarding Active</span>
                        <span>Inbox: you@devopsagency.com</span>
                      </div>
                      <p className="text-emerald-950 text-[11px] font-medium leading-relaxed">
                        "CTO replied: 'Let's chat tomorrow 10am to see your previous multi-tenant migration case studies.'"
                      </p>
                    </div>
                    <div className="p-2 rounded bg-zinc-100/80 text-[10px] text-zinc-600 font-mono flex items-center justify-between">
                      <span>Unsubscribes / Bounces:</span>
                      <span className="text-zinc-800 font-semibold">Handled Quietly by Botlane</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-[11px]">
                  <span className="text-zinc-400 font-mono">Next automated check in 4m</span>
                  <button
                    onClick={() => setActiveStep((activeStep + 1) % steps.length)}
                    className="text-zinc-900 font-medium hover:underline flex items-center gap-1"
                  >
                    Next stage <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
