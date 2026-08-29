import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { REAL_SIGNALS } from '../data/botlaneData';

interface MinimalHeroProps {
  onOpenBooking: () => void;
}

/** Days at which the progress track renders its threshold marker. */
const THRESHOLD = 60;
/** Upper bound of the track, so the fill stays proportional across signals. */
const SCALE = 100;

const ease = [0.16, 1, 0.3, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, delay, ease },
});

/**
 * Counts a signal's days-open upward, crosses the 60-day threshold, then
 * advances to the next signal. Pauses while off-screen and renders the
 * final state immediately when reduced motion is requested.
 */
function useSignalCycle(count: number, reduced: boolean) {
  const [index, setIndex] = useState(0);
  const [days, setDays] = useState(() => (reduced ? REAL_SIGNALS[0].stalledDays : 0));
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const target = REAL_SIGNALS[index].stalledDays;

    if (reduced) {
      setDays(target);
      const hold = setTimeout(() => setIndex((i) => (i + 1) % count), 6000);
      return () => clearTimeout(hold);
    }

    let frame = 0;
    let start: number | null = null;
    let hold: ReturnType<typeof setTimeout>;
    const DURATION = 1700;

    const step = (t: number) => {
      if (start === null) start = t;
      if (!visible.current) { start = t - 0; frame = requestAnimationFrame(step); return; }
      const p = Math.min((t - start) / DURATION, 1);
      setDays(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(step);
      else hold = setTimeout(() => setIndex((i) => (i + 1) % count), 2800);
    };

    setDays(0);
    frame = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(frame); clearTimeout(hold); };
  }, [index, count, reduced]);

  return { signal: REAL_SIGNALS[index], days, ref };
}

export const MinimalHero: React.FC<MinimalHeroProps> = ({ onOpenBooking }) => {
  const reduced = useReducedMotion() ?? false;
  const { signal, days, ref } = useSignalCycle(REAL_SIGNALS.length, reduced);

  const qualified = days >= THRESHOLD;
  const fill = Math.min((days / SCALE) * 100, 100);

  return (
    <section className="relative overflow-hidden border-b border-[#e3e3e0] pt-24 pb-20 md:pt-32 md:pb-28">
      {/* Dot grid. Purely decorative, kept faint enough not to fight the type. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(#0d0d0d 0.6px, transparent 0.6px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-12 px-5 md:px-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16">
        {/* ---------------- Left column ---------------- */}
        <div>
          <motion.div {...rise(0)}>
            <span className="inline-flex items-center rounded-full border border-[#d2d2ce] bg-white px-3 py-1.5 text-[0.8125rem] text-[#6b6b68]">
              Outbound infrastructure for DevOps consultancies
            </span>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="mt-5 text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[#0d0d0d] sm:text-5xl lg:text-[3.5rem]"
          >
            <span className="block font-light text-[#6b6b68]">They can&rsquo;t hire.</span>
            You&rsquo;re the answer.
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-5 max-w-xl text-base leading-[1.7] text-[#6b6b68] md:text-[1.0625rem]"
          >
            I track infrastructure roles that stall past {THRESHOLD} days, then send you the firms
            where your services are the obvious fix.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#0a0a0a] pl-2 pr-6 text-[0.9375rem] font-medium text-[#fafafa] shadow-[0_1px_2px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:bg-[#242424] active:scale-[0.98]"
            >
              <span className="grid size-8 place-items-center rounded-full bg-[#fafafa] text-[#0a0a0a]">
                <ArrowRight className="size-4" />
              </span>
              Check slot availability
            </button>

            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#d2d2ce] bg-white px-6 text-[0.9375rem] font-medium text-[#0d0d0d] transition-colors duration-200 hover:border-[#9a9a96] hover:bg-[#fafafa] active:scale-[0.98]"
            >
              See how it works
            </a>
          </motion.div>

          {/* Commitments, not outcomes — each is something Botlane controls. */}
          <motion.ul
            {...rise(0.32)}
            className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-[#6b6b68]"
          >
            <li><span className="font-medium text-[#0d0d0d]">4</span> client cap</li>
            <li><span className="font-medium text-[#0d0d0d]">3wk</span> domain warm-up</li>
            <li><span className="font-medium text-[#0d0d0d]">0</span> emails from your domain</li>
          </motion.ul>
        </div>

        {/* ---------------- Right column: live signal ---------------- */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className="overflow-hidden rounded-[var(--radius-panel)] border border-[#e3e3e0] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-24px_rgba(0,0,0,0.18)]"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#e3e3e0] px-5 py-4">
            <div className="min-w-0">
              <p className="truncate text-[0.9375rem] font-medium text-[#0d0d0d]">{signal.company}</p>
              <p className="mt-0.5 truncate text-[0.8125rem] text-[#9a9a96]">{signal.funding}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-mono text-2xl font-medium leading-none text-[#0d0d0d]" aria-live="polite">
                {days}
              </p>
              <p className="eyebrow mt-1.5 text-[#9a9a96]">days open</p>
            </div>
          </div>

          <div className="px-5 py-4">
            <p className="eyebrow text-[#9a9a96]">Unfilled role</p>
            <p className="mt-1.5 text-[0.9375rem] text-[#0d0d0d]">{signal.role}</p>

            <div className="relative mt-5 h-[3px] rounded-full bg-[#e3e3e0]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[#0a0a0a]"
                style={{ width: `${fill}%`, transition: reduced ? 'none' : 'width 60ms linear' }}
              />
              <div
                className="absolute -top-1 -bottom-1 w-px bg-[#b4b2a9]"
                style={{ left: `${THRESHOLD}%` }}
                aria-hidden="true"
              />
            </div>
            <div className="mt-2 flex justify-between">
              <span className="eyebrow text-[#9a9a96]">posted</span>
              <span className="eyebrow text-[#9a9a96]">{THRESHOLD}d threshold</span>
            </div>

            <div
              className="mt-4 flex items-center justify-between gap-3 border-t border-[#e3e3e0] pt-4 transition-opacity duration-500"
              style={{ opacity: qualified ? 1 : 0 }}
            >
              <p className="min-w-0 truncate text-[0.8125rem] text-[#6b6b68]">
                <span className="font-medium text-[#0d0d0d]">Reach:</span>{' '}
                {signal.contactName}, {signal.contactRole}
              </p>
              <span className="eyebrow shrink-0 rounded-[var(--radius-control)] bg-[#0a0a0a] px-2 py-1 text-[#fafafa]">
                qualified
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
