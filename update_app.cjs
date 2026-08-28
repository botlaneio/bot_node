const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
code = code.replace(
    "import Marketplace from './components/Marketplace';",
    "import Marketplace from './components/Marketplace';\nimport { SystemDetail } from './components/SystemDetail';"
);

// Add view and selected system state
code = code.replace(
    "const [currentView, setCurrentView] = useState<'landing' | 'marketplace'>('landing');",
    "const [currentView, setCurrentView] = useState<'landing' | 'marketplace' | 'system_detail'>('landing');\n  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);"
);

// Update render logic
const targetRender = `{currentView === 'landing' ? (
          <>
            <MinimalHero onOpenBooking={() => setIsModalOpen(true)} />
            <MinimalStats />
            <MinimalFeatures />
            <MinimalHowItWorks />
            <MinimalPricing onOpenBooking={() => setIsModalOpen(true)} />
            <MinimalBuying />
            <MinimalFaq />
          </>
        ) : (
          <Marketplace />
        )}`;

const replacementRender = `{currentView === 'landing' && (
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
            }} 
          />
        )}

        {currentView === 'system_detail' && selectedSystemId && (
          <SystemDetail 
            systemId={selectedSystemId} 
            onBack={() => setCurrentView('marketplace')}
            onOpenBooking={() => setIsModalOpen(true)}
          />
        )}`;

code = code.replace(targetRender, replacementRender);

fs.writeFileSync('src/App.tsx', code);
console.log("Updated App.tsx to support routing to System Detail");
