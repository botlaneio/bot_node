import React from 'react';

/**
 * Shared shell for the legal documents. They are drawn as what they are — a
 * specification: numbered clauses on the sheet, hairline dividers, monospaced
 * section numbers.
 *
 * The content of both documents is derived from what the code actually does
 * rather than from a template. Every processor named below appears in api/,
 * and every field listed is one the endpoints genuinely store.
 */

export interface Clause {
  heading: string;
  body: string[];
  list?: string[];
}

export const LAST_UPDATED = '31 August 2026';

const Corners: React.FC = () => (
  <>
    <span className="bl-x" style={{ left: -6, top: -6 }} aria-hidden="true" />
    <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />
    <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
    <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />
  </>
);

export const LegalPage: React.FC<{
  eyebrow: string;
  title: string;
  standfirst: string;
  clauses: Clause[];
}> = ({ eyebrow, title, standfirst, clauses }) => (
  <div className="bl-display relative bg-[var(--sheet-page)]">
    <div className="bl-sheet relative mx-auto max-w-[1240px] bg-[var(--sheet-column)]">
      <div className="bl-rules pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <i style={{ left: '16.666%' }} /><i style={{ left: '33.333%' }} />
        <i style={{ left: '50%' }} /><i style={{ left: '66.666%' }} />
        <i style={{ left: '83.333%' }} />
      </div>

      <div className="relative z-10 px-6 pt-28 pb-20 md:px-12 md:pt-32 md:pb-24">
        <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
        <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

        <header className="max-w-[62ch]">
          <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
            {eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-balance text-[var(--sheet-ink)] sm:text-4xl md:text-[3rem]">
            {title}
          </h1>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-[#6b6b68]">{standfirst}</p>
        </header>

        <div className="relative mt-10 border border-[var(--sheet-rule)] bg-white">
          <Corners />

          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--sheet-rule)] px-4 py-3 md:px-7">
            <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
              {clauses.length} clauses
            </span>
            <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
              Last updated {LAST_UPDATED}
            </span>
          </div>

          <ol className="m-0">
            {clauses.map((c, i) => (
              <li
                key={c.heading}
                className="grid border-b border-[var(--sheet-rule)] last:border-b-0 md:grid-cols-[5rem_minmax(0,1fr)]"
              >
                <div className="flex items-start px-4 pt-6 md:justify-center md:border-r md:border-[var(--sheet-rule)] md:px-0 md:py-8">
                  <span className="bl-mono text-sm tabular-nums text-[#9a9a96]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="px-4 pb-6 pt-2 md:px-7 md:py-8">
                  <h2 className="text-lg font-bold leading-snug tracking-[-0.025em] text-[var(--sheet-ink)]">
                    {c.heading}
                  </h2>
                  {c.body.map((p) => (
                    <p
                      key={p.slice(0, 32)}
                      className="mt-3 max-w-[68ch] text-[0.9375rem] leading-relaxed text-[#6b6b68]"
                    >
                      {p}
                    </p>
                  ))}
                  {c.list && (
                    <ul className="mt-4 border-t border-[var(--sheet-rule-soft)]">
                      {c.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 border-b border-[var(--sheet-rule-soft)] py-2.5"
                        >
                          <span
                            className="mt-[0.45rem] block size-1.5 shrink-0 bg-[var(--sheet-ink)]"
                            aria-hidden="true"
                          />
                          <span className="max-w-[64ch] text-[0.875rem] leading-relaxed text-[var(--sheet-ink)]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-[#6b6b68]">
          Questions about this document go to{' '}
          <a
            href="mailto:sales@botlane.io"
            className="font-semibold text-[var(--sheet-accent)] underline decoration-[var(--sheet-accent)]/35 underline-offset-4 transition-colors hover:decoration-[var(--sheet-accent)]"
          >
            sales@botlane.io
          </a>
          , or to Botlane Inc., 30 N Gould St Ste R, Sheridan, WY 82801.
        </p>
      </div>
    </div>
  </div>
);
