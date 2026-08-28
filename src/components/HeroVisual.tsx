import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Terminal, Mail, CheckCircle2, Clock, Cpu, Server, Sparkles, Send, Inbox, ArrowRight } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-5xl mt-12 sm:mt-16">
      {/* Decorative ambient glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-r from-blue-200/50 via-zinc-200/50 to-emerald-200/50 blur-3xl -z-10 rounded-full opacity-70" />

      {/* Main Glassmorphic Dashboard Window with Subtle Floating Animation */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: 1,
          y: [0, -7, 0],
        }}
        transition={{
          opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="rounded-2xl border border-zinc-200/90 bg-white/95 p-3 sm:p-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl"
      >
        {/* Window Chrome */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100 px-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
            </div>
            <span className="text-[11px] font-mono font-medium text-zinc-400 ml-2 flex items-center gap-1">
              <Terminal className="w-3 h-3 text-zinc-600" /> botlane-engine // v2.4 live-signal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-medium font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Dedicated Domain: @reach-devopscloud.io
            </span>
          </div>
        </div>

        {/* 3-Column Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-left">
          {/* Column 1: Detected Signal (4 cols) */}
          <div className="lg:col-span-4 rounded-xl bg-zinc-50/80 border border-zinc-200/70 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-600" /> Stalled Signal Alert
                </span>
                <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold border border-amber-200">
                  78 Days Open
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-mono font-bold text-xs">
                    AC
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 leading-tight">Aetheria Cloud</h4>
                    <p className="text-[10px] text-zinc-500">Series B FinTech · 45 Engs</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-zinc-200 text-xs">
                  <span className="text-[10px] text-zinc-400 font-mono block">Unfilled Opening</span>
                  <span className="font-semibold text-zinc-800 text-[11px]">Staff Platform Engineer (EKS)</span>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    <span className="text-[9px] font-mono bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">Kubernetes</span>
                    <span className="text-[9px] font-mono bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">Terraform</span>
                    <span className="text-[9px] font-mono bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">ArgoCD</span>
                  </div>
                </div>

                <div className="p-2 rounded bg-amber-50/80 border border-amber-200/60 text-[10px] text-amber-900 leading-snug">
                  <span className="font-semibold">Hiring lag detected:</span> Role reposted 3x. EKS migration bottlenecked.
                </div>
              </div>
            </div>

            {/* Contact identified */}
            <div className="mt-3 pt-3 border-t border-zinc-200/60 flex items-center justify-between text-[10px]">
              <span className="text-zinc-500">Target Contact:</span>
              <span className="font-semibold text-zinc-800">Marcus V. (VP Engineering)</span>
            </div>
          </div>

          {/* Column 2: Isolated Outbound Dispatch (4 cols) */}
          <div className="lg:col-span-4 rounded-xl bg-white border border-zinc-200 p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-1">
                  <Send className="w-3 h-3 text-blue-600" /> Automated 1-to-1 Dispatch
                </span>
                <span className="text-[10px] font-mono text-zinc-400">Step 3 of 4</span>
              </div>

              {/* Email Mock */}
              <div className="space-y-2 text-xs">
                <div className="border-b border-zinc-100 pb-1 text-[11px]">
                  <span className="text-zinc-400 font-mono">To: </span>
                  <span className="font-medium text-zinc-700">marcus@aetheriacloud.com</span>
                </div>
                <div className="border-b border-zinc-100 pb-1 text-[11px]">
                  <span className="text-zinc-400 font-mono">Subject: </span>
                  <span className="font-medium text-zinc-800">Marcus / your open EKS role</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-50 text-[11px] text-zinc-700 font-sans leading-relaxed">
                  "Marcus — saw your EKS platform role open for 75+ days. We help Series B teams complete cluster migrations as an embedded strike team while recruiting finishes. Open to a 10-min briefing?"
                </div>
              </div>
            </div>

            {/* DNS Health Bar */}
            <div className="mt-3 pt-3 border-t border-zinc-100 grid grid-cols-3 gap-1 text-[9px] font-mono text-center">
              <span className="py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">SPF: PASS</span>
              <span className="py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">DKIM: PASS</span>
              <span className="py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">DMARC: 100%</span>
            </div>
          </div>

          {/* Column 3: Direct Inbox Lead Received (4 cols) */}
          <div className="lg:col-span-4 rounded-xl bg-emerald-900/5 border border-emerald-500/30 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold flex items-center gap-1">
                  <Inbox className="w-3 h-3 text-emerald-600" /> Client Inbox (You)
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Warm Reply
                </span>
              </div>

              {/* Lead Reply Card */}
              <div className="p-3 rounded-lg bg-white border border-emerald-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-zinc-900">Marcus Vance</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">14 mins ago</span>
                </div>
                <p className="text-xs text-zinc-700 leading-snug italic">
                  "Hey, thanks for reaching out. We've been bottlenecked on our EKS migration for 2 months. Can you jump on a 20-min call Thursday 2pm?"
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[10px] text-emerald-800 bg-emerald-100/60 p-2 rounded-lg border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero spam handling — lands directly in your primary calendar</span>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="mt-3 pt-3 border-t border-emerald-200/50 flex items-center justify-between text-[10px] text-zinc-500">
              <span>Delivery Time: <strong>Instant</strong></span>
              <span className="text-emerald-700 font-medium font-mono">Qualified Discovery Call</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
