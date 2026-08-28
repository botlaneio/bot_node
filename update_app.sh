#!/bin/bash
# Move App to Marketplace
cp src/App.tsx src/components/Marketplace.tsx

# Create the new App.tsx shell
cat << 'APP_EOF' > src/App.tsx
import React, { useState, useEffect } from 'react';
import { MinimalNavbar } from './components/MinimalNavbar';
import MinimalHero from './components/MinimalHero';
import MinimalStats from './components/MinimalStats';
import MinimalFeatures from './components/MinimalFeatures';
import MinimalHowItWorks from './components/MinimalHowItWorks';
import MinimalPricing from './components/MinimalPricing';
import MinimalFaq from './components/MinimalFaq';
import MinimalBuying from './components/MinimalBuying';
import MinimalFooter from './components/MinimalFooter';
import Marketplace from './components/Marketplace';
import SkeletonLoader from './components/SkeletonLoader';
import ProgressBar from './components/ProgressBar';
import ApplicationModal from './components/ApplicationModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'marketplace'>('landing');
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
      
      {currentView === 'landing' ? (
        <main className="bg-[#f2f2f0]">
          <MinimalHero onOpenBooking={() => setIsModalOpen(true)} />
          <MinimalStats />
          <MinimalFeatures />
          <MinimalHowItWorks />
          <MinimalPricing onOpenBooking={() => setIsModalOpen(true)} />
          <MinimalBuying />
          <MinimalFaq />
          <MinimalFooter />
        </main>
      ) : (
        <Marketplace />
      )}

      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
APP_EOF

echo "Done"
