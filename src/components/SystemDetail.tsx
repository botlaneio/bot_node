import React, { useEffect, useState } from 'react';
import { BuySystem } from './BuySystem';
import { FEATURED_SYSTEMS, LIBRARY, SystemData } from '../data/systemsData';

interface SystemDetailProps {
  systemId: string;
  onBack: () => void;
  onOpenBooking: () => void;
}

const DEFAULT_FEATURES = [
  'Zero-maintenance architecture',
  'Fully white-labeled for your agency',
  'Seamless CI/CD integration',
  'Enterprise-grade security defaults',
  'Customizable webhooks & alerts',
  'Comprehensive documentation included',
];

/** A titled block on the sheet. Sections only render when they have content. */
const Block: React.FC<{ title: string; note?: string; children: React.ReactNode }> = ({
  title,
  note,
  children,
}) => (
  <section className="relative border border-[var(--sheet-rule)] bg-white">
    <div className="border-b border-[var(--sheet-rule)] px-4 py-3 md:px-6">
      <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
        {title}
      </span>
    </div>
    {note ? (
      <p className="border-b border-[var(--sheet-rule)] px-4 py-3.5 text-sm leading-relaxed text-[#6b6b68] md:px-6">
        {note}
      </p>
    ) : null}
    {children}
  </section>
);

/** Hairline rows carrying a marker: filled is affirmed, open is not. */
const MarkedList: React.FC<{ items: string[]; affirmed?: boolean; ordered?: boolean }> = ({
  items,
  affirmed = true,
  ordered = false,
}) => {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className="m-0">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-start gap-3.5 border-b border-[var(--sheet-rule-soft)] px-4 py-3 last:border-b-0 md:px-6"
        >
          {ordered ? (
            <span className="bl-mono mt-[0.15rem] w-5 shrink-0 text-[0.6875rem] tabular-nums text-[#9a9a96]">
              {String(i + 1).padStart(2, '0')}
            </span>
          ) : (
            <span
              className={`mt-[0.45rem] block size-2 shrink-0 ${
                affirmed
                  ? 'bg-[var(--sheet-ink)]'
                  : 'border border-[var(--sheet-open-line)] bg-white'
              }`}
              aria-hidden="true"
            />
          )}
          <span className="text-[0.9375rem] leading-relaxed text-[var(--sheet-ink)]">{item}</span>
        </li>
      ))}
    </Tag>
  );
};

