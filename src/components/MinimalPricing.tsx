import React, { useState } from 'react';
import { THRESHOLD_DAYS } from '../data/botlaneData';

interface MinimalPricingProps {
  onOpenBooking: () => void;
  onViewSystems?: () => void;
}

const PLANS = {
  monthly: {
    tab: 'Monthly',
    name: 'Setup + maintenance',
    price: '$4,999',
    note: 'setup, then $2,499 / month',
    description:
      'The system is built, then run and reported on every month for as long as it is useful to you.',
  },
  quarterly: {
    tab: 'Quarterly',
    name: 'Quarterly upfront',
    price: '$11,246',
    note: 'first quarter, paid upfront (saves $1,250)',
    description: 'The same system and the same operating cadence, settled a quarter at a time.',
  },
} as const;

type Cycle = keyof typeof PLANS;

/** Everything the retainer covers. A schedule of inclusions, not a feature list. */
const INCLUDED = [
  'Target market defined with you before anything is sent',
  'Separate authenticated sending domain, built and warmed',
  `Weekly identification of newly stalled infrastructure roles (${THRESHOLD_DAYS}+ days)`,
  'Emails written specifically for the signal, not spun from a template',
  'Replies routed to your inbox within minutes',
  'A weekly report on roles, companies, replies, and scheduled meetings',
  'Direct access to the person running it',
  'Every system in the library, included — deployed and maintained for you',
];

export const MinimalPricing: React.FC<MinimalPricingProps> = ({ onOpenBooking, onViewSystems }) => {
  const [cycle, setCycle] = useState<Cycle>('monthly');
  const plan = PLANS[cycle];

  return (
    <section id="pricing" className="bl-display relative scroll-mt-24 bg-[var(--sheet-page)]">
      <div className="bl-sheet relative mx-auto max-w-[1240px] bg-[var(--sheet-column)]">
        <div className="relative px-6 py-14 md:px-12 md:py-16">
          <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
          <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

          {/* ---------------- section header ---------------- */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <div>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                Pricing
              </span>
              <h2 className="mt-4 max-w-[18ch] text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-balance text-[var(--sheet-ink)] sm:text-4xl md:text-[2.75rem]">
                One offer.{' '}
                <span className="text-[var(--sheet-grey)]">Two ways to pay for it.</span>
              </h2>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
                No tiers, no seats, no upgrade path to the useful version.
              </p>
            </div>

            {/* Cycle selector, drawn as a two-cell switch rather than a pill. */}
            <div
              role="tablist"
              aria-label="Payment option"
              className="inline-flex shrink-0 border border-[var(--sheet-rule)] bg-white"
            >
              {(Object.keys(PLANS) as Cycle[]).map((key, i) => {
                const active = cycle === key;
                return (
                  <button
                    key={key}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    onClick={() => setCycle(key)}
                    className={`bl-mono px-5 py-2.5 text-[0.625rem] uppercase tracking-[0.14em] transition-colors duration-200 ${
                      i > 0 ? 'border-l border-[var(--sheet-rule)]' : ''
                    } ${
                      active
                        ? 'bg-[var(--sheet-ink)] text-[#fafafa]'
                        : 'text-[#6b6b68] hover:bg-[var(--sheet-open)] hover:text-[var(--sheet-ink)]'
                    }`}
                  >
                    {PLANS[key].tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---------------- the quotation ---------------- */}
          <div className="relative mt-10 border border-[var(--sheet-rule)] bg-white">
            <span className="bl-x" style={{ left: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--sheet-rule)] px-4 py-3 md:px-7">
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                Quotation — {plan.name}
              </span>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                {plan.tab} terms
              </span>
            </div>

            <div className="grid md:grid-cols-[1fr_1.05fr]">
              {/* cost */}
              <div className="flex flex-col justify-between gap-8 border-b border-[var(--sheet-rule)] px-4 py-7 md:border-b-0 md:border-r md:px-7 md:py-9">
                <div>
                  <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                    Total
                  </span>
                  <p className="mt-4 text-5xl font-bold tracking-[-0.05em] tabular-nums text-[var(--sheet-ink)] md:text-6xl">
                    {plan.price}
                  </p>
                  <p className="bl-mono mt-3 text-xs leading-[1.6] text-[#6b6b68]">{plan.note}</p>
                  <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-[#6b6b68]">
                    {plan.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[var(--sheet-ink)] text-[0.9375rem] font-semibold text-[#fafafa] transition-colors duration-200 hover:bg-[#2c2c2c]"
                >
                  Get the list
                </button>
              </div>

              {/* schedule of inclusions */}
              <div className="bg-[#fcfcfb] px-4 py-7 md:px-7 md:py-9">
                <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                  Included
                </span>
                <ul className="mt-4 border-t border-[var(--sheet-rule-soft)]">
                  {INCLUDED.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border-b border-[var(--sheet-rule-soft)] py-3"
                    >
                      {/* A filled square reads as affirmed on this sheet, the
                          same way a filled cell does in the day matrix. */}
                      <span
                        className="mt-[0.45rem] size-1.5 shrink-0 bg-[var(--sheet-ink)]"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-[var(--sheet-ink)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bridge to the self-serve path for anyone the capped roster excludes */}
          <div className="relative mt-4 border border-[var(--sheet-rule)] bg-white px-4 py-6 md:px-7 md:py-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
              <div className="max-w-xl">
                <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                  Alternative
                </span>
                <h3 className="mt-3 text-[1.0625rem] font-bold tracking-[-0.025em] text-[var(--sheet-ink)]">
                  Roster full, or not ready for a retainer?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6b6b68]">
                  The same systems are available individually, from $149. You deploy and maintain
                  them yourself instead of me running them for you.
                </p>
              </div>
              <button
                type="button"
                onClick={onViewSystems}
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg border border-[var(--sheet-rule)] bg-white px-5 text-sm font-semibold text-[var(--sheet-ink)] transition-colors hover:border-[#c4c4bf]"
              >
                Browse the systems
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
