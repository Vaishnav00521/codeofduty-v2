import React, { useState } from 'react';
import Onboarding from './Onboarding';
import Dashboard from './Dashboard';
import Claims from './Claims';
import RiskEngine from './RiskEngine';
import ClaimSimulator from './ClaimSimulator';
import Splash from './Splash';
import { Home, ClipboardList, Settings, Bell, Shield } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState('splash'); // 'splash' | 'onboarding' | 'dashboard'
  const [activeTab, setActiveTab] = useState('home');

  if (appState === 'splash') {
    return (
      <div className="min-h-screen bg-black font-sans flex items-center justify-center py-0 md:py-8">
        <div className="w-full max-w-md min-h-screen md:min-h-0 md:h-[850px] relative md:rounded-[2.5rem] md:border-[12px] md:border-slate-800 overflow-hidden shadow-2xl bg-[#141414] flex flex-col">
          <Splash onLoginClick={() => setAppState('onboarding')} />
        </div>
      </div>
    );
  }

  if (appState === 'onboarding') {
    return (
      <div className="min-h-screen bg-black font-sans flex items-center justify-center py-0 md:py-8">
        <div className="w-full max-w-md min-h-screen md:min-h-0 md:h-[850px] relative md:rounded-[2.5rem] md:border-[12px] md:border-slate-800 overflow-hidden shadow-2xl bg-[#141414] flex flex-col">
          <Onboarding onComplete={() => setAppState('dashboard')} />
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <Dashboard />;
      case 'risk': return <Claims />;
      case 'simulate': return <ClaimSimulator />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans flex justify-center py-0 md:py-8">
      {/* Mobile Device Aspect Wrapper / Shell */}
      <div className="w-full max-w-md min-h-screen md:h-[850px] relative md:rounded-[2.5rem] md:border-[12px] md:border-slate-800 overflow-hidden shadow-2xl bg-[#141414] flex flex-col">
        
        {/* Dynamic Display Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar relative w-full h-full">
          {renderContent()}
        </div>

        {/* Global Bottom Navigation System */}
        <div className="absolute bottom-0 left-0 w-full bg-[#181818]/95 backdrop-blur-xl border-t border-white/5 px-8 py-4 flex justify-between items-center z-50">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold tracking-wider">Home</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('risk')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'risk' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <ClipboardList className="w-6 h-6" />
            <span className="text-[10px] font-bold tracking-wider">Claims</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('simulate')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'simulate' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-[10px] font-bold tracking-wider">Settings</span>
          </button>

        </div>
      </div>
    </div>
  );
}
