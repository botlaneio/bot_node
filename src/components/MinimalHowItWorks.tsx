import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { THRESHOLD_DAYS } from '../data/botlaneData';
import { StepFigure } from './StepFigures';

/**
 * Four steps, in order. Unlike the specification schedule, these genuinely are
 * a sequence, so the numbers carry information rather than decorating the rows.
 *
 * Each step's label and value are the drafting equivalent of the old
 * illustration panel: a labelled reading, stated rather than dressed up.
 */
const STEPS = [
  {
    n: '01',
    title: 'We agree the target',
    body: 'Cloud ecosystems, target regions, company size, minimum deal values, and your strict exclusion list.',
    label: 'Target criteria',
    value: 'DevOps · AWS / K8s · Series A–C',
  },
  {
    n: '02',
    title: 'I build the sending infrastructure',
    body: 'A separate authenticated domain is registered, warmed for 3 weeks, and kept completely isolated from your primary corporate domain.',
    label: 'SPF · DKIM · DMARC',
    value: 'Separate secondary MX, warmed',
  },
  {
    n: '03',
    title: 'The system runs weekly',
    body: `Newly stalled infrastructure roles (${THRESHOLD_DAYS}+ days) are identified, verified, and the VP of Engineering or CTO is contacted with context.`,
    label: 'Weekly radar',
    value: '40 stalled roles scraped',
  },
  {
    n: '04',
    title: 'Replies come to you',
    body: 'Interested engineering leaders and positive replies are forwarded directly to your primary inbox within minutes for call booking.',
    label: 'Inbound response',
    value: '“Let’s talk Thursday at 2pm”',
  },
];

/** How long each step holds before the procedure advances, in milliseconds. */
const DWELL = 4500;

/**
 * Runs the procedure: advances a step at a time and draws how far through the
 * current step it is, so the row can show its own timer.
 *
 * Driven by requestAnimationFrame accumulating real elapsed time rather than
 * by an interval. An interval drifts, and browsers throttle it to roughly 1Hz
 * in a background tab, so the procedure would crawl while nobody was looking
 * and then lurch on return. rAF simply stops when the tab is hidden and
 * resumes cleanly.
 *
 * The bar is written straight to the DOM: it changes every frame, and putting
 * it in state would re-render the whole section sixty times a second.
 */
function useProcedure(count: number, reduced: boolean, paused: boolean) {
  const [active, setActive] = useState(0);
  const barRef = useRef<HTMLSpanElement>(null);
  const elapsed = useRef(0);

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    let last: number | null = null;

    const tick = (now: number) => {
      const dt = last === null ? 0 : now - last;
      last = now;

      if (!paused) {
        elapsed.current += dt;
        if (elapsed.current >= DWELL) {
          elapsed.current = 0;
          setActive((a) => (a + 1) % count);
        }
      }

      if (barRef.current) {
        barRef.current.style.width = `${Math.min((elapsed.current / DWELL) * 100, 100)}%`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, paused, count]);

  /** Selecting a step by hand restarts its dwell rather than inheriting it. */
  const select = (i: number) => {
    elapsed.current = 0;
    setActive(i);
  };

  return { active, select, barRef };
}

export const MinimalHowItWorks: React.FC = () => {
  const reduced = useReducedMotion() ?? false;
  const [paused, setPaused] = useState(false);
  const { active, select, barRef } = useProcedure(STEPS.length, reduced, paused);

  return (
    <section
      id="how-it-works"
      className="bl-display relative scroll-mt-24 bg-[var(--sheet-page)]"
    >
      <div className="bl-sheet relative mx-auto max-w-[1240px] bg-[var(--sheet-column)]">
        <div className="relative px-6 py-14 md:px-12 md:py-16">
          <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
          <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

          {/* ---------------- section header ---------------- */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <div>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                How it works
              </span>
              <h2 className="mt-4 max-w-[18ch] text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-balance text-[var(--sheet-ink)] sm:text-4xl md:text-[2.75rem]">
                Four steps.{' '}
                <span className="text-[var(--sheet-grey)]">Then replies land in your inbox.</span>
              </h2>
            </div>
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
              No complex dashboards to learn, no SDR seats to hire. The system is built, then it runs.
            </p>
          </div>

          {/* ---------------- the procedure ---------------- */}
          <div
            className="relative mt-10 border border-[var(--sheet-rule)] bg-white"
            /* The procedure runs itself, so it holds while anyone is reading or
               tabbing through it rather than moving out from under them. */
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <span className="bl-x" style={{ left: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--sheet-rule)] px-4 py-3 md:px-7">
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                Procedure — four steps
              </span>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                {reduced ? 'Built once, then it runs' : paused ? 'Held' : 'Running'}
              </span>
            </div>

            {/* Steps left, the drawing right — the reference's own arrangement,
                so the figure changes as the procedure advances. */}
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)]">
              <ol className="m-0 border-b border-[var(--sheet-rule)] lg:border-b-0 lg:border-r">
                {STEPS.map((s, i) => {
                  const open = reduced || i === active;
                  const panelId = `step-panel-${s.n}`;
                  return (
                    <li
                      key={s.n}
                      className="relative border-b border-[var(--sheet-rule)] last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() => select(i)}
                        aria-expanded={open}
                        aria-controls={panelId}
                        className="grid w-full cursor-pointer grid-cols-[3.5rem_minmax(0,1fr)] text-left"
                      >
                        <span className="flex items-start justify-center border-r border-[var(--sheet-rule)] py-5 md:py-6">
                          <span
                            className={`bl-mono text-sm tabular-nums transition-colors duration-300 ${
                              open ? 'text-[var(--sheet-ink)]' : 'text-[#9a9a96]'
                            }`}
                          >
                            {s.n}
                          </span>
                        </span>

                        <span className="block px-4 py-5 md:px-6 md:py-6">
                          <span
                            className={`block text-lg font-bold leading-snug tracking-[-0.025em] text-balance transition-colors duration-300 ${
                              open ? 'text-[var(--sheet-ink)]' : 'text-[#6b6b68]'
                            }`}
                          >
                            {s.title}
                          </span>

                          <AnimatePresence initial={false}>
                            {open && (
                              <motion.span
                                id={panelId}
                                className="block overflow-hidden"
                                initial={reduced ? false : { height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={reduced ? undefined : { height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              >
                                <span className="mt-2.5 block max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
                                  {s.body}
                                </span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                      </button>

                      {/*
                        The dwell, drawn. It is the clearest signal that the
                        procedure is running rather than sitting still — and it
                        visibly stops when the block is held.
                      */}
                      {!reduced && i === active && (
                        <span
                          ref={barRef}
                          className="absolute bottom-0 left-0 h-px w-0 bg-[var(--sheet-ink)]"
                          aria-hidden="true"
                        />
                      )}
                    </li>
                  );
                })}
              </ol>

              {/* the drawing */}
              <div className="flex flex-col">
                <div className="flex flex-1 items-center justify-center px-4 py-6 md:px-6">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={reduced ? 'static' : active}
                      className="w-full"
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduced ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      <StepFigure step={active} threshold={THRESHOLD_DAYS} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="border-t border-[var(--sheet-rule)] px-4 py-3 md:px-6">
                  <p className="bl-mono m-0 text-[0.5625rem] uppercase leading-[1.5] tracking-[0.16em] text-[#9a9a96]">
                    {STEPS[active].label}
                  </p>
                  <p className="bl-mono m-0 mt-1.5 text-xs leading-[1.5] text-[var(--sheet-ink)]">
                    {STEPS[active].value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
