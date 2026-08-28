import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Clock, Target, Activity, Search, Building2, BarChart3, Filter, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { REAL_SIGNALS, StalledSignal } from '../data/botlaneData';

interface MinimalHeroProps {
  onOpenBooking: () => void;
}

const ROTATING_PHRASES = [
  "automated sourcing",
  "stalled role discovery",
  "instant pipeline growth"
];

const MagneticWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.25);
    y.set(middleY * 0.25);
  };

  const reset = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const MinimalHero: React.FC<MinimalHeroProps> = ({ onOpenBooking }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const uiY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative pt-24 pb-16 md:pt-32 md:pb-32 border-b border-[#e3e3e0] overflow-hidden">
      {/* Subtle Background Elements */}
      <motion.div style={{ y: backgroundY, willChange: "transform" }} className="absolute inset-0 pointer-events-none z-0 flex justify-center overflow-hidden">
        <div className="w-full max-w-[1400px] h-full relative">
          {/* Faded radial gradient for depth */}
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/5 blur-[120px]" />
          {/* Clean grid lines */}
          <div className="absolute top-0 bottom-0 left-[20%] w-px bg-gradient-to-b from-transparent via-[#e3e3e0]/60 to-transparent" />
          <div className="absolute top-0 bottom-0 left-[80%] w-px bg-gradient-to-b from-transparent via-[#e3e3e0]/60 to-transparent" />
        </div>
      </motion.div>

      <motion.div style={{ y: textY, willChange: "transform" }} className="max-w-[1000px] mx-auto px-5 md:px-8 relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e3e3e0] bg-white/80 backdrop-blur-md px-3 py-1.5 text-[#6b6b68] shadow-sm text-xs font-semibold uppercase tracking-[0.1em]">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            For DevOps & Cloud Consultancies
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="mt-8 text-4xl font-bold tracking-tighter text-balance sm:text-6xl lg:text-[4.5rem] leading-[1.05] text-[#0d0d0d]">
            Find DevOps contracts faster with <br className="hidden lg:block"/>
            <span className="text-emerald-600 relative inline-block text-center whitespace-nowrap">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phraseIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute left-0 top-0 w-full text-center"
                >
                  {ROTATING_PHRASES[phraseIndex]}.
                </motion.span>
              </AnimatePresence>
              {/* Invisible placeholder to maintain width/height */}
              <span className="opacity-0 pointer-events-none">instant pipeline growth.</span>
            </span>
          </h1>
        </motion.div>

        {/* Live Data Badges */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15, scale: 0.8 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 20 } }
            }}
            className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/50 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur-sm"
          >
            <Activity className="size-3.5 text-emerald-600" />
            Public, dated hiring signals
          </motion.div>
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15, scale: 0.8 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 20 } }
            }}
            className="flex items-center gap-2 rounded-full border border-[#e3e3e0] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#0d0d0d] shadow-sm backdrop-blur-sm"
          >
            <BarChart3 className="size-3.5 text-[#6b6b68]" />
            Weekly reporting
          </motion.div>
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15, scale: 0.8 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 20 } }
            }}
            className="flex items-center gap-2 rounded-full border border-[#e3e3e0] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#0d0d0d] shadow-sm backdrop-blur-sm"
          >
            <Target className="size-3.5 text-[#6b6b68]" />
            Roles open 60+ days
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mt-6 max-w-2xl mx-auto text-base leading-[1.7] tracking-[0.015em] text-[#6b6b68] md:text-[1.25rem]">
            I track stalled infrastructure roles (open 60+ days) and send you the firms where your engineering services have a credible reason to be the obvious answer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full sm:w-auto mt-10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            <MagneticWrapper className="w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium whitespace-nowrap transition-all duration-200 ease-out bg-[#0a0a0a] text-[#fafafa] hover:bg-[#242424] active:scale-[0.98] shadow-lg shadow-black/10 h-13 px-8 text-[0.9375rem]"
                style={{ height: '3.25rem' }}
              >
                Send me 40 companies
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticWrapper>
            <MagneticWrapper className="w-full sm:w-auto">
              <a
                href="#how-it-works"
                className="w-full inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium whitespace-nowrap transition-all duration-200 ease-out bg-white text-[#0d0d0d] border border-[#d2d2ce] hover:border-[#9a9a96] hover:bg-[#fafafa] active:scale-[0.98] px-8 text-[0.9375rem]"
                style={{ height: '3.25rem' }}
              >
                See how it works
              </a>
            </MagneticWrapper>
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Visual / Product UI Preview */}
      <motion.div style={{ y: uiY, willChange: "transform" }} className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10 mt-16 md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rounded-2xl md:rounded-[2rem] border border-[#e3e3e0]/60 bg-white/40 p-2 md:p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] backdrop-blur-xl group hover:border-emerald-500/30 hover:shadow-[0_30px_80px_-15px_rgba(16,185,129,0.15)] transition-all duration-700 ease-out">
            <div className="flex flex-col overflow-hidden rounded-xl md:rounded-[1.5rem] border border-[#e3e3e0] bg-white shadow-sm transition-all duration-700 group-hover:shadow-md">
              
              {/* Fake Browser/App Header */}
              <div className="flex items-center justify-between border-b px-4 py-3 md:px-6 md:py-4 border-[#e3e3e0] bg-gradient-to-b from-[#fafafa] to-[#ffffff]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5 group/window cursor-default">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#e3e3e0] group-hover/window:bg-[#ff5f56] transition-colors duration-300" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#e3e3e0] group-hover/window:bg-[#ffbd2e] transition-colors duration-300 delay-75" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#e3e3e0] group-hover/window:bg-[#27c93f] transition-colors duration-300 delay-150" />
                  </div>
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border border-[#e3e3e0] rounded-md shadow-sm hover:border-[#d2d2ce] hover:shadow hover:bg-[#fafafa] transition-all cursor-text group/search">
                    <Search className="w-3.5 h-3.5 text-[#9a9a96] group-hover/search:text-emerald-500 transition-colors" />
                    <span className="text-xs text-[#9a9a96] font-mono group-hover/search:text-[#6b6b68] transition-colors">Query: "Stalled DevOps" &gt; 60 days</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="hidden sm:flex items-center gap-2">
                     <span className="text-xs font-semibold text-[#0d0d0d] bg-[#f2f2f0] px-2 py-1 rounded border border-[#e3e3e0]">40 Matches</span>
                   </div>
                   <button className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6b6b68] hover:text-[#0d0d0d] transition-colors">
                     <Filter className="w-3.5 h-3.5" />
                     Filter
                   </button>
                </div>
              </div>

              {/* Table Data (Refined for Hero Image) */}
              <div className="overflow-x-hidden w-full bg-white">
                <div className="w-full">
                  <div className="hidden md:grid grid-cols-[1.5fr_1.5fr_1fr_1fr] gap-4 border-b px-5 py-3 lg:px-6 border-[#e3e3e0] bg-white">
                    <span className="eyebrow truncate text-[#9a9a96]">Target Company</span>
                    <span className="eyebrow truncate text-[#9a9a96]">Open Requisition</span>
                    <span className="eyebrow truncate text-[#9a9a96]">Time on Market</span>
                    <span className="eyebrow truncate text-[#9a9a96]">Decision Maker</span>
                  </div>
                  <div className="md:hidden border-b px-5 py-3 border-[#e3e3e0] bg-white flex justify-between items-center">
                    <span className="eyebrow truncate text-[#9a9a96]">Latest Opportunities</span>
                    <span className="eyebrow truncate text-[#9a9a96]">Status</span>
                  </div>

                  <div className="divide-y divide-[#e3e3e0] text-sm lg:text-[15px]">
                    {REAL_SIGNALS.map((sig, i) => (
                      <div
                        key={sig.id}
                        className={`flex flex-col md:grid md:grid-cols-[1.5fr_1.5fr_1fr_1fr] gap-2 md:gap-4 items-start md:items-center px-5 py-4 lg:px-6 lg:py-4 transition-colors hover:bg-[#f8f9f8] ${i === 0 ? 'bg-[#f0f9f4]/30' : ''}`}
                      >
                        <div className="flex items-center justify-between w-full md:w-auto gap-3">
                          <div className="flex items-center gap-3 truncate">
                            <div className="w-8 h-8 rounded border border-[#e3e3e0] flex items-center justify-center bg-[#fafafa] shrink-0">
                              <Building2 className="w-4 h-4 text-[#9a9a96]" />
                            </div>
                            <span className="font-semibold tracking-tight text-[#0d0d0d]">{sig.company}</span>
                          </div>
                          
                          <div className="md:hidden shrink-0">
                            <span className={`inline-flex items-center gap-1.5 font-mono font-medium px-2 py-0.5 rounded border text-[10px] uppercase tracking-wider
                              ${i === 0 ? 'text-emerald-700 bg-emerald-50 border-emerald-200/60' : 'text-amber-700 bg-amber-50 border-amber-200/60'}`}>
                              {i === 0 ? (
                                <>
                                  <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                  </span>
                                  Match
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3" />
                                  {sig.stalledDays}d
                                </>
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="truncate text-[#6b6b68] font-medium pl-11 md:pl-0 w-full">
                          {sig.role}
                        </div>

                        <div className="hidden md:block">
                          <span className={`inline-flex items-center gap-1.5 font-mono font-medium px-2.5 py-1 rounded border text-[11px] uppercase tracking-wider
                            ${i === 0 ? 'text-emerald-700 bg-emerald-50 border-emerald-200/60' : 'text-amber-700 bg-amber-50 border-amber-200/60'}`}>
                            {i === 0 ? (
                              <>
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                Match Detected
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3" />
                                {sig.stalledDays} days stalled
                              </>
                            )}
                          </span>
                        </div>

                        <div className="hidden md:block truncate font-medium text-[#0d0d0d]">
                          {sig.contactName}
                          <span className="text-[#9a9a96] ml-1.5 font-normal text-xs">{sig.contactRole}</span>
                        </div>
                        
                        <div className="md:hidden flex items-center pl-11 text-xs text-[#9a9a96] mt-1 w-full truncate">
                          <span className="font-medium text-[#0d0d0d] mr-1">{sig.contactName}</span> • {sig.contactRole}
                        </div>
                      </div>
                    ))}
                    
                    {/* Extra synthetic rows for visual density */}
                    {[
                      { c: 'Fintech Core (Series C)', r: 'Principal Site Reliability Engineer', d: 84, n: 'Sarah L.', role: 'VP Eng' },
                      { c: 'Autonomous AI Lab', r: 'Head of Cloud Architecture', d: 61, n: 'Alex V.', role: 'CTO' },
                    ].map((sig, i) => (
                      <div key={i} className="flex flex-col md:grid md:grid-cols-[1.5fr_1.5fr_1fr_1fr] gap-2 md:gap-4 items-start md:items-center px-5 py-4 lg:px-6 lg:py-4 transition-colors hover:bg-[#f8f9f8] opacity-60">
                        <div className="flex items-center justify-between w-full md:w-auto gap-3">
                          <div className="flex items-center gap-3 truncate">
                            <div className="w-8 h-8 rounded border border-[#e3e3e0] flex items-center justify-center bg-[#fafafa] shrink-0">
                              <Building2 className="w-4 h-4 text-[#9a9a96]" />
                            </div>
                            <span className="font-semibold tracking-tight text-[#0d0d0d]">{sig.c}</span>
                          </div>
                          
                          <div className="md:hidden shrink-0">
                            <span className="inline-flex items-center gap-1.5 font-mono font-medium px-2 py-0.5 rounded border text-[10px] uppercase tracking-wider text-amber-700 bg-amber-50 border-amber-200/60">
                               <Clock className="w-3 h-3" /> {sig.d}d
                            </span>
                          </div>
                        </div>

                        <div className="truncate text-[#6b6b68] font-medium pl-11 md:pl-0 w-full">{sig.r}</div>

                        <div className="hidden md:block">
                          <span className="inline-flex items-center gap-1.5 font-mono font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200/60 text-[11px] uppercase tracking-wider">
                            <Clock className="w-3 h-3" /> {sig.d} days stalled
                          </span>
                        </div>

                        <div className="hidden md:block truncate font-medium text-[#0d0d0d]">
                          {sig.n} <span className="text-[#9a9a96] ml-1.5 font-normal text-xs">{sig.role}</span>
                        </div>
                        
                        <div className="md:hidden flex items-center pl-11 text-xs text-[#9a9a96] mt-1 w-full truncate">
                          <span className="font-medium text-[#0d0d0d] mr-1">{sig.n}</span> • {sig.role}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Table Footer */}
              <div className="bg-[#fafafa] border-t border-[#e3e3e0] px-4 md:px-5 py-3 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-0 text-[11px] sm:text-xs font-mono text-[#9a9a96]">
                <span>Showing 1-5 of 40 verified leads</span>
                <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Database synced 2 mins ago</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#9a9a96]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e3e3e0] bg-white shadow-sm hover:border-[#d2d2ce] hover:text-[#6b6b68] transition-colors cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
            <ChevronDown className="h-4 w-4" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
