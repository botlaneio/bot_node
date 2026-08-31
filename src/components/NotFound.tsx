import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => (
  <div className="bl-display relative bg-[var(--sheet-page)]">
    <div className="bl-sheet relative mx-auto max-w-[1240px] bg-[var(--sheet-column)]">
      <div className="bl-rules pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <i style={{ left: '16.666%' }} /><i style={{ left: '33.333%' }} />
        <i style={{ left: '50%' }} /><i style={{ left: '66.666%' }} />
        <i style={{ left: '83.333%' }} />
      </div>

      <section className="relative z-10 px-6 pt-40 pb-32 md:px-12">
        <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
        <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

        <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
          Error 404
        </span>
        <h1 className="mt-4 max-w-[16ch] text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-balance text-[var(--sheet-ink)] md:text-[2.75rem]">
          That page{' '}
          <span className="text-[var(--sheet-grey)]">doesn&rsquo;t exist.</span>
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-[#6b6b68]">
          The link may be out of date, or the system you&rsquo;re looking for has been renamed.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[var(--sheet-accent)] px-5 text-sm font-semibold text-[#fafafa] transition-colors hover:bg-[var(--sheet-accent-hover)]"
          >
            Back to the homepage
          </Link>
          <Link
            to="/systems"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[var(--sheet-rule)] bg-white px-5 text-sm font-semibold text-[var(--sheet-ink)] transition-colors hover:border-[var(--sheet-accent)] hover:text-[var(--sheet-accent)]"
          >
            Browse the systems
          </Link>
        </div>
      </section>
    </div>
  </div>
);
