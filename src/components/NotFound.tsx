import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => (
  <section className="px-6 md:px-12 max-w-[1240px] mx-auto pt-40 pb-32 text-center">
    <span className="eyebrow text-[var(--color-ink-muted)]">404</span>
    <h1 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-[#0d0d0d]">
      That page doesn't exist.
    </h1>
    <p className="mt-3 text-[#6b6b68] max-w-md mx-auto leading-relaxed">
      The link may be out of date, or the system you're looking for has been renamed.
    </p>
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
      <Link
        to="/"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[#0a0a0a] px-5 text-sm font-medium text-white transition-colors hover:bg-[#242424]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to the homepage
      </Link>
      <Link
        to="/systems"
        className="inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] border border-[#e3e3e0] px-5 text-sm font-medium text-[#0d0d0d] transition-colors hover:bg-white"
      >
        Browse the systems
      </Link>
    </div>
  </section>
);
