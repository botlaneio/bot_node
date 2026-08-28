import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Target, Radio, Check, Sparkles, X, Maximize2 } from 'lucide-react';

const featureDetails: Record<number, { title: string, icon: React.ReactNode, content: React.ReactNode }> = {
  1: {
    title: "Target Market Targeting",
    icon: <Target className="size-5 text-[#0d0d0d]" />,
    content: (
      <>
        <p>We don't just scrape generic LinkedIn lists. We build a deterministic map of your total addressable market based on exact technical stacks, series funding, and team size.</p>
        <p>By defining your Ideal Customer Profile (ICP) thoroughly, we ensure that every prospect that arrives in your inbox is a highly qualified target ready for your specialized DevOps and SRE consulting services.</p>
      </>
    )
  },
  2: {
    title: "Stalled Infrastructure Signals",
    icon: <Radio className="size-5 text-[#0d0d0d]" />,
    content: (
      <>
        <p>Our proprietary engine monitors ATS systems and public job boards across the web to detect when critical infrastructure roles go unfilled for 60+ days.</p>
        <p>A role that remains open for months indicates severe technical pain, project delays, and a high propensity to buy external consulting. We give you this exact angle so you can point to their public pain in the very first line of your outreach.</p>
      </>
    )
  },
  3: {
    title: "100% Client Data Ownership",
    icon: <Sparkles className="size-5 text-[#0d0d0d]" />,
    content: (
      <>
        <p>Whether you choose to hire us for the actual outbound campaign or not, the research is entirely yours. We believe in zero vendor lock-in.</p>
        <p>You will receive full CSV exports, live Airtable views, and complete, verified contact data for every target we identify. It's your market; we just help you see it clearly.</p>
      </>
    )
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const iconHoverVariants = {
  rest: { scale: 1, rotate: 0, color: '#9a9a96' },
  hover: { 
    scale: 1.15, 
    rotate: -10, 
    color: '#0d0d0d',
    transition: { type: "spring", stiffness: 400, damping: 15 } 
  }
};

const checkHoverVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.2, 
    rotate: 15, 
    transition: { type: "spring", stiffness: 400, damping: 15 } 
  }
};

