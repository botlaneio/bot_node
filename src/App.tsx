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

// Split out of the main bundle: neither is needed to render the landing page.
const Marketplace = lazy(() => import('./components/Marketplace'));
const SystemDetail = lazy(() =>
  import('./components/SystemDetail').then((m) => ({ default: m.SystemDetail }))
);

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

function MarketplacePage({ onOpenBooking }: { onOpenBooking: () => void }) {
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

  if (!match) return <NotFound />;

  return (
    <SystemDetail
      systemId={match.id}
      onBack={() => navigate('/systems')}
      onOpenBooking={onOpenBooking}
    />
  );
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
    <div className="min-h-screen font-sans text-[#0d0d0d] selection:bg-[#0a0a0a] selection:text-white">
      <ScrollManager />
      <ProgressBar />
      <MinimalNavbar onOpenBooking={openBooking} />

      <main className="bg-[#f2f2f0]">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes>
            <Route path="/" element={<LandingPage onOpenBooking={openBooking} />} />
            <Route path="/systems" element={<MarketplacePage onOpenBooking={openBooking} />} />
            <Route
              path="/systems/:systemId"
              element={<SystemDetailPage onOpenBooking={openBooking} />}
            />
            <Route path="/systems/:systemId/complete" element={<PurchaseComplete />} />
            {/* Legacy path kept so older shared links still resolve. */}
            <Route path="/marketplace" element={<Navigate to="/systems" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <MinimalFooter onOpenBooking={openBooking} />
      </main>

      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
