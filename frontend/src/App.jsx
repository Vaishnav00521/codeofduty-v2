import React, { useState } from 'react';
import { Home, ShieldAlert, ClipboardList, Navigation, Settings } from 'lucide-react';
import ParticleNetwork from './ParticleNetwork';
import Splash from './Splash';
import Onboarding from './Onboarding';
import Dashboard from './Dashboard';
import RiskEngine from './RiskEngine';
import Claims from './Claims';
import SmartRoute from './SmartRoute';
import SimulationSandbox from './SimulationSandbox';

function NavButton({ icon: Icon, label, active, color, onClick }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all duration-300 z-50 cursor-pointer ${active ? color + ' scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
      <Icon className={`w-5 h-5 ${active ? 'fill-current opacity-20' : ''}`} />
      <span className="text-[9px] font-bold tracking-wider uppercase">{label}</span>
      {active && <span className={`w-1 h-1 rounded-full ${color.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`} />}
    </button>
  );
}

export default function App() {
  const [appState, setAppState] = useState('splash'); // 'splash' | 'onboarding' | 'main'
  const [activeTab, setActiveTab] = useState('home');

  const renderMainContent = () => {
    switch(activeTab) {
      case 'home': return <Dashboard />;
      case 'risk': return <RiskEngine />;
      case 'claims': return <Claims />;
      case 'logistics': return <SmartRoute />;
      case 'simulate': return <SimulationSandbox />;
      default: return <Dashboard />;
    }
  };

  const renderScreen = () => {
    // 1. Initial Login Screen
    if (appState === 'splash') {
      return <Splash onLoginClick={() => setAppState('onboarding')} />;
    }
    
    // 2. Form Data Registration
    if (appState === 'onboarding') {
      return <Onboarding onComplete={() => setAppState('main')} />;
    }

    // 3. Authenticated Dashboard Shell OR Sandbox Shell
    return (
      <>
         <div className="flex-1 overflow-y-auto w-full no-scrollbar pb-24 relative z-10 p-0">
            {renderMainContent()}
         </div>
         
         {/* Global Bottom Navigation System */}
         <div className="absolute bottom-0 left-0 w-full bg-[#181818]/60 backdrop-blur-3xl border-t border-white/10 px-6 py-4 flex justify-between items-center z-50">
             <NavButton onClick={() => setActiveTab('home')} icon={Home} label="Home" active={activeTab === 'home'} color="text-blue-400" />
             <NavButton onClick={() => setActiveTab('risk')} icon={ShieldAlert} label="Risk" active={activeTab === 'risk'} color="text-purple-400" />
             <NavButton onClick={() => setActiveTab('claims')} icon={ClipboardList} label="Claims" active={activeTab === 'claims'} color="text-blue-400" />
             <NavButton onClick={() => setActiveTab('logistics')} icon={Navigation} label="Logistics" active={activeTab === 'logistics'} color="text-emerald-400" />
             <NavButton onClick={() => setActiveTab('simulate')} icon={Settings} label="Debug" active={activeTab === 'simulate'} color="text-red-400" />
         </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans overflow-hidden relative">
      <ParticleNetwork />
      
      {/* Universal Mobile Container */}
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] relative md:rounded-[2.5rem] md:border-[12px] md:border-slate-800 overflow-hidden shadow-2xl bg-[#0b1120]/60 backdrop-blur-3xl flex flex-col z-10 border-white/10 ring-1 ring-white/10 mx-auto">
         {renderScreen()}
      </div>
    </div>
  );
}
