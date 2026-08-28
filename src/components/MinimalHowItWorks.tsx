import React from 'react';
import { motion } from 'motion/react';
import { Target, Server, Send, Inbox, ShieldCheck } from 'lucide-react';

export const MinimalHowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-16 md:py-24 border-b border-[#e3e3e0]">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6">
          <span className="eyebrow inline-flex w-fit items-center gap-2 rounded-[var(--radius-control)] border px-3 py-1.5 border-[#e3e3e0] bg-white text-[#6b6b68]">
            <span className="size-1.5 rounded-full bg-[#0d0d0d]"></span>
            How it works
          </span>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2 className="max-w-2xl text-3xl font-medium tracking-[-0.02em] text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.08] text-[#0d0d0d]">
              Four steps. Then replies land in your inbox.
            </h2>
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
              No complex dashboards to learn, no SDR seats to hire. The system is built, then it runs.
            </p>
          </div>
        </div>

        {/* 4 Step Ordered List */}
        <ol className="mt-12 flex flex-col gap-4">
          {/* Step 01 */}
          <li className="grid items-center gap-6 overflow-hidden rounded-[var(--radius-panel)] border border-[#e3e3e0] bg-white p-5 md:grid-cols-2 md:gap-12 md:p-7">
            <div
              role="img"
              aria-label="Step 1 render"
              className="relative flex items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-[#e3e3e0] bg-[#ebebe8] h-48 w-full md:h-56 p-4"
            >
              <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 h-full w-full text-black/[0.05]">
                <circle cx="100" cy="100" r="28" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="68" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div className="relative z-10 p-3.5 rounded-xl bg-white border border-[#e3e3e0] shadow-xs text-xs font-mono">
                <span className="text-zinc-500 block text-[10px]">TARGET CRITERIA</span>
                <span className="font-semibold text-zinc-900 block mt-0.5">DevOps · AWS / K8s · Series A-C</span>
              </div>
            </div>
            <div className="md:px-4">
              <span className="eyebrow inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-[#e3e3e0] px-2.5 py-1 text-[#9a9a96]">
                Step 01
              </span>
              <h3 className="mt-4 text-xl leading-snug font-medium tracking-[-0.015em] text-balance md:text-2xl text-[#0d0d0d]">
                We agree the target
              </h3>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
                Cloud ecosystems, target regions, company size, minimum deal values, and your strict exclusion list.
              </p>
            </div>
          </li>

          {/* Step 02 */}
          <li className="grid items-center gap-6 overflow-hidden rounded-[var(--radius-panel)] border border-[#e3e3e0] bg-white p-5 md:grid-cols-2 md:gap-12 md:p-7">
            <div
              role="img"
              aria-label="Step 2 render"
              className="relative flex items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-[#e3e3e0] bg-[#ebebe8] h-48 w-full md:h-56 md:order-2 p-4"
            >
              <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 h-full w-full text-black/[0.05]">
                <circle cx="100" cy="100" r="28" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="68" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div className="relative z-10 p-3.5 rounded-xl bg-white border border-[#e3e3e0] shadow-xs text-xs font-mono space-y-1">
                <div className="flex items-center gap-1 text-emerald-700 font-semibold text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SPF · DKIM · DMARC VALIDATED</span>
                </div>
                <span className="text-zinc-600 block text-[11px]">Separate Secondary MX Warmed</span>
              </div>
            </div>
            <div className="md:px-4 md:order-1">
              <span className="eyebrow inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-[#e3e3e0] px-2.5 py-1 text-[#9a9a96]">
                Step 02
              </span>
              <h3 className="mt-4 text-xl leading-snug font-medium tracking-[-0.015em] text-balance md:text-2xl text-[#0d0d0d]">
                I build the sending infrastructure
              </h3>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
                A separate authenticated domain is registered, warmed for 3 weeks, and kept completely isolated from your primary corporate domain.
              </p>
            </div>
          </li>

          {/* Step 03 */}
          <li className="grid items-center gap-6 overflow-hidden rounded-[var(--radius-panel)] border border-[#e3e3e0] bg-white p-5 md:grid-cols-2 md:gap-12 md:p-7">
            <div
              role="img"
              aria-label="Step 3 render"
              className="relative flex items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-[#e3e3e0] bg-[#ebebe8] h-48 w-full md:h-56 p-4"
            >
              <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 h-full w-full text-black/[0.05]">
                <circle cx="100" cy="100" r="28" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="68" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div className="relative z-10 p-3.5 rounded-xl bg-white border border-[#e3e3e0] shadow-xs text-xs font-mono">
                <span className="text-zinc-500 block text-[10px]">WEEKLY RADAR</span>
                <span className="font-semibold text-zinc-900 block mt-0.5">40 Stalled Roles Scraped</span>
              </div>
            </div>
            <div className="md:px-4">
              <span className="eyebrow inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-[#e3e3e0] px-2.5 py-1 text-[#9a9a96]">
                Step 03
              </span>
              <h3 className="mt-4 text-xl leading-snug font-medium tracking-[-0.015em] text-balance md:text-2xl text-[#0d0d0d]">
                The system runs weekly
              </h3>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
                Newly stalled infrastructure roles (60+ days) are identified, verified, and the VP of Engineering or CTO is contacted with context.
              </p>
            </div>
          </li>

          {/* Step 04 */}
          <li className="grid items-center gap-6 overflow-hidden rounded-[var(--radius-panel)] border border-[#e3e3e0] bg-white p-5 md:grid-cols-2 md:gap-12 md:p-7">
            <div
              role="img"
              aria-label="Step 4 render"
              className="relative flex items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-[#e3e3e0] bg-[#ebebe8] h-48 w-full md:h-56 md:order-2 p-4"
            >
              <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 h-full w-full text-black/[0.05]">
                <circle cx="100" cy="100" r="28" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="68" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div className="relative z-10 p-3.5 rounded-xl bg-white border border-[#e3e3e0] shadow-xs text-xs font-mono">
                <span className="text-emerald-700 block text-[10px] font-bold">● INBOUND RESPONSE</span>
                <span className="font-semibold text-zinc-900 block mt-0.5">"Let's talk Thursday at 2pm"</span>
              </div>
            </div>
            <div className="md:px-4 md:order-1">
              <span className="eyebrow inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-[#e3e3e0] px-2.5 py-1 text-[#9a9a96]">
                Step 04
              </span>
              <h3 className="mt-4 text-xl leading-snug font-medium tracking-[-0.015em] text-balance md:text-2xl text-[#0d0d0d]">
                Replies come to you
              </h3>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
                Interested engineering leaders and positive replies are forwarded directly to your primary inbox within minutes for call booking.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
};
