import React, { useState } from 'react';
import { Home, BrainCircuit, PlayCircle } from 'lucide-react';
import Onboarding from './Onboarding';
import Dashboard from './Dashboard';
import RiskEngine from './RiskEngine';
import ClaimSimulator from './ClaimSimulator';

export default function App() {
  const [showApp, setShowApp] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  if (!showApp) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Onboarding onComplete={() => setShowApp(true)} />
      </div>
    );
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <Dashboard />;
      case 'risk': return <RiskEngine />;
      case 'simulate': return <ClaimSimulator />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans flex justify-center py-0 md:py-8">
      {/* Mobile Device Aspect Wrapper / Shell */}
      <div className="w-full max-w-md min-h-screen md:h-[850px] relative md:rounded-[2.5rem] md:border-[10px] md:border-slate-800 overflow-hidden shadow-2xl bg-slate-950 flex flex-col">
        
        {/* Dynamic Display Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar relative w-full h-full">
          {renderContent()}
        </div>

        {/* Global Bottom Navigation System */}
        <div className="absolute bottom-0 left-0 w-full bg-slate-900/80 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex justify-between items-center z-50">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold tracking-wider">Home</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('risk')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'risk' ? 'text-purple-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <BrainCircuit className="w-6 h-6" />
            <span className="text-[10px] font-bold tracking-wider">Risk Engine</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('simulate')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'simulate' ? 'text-red-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <PlayCircle className="w-6 h-6" />
            <span className="text-[10px] font-bold tracking-wider">Simulate</span>
          </button>

        </div>
      </div>
    </div>
  );
}
