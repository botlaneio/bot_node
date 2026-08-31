import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BOTLANE_FAQS } from '../data/botlaneData';

export const MinimalFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-24 py-16 md:py-24 border-b border-[#e3e3e0]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-6">
          <span className="eyebrow inline-flex w-fit items-center gap-2 rounded-[var(--radius-control)] border px-3 py-1.5 mx-auto border-[#e3e3e0] bg-white text-[#6b6b68]">
            <span className="size-1.5 rounded-full bg-[#0d0d0d]"></span>
            FAQ
          </span>
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="max-w-2xl text-3xl font-medium tracking-[-0.02em] text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.08] text-[#0d0d0d]">
              Questions? Answers!
            </h2>
          </div>
        </div>

        {/* Minimal Accordion List */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
          {BOTLANE_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-[var(--radius-card)] border border-[#e3e3e0] bg-white transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left text-[0.9375rem] font-medium text-[#0d0d0d]"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-[var(--radius-control)] border transition-all duration-200 ${
                      isOpen
                        ? 'rotate-45 border-[#0d0d0d] bg-[#0a0a0a] text-white'
                        : 'border-[#e3e3e0] text-[#6b6b68]'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <p className="px-6 pb-5 text-[0.9375rem] leading-relaxed text-[#6b6b68]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Contact Note */}
        <p className="mt-8 text-center text-sm text-[#6b6b68]">
          Have any other question? Email{' '}
          <a
            href="mailto:sales@botlane.io"
            className="font-medium text-[#0d0d0d] underline underline-offset-4 hover:no-underline"
          >
            sales@botlane.io
          </a>
        </p>
      </div>
    </section>
  );
};
