import React from 'react';
import { ShieldCheck, Users, Filter, Terminal, Sliders } from 'lucide-react';
import { motion } from 'motion/react';

export const BentoGrid: React.FC = () => {
  return (
    <section className="py-24 border-b border-[#EAEAEA] bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-left sm:text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-600 text-xs font-mono font-medium mb-3">
            <Sliders className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
            <span>SPECIFICATIONS · INFRASTRUCTURE</span>
          </div>
          <h2 className="font-['Newsreader',serif] text-3xl sm:text-4xl font-normal text-zinc-950 flex items-center justify-start sm:justify-center gap-2.5">
            <Sliders className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 shrink-0 inline-block" strokeWidth={1.5} />
            <span>Engineered for safety, deliverability, and technical precision.</span>
          </h2>
          <p className="text-sm text-zinc-600 mt-2">
            Built specifically to solve the unique operational hurdles of DevOps and Cloud consulting sales.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Domain Insulation (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -4 }}
            className="group relative md:col-span-7 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:shadow-zinc-900/5 hover:border-zinc-300 hover:bg-white transition-shadow duration-300"
          >
            {/* Subtle Glare / Ambient Sheen Overlay */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/40 to-emerald-500/10 rounded-2xl" />
            <div className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Zero Domain Risk
                </span>
              </div>

              <h3 className="font-['Newsreader',serif] text-2xl font-normal text-zinc-950 mb-2">
                100% Isolated Secondary Sending Domains
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                Your primary domain reputation is never exposed. We configure dedicated lookalike domains with strict DNS records and warm them for 3 weeks prior to launch.
              </p>
            </div>

            {/* Visual DNS Status Terminal */}
            <div className="relative z-10 rounded-xl bg-zinc-900 text-zinc-200 p-4 font-mono text-xs space-y-2 shadow-sm transition-transform duration-300 group-hover:translate-y-[-2px]">
              <div className="flex items-center justify-between text-[10px] text-zinc-500 border-b border-zinc-800 pb-2">
                <span>DNS Protocol Verification</span>
                <span className="text-emerald-400">STATUS: HEALTHY</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                <div className="bg-zinc-800/80 p-2 rounded border border-zinc-700 transition-colors group-hover:border-zinc-600">
                  <span className="text-zinc-400 block text-[9px]">SPF Record</span>
                  <span className="text-emerald-400 font-bold">v=spf1 include:_spf... ~all</span>
                </div>
                <div className="bg-zinc-800/80 p-2 rounded border border-zinc-700 transition-colors group-hover:border-zinc-600">
                  <span className="text-zinc-400 block text-[9px]">DKIM Signing</span>
                  <span className="text-emerald-400 font-bold">2048-Bit RSA PASS</span>
                </div>
                <div className="bg-zinc-800/80 p-2 rounded border border-zinc-700 transition-colors group-hover:border-zinc-600">
                  <span className="text-zinc-400 block text-[9px]">DMARC Policy</span>
                  <span className="text-emerald-400 font-bold">p=reject; 100%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: 4-Client Capacity Ceiling (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -4 }}
            className="group relative md:col-span-5 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:shadow-zinc-900/5 hover:border-zinc-300 hover:bg-white transition-shadow duration-300"
          >
            {/* Subtle Glare / Ambient Sheen Overlay */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/40 to-zinc-500/10 rounded-2xl" />
            <div className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 bg-zinc-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Users className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono text-zinc-600 bg-zinc-200/80 px-2 py-0.5 rounded-full font-bold">
                  Anti-Agency Model
                </span>
              </div>

              <h3 className="font-['Newsreader',serif] text-2xl font-normal text-zinc-950 mb-2">
                Strict 4-Client Cohort Limit
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                Botlane is capped at four consultancies to eliminate market overlap and ensure every campaign has hands-on technical curation by Shiv.
              </p>
            </div>

            {/* Visual 4-Slot Gauge */}
            <div className="relative z-10 bg-white rounded-xl border border-zinc-200 p-4 space-y-3 shadow-2xs transition-transform duration-300 group-hover:translate-y-[-2px]">
              <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block">
                Current Cohort Capacity
              </span>
              <div className="grid grid-cols-4 gap-2">
                <div className="p-2.5 rounded-lg bg-zinc-100 border border-zinc-200 text-center">
                  <span className="w-2 h-2 rounded-full bg-zinc-400 mx-auto block mb-1" />
                  <span className="text-[10px] font-mono font-semibold text-zinc-500">Slot 01</span>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">Active</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-100 border border-zinc-200 text-center">
                  <span className="w-2 h-2 rounded-full bg-zinc-400 mx-auto block mb-1" />
                  <span className="text-[10px] font-mono font-semibold text-zinc-500">Slot 02</span>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">Active</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-100 border border-zinc-200 text-center">
                  <span className="w-2 h-2 rounded-full bg-zinc-400 mx-auto block mb-1" />
                  <span className="text-[10px] font-mono font-semibold text-zinc-500">Slot 03</span>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">Active</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-center ring-1 ring-emerald-400 transition-all duration-300 group-hover:bg-emerald-100/70">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mx-auto block mb-1" />
                  <span className="text-[10px] font-mono font-bold text-emerald-800">Slot 04</span>
                  <span className="text-[9px] text-emerald-600 font-semibold block mt-0.5">Open</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Account Suppression Firewall (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -4 }}
            className="group relative md:col-span-5 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:shadow-zinc-900/5 hover:border-zinc-300 hover:bg-white transition-shadow duration-300"
          >
            {/* Subtle Glare / Ambient Sheen Overlay */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/40 to-amber-500/10 rounded-2xl" />
            <div className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Filter className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                  Conflict Free
                </span>
              </div>

              <h3 className="font-['Newsreader',serif] text-2xl font-normal text-zinc-950 mb-2">
                Suppression Firewall
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                Upload existing client rosters, ongoing deals, or sensitive partner lists. Our system enforces a zero-contact perimeter.
              </p>
            </div>

            <div className="relative z-10 p-3 bg-white rounded-xl border border-zinc-200 text-xs font-mono space-y-1.5 shadow-2xs transition-transform duration-300 group-hover:translate-y-[-2px]">
              <div className="flex items-center justify-between text-zinc-500 text-[10px]">
                <span>Suppression Rules Loaded</span>
                <span className="text-emerald-600 font-bold">ACTIVE (100% GUARD)</span>
              </div>
              <div className="p-2 rounded bg-zinc-50 border border-zinc-100 text-[11px] text-zinc-700 flex items-center justify-between transition-colors group-hover:bg-zinc-100/70">
                <span>Existing Clients:</span>
                <span className="font-semibold text-zinc-900">Excluded</span>
              </div>
              <div className="p-2 rounded bg-zinc-50 border border-zinc-100 text-[11px] text-zinc-700 flex items-center justify-between transition-colors group-hover:bg-zinc-100/70">
                <span>Direct Competitors:</span>
                <span className="font-semibold text-zinc-900">Blacklisted</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Technical Narrative & Precision (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -4 }}
            className="group relative md:col-span-7 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:shadow-zinc-900/5 hover:border-zinc-300 hover:bg-white transition-shadow duration-300"
          >
            {/* Subtle Glare / Ambient Sheen Overlay */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/40 to-blue-500/10 rounded-2xl" />
            <div className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Terminal className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                  DevOps Native
                </span>
              </div>

              <h3 className="font-['Newsreader',serif] text-2xl font-normal text-zinc-950 mb-2">
                Built by Technical Operators, Not Telemarketers
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                Engineering leaders delete generic sales pitches immediately. Botlane writes around specific architectural roadblocks: CI/CD drift, cluster scalability, telemetry noise, and regulatory audits.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs transition-transform duration-300 group-hover:translate-y-[-2px]">
              <div className="p-2.5 rounded-xl bg-white border border-zinc-200 shadow-2xs transition-colors group-hover:border-zinc-300">
                <span className="font-bold text-zinc-900 block text-xs">Kubernetes</span>
                <span className="text-[10px] text-zinc-400 font-mono">EKS / GKE / AKS</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-zinc-200 shadow-2xs transition-colors group-hover:border-zinc-300">
                <span className="font-bold text-zinc-900 block text-xs">IaC & CI/CD</span>
                <span className="text-[10px] text-zinc-400 font-mono">Terraform / Argo</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-zinc-200 shadow-2xs transition-colors group-hover:border-zinc-300">
                <span className="font-bold text-zinc-900 block text-xs">Observability</span>
                <span className="text-[10px] text-zinc-400 font-mono">OTel / Datadog</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-zinc-200 shadow-2xs transition-colors group-hover:border-zinc-300">
                <span className="font-bold text-zinc-900 block text-xs">Security</span>
                <span className="text-[10px] text-zinc-400 font-mono">Vault / SOC2</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


