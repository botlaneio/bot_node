import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { BOTLANE_FAQS } from '../data/botlaneData';

export const MinimalFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion() ?? false;

  const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section id="faq" className="bl-display relative scroll-mt-24 bg-[var(--sheet-page)]">
      <div className="bl-sheet relative mx-auto max-w-[1240px] bg-[var(--sheet-column)]">
        <div className="relative px-6 py-14 md:px-12 md:py-16">
          <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
          <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <div>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                FAQ
              </span>
              <h2 className="mt-4 max-w-[18ch] text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-balance text-[var(--sheet-ink)] sm:text-4xl md:text-[2.75rem]">
                Questions.{' '}
                <span className="text-[var(--sheet-grey)]">Answered.</span>
              </h2>
            </div>
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-[#6b6b68]">
              Anything else, email{' '}
              <a
                href="mailto:sales@botlane.io"
                className="font-semibold text-[var(--sheet-accent)] underline decoration-[var(--sheet-accent)]/35 underline-offset-4 transition-colors hover:decoration-[var(--sheet-accent)]"
              >
                sales@botlane.io
              </a>
              .
            </p>
          </div>

          <div className="relative mt-10 border border-[var(--sheet-rule)] bg-white">
            <span className="bl-x" style={{ left: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, top: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ left: -6, bottom: -6 }} aria-hidden="true" />
            <span className="bl-x" style={{ right: -6, bottom: -6 }} aria-hidden="true" />

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--sheet-rule)] px-4 py-3 md:px-7">
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                Notes — common questions
              </span>
              <span className="bl-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#9a9a96]">
                {BOTLANE_FAQS.length} entries
              </span>
            </div>

            <dl className="m-0">
              {BOTLANE_FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                const id = `faq-panel-${idx}`;
                return (
                  <div
                    key={faq.question}
                    className="border-b border-[var(--sheet-rule)] last:border-b-0"
                  >
                    <dt className="m-0">
                      <button
                        type="button"
                        onClick={() => toggle(idx)}
                        aria-expanded={isOpen}
                        aria-controls={id}
                        className="flex w-full cursor-pointer items-center justify-between gap-6 px-4 py-4 text-left transition-colors hover:bg-[#fcfcfb] md:px-7 md:py-5"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="bl-mono shrink-0 text-[0.625rem] tabular-nums tracking-[0.16em] text-[#9a9a96]">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[0.9375rem] font-semibold tracking-[-0.015em] text-[var(--sheet-ink)]">
                            {faq.question}
                          </span>
                        </span>
                        {/* A drawn plus/minus rather than a rotating icon. */}
                        <span
                          className="bl-mono shrink-0 text-sm leading-none text-[#9a9a96]"
                          aria-hidden="true"
                        >
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                    </dt>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.dd
                          id={id}
                          className="m-0 overflow-hidden"
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={reduced ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p className="max-w-[70ch] px-4 pb-5 pl-[3.4rem] text-[0.9375rem] leading-relaxed text-[#6b6b68] md:px-7 md:pl-[4.4rem]">
                            {faq.answer}
                          </p>
                        </motion.dd>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
