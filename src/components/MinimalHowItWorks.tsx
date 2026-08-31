import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { THRESHOLD_DAYS } from '../data/botlaneData';

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

export const MinimalHowItWorks: React.FC = () => {
  const reduced = useReducedMotion() ?? false;

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
  };

  // No animation props under reduced motion, so each row renders in place
  // rather than depending on an animation to become visible.
  const row = reduced
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
          <motion.ol
            className="relative mt-10 border border-[var(--sheet-rule)] bg-white"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <span className="bl-x" style={{ left: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

            <li className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--sheet-rule)] px-4 py-3 md:px-7">
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                Procedure — four steps
              </span>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                Built once, then it runs
              </span>
            </li>

            {STEPS.map((s) => (
              <motion.li
                key={s.n}
                variants={row}
                /*
                  Padding sits on the cells rather than the row, so the number
                  column's rule runs the full height and reads as one continuous
                  spine down the block.
                */
                className="grid border-b border-[var(--sheet-rule)] last:border-b-0 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,18rem)]"
              >
                <div className="flex items-start px-4 pt-5 md:justify-center md:border-r md:border-[var(--sheet-rule)] md:px-0 md:py-7">
                  <span className="bl-mono text-sm tabular-nums text-[#9a9a96]">{s.n}</span>
                </div>

                <div className="px-4 pb-5 pt-2 md:px-7 md:py-7">
                  <h3 className="text-lg font-bold leading-snug tracking-[-0.025em] text-balance text-[var(--sheet-ink)] md:text-xl">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
                    {s.body}
                  </p>
                </div>

                <div className="px-4 pb-6 md:border-l md:border-[var(--sheet-rule)] md:px-6 md:py-7">
                  <div className="border border-[var(--sheet-rule)] bg-[var(--sheet-open)] px-3 py-2.5">
                    <p className="bl-mono m-0 text-[0.5625rem] uppercase leading-[1.5] tracking-[0.16em] text-[#9a9a96]">
                      {s.label}
                    </p>
                    <p className="bl-mono m-0 mt-1.5 text-xs leading-[1.5] text-[var(--sheet-ink)]">
                      {s.value}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
};
