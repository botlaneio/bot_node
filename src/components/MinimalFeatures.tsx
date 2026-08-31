import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { THRESHOLD_DAYS } from '../data/botlaneData';
import { InventoryFigure } from './MicroFigures';

/**
 * What arrives in your inbox — three deliverables, drawn as an inventory on
 * the sheet. The indices are an index into a list, which is what a parts list
 * uses them for; they are not claiming a sequence.
 *
 * `wide` marks the row that spans the full block and so lays its reading out
 * beside the copy rather than beneath it.
 */
const ITEMS = [
  {
    n: '01',
    figure: 'scope' as const,
    span: 'md:col-span-2',
    title: 'Tell me your target market',
    body: 'Cloud ecosystem (AWS, GCP, Azure), specific regions, company size, and the profile of the client you actually want.',
    label: 'Target scope',
    values: ['AWS · Kubernetes', 'North America & EU', 'Series A → Series C'],
  },
  {
    n: '02',
    figure: 'signals' as const,
    span: 'md:col-span-1',
    title: 'Forty companies with stalled infrastructure hires',
    body: 'Each one carrying a public, dated hiring signal you can point at in the first line of an email.',
    label: 'Verified signal',
    values: [`Stalled ${THRESHOLD_DAYS}+ days`, '3 public reposts detected'],
  },
  {
    n: '03',
    figure: 'ownership' as const,
    span: 'md:col-span-3',
    wide: true,
    title: 'You keep the research whether we work together or not',
    body: 'No lock-in on the market research. The curated target list and decision-maker contact details are yours either way.',
    label: 'Data ownership',
    values: ['100% client ownership'],
  },
];

/** Claims that used to scroll past on a marquee. Stated once, in place. */
const CLAIMS = [
  'Stalled roles, not scraped lists',
  'Public, dated hiring signals',
  'Separate authenticated sending domain',
  'Replies routed straight to you',
  'One operator, not an agency',
];

const DETAIL: Record<string, { title: string; body: string[] }> = {
  '01': {
    title: 'Target market targeting',
    body: [
      "We don't just scrape generic LinkedIn lists. We build a deterministic map of your total addressable market based on exact technical stacks, series funding, and team size.",
      'By defining your Ideal Customer Profile thoroughly, we ensure that every prospect that arrives in your inbox is a highly qualified target ready for your specialized DevOps and SRE consulting services.',
    ],
  },
  '02': {
    title: 'Stalled infrastructure signals',
    body: [
      `Our proprietary engine monitors ATS systems and public job boards across the web to detect when critical infrastructure roles go unfilled for ${THRESHOLD_DAYS}+ days.`,
      'A role that remains open for months indicates severe technical pain, project delays, and a high propensity to buy external consulting. We give you this exact angle so you can point to their public pain in the very first line of your outreach.',
    ],
  },
  '03': {
    title: '100% client data ownership',
    body: [
      'Whether you choose to hire us for the actual outbound campaign or not, the research is entirely yours. We believe in zero vendor lock-in.',
      "You will receive full CSV exports, live Airtable views, and complete, verified contact data for every target we identify. It's your market; we just help you see it clearly.",
    ],
  },
};

const Reading: React.FC<{ label: string; values: string[] }> = ({ label, values }) => (
  <div className="border border-[var(--sheet-rule)] bg-[var(--sheet-open)] px-3 py-2.5">
    <p className="bl-mono m-0 text-[0.5625rem] uppercase leading-[1.5] tracking-[0.16em] text-[#9a9a96]">
      {label}
    </p>
    {values.map((v) => (
      <p key={v} className="bl-mono m-0 mt-1.5 text-xs leading-[1.5] text-[var(--sheet-ink)]">
        {v}
      </p>
    ))}
  </div>
);

