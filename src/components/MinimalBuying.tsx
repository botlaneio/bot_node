import React from 'react';

/**
 * What the retainer covers, and the one thing it deliberately does not.
 *
 * `included` drives the marker, and the marker follows the sheet's existing
 * logic: filled black is affirmed, an open square is not — the same
 * distinction the day matrix draws either side of the threshold.
 */
const ITEMS = [
  {
    included: true,
    title: 'A working system',
    body: 'Outbound infrastructure built once, authenticated properly, and operated every month.',
  },
  {
    included: true,
    title: 'Replies routed to you',
    body: 'Interested engineering leaders reach your primary inbox within minutes.',
  },
  {
    included: true,
    title: 'A weekly report',
    body: 'Transparent accounting of roles tracked, companies contacted, replies, and meetings.',
  },
  {
    included: false,
    title: 'No guaranteed meetings',
    body: 'Anyone promising a guaranteed quota is pricing their uncertainty into your invoice.',
  },
  {
    included: true,
    title: 'Your domain stays safe',
    body: 'Nothing is ever sent from your primary domain. 100% secondary domain isolation.',
  },
  {
    included: true,
    title: 'One person, not an agency',
    body: 'Direct access to the technical operator running the campaigns.',
  },
];

export const MinimalBuying: React.FC = () => {
  const included = ITEMS.filter((i) => i.included).length;

  return (
    <section className="bl-display relative bg-[var(--sheet-page)]">
      <div className="bl-sheet relative mx-auto max-w-[1240px] bg-[var(--sheet-column)]">
        <div className="relative px-6 py-14 md:px-12 md:py-16">
          <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
          <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <div>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                What you&rsquo;re buying
              </span>
              <h2 className="mt-4 max-w-[18ch] text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-balance text-[var(--sheet-ink)] sm:text-4xl md:text-[2.75rem]">
                The whole of it,{' '}
                <span className="text-[var(--sheet-grey)]">stated plainly.</span>
              </h2>
            </div>
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
              Six things you get, including the one you don&rsquo;t.
            </p>
          </div>

          <div className="relative mt-10 border border-[var(--sheet-rule)] bg-white">
            <span className="bl-x" style={{ left: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--sheet-rule)] px-4 py-3 md:px-7">
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                Scope — included and excluded
              </span>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                {included} of {ITEMS.length} included
              </span>
            </div>

            {/* -mb-px -mr-px under overflow-hidden turns per-cell borders into
                shared hairlines without doubling against the box's border. */}
            <ul className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 -mb-px -mr-px">
              {ITEMS.map((item) => (
                <li
                  key={item.title}
                  className={`border-b border-r border-[var(--sheet-rule)] px-4 py-6 md:px-6 md:py-7 ${
                    item.included ? '' : 'bg-[var(--sheet-open)]'
                  }`}
                >
                  <span
                    className={`block size-2 ${
                      item.included
                        ? 'bg-[var(--sheet-ink)]'
                        : 'border border-[var(--sheet-open-line)] bg-white'
                    }`}
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 text-[1.0625rem] font-bold tracking-[-0.025em] text-[var(--sheet-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b6b68]">{item.body}</p>
                  <span className="sr-only">{item.included ? 'Included' : 'Not included'}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-6 border-t border-[var(--sheet-rule)] px-4 py-3 md:px-7">
              <span className="bl-mono flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.12em] text-[#9a9a96]">
                <i className="block size-2 bg-[var(--sheet-ink)]" aria-hidden="true" />
                Included
              </span>
              <span className="bl-mono flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.12em] text-[#9a9a96]">
                <i
                  className="block size-2 border border-[var(--sheet-open-line)] bg-white"
                  aria-hidden="true"
                />
                Deliberately not
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
