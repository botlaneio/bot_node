import React, { useState, useEffect } from 'react';
import { REAL_SIGNALS, StalledSignal } from '../data/botlaneData';
import { Clock, Send, CheckCircle2, Radio, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SignalVisualizer: React.FC = () => {
  const [selectedSignalIndex, setSelectedSignalIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const activeSignal = REAL_SIGNALS[selectedSignalIndex];

  const handleSelectSignal = (idx: number) => {
    if (idx === selectedSignalIndex) return;
    setIsLoading(true);
    setSelectedSignalIndex(idx);
    setTimeout(() => {
      setIsLoading(false);
    }, 280);
  };

  return (
    <section id="signals" className="py-24 border-b border-[#EAEAEA] bg-[#FBFBFA] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-200/70 border border-zinc-300/60 text-zinc-700 text-xs font-mono font-medium mb-3">
              <Radio className="w-3.5 h-3.5 text-zinc-500 animate-pulse" strokeWidth={1.5} />
              <span>LIVE DETECTIONS · SIGNAL ANATOMY</span>
            </div>
            <h2 className="font-['Newsreader',serif] text-3xl sm:text-4xl font-normal text-zinc-950 flex items-center gap-2.5">
              <Radio className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 shrink-0 inline-block" strokeWidth={1.5} />
              <span>Real signals detected & acted on.</span>
            </h2>
            <p className="text-sm text-zinc-600 mt-2 max-w-xl">
              See how publicly dated hiring bottlenecks translate into high-converting, engineer-to-engineer conversations.
            </p>
          </div>

          {/* Signal Selector Pill Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-zinc-200/60 rounded-xl">
            {REAL_SIGNALS.map((sig, idx) => (
              <button
                key={sig.id}
                onClick={() => handleSelectSignal(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedSignalIndex === idx
                    ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {sig.company.split(' ')[0]} ({sig.stalledDays}d)
              </button>
            ))}
          </div>
        </motion.div>

        {/* Visual Workbench Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-xs overflow-hidden min-h-[460px] relative">
          <AnimatePresence mode="wait">
            {isLoading ? (
              /* Minimalist Skeleton Screen */
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="w-full animate-pulse select-none"
              >
                {/* Skeleton Header */}
                <div className="bg-zinc-900 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-32 bg-zinc-800 rounded" />
                        <div className="h-3 w-16 bg-zinc-800 rounded" />
                      </div>
                      <div className="h-3 w-48 bg-zinc-800/80 rounded" />
                    </div>
                  </div>
                  <div className="space-y-1.5 flex flex-col items-end">
                    <div className="h-2.5 w-24 bg-zinc-800 rounded" />
                    <div className="h-4 w-36 bg-zinc-800 rounded" />
                  </div>
                </div>

                {/* Skeleton Step Timeline */}
                <div className="p-5 sm:p-6 border-b border-zinc-100 bg-zinc-50/50">
                  <div className="h-3 w-44 bg-zinc-200 rounded mb-3" />
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="p-3 rounded-xl bg-white border border-zinc-200 space-y-2">
                        <div className="h-2.5 w-12 bg-zinc-200 rounded" />
                        <div className="h-3.5 w-24 bg-zinc-200 rounded" />
                        <div className="h-2.5 w-full bg-zinc-100 rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skeleton Email Preview & Reply */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-36 bg-zinc-200 rounded" />
                      <div className="h-2.5 w-28 bg-zinc-200 rounded" />
                    </div>
                    <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3">
                      <div className="space-y-1.5 border-b border-zinc-200 pb-2">
                        <div className="h-3 w-3/4 bg-zinc-200 rounded" />
                        <div className="h-3 w-1/2 bg-zinc-200 rounded" />
                      </div>
                      <div className="space-y-2 pt-1">
                        <div className="h-3 w-full bg-zinc-200 rounded" />
                        <div className="h-3 w-11/12 bg-zinc-200 rounded" />
                        <div className="h-3 w-4/5 bg-zinc-200 rounded" />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-28 bg-zinc-200 rounded" />
                      <div className="h-3 w-16 bg-zinc-200 rounded" />
                    </div>
                    <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3">
                      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-200" />
                        <div className="h-3 w-28 bg-zinc-200 rounded" />
                      </div>
                      <div className="space-y-2 pt-1">
                        <div className="h-3 w-full bg-zinc-200 rounded" />
                        <div className="h-3 w-5/6 bg-zinc-200 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Loaded Content with Smooth Fade-in */
              <motion.div
                key={activeSignal.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {/* Header Bar */}
                <div className="bg-zinc-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono font-bold text-sm">
                      {activeSignal.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-white">{activeSignal.company}</h3>
                        <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                          {activeSignal.funding}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">
                        Target: {activeSignal.contactName} · {activeSignal.contactRole}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 block">Stalled Duration</span>
                      <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1 justify-end">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> {activeSignal.stalledDays} days open ({activeSignal.repostCount} reposts)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Visual Timeline of Stalled Role */}
                <div className="p-5 sm:p-6 border-b border-zinc-100 bg-zinc-50/50">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-3">
                    Hiring Lag Timeline & Intervention Point:
                  </span>

                  {/* Visual Step Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative text-xs">
                    <div className="p-3 rounded-xl bg-white border border-zinc-200">
                      <span className="text-[10px] font-mono text-zinc-400 block">Day 01</span>
                      <span className="font-semibold text-zinc-800 block mt-0.5">Role Posted</span>
                      <span className="text-[11px] text-zinc-500 mt-1 block">Company posts opening on LinkedIn & job boards.</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-zinc-200">
                      <span className="text-[10px] font-mono text-zinc-400 block">Day 30</span>
                      <span className="font-semibold text-zinc-800 block mt-0.5">Recruiting Drag</span>
                      <span className="text-[11px] text-zinc-500 mt-1 block">Internal candidates fail screening. Pipeline slows.</span>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                      <span className="text-[10px] font-mono text-amber-700 font-bold block">Day 60 (Signal Fired)</span>
                      <span className="font-semibold text-amber-950 block mt-0.5">Roadmap Bottleneck</span>
                      <span className="text-[11px] text-amber-900 mt-1 block">VP Engineering feels pressure on roadmap deadlines.</span>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950">
                      <span className="text-[10px] font-mono text-emerald-700 font-bold block">Day {activeSignal.stalledDays} (Botlane)</span>
                      <span className="font-semibold text-emerald-950 block mt-0.5">Precision Outreach</span>
                      <span className="text-[11px] text-emerald-900 mt-1 block">Tailored email offers fractional unblocking. Call booked.</span>
                    </div>
                  </div>
                </div>

                {/* Email Preview & Reply Grid */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Outbound Email View (7 cols) */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-zinc-500 flex items-center gap-1.5">
                        <Send className="w-3.5 h-3.5 text-blue-600" /> Outbound Dispatch Preview
                      </span>
                      <span className="font-mono text-[11px] text-zinc-400">Isolated Secondary Domain</span>
                    </div>

                    <div className="p-4 sm:p-5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-800 font-sans space-y-3 shadow-2xs">
                      <div className="border-b border-zinc-200/70 pb-2 space-y-1 text-xs">
                        <div className="flex items-center justify-between text-zinc-500">
                          <span><strong>To:</strong> {activeSignal.contactName} &lt;{activeSignal.contactName.toLowerCase().replace(' ', '.')}@{activeSignal.company.toLowerCase().split(' ')[0]}.com&gt;</span>
                        </div>
                        <div className="text-zinc-700">
                          <strong>Subject:</strong> {activeSignal.sampleMessageSubject}
                        </div>
                      </div>

                      <div className="leading-relaxed whitespace-pre-line text-zinc-700 text-xs sm:text-sm">
                        {activeSignal.sampleMessageBody}
                      </div>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      <span className="text-[11px] font-mono text-zinc-400">Target Tech Stack:</span>
                      {activeSignal.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-mono text-[10px] border border-zinc-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Inbound Prospect Response (5 cols) */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-emerald-700 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Inbound Lead Reply
                      </span>
                      <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Qualified
                      </span>
                    </div>

                    <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">
                            {activeSignal.contactName.slice(0, 1)}
                          </div>
                          <div>
                            <span className="font-bold text-xs text-zinc-900 block">{activeSignal.contactName}</span>
                            <span className="text-[10px] text-zinc-500">{activeSignal.contactRole}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-700">Replied in 38 mins</span>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-800 font-sans italic leading-relaxed">
                        "{activeSignal.expectedReply}"
                      </p>

                      <div className="pt-2 border-t border-emerald-200/50 flex items-center justify-between text-[11px] text-emerald-800">
                        <span>Routing: <strong>Your Primary Inbox</strong></span>
                        <span className="font-mono font-medium">Calendar Scheduled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