export const MinimalFeatures: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"]
  });

  const card1Y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const calloutY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div id="features" className="scroll-mt-24 py-16 md:py-24 border-b border-[#e3e3e0]">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6">
          <span className="eyebrow inline-flex w-fit items-center gap-2 rounded-[var(--radius-control)] border px-3 py-1.5 border-[#e3e3e0] bg-white text-[#6b6b68]">
            <span className="size-1.5 rounded-full bg-[#0d0d0d]"></span>
            Features
          </span>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2 className="max-w-2xl text-3xl font-medium tracking-[-0.02em] text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.08] text-[#0d0d0d]">
              What arrives in your inbox
            </h2>
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
              A short, hyper-targeted list you can act on immediately.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div 
          ref={gridRef}
          className="mt-12 grid gap-4 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {/* Card 01 */}
          <motion.div variants={itemVariants} className="md:col-span-2 h-full">
            <motion.div style={{ y: card1Y, height: '100%' }}>
              <motion.article 
                initial="rest"
                whileHover="hover"
                className="h-full flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-[#e3e3e0] bg-white p-6 md:p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] hover:border-[#d2d2ce]"
              >
            <div>
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[#9a9a96]">01</span>
                <motion.div variants={iconHoverVariants} className="text-[#9a9a96]">
                  <Target className="size-5" />
                </motion.div>
              </div>
              <h3 className="mt-3 text-lg leading-snug font-medium tracking-[-0.01em] text-balance md:text-xl text-[#0d0d0d]">
                Tell me your target market
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6b6b68]">
                Cloud ecosystem (AWS, GCP, Azure), specific regions, company size, and the profile of the client you actually want.
              </p>
              <button 
                onClick={() => setExpandedCard(1)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#6b6b68] hover:text-[#0d0d0d] transition-colors"
              >
                <Maximize2 className="size-3.5" />
                Deep Dive
              </button>
            </div>

            {/* Visual Render Canvas */}
            <div
              role="img"
              aria-label="Target Market Scope Render"
              className="relative flex items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-[#e3e3e0] bg-[#ebebe8] mt-6 w-full h-44 p-4"
            >
              <svg aria-hidden="true" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
                <defs>
                  <pattern id="crosshair-grid" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="translate(16, 16)">
                    <path d="M 16 14 L 16 18 M 14 16 L 18 16" stroke="currentColor" className="text-[#0d0d0d]/[0.15]" strokeWidth="1" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#crosshair-grid)" />
                
                <g transform="translate(200, 100)" className="text-emerald-600">
                   <circle cx="0" cy="0" r="48" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 4" />
                   <circle cx="0" cy="0" r="88" fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
                   
                   {/* Scope Crosshairs */}
                   <path d="M -12 0 L 12 0 M 0 -12 L 0 12" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />
                   <path d="M -96 0 L -64 0 M 64 0 L 96 0 M 0 -96 L 0 -64 M 0 64 L 0 96" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" fill="none" />
                </g>
              </svg>
              <div className="relative z-10 flex items-center gap-2 flex-wrap justify-center">
                <span className="px-3 py-1.5 rounded-lg bg-white border border-[#e3e3e0] text-xs font-mono text-[#0d0d0d] shadow-xs">
                  AWS · Kubernetes
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-[#e3e3e0] text-xs font-mono text-[#0d0d0d] shadow-xs">
                  North America & EU
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-[#e3e3e0] text-xs font-mono text-[#0d0d0d] shadow-xs">
                  Series A → Series C
                </span>
              </div>
            </div>
          </motion.article>
          </motion.div>
        </motion.div>

          {/* Card 02 */}
          <motion.div variants={itemVariants} className="md:col-span-1 h-full">
            <motion.div style={{ y: card2Y, height: '100%' }}>
              <motion.article 
                initial="rest"
                whileHover="hover"
                className="h-full flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-[#e3e3e0] bg-white p-6 md:p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] hover:border-[#d2d2ce]"
              >
            <div>
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[#9a9a96]">02</span>
                <motion.div variants={iconHoverVariants} className="text-[#9a9a96]">
                  <Radio className="size-5" />
                </motion.div>
              </div>
              <h3 className="mt-3 text-lg leading-snug font-medium tracking-[-0.01em] text-balance md:text-xl text-[#0d0d0d]">
                Forty companies with stalled infrastructure hires
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6b6b68]">
                Each one carrying a public, dated hiring signal you can point at in the first line of an email.
              </p>
              <button 
                onClick={() => setExpandedCard(2)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#6b6b68] hover:text-[#0d0d0d] transition-colors"
              >
                <Maximize2 className="size-3.5" />
                Deep Dive
              </button>
            </div>

            {/* Visual Render Canvas */}
            <div
              role="img"
              aria-label="Signals Render"
              className="relative flex items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-[#e3e3e0] bg-[#ebebe8] mt-6 w-full h-44 p-4"
            >
              <div className="relative z-10 p-3.5 rounded-xl bg-white border border-[#e3e3e0] shadow-xs w-full max-w-[200px] text-left">
                <span className="eyebrow text-emerald-700 block">Verified Signal</span>
                <span className="text-xs font-bold text-[#0d0d0d] block mt-1">Stalled 60+ Days</span>
                <span className="text-[10px] text-[#6b6b68] block mt-0.5">3 public reposts detected</span>
              </div>
            </div>
          </motion.article>
          </motion.div>
        </motion.div>

          {/* Card 03 */}
          <motion.div variants={itemVariants} className="md:col-span-3 h-full">
            <motion.div style={{ y: card3Y, height: '100%' }}>
              <motion.article 
                initial="rest"
                whileHover="hover"
                className="h-full flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-[#e3e3e0] bg-white p-6 md:p-7 md:flex-row md:items-center md:gap-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] hover:border-[#d2d2ce]"
              >
            <div className="md:flex-1">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[#9a9a96]">03</span>
                <motion.div variants={iconHoverVariants} className="text-[#9a9a96]">
                  <Sparkles className="size-5" />
                </motion.div>
              </div>
              <h3 className="mt-3 text-lg leading-snug font-medium tracking-[-0.01em] text-balance md:text-xl text-[#0d0d0d]">
                You keep the research whether we work together or not
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6b6b68]">
                No lock-in on the market research. The curated target list and decision-maker contact details are yours either way.
              </p>
              <button 
                onClick={() => setExpandedCard(3)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#6b6b68] hover:text-[#0d0d0d] transition-colors"
              >
                <Maximize2 className="size-3.5" />
                Deep Dive
              </button>
            </div>

            {/* Visual Render Canvas */}
            <div
              role="img"
              aria-label="No Lock-in Render"
              className="relative flex items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-[#e3e3e0] bg-[#ebebe8] mt-6 w-full md:mt-0 md:h-36 md:max-w-sm p-4"
            >
              <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#e3e3e0] shadow-xs text-xs font-mono text-[#0d0d0d]">
                <motion.div variants={checkHoverVariants}>
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                </motion.div>
                <span>100% Client Ownership of Data</span>
              </div>
            </div>
          </motion.article>
          </motion.div>
        </motion.div>
        </motion.div>

        {/* Dark Callout Banner */}
        <motion.div style={{ y: calloutY }} className="mt-4 grid items-center gap-8 overflow-hidden rounded-[var(--radius-panel)] bg-[#0a0a0a] p-8 md:grid-cols-[1.3fr_1fr] md:p-12 text-white">
          <div>
            <h3 className="max-w-xl text-2xl leading-[1.15] font-medium tracking-[-0.02em] text-balance text-[#fafafa] md:text-[2rem]">
              Most outbound guesses. This doesn't.
            </h3>
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-[#a3a3a0]">
              When a platform, SRE, or infrastructure role stays open for 60 days, the usual recruiting fixes haven't worked. That's where you step in.
            </p>
          </div>

          <div
            role="img"
            aria-label="Signal render canvas"
            className="relative flex items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-[#262626] bg-[#171717] h-44 w-full md:h-52 p-4"
          >
            <svg aria-hidden="true" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
              <defs>
                <pattern id="signal-grid" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="translate(16, 16)">
                  <circle cx="16" cy="16" r="1.5" stroke="currentColor" className="text-white/[0.05]" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#signal-grid)" />
              
              <g transform="translate(200, 100)" className="text-emerald-400">
                 {/* Ripple effect rings */}
                 <circle cx="0" cy="0" r="32" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                 <circle cx="0" cy="0" r="64" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />
                 <circle cx="0" cy="0" r="96" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
                 
                 {/* Data points on rings */}
                 <circle cx="22.6" cy="22.6" r="3" fill="currentColor" />
                 <circle cx="-55.4" cy="32" r="2.5" fill="currentColor" fillOpacity="0.6" />
                 <circle cx="40" cy="-87" r="2" fill="currentColor" fillOpacity="0.4" />
              </g>
            </svg>
            <span className="eyebrow relative z-10 px-4 text-center text-[#a3a3a0]">
              Dated Public Hiring Signals
            </span>
          </div>
        </motion.div>

        {/* Marquee Ticker */}
        <div className="mt-6 overflow-hidden rounded-[var(--radius-panel)] bg-[#0a0a0a] py-4">
          <div className="flex w-max animate-marquee items-center gap-10 pr-10">
            <span className="flex items-center gap-10 text-sm whitespace-nowrap text-[#a3a3a0]">
              Stalled roles, not scraped lists
              <span className="size-1 shrink-0 rounded-full bg-[#a3a3a0]/50"></span>
            </span>
            <span className="flex items-center gap-10 text-sm whitespace-nowrap text-[#a3a3a0]">
              Public, dated hiring signals
              <span className="size-1 shrink-0 rounded-full bg-[#a3a3a0]/50"></span>
            </span>
            <span className="flex items-center gap-10 text-sm whitespace-nowrap text-[#a3a3a0]">
              Separate authenticated sending domain
              <span className="size-1 shrink-0 rounded-full bg-[#a3a3a0]/50"></span>
            </span>
            <span className="flex items-center gap-10 text-sm whitespace-nowrap text-[#a3a3a0]">
              Replies routed straight to you
              <span className="size-1 shrink-0 rounded-full bg-[#a3a3a0]/50"></span>
            </span>
            <span className="flex items-center gap-10 text-sm whitespace-nowrap text-[#a3a3a0]">
              One operator, not an agency
              <span className="size-1 shrink-0 rounded-full bg-[#a3a3a0]/50"></span>
            </span>

            {/* Repeat for smooth infinite marquee */}
            <span className="flex items-center gap-10 text-sm whitespace-nowrap text-[#a3a3a0]">
              Stalled roles, not scraped lists
              <span className="size-1 shrink-0 rounded-full bg-[#a3a3a0]/50"></span>
            </span>
            <span className="flex items-center gap-10 text-sm whitespace-nowrap text-[#a3a3a0]">
              Public, dated hiring signals
              <span className="size-1 shrink-0 rounded-full bg-[#a3a3a0]/50"></span>
            </span>
            <span className="flex items-center gap-10 text-sm whitespace-nowrap text-[#a3a3a0]">
              Separate authenticated sending domain
              <span className="size-1 shrink-0 rounded-full bg-[#a3a3a0]/50"></span>
            </span>
            <span className="flex items-center gap-10 text-sm whitespace-nowrap text-[#a3a3a0]">
              Replies routed straight to you
              <span className="size-1 shrink-0 rounded-full bg-[#a3a3a0]/50"></span>
            </span>
            <span className="flex items-center gap-10 text-sm whitespace-nowrap text-[#a3a3a0]">
              One operator, not an agency
              <span className="size-1 shrink-0 rounded-full bg-[#a3a3a0]/50"></span>
            </span>
          </div>
        </div>
      </div>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {expandedCard !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setExpandedCard(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl overflow-hidden rounded-[var(--radius-panel)] bg-white p-6 md:p-8 shadow-2xl z-10"
            >
              <button
                onClick={() => setExpandedCard(null)}
                className="absolute right-6 top-6 text-[#9a9a96] hover:text-[#0d0d0d] transition-colors"
              >
                <X className="size-5" />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4f4f2] border border-[#e3e3e0]">
                  {featureDetails[expandedCard].icon}
                </div>
                <h3 className="text-xl md:text-2xl font-medium tracking-[-0.01em] text-[#0d0d0d]">
                  {featureDetails[expandedCard].title}
                </h3>
              </div>
              <div className="space-y-4 text-[0.9375rem] md:text-base leading-relaxed text-[#6b6b68]">
                {featureDetails[expandedCard].content}
              </div>
              <div className="mt-8 pt-6 border-t border-[#e3e3e0] flex justify-end">
                <button
                  onClick={() => setExpandedCard(null)}
                  className="inline-flex items-center justify-center rounded-[var(--radius-control)] bg-[#0d0d0d] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#242424] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
