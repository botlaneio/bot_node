import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Check, Github, Mail, ArrowRight } from 'lucide-react';
import { ALL_SYSTEMS } from '../data/systemsData';

/**
 * Where Stripe redirects after a successful payment.
 *
 * This page deliberately does not confirm fulfilment. Access is granted by the
 * webhook, which may land a second or two after this renders, so promising
 * "you now have access" here could be a lie. It describes what happens next.
 */
export const PurchaseComplete: React.FC = () => {
  const { systemId } = useParams<{ systemId: string }>();
  const [params] = useSearchParams();
  const paid = Boolean(params.get('session_id'));

  const system = ALL_SYSTEMS.find(
    (s) => s.id.toLowerCase() === (systemId || '').toLowerCase()
  );

  if (!paid) {
    return (
      <section className="px-5 md:px-8 max-w-[1180px] mx-auto pt-40 pb-32 text-center">
        <h1 className="text-2xl font-medium tracking-tight text-[#0d0d0d]">
          Nothing to confirm here.
        </h1>
        <p className="mt-3 text-[#6b6b68]">This page appears after a completed purchase.</p>
        <Link
          to="/systems"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] bg-[#0a0a0a] px-5 text-sm font-medium text-white"
        >
          Browse the systems
        </Link>
      </section>
    );
  }

  return (
    <section className="px-5 md:px-8 max-w-[640px] mx-auto pt-40 pb-32">
      <div className="rounded-[var(--radius-panel)] border border-[var(--color-line)] bg-white p-8 md:p-10">
        <div className="grid size-12 place-items-center rounded-full border border-[#D1E6D8] bg-[#F2F8F4] text-emerald-800">
          <Check className="w-6 h-6" />
        </div>

        <h1 className="mt-6 text-2xl md:text-3xl font-medium tracking-tight text-[#0d0d0d]">
          Payment received{system ? ` for ${system.name}` : ''}.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#6b6b68]">
          Here is what happens next, usually within a minute.
        </p>

        <ul className="mt-8 space-y-5">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-[var(--radius-control)] bg-[#0a0a0a] text-white">
              <Github className="w-3.5 h-3.5" />
            </span>
            <div>
              <p className="text-sm font-medium text-[#0d0d0d]">A GitHub invitation</p>
              <p className="mt-1 text-sm leading-relaxed text-[#6b6b68]">
                Sent to the username you gave at checkout. Accept it to get the repository,
                Dockerfile, and integration runbook.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-[var(--radius-control)] bg-[#0a0a0a] text-white">
              <Mail className="w-3.5 h-3.5" />
            </span>
            <div>
              <p className="text-sm font-medium text-[#0d0d0d]">A confirmation email</p>
              <p className="mt-1 text-sm leading-relaxed text-[#6b6b68]">
                With your receipt from Stripe and the same access details.
              </p>
            </div>
          </li>
        </ul>

        <p className="mt-8 rounded-[var(--radius-control)] border border-[var(--color-line)] bg-[var(--color-sunken)] p-4 text-sm leading-relaxed text-[#6b6b68]">
          Nothing after ten minutes? Email <strong className="text-[#0d0d0d]">sales@botlane.io</strong> and
          I'll sort it manually. Your payment is recorded either way.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/systems"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[#0a0a0a] px-5 text-sm font-medium text-white transition-colors hover:bg-[#242424]"
          >
            Browse more systems <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-line)] px-5 text-sm font-medium text-[#0d0d0d] transition-colors hover:bg-[var(--color-sunken)]"
          >
            Back to the homepage
          </Link>
        </div>
      </div>
    </section>
  );
};