export const MinimalFeatures: React.FC = () => {
  const [open, setOpen] = useState<string | null>(null);
  const reduced = useReducedMotion() ?? false;

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
  };

  // No animation props under reduced motion, so each cell renders in place
  // rather than depending on an animation to become visible.
  const cell = reduced
    ? {}
    : {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <section id="features" className="bl-display relative scroll-mt-24 bg-[var(--sheet-page)]">
      <div className="bl-sheet relative mx-auto max-w-[1240px] bg-[var(--sheet-column)]">
        <div className="relative px-6 py-14 md:px-12 md:py-16">
          <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
          <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

          {/* ---------------- section header ---------------- */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <div>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                Features
              </span>
              <h2 className="mt-4 max-w-[18ch] text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-balance text-[var(--sheet-ink)] sm:text-4xl md:text-[2.75rem]">
                What arrives{' '}
                <span className="text-[var(--sheet-grey)]">in your inbox.</span>
              </h2>
            </div>
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
              A short, hyper-targeted list you can act on immediately.
            </p>
          </div>

          {/* ---------------- the inventory ---------------- */}
          <div className="relative mt-10 border border-[var(--sheet-rule)] bg-white">
            <span className="bl-x" style={{ left: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--sheet-rule)] px-4 py-3 md:px-7">
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                Fig. 02 — deliverables
              </span>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                Three items
              </span>
            </div>

            {/*
              The original bento proportions are kept — 2 / 1 / 3 — because the
              asymmetry gives the block rhythm. Only the card treatment is gone.
              -mb-px -mr-px under overflow-hidden turns per-cell borders into
              shared hairlines without doubling against the box's own border.
            */}
            <motion.div
              className="grid overflow-hidden md:grid-cols-3 -mb-px -mr-px"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {ITEMS.map((item) => (
                <motion.article
                  key={item.n}
                  variants={cell}
                  className={`${item.span} border-b border-r border-[var(--sheet-rule)] px-4 py-6 transition-colors duration-200 hover:bg-[#fcfcfb] md:px-7 md:py-8`}
                >
                  <div className={item.wide ? 'md:flex md:items-center md:gap-12' : ''}>
                    <div className={item.wide ? 'md:flex-1' : ''}>
                      <span className="bl-mono text-[0.625rem] tabular-nums tracking-[0.16em] text-[#9a9a96]">
                        {item.n}
                      </span>
                      <h3 className="mt-3 text-lg font-bold leading-snug tracking-[-0.025em] text-balance text-[var(--sheet-ink)] md:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
                        {item.body}
                      </p>
                      <button
                        type="button"
                        onClick={() => setOpen(item.n)}
                        className="bl-mono mt-4 inline-flex items-center gap-1.5 text-[0.625rem] uppercase tracking-[0.14em] text-[#6b6b68] underline decoration-[var(--sheet-rule)] underline-offset-4 transition-colors hover:text-[var(--sheet-ink)] hover:decoration-[var(--sheet-ink)]"
                      >
                        Read the detail →
                      </button>
                    </div>

                    <div className={item.wide ? 'mt-6 md:mt-0 md:w-[18rem]' : 'mt-6'}>
                      {/* Every deliverable gets its own drawing, so the figures
                          are spread through the sheet rather than pooled in one
                          rotating panel. */}
                      <div className="border border-[var(--sheet-rule)] bg-[#fcfcfb] px-3 py-3">
                        <InventoryFigure kind={item.figure} />
                      </div>
                      <div className="mt-2">
                        <Reading label={item.label} values={item.values} />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>

          {/*
            The one black block in the section. Black is the sheet's emphasis —
            the same weight the day matrix uses for a breached threshold — so it
            is spent here, on the single claim the section is built around.
          */}
          <div className="relative mt-4 bg-[var(--sheet-ink)] px-6 py-9 md:px-10 md:py-12">
            <span className="bl-x" style={{ left: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

            <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-12">
              <div>
                <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#8a8a86]">
                  Note
                </span>
                <h3 className="mt-4 max-w-xl text-2xl font-bold leading-[1.1] tracking-[-0.035em] text-balance text-[#fafafa] md:text-[2rem]">
                  Most outbound guesses. This doesn&rsquo;t.
                </h3>
              </div>
              <p className="max-w-lg text-[0.9375rem] leading-relaxed text-[#a3a3a0]">
                When a platform, SRE, or infrastructure role stays open for {THRESHOLD_DAYS} days,
                the usual recruiting fixes haven&rsquo;t worked. That&rsquo;s where you step in.
              </p>
            </div>
          </div>

          {/* Claims, stated once rather than scrolled past. */}
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border border-[var(--sheet-rule)] bg-white px-4 py-3.5 md:px-7">
            {CLAIMS.map((c) => (
              <li
                key={c}
                className="bl-mono flex items-center gap-2.5 text-[0.625rem] uppercase tracking-[0.12em] text-[#6b6b68]"
              >
                <span className="size-1 shrink-0 bg-[var(--sheet-mark)]" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------------- detail panel ---------------- */}
      <AnimatePresence>
        {open !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={DETAIL[open].title}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/25"
              onClick={() => setOpen(null)}
            />
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: 8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-xl border border-[var(--sheet-rule)] bg-white"
            >
              <div className="flex items-center justify-between gap-4 border-b border-[var(--sheet-rule)] px-5 py-3 md:px-7">
                <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                  Detail — item {open}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label="Close"
                  className="text-[#9a9a96] transition-colors hover:text-[var(--sheet-ink)]"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="px-5 py-6 md:px-7 md:py-7">
                <h3 className="text-xl font-bold tracking-[-0.03em] text-[var(--sheet-ink)] md:text-2xl">
                  {DETAIL[open].title}
                </h3>
                <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-[#6b6b68]">
                  {DETAIL[open].body.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="flex justify-end border-t border-[var(--sheet-rule)] px-5 py-3.5 md:px-7">
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-[var(--sheet-ink)] px-4 text-[0.8125rem] font-semibold text-[#fafafa] transition-colors hover:bg-[#2c2c2c]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
