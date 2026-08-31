import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { REAL_SIGNALS, TRACKED_ROLES, THRESHOLD_DAYS } from '../data/botlaneData';

interface MinimalHeroProps {
  onOpenBooking: () => void;
}

/** Cells per row in the day matrix. Twenty divides sixty exactly, so the
 *  threshold lands on a row boundary rather than mid-row. */
const COLS = 20;
/** Six rows of twenty. The upper bound of the drawing, in days. */
const SCALE_DAYS = COLS * 6;

/** How long the count takes, and how long the finished reading holds. */
const COUNT_MS = 1900;
const HOLD_MS = 3400;
const CYCLE_MS = COUNT_MS + HOLD_MS;

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Staged entrance. Returns nothing at all when reduced motion is requested, so
 * the element renders in place rather than depending on an animation to become
 * visible — otherwise anything that stops the animation leaves a blank hero.
 */
const rise = (delay: number, reduced: boolean) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay, ease },
      };

/** One matrix row, as a percentage of the grid's height. */
const ROW_PCT = 100 / 6;

/**
 * How much of the matrix is filled at a given day count: whole rows below the
 * threshold, then the remainder across the row after them.
 */
const fillFor = (days: number) => {
  const past = Math.max(days - THRESHOLD_DAYS, 0);
  const rows = Math.floor(past / COLS);
  return {
    fullHeight: `${rows * ROW_PCT}%`,
    partTop: `${50 + rows * ROW_PCT}%`,
    partWidth: `${((past % COLS) / COLS) * 100}%`,
  };
};

/**
 * Cycles the figure through the tracked signals: counts one role's days up
 * from zero, holds the finished reading, then hands to the next and repeats.
 *
 * The matrix is the one element on the page that is about time accumulating,
 * so it should not settle once and stop. Cycling also restores something the
 * single-signal drawing gave up — that there is a roster behind it, not one
 * example.
 *
 * The count and the fill are written straight to the DOM. They change every
 * frame, and putting them in state would re-render the whole hero sixty times
 * a second; only the signal index is state, and that changes twice a cycle.
 *
 * Driven by requestAnimationFrame rather than an interval, so it stops when
 * the tab is hidden instead of running on unwatched and lurching on return.
 */
function useSignalCycle(reduced: boolean, paused: boolean) {
  const [index, setIndex] = useState(0);
  const numRef = useRef<HTMLElement>(null);
  const fullRef = useRef<HTMLDivElement>(null);
  const partRef = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const draw = (d: number) => {
      if (numRef.current) numRef.current.textContent = String(d);
      const f = fillFor(d);
      if (fullRef.current) fullRef.current.style.height = f.fullHeight;
      if (partRef.current) {
        partRef.current.style.top = f.partTop;
        partRef.current.style.width = f.partWidth;
      }
    };

    // Settle on the first signal and stay there.
    if (reduced) {
      setIndex(0);
      draw(REAL_SIGNALS[0].stalledDays);
      return;
    }

    let frame = 0;
    let last: number | null = null;

    const tick = (now: number) => {
      const dt = last === null ? 0 : now - last;
      last = now;
      if (!paused) elapsed.current += dt;

      const target = REAL_SIGNALS[indexRef.current].stalledDays;
      const p = Math.min(elapsed.current / COUNT_MS, 1);
      draw(Math.round(target * (1 - Math.pow(1 - p, 3))));

      if (elapsed.current >= CYCLE_MS) {
        elapsed.current = 0;
        setIndex((i) => (i + 1) % REAL_SIGNALS.length);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, paused]);

  return { signal: REAL_SIGNALS[index], index, numRef, fullRef, partRef };
}

