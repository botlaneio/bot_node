import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, CheckCircle2, ArrowRight, Calculator } from 'lucide-react';
import { motion } from 'motion/react';

export const EconomicsVisualizer: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [dealSize, setDealSize] = useState<number>(35000);
  const [quarterlyWins, setQuarterlyWins] = useState<number>(2);

  const botlaneCostQuarter = 4999 + 2499 * 3; // $12,496
  const sdrCostQuarter = (10000 + 1000) * 3; // $33,000
  const grossConsultingRevenue = dealSize * quarterlyWins;
  const netReturnBotlane = grossConsultingRevenue - botlaneCostQuarter;

  return (
    <section className="py-24 border-b border-[#EAEAEA] bg-[#FBFBFA] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-left sm:text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-200/70 border border-zinc-300/60 text-zinc-700 text-xs font-mono font-medium mb-3">
            <Calculator className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
            <span>ROI MODEL · UNIT ECONOMICS</span>
          </div>
          <h2 className="font-['Newsreader',serif] text-3xl sm:text-4xl font-normal text-zinc-950 flex items-center justify-start sm:justify-center gap-2.5">
            <Calculator className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 shrink-0 inline-block" strokeWidth={1.5} />
            <span>The math behind fractional outbound.</span>
          </h2>
          <p className="text-sm text-zinc-600 mt-2">
            In technical consulting, closing just one engagement pays for an entire year of Botlane infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Calculator Controls (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7 space-y-6 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-zinc-800">
                  Average Consulting Project Value
                </label>
                <span className="text-sm font-bold font-mono text-zinc-950">
                  ${dealSize.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="15000"
                max="100000"
                step="5000"
                value={dealSize}
                onChange={(e) => setDealSize(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-950"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                <span>$15,000 (Advisory)</span>
                <span>$100,000+ (Full Migration)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-zinc-800">
                  Closed Deals per Quarter
                </label>
                <span className="text-sm font-bold font-mono text-zinc-950">
                  {quarterlyWins} {quarterlyWins === 1 ? 'client' : 'clients'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={quarterlyWins}
                onChange={(e) => setQuarterlyWins(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-950"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                <span>1 deal</span>
                <span>6 deals</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 space-y-1">
              <span className="font-semibold text-zinc-900 block">Baseline Assumptions:</span>
              <p className="text-[11px] leading-relaxed">
                Based on typical DevOps engagements (multi-month Kubernetes migrations, cloud audits, or SRE augmentations).
              </p>
            </div>
          </div>

          {/* Visual Economics Comparison (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: In-House SDR Cost */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-2">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                  In-House SDR (Per Quarter)
                </span>
                <div className="text-2xl font-mono font-bold text-zinc-400">
                  ${sdrCostQuarter.toLocaleString()}
                </div>
                <p className="text-[11px] text-zinc-500 leading-snug">
                  Salary + benefits + $1k/mo Apollo/ZoomInfo software licenses + onboarding delay.
                </p>
              </div>

              {/* Card 2: Botlane Infrastructure */}
              <div className="p-5 rounded-2xl bg-zinc-950 text-white border border-zinc-900 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                    Botlane Machine (Per Quarter)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-zinc-800 px-2 py-0.5 rounded">
                    Saves ${(sdrCostQuarter - botlaneCostQuarter).toLocaleString()}
                  </span>
                </div>
                <div className="text-2xl font-mono font-bold text-emerald-400">
                  ${botlaneCostQuarter.toLocaleString()}
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Setup + 3 months operating fee. All domains, scraping, copy, & routing included.
                </p>
              </div>
            </div>

            {/* Generated Consulting Revenue Result Bar */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-emerald-800 uppercase tracking-wider font-semibold block">
                  Projected Quarter Value
                </span>
                <div className="text-3xl font-['Newsreader',serif] font-normal text-emerald-950 mt-1">
                  ${grossConsultingRevenue.toLocaleString()}{' '}
                  <span className="text-xs font-sans text-emerald-700 font-medium">gross consulting pipeline</span>
                </div>
                <span className="text-xs text-emerald-800 font-mono mt-1 block">
                  Net return after Botlane: <strong>${netReturnBotlane.toLocaleString()}</strong> ({Math.round((grossConsultingRevenue / botlaneCostQuarter) * 100) / 100}x ROI)
                </span>
              </div>

              <button
                onClick={onOpenBooking}
                className="px-5 py-3 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-all shrink-0 flex items-center gap-1.5"
              >
                Check open slot
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
