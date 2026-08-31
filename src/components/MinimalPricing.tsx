import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface MinimalPricingProps {
  onOpenBooking: () => void;
  onViewSystems?: () => void;
}

export const MinimalPricing: React.FC<MinimalPricingProps> = ({ onOpenBooking, onViewSystems }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  const plan =
    billingCycle === 'monthly'
      ? {
          name: 'Setup + maintenance',
          price: '$4,999',
          priceNote: 'setup, then $2,499 / month',
          description:
            'The system is built, then run and reported on every month for as long as it is useful to you.',
        }
      : {
          name: 'Quarterly upfront',
          price: '$11,246',
          priceNote: 'first quarter, paid upfront (saves $1,250)',
          description:
            'The same system and the same operating cadence, settled a quarter at a time.',
        };

  return (
    <section id="pricing" className="scroll-mt-24 py-16 md:py-24 border-b border-[#e3e3e0]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-6">
          <span className="eyebrow inline-flex w-fit items-center gap-2 rounded-[var(--radius-control)] border px-3 py-1.5 mx-auto border-[#e3e3e0] bg-white text-[#6b6b68]">
            <span className="size-1.5 rounded-full bg-[#0d0d0d]"></span>
            Pricing
          </span>
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="max-w-2xl text-3xl font-medium tracking-[-0.02em] text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.08] text-[#0d0d0d]">
              One offer. Two ways to pay for it.
            </h2>
            <p className="text-[0.9375rem] leading-relaxed max-w-xl text-[#6b6b68]">
              No tiers, no seats, no upgrade path to the useful version.
            </p>
          </div>
        </div>

        {/* Payment Option Toggle Switcher */}
        <div
          role="tablist"
          aria-label="Payment option"
          className="mx-auto mt-10 flex w-fit items-center gap-1 rounded-[calc(var(--radius-control)+0.25rem)] border border-[#e3e3e0] bg-white p-1"
        >
          <button
            role="tab"
            type="button"
            aria-selected={billingCycle === 'monthly'}
            onClick={() => setBillingCycle('monthly')}
            className={`rounded-[var(--radius-control)] px-5 py-2 text-sm font-medium transition-colors duration-200 ${
              billingCycle === 'monthly'
                ? 'bg-[#0a0a0a] text-[#fafafa]'
                : 'text-[#6b6b68] hover:text-[#0d0d0d]'
            }`}
          >
            Monthly
          </button>
          <button
            role="tab"
            type="button"
            aria-selected={billingCycle === 'quarterly'}
            onClick={() => setBillingCycle('quarterly')}
            className={`rounded-[var(--radius-control)] px-5 py-2 text-sm font-medium transition-colors duration-200 ${
              billingCycle === 'quarterly'
                ? 'bg-[#0a0a0a] text-[#fafafa]'
                : 'text-[#6b6b68] hover:text-[#0d0d0d]'
            }`}
          >
            Quarterly
          </button>
        </div>

        {/* Pricing Panel Card */}
        <div className="mt-8 grid overflow-hidden rounded-[var(--radius-panel)] border border-[#e3e3e0] bg-white md:grid-cols-[1fr_1.05fr]">
          {/* Left Column: Price & Action */}
          <div className="flex flex-col justify-between gap-8 border-b border-[#e3e3e0] p-8 md:border-r md:border-b-0 md:p-10">
            <div>
              <span className="eyebrow text-[#9a9a96]">{plan.name}</span>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
                <span className="text-5xl font-medium tracking-[-0.03em] tabular-nums md:text-6xl text-[#0d0d0d]">
                  {plan.price}
                </span>
              </p>
              <p className="mt-2 text-sm text-[#6b6b68]">{plan.priceNote}</p>
              <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-[#6b6b68]">
                {plan.description}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium whitespace-nowrap transition-all duration-200 ease-out bg-[#0a0a0a] text-[#fafafa] hover:bg-[#242424] active:scale-[0.98] shadow-[0_1px_2px_rgba(0,0,0,0.18)] h-12 text-[0.9375rem] w-full"
            >
              Get the list
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Inclusions */}
          <div className="bg-[#f2f2f0]/50 p-8 md:p-10">
            <span className="eyebrow text-[#9a9a96]">Including</span>
            <ul className="mt-5 flex flex-col gap-3.5">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[0.25rem] bg-[#0a0a0a] text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span className="text-sm leading-relaxed text-[#0d0d0d]">
                  Target market defined with you before anything is sent
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[0.25rem] bg-[#0a0a0a] text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span className="text-sm leading-relaxed text-[#0d0d0d]">
                  Separate authenticated sending domain, built and warmed
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[0.25rem] bg-[#0a0a0a] text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span className="text-sm leading-relaxed text-[#0d0d0d]">
                  Weekly identification of newly stalled infrastructure roles (60+ days)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[0.25rem] bg-[#0a0a0a] text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span className="text-sm leading-relaxed text-[#0d0d0d]">
                  Emails written specifically for the signal, not spun from a template
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[0.25rem] bg-[#0a0a0a] text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span className="text-sm leading-relaxed text-[#0d0d0d]">
                  Replies routed to your inbox within minutes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[0.25rem] bg-[#0a0a0a] text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span className="text-sm leading-relaxed text-[#0d0d0d]">
                  A weekly report on roles, companies, replies, and scheduled meetings
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[0.25rem] bg-[#0a0a0a] text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span className="text-sm leading-relaxed text-[#0d0d0d]">
                  Direct access to the person running it
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[0.25rem] bg-[#0a0a0a] text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span className="text-sm leading-relaxed text-[#0d0d0d]">
                  Every system in the library, included &mdash; deployed and maintained for you
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bridge to the self-serve path for anyone the capped roster excludes */}
        <div className="mt-10 rounded-[var(--radius-card)] border border-[#e3e3e0] bg-white p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-[1.0625rem] font-medium tracking-[-0.01em] text-[#0d0d0d]">
                Roster full, or not ready for a retainer?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6b68]">
                The same systems are available individually, from $149. You deploy and maintain them
                yourself instead of me running them for you.
              </p>
            </div>
            <button
              onClick={onViewSystems}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[#0a0a0a] px-5 text-sm font-medium text-[#0d0d0d] transition-colors hover:bg-[#0a0a0a] hover:text-white"
            >
              Browse the systems <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
