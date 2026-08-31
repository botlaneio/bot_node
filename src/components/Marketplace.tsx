import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, FEATURED_SYSTEMS, LIBRARY } from '../data/systemsData';

/** IDs are stored as "SYS-01" but appear lowercased in URLs. */
const systemPath = (id: string): string => `/systems/${id.toLowerCase()}`;

/**
 * Cards use the "stretched link" pattern: one real <Link> per card, whose
 * ::after is expanded to cover the whole card. The card stays clickable
 * anywhere by mouse, but there is exactly one focusable control, it carries a
 * genuine href, and it can be tabbed to, opened in a new tab, or read out by
 * a screen reader. Previously the card was a <div onClick> wrapping a
 * <button> that had no handler at all, so the entire catalogue — and with it
 * every system page — was unreachable without a mouse.
 *
 * Defined in index.css rather than composed from Tailwind utilities: it has to
 * live in a shared constant to avoid repeating it, and Tailwind's scanner does
 * not emit rules for classes it only ever sees inside a variable.
 */
const CARD_LINK = 'card-link';

const PROVISIONING = [
  {
    span: 'md:col-span-2',
    title: 'Production-ready artifacts',
    body: "You aren't buying a prompt. You're receiving compiled Docker images, Terraform deployment snippets, and serverless wrappers ready to push directly to your VPC.",
    label: 'Ships as',
    values: ['Dockerfile', 'main.tf', 'index.js'],
  },
  {
    span: 'md:col-span-1',
    dark: true,
    title: 'Enterprise security',
    body: 'Every system is built to sit inside your own boundary rather than beside it.',
    label: 'Guarantees',
    values: ['Zero data retention', 'Bring your own key', 'VPC / on-prem deployable'],
  },
  {
    span: 'md:col-span-1',
    title: 'Strict configuration',
    body: 'Map your specific data topologies using strictly typed JSON and YAML configuration schemas.',
    label: 'Schema',
    values: ['config.json', 'values.yaml'],
  },
  {
    span: 'md:col-span-2',
    title: 'Integration runbooks',
    body: 'Step-by-step documentation for authenticating with enterprise tools securely. Includes mock data structures and testing scripts for shadow environments.',
    label: 'Covers',
    values: ['AWS / GCP', 'Jira / Zendesk', 'Slack / Teams', 'Datadog'],
  },
];

const COMPLIANCE = [
  {
    title: 'Zero data retention',
    body: 'LLMs do not train on your client data. All transmissions are via strict API boundaries with ephemeral processing and immediate data destruction.',
  },
  {
    title: 'VPC-native deployment',
    body: 'Execute directly within your own AWS, GCP, or Azure Virtual Private Cloud. Your data never leaves your controlled infrastructure.',
  },
  {
    title: 'Compliance architecture',
    body: 'Designed to integrate into environments requiring SOC 2, HIPAA, and GDPR compliance, with complete audit logging capabilities.',
  },
];

const Reading: React.FC<{ label: string; values: string[]; dark?: boolean }> = ({
  label,
  values,
  dark,
}) => (
  <div
    className={
      dark
        ? 'border border-white/15 bg-white/[0.04] px-3 py-2.5'
        : 'border border-[var(--sheet-rule)] bg-[var(--sheet-open)] px-3 py-2.5'
    }
  >
    <p
      className={`bl-mono m-0 text-[0.5625rem] uppercase leading-[1.5] tracking-[0.16em] ${
        dark ? 'text-white/40' : 'text-[#9a9a96]'
      }`}
    >
      {label}
    </p>
    {values.map((v) => (
      <p
        key={v}
        className={`bl-mono m-0 mt-1.5 text-xs leading-[1.5] ${
          dark ? 'text-white/85' : 'text-[var(--sheet-ink)]'
        }`}
      >
        {v}
      </p>
    ))}
  </div>
);

const BlockHead: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--sheet-rule)] px-4 py-3 md:px-7">
    <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
      {left}
    </span>
    <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
      {right}
    </span>
  </div>
);

