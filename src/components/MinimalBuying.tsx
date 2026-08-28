import React from 'react';
import { Check, Minus } from 'lucide-react';

export const MinimalBuying: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-b border-[#e3e3e0]">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6">
          <span className="eyebrow inline-flex w-fit items-center gap-2 rounded-[var(--radius-control)] border px-3 py-1.5 border-[#e3e3e0] bg-white text-[#6b6b68]">
            <span className="size-1.5 rounded-full bg-[#0d0d0d]"></span>
            What you're buying
          </span>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2 className="max-w-2xl text-3xl font-medium tracking-[-0.02em] text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.08] text-[#0d0d0d]">
              The whole of it, stated plainly.
            </h2>
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
              Six things you get, including the one you don't.
            </p>
          </div>
        </div>

        {/* 6-Grid Specification Cards */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <li className="rounded-[var(--radius-card)] border p-6 border-[#e3e3e0] bg-white">
            <span className="grid size-8 place-items-center rounded-[var(--radius-control)] bg-[#0a0a0a] text-white">
              <Check className="w-4 h-4" />
            </span>
            <h3 className="mt-4 text-[1.0625rem] font-medium tracking-[-0.01em] text-[#0d0d0d]">
              A working system
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6b6b68]">
              Outbound infrastructure built once, authenticated properly, and operated every month.
            </p>
          </li>

          {/* Card 2 */}
          <li className="rounded-[var(--radius-card)] border p-6 border-[#e3e3e0] bg-white">
            <span className="grid size-8 place-items-center rounded-[var(--radius-control)] bg-[#0a0a0a] text-white">
              <Check className="w-4 h-4" />
            </span>
            <h3 className="mt-4 text-[1.0625rem] font-medium tracking-[-0.01em] text-[#0d0d0d]">
              Replies routed to you
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6b6b68]">
              Interested engineering leaders reach your primary inbox within minutes.
            </p>
          </li>

          {/* Card 3 */}
          <li className="rounded-[var(--radius-card)] border p-6 border-[#e3e3e0] bg-white">
            <span className="grid size-8 place-items-center rounded-[var(--radius-control)] bg-[#0a0a0a] text-white">
              <Check className="w-4 h-4" />
            </span>
            <h3 className="mt-4 text-[1.0625rem] font-medium tracking-[-0.01em] text-[#0d0d0d]">
              A weekly report
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6b6b68]">
              Transparent accounting of roles tracked, companies contacted, replies, and meetings.
            </p>
          </li>

          {/* Card 4 (The Sunken Exemption Card) */}
          <li className="rounded-[var(--radius-card)] border p-6 border-[#d2d2ce] bg-[#ebebe8]">
            <span className="grid size-8 place-items-center rounded-[var(--radius-control)] bg-black/10 text-[#6b6b68]">
              <Minus className="w-4 h-4" />
            </span>
            <h3 className="mt-4 text-[1.0625rem] font-medium tracking-[-0.01em] text-[#0d0d0d]">
              No guaranteed meetings
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6b6b68]">
              Anyone promising a guaranteed quota is pricing their uncertainty into your invoice.
            </p>
          </li>

          {/* Card 5 */}
          <li className="rounded-[var(--radius-card)] border p-6 border-[#e3e3e0] bg-white">
            <span className="grid size-8 place-items-center rounded-[var(--radius-control)] bg-[#0a0a0a] text-white">
              <Check className="w-4 h-4" />
            </span>
            <h3 className="mt-4 text-[1.0625rem] font-medium tracking-[-0.01em] text-[#0d0d0d]">
              Your domain stays safe
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6b6b68]">
              Nothing is ever sent from your primary domain. 100% secondary domain isolation.
            </p>
          </li>

          {/* Card 6 */}
          <li className="rounded-[var(--radius-card)] border p-6 border-[#e3e3e0] bg-white">
            <span className="grid size-8 place-items-center rounded-[var(--radius-control)] bg-[#0a0a0a] text-white">
              <Check className="w-4 h-4" />
            </span>
            <h3 className="mt-4 text-[1.0625rem] font-medium tracking-[-0.01em] text-[#0d0d0d]">
              One person, not an agency
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6b6b68]">
              Direct access to the technical operator running the campaigns.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
