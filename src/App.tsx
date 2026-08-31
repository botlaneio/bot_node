import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { MinimalNavbar } from './components/MinimalNavbar';
import { MinimalHero } from './components/MinimalHero';
import { MinimalStats } from './components/MinimalStats';
import { MinimalFeatures } from './components/MinimalFeatures';
import { MinimalHowItWorks } from './components/MinimalHowItWorks';
import { MinimalPricing } from './components/MinimalPricing';
import { MinimalFaq } from './components/MinimalFaq';
import { MinimalBuying } from './components/MinimalBuying';
import { MinimalFooter } from './components/MinimalFooter';
import { SkeletonLoader } from './components/SkeletonLoader';
import { ProgressBar } from './components/ProgressBar';
import { ApplicationModal } from './components/ApplicationModal';
import { NotFound } from './components/NotFound';
import { PurchaseComplete } from './components/PurchaseComplete';
import { ALL_SYSTEMS } from './data/systemsData';
import { LegalPage } from './components/LegalPage';
import { PRIVACY, TERMS } from './data/legalData';
import { DOCS } from './data/docsData';

// Split out of the main bundle: neither is needed to render the landing page.
const Marketplace = lazy(() => import('./components/Marketplace'));
const SystemDetail = lazy(() =>
  import('./components/SystemDetail').then((m) => ({ default: m.SystemDetail }))
);

const SITE_NAME = 'Botlane';

/** Creates the tag if it is missing, updates it if it is not. */
function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Per-route title, description and canonical.
 *
 * This is a single-page app with no server rendering, so every route used to
 * serve the landing page's title and description — the eight system pages were
 * indistinguishable to anything reading the document head.
 *
 * The canonical is built from the live origin rather than a hardcoded domain,
 * so preview deployments describe themselves rather than pointing at
 * production. It is deliberately absent from index.html: a static canonical
 * would tell crawlers that every route is really the homepage, which is worse
 * than having none at all.
 */
function useDocumentMeta(title: string, description: string, noIndex = false) {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = `${window.location.origin}${pathname}`;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertCanonical(url);

    // Thank-you and error pages are real URLs but nothing worth indexing.
    const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noIndex) {
      upsertMeta('name', 'robots', 'noindex');
    } else if (robots) {
      robots.remove();
    }
  }, [title, description, noIndex, pathname]);
}

/**
 * Scrolls to the top on route change, or to the hash target when one is
 * present. Without this, navigation keeps the previous scroll position.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has mounted.
      const frame = requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

function LandingPage({ onOpenBooking }: { onOpenBooking: () => void }) {
  const navigate = useNavigate();
  useDocumentMeta(
    `${SITE_NAME} — Outbound Infrastructure for DevOps Consultancies`,
    'Outbound infrastructure for DevOps consultancies. We find companies with stalled infrastructure roles and put you in front of them.'
  );
  return (
    <>
      <MinimalHero onOpenBooking={onOpenBooking} />
      <MinimalStats />
      <MinimalFeatures />
      <MinimalHowItWorks />
      <MinimalPricing onOpenBooking={onOpenBooking} onViewSystems={() => navigate('/systems')} />
      <MinimalBuying />
      <MinimalFaq />
    </>
  );
}

function DocsPage() {
  useDocumentMeta(
    `Documentation — ${SITE_NAME}`,
    'How the retainer runs week by week, what Botlane needs from you, and what a purchased system contains and requires.'
  );
  return (
    <LegalPage
      eyebrow="Documentation"
      title="How it runs"
      standfirst="Operating notes for both halves of Botlane: the retainer we run for you, and the systems you deploy yourself."
      clauses={DOCS}
    />
  );
}

function PrivacyPage() {
  useDocumentMeta(
    `Privacy — ${SITE_NAME}`,
    'What Botlane collects, why, who processes it, and how long it is kept. No analytics, no cookies, no tracking.'
  );
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      standfirst="We collect nothing until you send it. This document says exactly what is stored, who touches it, and how to have it removed."
      clauses={PRIVACY}
    />
  );
}

function TermsPage() {
  useDocumentMeta(
    `Terms — ${SITE_NAME}`,
    'The terms covering Botlane retainers and system licences: fees, cancellation, what is promised and what is not.'
  );
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of service"
      standfirst="What we commit to, what we deliberately do not promise, and the terms that apply to a retainer or a system licence."
      clauses={TERMS}
    />
  );
}

function MarketplacePage({ onOpenBooking }: { onOpenBooking: () => void }) {
  useDocumentMeta(
    `Systems — ${SITE_NAME}`,
    'Eight systems built for DevOps consultancies: status reporting, incident intelligence, RFP responses, infrastructure audits and more. Included with the retainer, or bought individually.'
  );
  // Cards carry their own <Link>, so there is no navigation callback to thread
  // through — which is also what makes them reachable by keyboard.
  return <Marketplace onOpenBooking={onOpenBooking} />;
}

function SystemDetailPage({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { systemId } = useParams<{ systemId: string }>();
  const navigate = useNavigate();

  // IDs are stored as "SYS-01" but appear lowercased in URLs.
  const match = ALL_SYSTEMS.find(
    (s) => s.id.toLowerCase() === (systemId || '').toLowerCase()
  );

  // Called before the early return: hooks cannot run conditionally.
  useDocumentMeta(
    match ? `${match.name} — ${SITE_NAME}` : `Page not found — ${SITE_NAME}`,
    match
      ? match.solution || match.description || match.longDescription || ''
      : 'That page does not exist.',
    !match
  );

  if (!match) return <NotFound />;

  return (
    <SystemDetail
      systemId={match.id}
      onBack={() => navigate('/systems')}
      onOpenBooking={onOpenBooking}
    />
  );
}

function PurchaseCompletePage() {
  useDocumentMeta(`Purchase complete — ${SITE_NAME}`, 'Your purchase is confirmed.', true);
  return <PurchaseComplete />;
}

function NotFoundPage() {
  useDocumentMeta(`Page not found — ${SITE_NAME}`, 'That page does not exist.', true);
  return <NotFound />;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Short hold so the skeleton does not flash, rather than the old fixed 1200ms.
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const openBooking = () => setIsModalOpen(true);

  if (loading) return <SkeletonLoader />;

  return (
    <div className="min-h-screen text-[#0d0d0d]">
      <ScrollManager />
      <ProgressBar />
      <MinimalNavbar onOpenBooking={openBooking} />

      {/* px-[14px]: the drawing sheet's inset, applied once so every
          section aligns to the same origin. */}
      <main className="bg-[#f2f2f0] px-[14px]">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes>
            <Route path="/" element={<LandingPage onOpenBooking={openBooking} />} />
            <Route path="/systems" element={<MarketplacePage onOpenBooking={openBooking} />} />
            <Route
              path="/systems/:systemId"
              element={<SystemDetailPage onOpenBooking={openBooking} />}
            />
            <Route path="/systems/:systemId/complete" element={<PurchaseCompletePage />} />
            {/* Legacy path kept so older shared links still resolve. */}
            <Route path="/marketplace" element={<Navigate to="/systems" replace />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        <MinimalFooter onOpenBooking={openBooking} />
      </main>

      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