const Corners: React.FC = () => (
  <>
    <span className="bl-x" style={{ left: -6, top: -6 }} aria-hidden="true" />
    <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />
    <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
    <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />
  </>
);

interface MarketplaceProps {
  onOpenBooking?: () => void;
}

export default function Marketplace({ onOpenBooking }: MarketplaceProps) {
  const [activeCategory, setActiveCategory] = useState('All Systems');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLibrary = LIBRARY.filter((sys) => {
    const matchesCategory = activeCategory === 'All Systems' || sys.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      sys.name.toLowerCase().includes(q) || sys.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bl-display relative bg-[var(--sheet-page)]">
      <div className="bl-sheet relative mx-auto max-w-[1240px] bg-[var(--sheet-column)]">
        {/* Column rules run the whole catalogue, so the page reads as one sheet. */}
        <div className="bl-rules pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <i style={{ left: '16.666%' }} /><i style={{ left: '33.333%' }} />
          <i style={{ left: '50%' }} /><i style={{ left: '66.666%' }} />
          <i style={{ left: '83.333%' }} />
        </div>

        <div className="relative z-10 px-6 pt-28 pb-16 md:px-12 md:pt-32 md:pb-20">
          <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
          <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

          {/* ---------------- 01 · masthead ---------------- */}
          <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <div>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                Our systems
              </span>
              <h1 className="mt-4 max-w-[18ch] text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-balance text-[var(--sheet-ink)] sm:text-4xl md:text-[3.25rem]">
                The systems behind{' '}
                <span className="text-[var(--sheet-grey)]">the engagement.</span>
              </h1>
            </div>
            <div className="max-w-md">
              <p className="text-[0.9375rem] leading-relaxed text-[#6b6b68]">
                Four consultancies work with me directly, and every one of these systems is included
                in that engagement. The roster is capped. This is how everyone else gets the
                machinery without the retainer.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {['Included with the retainer', 'Or bought individually'].map((t) => (
                  <span
                    key={t}
                    className="bl-mono flex items-center gap-2.5 text-[0.625rem] uppercase tracking-[0.12em] text-[#6b6b68]"
                  >
                    <i className="block size-2 shrink-0 bg-[var(--sheet-ink)]" aria-hidden="true" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* ---------------- 02 · featured ---------------- */}
          <section className="relative mt-10 border border-[var(--sheet-rule)] bg-white">
            <Corners />
            <BlockHead left="Featured deployments" right="Highest ROI" />
            <div className="grid overflow-hidden md:grid-cols-3 -mb-px -mr-px">
              {FEATURED_SYSTEMS.map((sys) => (
                <article
                  key={sys.id}
                  className="relative flex flex-col border-b border-r border-[var(--sheet-rule)] px-4 py-6 transition-colors hover:bg-[#fcfcfb] md:px-6 md:py-7"
                >
                  <span className="bl-mono text-[0.625rem] uppercase tracking-[0.14em] text-[#9a9a96]">
                    {sys.category}
                  </span>
                  <h3 className="mt-3 text-lg font-bold tracking-[-0.025em] text-[var(--sheet-ink)]">
                    {sys.name}
                  </h3>
                  <p className="mt-2.5 flex-grow text-sm leading-relaxed text-[#6b6b68]">
                    {sys.solution}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-[var(--sheet-rule-soft)] pt-4">
                    <span className="bl-mono text-sm font-medium text-[var(--sheet-ink)]">
                      {sys.price}
                    </span>
                    <Link
                      to={systemPath(sys.id)}
                      aria-label={`View ${sys.name}`}
                      className={`bl-mono text-[0.625rem] uppercase tracking-[0.14em] text-[var(--sheet-accent)] underline decoration-[var(--sheet-accent)]/35 underline-offset-4 transition-colors hover:decoration-[var(--sheet-accent)] ${CARD_LINK}`}
                    >
                      View →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ---------------- 03 · filters ---------------- */}
          <div className="sticky top-[64px] z-30 -mx-6 mt-14 border-b border-[var(--sheet-rule)] bg-[var(--sheet-column)]/95 px-6 py-3 backdrop-blur md:-mx-12 md:px-12">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div className="scrollbar-hide -mb-1 flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto pb-1">
                {CATEGORIES.map((cat) => {
                  const active = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setActiveCategory(cat)}
                      className={`bl-mono shrink-0 border px-3 py-2 text-[0.625rem] whitespace-nowrap uppercase tracking-[0.12em] transition-colors ${
                        active
                          ? 'border-[var(--sheet-accent)] bg-[var(--sheet-accent)] text-[#fafafa]'
                          : 'border-[var(--sheet-rule)] bg-white text-[#6b6b68] hover:border-[var(--sheet-accent)] hover:text-[var(--sheet-accent)]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <div className="w-full shrink-0 md:w-64">
                <label htmlFor="library-search" className="sr-only">
                  Search the library
                </label>
                <input
                  id="library-search"
                  type="text"
                  placeholder="Search library…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full border border-[var(--sheet-rule)] bg-white px-3 text-sm text-[var(--sheet-ink)] outline-none transition-colors placeholder:text-[#9a9a96] focus:border-[var(--sheet-accent)]"
                />
              </div>
            </div>
          </div>

          {/* ---------------- 04 · library ---------------- */}
          <section className="relative mt-6 border border-[var(--sheet-rule)] bg-white">
            <Corners />
            <BlockHead
              left="Library"
              right={`${filteredLibrary.length} of ${LIBRARY.length} systems`}
            />

            {filteredLibrary.length === 0 ? (
              <div className="px-4 py-20 text-center md:px-7">
                <p className="text-[0.9375rem] text-[#6b6b68]">
                  No systems match those filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('All Systems');
                    setSearchQuery('');
                  }}
                  className="bl-mono mt-4 text-[0.625rem] uppercase tracking-[0.14em] text-[var(--sheet-ink)] underline decoration-[var(--sheet-rule)] underline-offset-4 hover:decoration-[var(--sheet-ink)]"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid overflow-hidden md:grid-cols-2 lg:grid-cols-3 -mb-px -mr-px">
                {filteredLibrary.map((sys) => (
                  <article
                    key={sys.id}
                    className="relative flex flex-col border-b border-r border-[var(--sheet-rule)] px-4 py-6 transition-colors hover:bg-[#fcfcfb] md:px-6 md:py-7"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="bl-mono text-[0.625rem] uppercase tracking-[0.14em] text-[#9a9a96]">
                        {sys.category}
                      </span>
                      {sys.status === 'Beta' && (
                        <span className="bl-mono shrink-0 border border-[var(--sheet-open-line)] bg-[var(--sheet-open)] px-1.5 py-0.5 text-[0.5625rem] uppercase tracking-[0.14em] text-[#6b6b68]">
                          Beta
                        </span>
                      )}
                      {sys.status === 'Updated' && (
                        <span className="bl-mono shrink-0 bg-[var(--sheet-ink)] px-1.5 py-0.5 text-[0.5625rem] uppercase tracking-[0.14em] text-[#fafafa]">
                          Updated
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 text-lg font-bold tracking-[-0.025em] text-[var(--sheet-ink)]">
                      {sys.name}
                    </h3>
                    <p className="mt-2.5 flex-grow text-sm leading-relaxed text-[#6b6b68]">
                      {sys.description}
                    </p>

                    <dl className="mt-5 border-t border-[var(--sheet-rule-soft)]">
                      <div className="flex justify-between gap-3 border-b border-[var(--sheet-rule-soft)] py-2">
                        <dt className="bl-mono text-[0.5625rem] uppercase tracking-[0.14em] text-[#9a9a96]">
                          Connects to
                        </dt>
                        <dd className="bl-mono m-0 text-right text-[0.6875rem] text-[var(--sheet-ink)]">
                          {sys.connectsTo}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3 py-2">
                        <dt className="bl-mono text-[0.5625rem] uppercase tracking-[0.14em] text-[#9a9a96]">
                          Output
                        </dt>
                        <dd className="bl-mono m-0 text-right text-[0.6875rem] text-[var(--sheet-ink)]">
                          {sys.output}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="bl-mono text-sm font-medium text-[var(--sheet-ink)]">
                        {sys.price}
                      </span>
                      <Link
                        to={systemPath(sys.id)}
                        aria-label={`Details for ${sys.name}`}
                        className={`bl-mono text-[0.625rem] uppercase tracking-[0.14em] text-[var(--sheet-accent)] underline decoration-[var(--sheet-accent)]/35 underline-offset-4 transition-colors hover:decoration-[var(--sheet-accent)] ${CARD_LINK}`}
                      >
                        Details →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* ---------------- 05 · provisioning ---------------- */}
          <section className="relative mt-14 border border-[var(--sheet-rule)] bg-white">
            <Corners />
            <BlockHead left="Technical provisioning" right="What you receive" />
            <p className="border-b border-[var(--sheet-rule)] px-4 py-4 text-sm leading-relaxed text-[#6b6b68] md:px-7">
              What you actually receive when acquiring a system. Retainer clients receive all of it,
              for every system, as part of the engagement.
            </p>

            <div className="grid overflow-hidden md:grid-cols-3 -mb-px -mr-px">
              {PROVISIONING.map((p) => (
                <div
                  key={p.title}
                  className={`${p.span} border-b border-r border-[var(--sheet-rule)] px-4 py-6 md:px-6 md:py-7 ${
                    p.dark ? 'bg-[var(--sheet-ink)]' : ''
                  }`}
                >
                  <h3
                    className={`text-lg font-bold tracking-[-0.025em] ${
                      p.dark ? 'text-[#fafafa]' : 'text-[var(--sheet-ink)]'
                    }`}
                  >
                    {p.title}
                  </h3>
                  <p
                    className={`mt-2.5 max-w-md text-sm leading-relaxed ${
                      p.dark ? 'text-white/60' : 'text-[#6b6b68]'
                    }`}
                  >
                    {p.body}
                  </p>
                  <div className="mt-5">
                    <Reading label={p.label} values={p.values} dark={p.dark} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- 06 · compliance ---------------- */}
          <section className="relative mt-4 border border-[var(--sheet-rule)] bg-white">
            <Corners />
            <BlockHead left="Security & compliance" right="Enterprise grade" />
            <p className="border-b border-[var(--sheet-rule)] px-4 py-4 text-sm leading-relaxed text-[#6b6b68] md:px-7">
              MSPs and consultancies cannot compromise on client data. Every system is architected to
              meet strict compliance requirements out of the box.
            </p>
            <div className="grid overflow-hidden md:grid-cols-3 -mb-px -mr-px">
              {COMPLIANCE.map((c) => (
                <div
                  key={c.title}
                  className="border-b border-r border-[var(--sheet-rule)] px-4 py-6 md:px-6 md:py-7"
                >
                  <span className="block size-2 bg-[var(--sheet-ink)]" aria-hidden="true" />
                  <h3 className="mt-4 text-[1.0625rem] font-bold tracking-[-0.025em] text-[var(--sheet-ink)]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b6b68]">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- 07 · retainer note ---------------- */}
          <div className="bl-on-dark relative mt-4 bg-[var(--sheet-ink)] px-6 py-10 md:px-10 md:py-14">
            <Corners />
            <div className="max-w-2xl">
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#8a8a86]">
                Run by you, or run for you
              </span>
              <h2 className="mt-4 text-2xl font-bold leading-[1.1] tracking-[-0.035em] text-balance text-[#fafafa] md:text-[2rem]">
                Would you rather not run any of it?
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-[#a3a3a0]">
                Buying a system means you deploy it, adapt it, and maintain it. The retainer means I
                do all of that, plus the domains, the signal research, and the sending &mdash; and
                every system on this page comes with it.
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#a3a3a0]">
                Four consultancies at a time, so no two clients ever chase the same opening. Slots
                open as engagements end.
              </p>
              <button
                type="button"
                onClick={onOpenBooking}
                className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-[var(--sheet-accent-on-dark)] px-6 text-[0.9375rem] font-semibold text-[#fafafa] transition-colors hover:bg-[var(--sheet-accent-on-dark-hover)]"
              >
                Check slot availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