export const SystemDetail: React.FC<SystemDetailProps> = ({ systemId, onBack, onOpenBooking }) => {
  const [system, setSystem] = useState<SystemData | null>(null);

  useEffect(() => {
    // Small timeout ensures the DOM has updated before forcing scroll
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 10);
    const found = [...FEATURED_SYSTEMS, ...LIBRARY].find((s) => s.id === systemId);
    setSystem(found || null);
  }, [systemId]);

  if (!system) {
    return (
      <div className="bl-display flex min-h-screen items-center justify-center bg-[var(--sheet-page)] pt-32 pb-24">
        <p className="text-[#6b6b68]">System not found.</p>
      </div>
    );
  }

  const specs = [
    ['Built for', system.builtFor || 'DevOps consultancies'],
    ['Connects to', system.connectsTo || 'AWS, GCP, Azure'],
    ['Output', system.output || 'Custom dashboards'],
    ['Deployment', system.deployment || '< 1 hour'],
  ];

  return (
    <div className="bl-display relative bg-[var(--sheet-page)]">
      <div className="bl-sheet relative mx-auto max-w-[1240px] bg-[var(--sheet-column)]">
        <div className="bl-rules pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <i style={{ left: '16.666%' }} /><i style={{ left: '33.333%' }} />
          <i style={{ left: '50%' }} /><i style={{ left: '66.666%' }} />
          <i style={{ left: '83.333%' }} />
        </div>

        <div className="relative z-10 px-6 pt-28 pb-16 md:px-12 md:pt-32 md:pb-24">
          <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
          <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

          <button
            type="button"
            onClick={onBack}
            className="bl-mono text-[0.625rem] uppercase tracking-[0.14em] text-[var(--sheet-accent)] underline decoration-[var(--sheet-accent)]/35 underline-offset-4 transition-colors hover:decoration-[var(--sheet-accent)]"
          >
            ← Back to systems
          </button>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
            {/* ---------------- datasheet ---------------- */}
            <div>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                {system.category} · {system.id}
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-balance text-[var(--sheet-ink)] sm:text-4xl md:text-[3rem]">
                {system.name}
              </h1>
              <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-[#6b6b68]">
                {system.longDescription ||
                  system.description ||
                  system.solution ||
                  'An enterprise-grade system designed specifically for DevOps consultancies.'}
              </p>

              <div className="mt-10 flex flex-col gap-4">
                {system.problem ? (
                  <Block title="The problem">
                    <p className="px-4 py-4 leading-relaxed text-[var(--sheet-ink)] md:px-6">
                      {system.problem}
                    </p>
                  </Block>
                ) : null}

                {system.outcome ? (
                  <Block title="The outcome">
                    <p className="px-4 py-4 font-medium leading-relaxed text-[var(--sheet-ink)] md:px-6">
                      {system.outcome}
                    </p>
                  </Block>
                ) : null}

                {system.howItWorks ? (
                  <Block title="How it works">
                    <p className="px-4 py-4 leading-relaxed text-[var(--sheet-ink)] md:px-6">
                      {system.howItWorks}
                    </p>
                  </Block>
                ) : null}

                <Block title="Key features">
                  <MarkedList items={system.keyFeatures || DEFAULT_FEATURES} />
                </Block>

                {/* ---- Pre-purchase detail. Each block renders only when the
                     corresponding field exists in systemsData, so a partially
                     documented system degrades cleanly instead of showing gaps. ---- */}

                {system.prerequisites?.length ? (
                  <Block
                    title="Before you buy"
                    note="You will need these already in place. If any are missing, this system will not run out of the box."
                  >
                    <MarkedList items={system.prerequisites} />
                  </Block>
                ) : null}

                {system.whatYouGet?.length ? (
                  <Block title="What you get">
                    <MarkedList items={system.whatYouGet} />
                  </Block>
                ) : null}

                {system.setupSteps?.length ? (
                  <Block title="Setup">
                    <MarkedList items={system.setupSteps} ordered />
                  </Block>
                ) : null}

                {system.sampleOutput ? (
                  <Block title={`Sample output — ${system.sampleOutput.label}`}>
                    <pre className="bl-mono overflow-x-auto px-4 py-4 text-[0.8125rem] leading-relaxed whitespace-pre-wrap text-[var(--sheet-ink)] md:px-6">
{system.sampleOutput.body}
                    </pre>
                  </Block>
                ) : null}

                {system.limitations?.length ? (
                  <Block
                    title="What it does not do"
                    note="Worth knowing before you buy rather than after."
                  >
                    <MarkedList items={system.limitations} affirmed={false} />
                  </Block>
                ) : null}

                {system.runningCosts || system.updatePolicy || system.licenceScope ? (
                  <Block title="The fine print">
                    <dl className="m-0">
                      {([
                        ['Running costs', system.runningCosts],
                        ['Updates', system.updatePolicy],
                        ['Licence', system.licenceScope],
                      ] as const)
                        .filter(([, v]) => Boolean(v))
                        .map(([k, v]) => (
                          <div
                            key={k}
                            className="border-b border-[var(--sheet-rule-soft)] px-4 py-3.5 last:border-b-0 md:px-6"
                          >
                            <dt className="bl-mono text-[0.5625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                              {k}
                            </dt>
                            <dd className="m-0 mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--sheet-ink)]">
                              {v}
                            </dd>
                          </div>
                        ))}
                    </dl>
                  </Block>
                ) : null}
              </div>
            </div>

            {/* ---------------- purchase panel ---------------- */}
            <div className="relative">
              <div className="sticky top-24 border border-[var(--sheet-rule)] bg-white">
                <span className="bl-x" style={{ left: -6, top: -6 }} aria-hidden="true" />
                <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />

                <div className="border-b border-[var(--sheet-rule)] px-5 py-3 md:px-6">
                  <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                    One-time licence
                  </span>
                </div>

                <div className="px-5 py-6 md:px-6">
                  <p className="text-4xl font-bold tracking-[-0.05em] tabular-nums text-[var(--sheet-ink)]">
                    {system.price}
                  </p>

                  <div className="mt-6">
                    <BuySystem systemId={system.id} systemName={system.name} price={system.price} />
                  </div>

                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="mt-3 flex h-12 w-full items-center justify-center rounded-lg border border-[var(--sheet-rule)] bg-white text-[0.9375rem] font-semibold text-[var(--sheet-ink)] transition-colors hover:border-[var(--sheet-accent)] hover:text-[var(--sheet-accent)]"
                  >
                    Have it run for you instead
                  </button>
                </div>

                <dl className="m-0 border-t border-[var(--sheet-rule)]">
                  {specs.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-4 border-b border-[var(--sheet-rule-soft)] px-5 py-3 last:border-b-0 md:px-6"
                    >
                      <dt className="bl-mono shrink-0 text-[0.5625rem] uppercase tracking-[0.14em] text-[#9a9a96]">
                        {k}
                      </dt>
                      <dd className="bl-mono m-0 text-right text-[0.6875rem] text-[var(--sheet-ink)]">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
