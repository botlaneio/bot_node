import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { ScheduleFigure } from './MicroFigures';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const reduced = useReducedMotion() ?? false;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });

  useEffect(() => {
    if (inView && !reduced) motionValue.set(value);
  }, [inView, value, motionValue, reduced]);

  useEffect(() => {
    if (reduced) return;
    return springValue.on('change', (latest) => {
      if (!ref.current) return;
      ref.current.textContent = decimals > 0
        ? `${prefix}${latest.toFixed(decimals)}${suffix}`
        : `${prefix}${Math.floor(latest)}${suffix}`;
    });
  }, [springValue, prefix, suffix, decimals, reduced]);

  // Rendered at its final value, so the figure is correct before the spring
  // runs and stays correct if it never does.
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : value}
      {suffix}
    </span>
  );
};

/**
 * Every figure here is something Botlane controls and can be held to: a policy,
 * a process step, or a targeting rule. None of them are performance claims,
 * because there is no data to support one yet — which is why this is drawn as a
 * specification schedule rather than a stats bar.
 */
const SPEC = [
  {
    key: 'Consultancies, maximum',
    figure: 'lanes' as const,
    value: 4,
    note: 'The roster is capped so no two clients ever chase the same opening',
  },
  {
    key: 'Warm-up before first send',
    figure: 'warmup' as const,
    value: 3,
    suffix: 'wk',
    note: 'Dedicated domains authenticated and aged before a single message goes out',
  },
  {
    key: 'Minimum signal age',
    figure: 'threshold' as const,
    value: 60,
    prefix: '>',
    suffix: 'd',
    note: 'How long a role must sit open before we treat it as real hiring distress',
  },
  {
    key: 'Emails from your domain',
    figure: 'isolation' as const,
    value: 0,
    note: 'Outreach only ever leaves isolated secondary domains',
  },
];

export const MinimalStats: React.FC = () => {
  const reduced = useReducedMotion() ?? false;

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  // No animation props at all under reduced motion, so each cell renders in
  // place rather than depending on an animation to become visible.
  const cell = reduced
    ? {}
    : {
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <section className="bl-display relative bg-[var(--sheet-page)]">
      <div className="bl-sheet relative mx-auto max-w-[1240px] bg-[var(--sheet-column)]">
        <div className="relative px-6 py-14 md:px-12 md:py-16">
          <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
          <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

          {/* The schedule reads as another drawn element on the sheet, so it
              carries the same border and corner marks as Fig. 01. */}
          <div className="relative border border-[var(--sheet-rule)] bg-white">
            <span className="bl-x" style={{ left: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--sheet-rule)] px-4 py-3 md:px-6">
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                Specification — fixed constraints
              </span>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                Commitments, not outcomes
              </span>
            </div>

            {/*
              -mb-px -mr-px with overflow-hidden turns per-cell borders into
              shared internal hairlines at every breakpoint, without doubling
              up against the box's own border.
            */}
            <motion.div
              className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-4 -mb-px -mr-px"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {SPEC.map((s) => (
                <motion.div
                  key={s.key}
                  variants={cell}
                  className="border-b border-r border-[var(--sheet-rule)] px-4 py-5 md:px-6 md:py-7"
                >
                  <p className="bl-mono m-0 text-[0.625rem] uppercase leading-[1.5] tracking-[0.14em] text-[#9a9a96]">
                    {s.key}
                  </p>
                  <div className="mt-3 text-4xl font-bold tracking-[-0.05em] text-[var(--sheet-ink)] md:text-[2.75rem]">
                    <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-[#6b6b68]">
                    {s.note}
                  </p>
                  {/* The constraint restated as a drawing, so the cell reads
                      as measured rather than merely typed. */}
                  <div className="mt-5">
                    <ScheduleFigure kind={s.figure} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