export const MinimalHero: React.FC<MinimalHeroProps> = ({ onOpenBooking }) => {
  const reduced = useReducedMotion() ?? false;
  const [paused, setPaused] = useState(false);
  const { signal, index, numRef, fullRef, partRef } = useSignalCycle(reduced, paused);

  const qualified = TRACKED_ROLES.filter((r) => r.days >= THRESHOLD_DAYS).length;

  return (
    <section className="bl-display relative overflow-hidden bg-[var(--sheet-page)]">
      <div className="bl-sheet relative mx-auto max-w-[1240px] bg-[var(--sheet-column)]">
        {/* Column rules: the paper is cellular whether or not a cell is used. */}
        <div className="bl-rules pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <i style={{ left: '16.666%' }} /><i style={{ left: '33.333%' }} />
          <i style={{ left: '50%' }} /><i style={{ left: '66.666%' }} />
          <i style={{ left: '83.333%' }} />
        </div>

        <div className="relative z-10 px-6 pt-28 pb-10 md:px-12 md:pt-36">
          <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
          <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

          <div
            className="bl-patch pointer-events-none absolute left-0 top-20 -z-10 h-[180px] w-[min(56%,600px)]"
            aria-hidden="true"
          />

          {/* ---------------- copy + title block ---------------- */}
          <div className="grid gap-11 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:items-start lg:gap-14">
            <div>
              <motion.span
                {...rise(0, reduced)}
                className="inline-flex items-center gap-2.5 rounded-full border border-[var(--sheet-rule)] bg-white px-3.5 py-2 text-[0.6875rem] text-[#6b6b68]"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-[var(--sheet-ink)]" />
                Live — {TRACKED_ROLES.length} roles tracked against the line
              </motion.span>

              <motion.h1
                {...rise(0.1, reduced)}
                className="mt-6 max-w-[16ch] text-[2.2rem] font-bold leading-[1.04] tracking-[-0.045em] text-balance text-[var(--sheet-ink)] sm:text-5xl lg:text-[3.9rem]"
              >
                <span className="block text-[var(--sheet-grey)]">They can&rsquo;t hire.</span>
                You&rsquo;re the answer.
              </motion.h1>

              <motion.p
                {...rise(0.2, reduced)}
                className="mt-5 max-w-[52ch] text-base leading-[1.72] text-[#6b6b68]"
              >
                One line decides everything. Below it, a company is still hiring. Above it, hiring has
                failed — and we hand you{' '}
                <b className="font-semibold text-[var(--sheet-ink)]">
                  the firm, the stack, and the person to reach.
                </b>
              </motion.p>

              <motion.div {...rise(0.3, reduced)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--sheet-ink)] px-6 text-[0.9375rem] font-semibold text-[#fafafa] transition-colors duration-200 hover:bg-[#2c2c2c]"
                >
                  Check slot availability
                </button>
                <a
                  href="#how-it-works"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--sheet-rule)] bg-white px-6 text-[0.9375rem] font-semibold text-[var(--sheet-ink)] transition-colors duration-200 hover:border-[#c4c4bf]"
                >
                  See how it works
                </a>
              </motion.div>
            </div>

            {/*
              Title block. This is the drawing's metadata, and it is what makes
              the space beside the headline part of the sheet rather than a gap.
            */}
            <motion.aside
              {...rise(0.38, reduced)}
              className="relative border border-[var(--sheet-rule)] bg-white"
            >
              <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />
              <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

              <div className="bl-mono flex items-center justify-between gap-4 border-b border-[var(--sheet-rule)] px-3.5 py-2.5 text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                <span>Sheet</span><span>BL&mdash;01</span>
              </div>

              <dl className="m-0">
                {[
                  ['Subject', 'Stalled infrastructure roles'],
                  ['Threshold', `${THRESHOLD_DAYS} days`],
                  ['Scale', `0 – ${SCALE_DAYS} d`],
                  ['Tracked', `${TRACKED_ROLES.length} roles · ${qualified} qualified`],
                  ['Revision', 'C · continuous'],
                ].map(([term, value]) => (
                  <div
                    key={term}
                    className="flex items-baseline justify-between gap-4 border-b border-[var(--sheet-rule-soft)] px-3.5 py-2.5"
                  >
                    <dt className="bl-mono text-[0.625rem] uppercase tracking-[0.12em] text-[#9a9a96]">
                      {term}
                    </dt>
                    <dd className="bl-mono m-0 text-right text-xs font-medium text-[var(--sheet-ink)]">
                      {value}
                    </dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-4 px-3.5 py-2.5">
                  <dt className="bl-mono text-[0.625rem] uppercase tracking-[0.12em] text-[#9a9a96]">
                    Lanes
                  </dt>
                  <dd className="m-0">
                    <span className="flex gap-1" aria-label="3 of 4 lanes taken">
                      <i className="block h-1 w-[15px] rounded-[1px] bg-[var(--sheet-ink)]" />
                      <i className="block h-1 w-[15px] rounded-[1px] bg-[var(--sheet-ink)]" />
                      <i className="block h-1 w-[15px] rounded-[1px] bg-[var(--sheet-ink)]" />
                      <i className="block h-1 w-[15px] rounded-[1px] bg-[var(--sheet-rule)]" />
                    </span>
                  </dd>
                </div>
              </dl>
            </motion.aside>
          </div>

          {/* ---------------- Fig. 01 — the day matrix ---------------- */}
          <motion.figure
            {...rise(0.46, reduced)}
            className="relative m-0 mt-12 border border-[var(--sheet-rule)] bg-white"
            /* The figure cycles on its own, so it holds while anyone is
               actually reading it. */
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <span className="bl-x" style={{ left: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

            <figcaption className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--sheet-rule)] px-4 py-3 md:px-7">
              <span className="bl-mono text-[0.625rem] uppercase leading-[1.7] tracking-[0.16em] text-[#9a9a96]">
                Fig. 01 — {signal.short}, one cell per day
                <span className="block text-[#c4c4bf]">
                  {signal.funding} · signal {index + 1} of {REAL_SIGNALS.length}
                  {reduced ? '' : paused ? ' · held' : ''}
                </span>
              </span>
              <span className="flex items-baseline gap-2">
                <b
                  ref={numRef}
                  className="bl-mono text-2xl font-bold leading-none tracking-[-0.045em] tabular-nums text-[var(--sheet-ink)]"
                />
                <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                  days open
                </span>
              </span>
            </figcaption>

            {/*
              bl-fig-body carries --bl-gutter, the distance out to the sheet's
              own rule, so the threshold can escape the figure and cross the
              open margins. Keep its padding in step with that variable.
            */}
            <div className="bl-fig-body relative px-4 pt-14 md:px-7 md:pt-16">
              <div className="relative">
                <div
                  className="bl-cells"
                  role="img"
                  aria-label={`${signal.short}: one hundred and twenty cells, one per day. The first ${THRESHOLD_DAYS} are open; days ${THRESHOLD_DAYS + 1} to ${signal.stalledDays} are filled — ${signal.stalledDays - THRESHOLD_DAYS} days past the threshold, so the contact is released.`}
                >
                  <div className="bl-pre" />
                  <div ref={fullRef} className="bl-post-full" />
                  <div ref={partRef} className="bl-post" />
                  <div className="bl-cell-lines" />

                  <div className="bl-horizon" aria-hidden="true">
                    <span className="bl-x" style={{ left: -5, top: -5 }} />
                    <span className="bl-x" style={{ right: -5, top: -5 }} />
                    <div className="bl-horizon-line" />
                    <span className="bl-mono absolute -top-[31px] right-0 rounded border border-[var(--sheet-rule)] bg-white px-2 py-1.5 text-[0.625rem] uppercase tracking-[0.14em] whitespace-nowrap text-[var(--sheet-ink)]">
                      {THRESHOLD_DAYS} days — threshold
                    </span>
                  </div>
                </div>

                <div className="bl-mono mt-3.5 flex justify-between border-t border-[var(--sheet-rule)] pt-3 text-[0.625rem] text-[#9a9a96]">
                  <span>Day 1 — posted</span><span>Day {SCALE_DAYS}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-[var(--sheet-rule)] px-4 py-3 md:px-7">
              <div className="bl-mono flex flex-wrap gap-6 text-[0.625rem] uppercase tracking-[0.12em] text-[#9a9a96]">
                <span className="flex items-center gap-2">
                  <i className="block size-2.5 rounded-[2px] border border-[var(--sheet-open-line)] bg-[var(--sheet-open)]" />
                  Within {THRESHOLD_DAYS} days
                </span>
                <span className="flex items-center gap-2">
                  <i className="block size-2.5 rounded-[2px] bg-[var(--sheet-ink)]" />
                  Past the threshold — contact released
                </span>
              </div>
              <p className="m-0 text-xs text-[#6b6b68]">
                {signal.role} &nbsp;&rarr;&nbsp;{' '}
                <b className="font-semibold text-[var(--sheet-ink)]">
                  {signal.contactName}, {signal.contactRole}
                </b>
              </p>
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
};
