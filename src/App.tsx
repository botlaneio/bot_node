import React, { useState, useEffect } from 'react';
import { MinimalNavbar } from './components/MinimalNavbar';
import { MinimalHero } from './components/MinimalHero';
import { MinimalStats } from './components/MinimalStats';
import { MinimalFeatures } from './components/MinimalFeatures';
import { MinimalHowItWorks } from './components/MinimalHowItWorks';
import { MinimalPricing } from './components/MinimalPricing';
import { MinimalFaq } from './components/MinimalFaq';
import { MinimalBuying } from './components/MinimalBuying';
import { MinimalFooter } from './components/MinimalFooter';
import Marketplace from './components/Marketplace';
import { SystemDetail } from './components/SystemDetail';
import { SkeletonLoader } from './components/SkeletonLoader';
import { ProgressBar } from './components/ProgressBar';
import { ApplicationModal } from './components/ApplicationModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'marketplace' | 'system_detail'>('landing');
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="min-h-screen font-sans text-[#0d0d0d] selection:bg-[#0a0a0a] selection:text-white">
      <ProgressBar />
      <MinimalNavbar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onOpenBooking={() => setIsModalOpen(true)}
      />
      
      <main className="bg-[#f2f2f0]">
        {currentView === 'landing' && (
          <>
            <MinimalHero onOpenBooking={() => setIsModalOpen(true)} />
            <MinimalStats />
            <MinimalFeatures />
            <MinimalHowItWorks />
            <MinimalPricing onOpenBooking={() => setIsModalOpen(true)} />
            <MinimalBuying />
            <MinimalFaq />
          </>
        )}
        
        {currentView === 'marketplace' && (
          <Marketplace 
            onSystemSelect={(id) => {
              setSelectedSystemId(id);
              setCurrentView('system_detail');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }} 
          />
        )}

        {currentView === 'system_detail' && selectedSystemId && (
          <SystemDetail 
            systemId={selectedSystemId} 
            onBack={() => {
              setCurrentView('marketplace');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            onOpenBooking={() => setIsModalOpen(true)}
          />
        )}
        
        <MinimalFooter onOpenBooking={() => setIsModalOpen(true)} />
      </main>

      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
