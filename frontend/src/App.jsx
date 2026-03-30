import React, { useState } from 'react';
import Onboarding from './Onboarding';
import Dashboard from './Dashboard';
import Claims from './Claims';
import RiskEngine from './RiskEngine';
import ClaimSimulator from './ClaimSimulator';
import Splash from './Splash';
import SmartRoute from './SmartRoute';
import { Home, ClipboardList, Settings, Bell, Shield, Navigation } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState('splash'); // 'splash' | 'onboarding' | 'dashboard'
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <Dashboard />;
      case 'risk': return <RiskEngine />;
      case 'claims': return <Claims />;
      case 'logistics': return <SmartRoute />;
      case 'simulate': return <ClaimSimulator />;
      default: return <Dashboard />;
    }
  };

  const renderScreen = () => {
    if (appState === 'splash') return <Splash onLoginClick={() => setAppState('onboarding')} />;
    if (appState === 'onboarding') return <Onboarding onComplete={() => setAppState('dashboard')} />;
    
    return (
      <div className="w-full h-full flex flex-col">
        {/* Dynamic Display Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar relative w-full h-full">
          {renderContent()}
        </div>

        {/* Global Bottom Navigation System */}
        <div className="absolute bottom-0 left-0 w-full bg-[#181818]/80 backdrop-blur-2xl border-t border-white/10 px-6 py-4 flex justify-between items-center z-50">
          <NavButton icon={Home} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} color="text-blue-400" />
          <NavButton icon={Shield} label="Risk" active={activeTab === 'risk'} onClick={() => setActiveTab('risk')} color="text-purple-400" />
          <NavButton icon={ClipboardList} label="Claims" active={activeTab === 'claims'} onClick={() => setActiveTab('claims')} color="text-blue-400" />
          <NavButton icon={Navigation} label="Logistics" active={activeTab === 'logistics'} onClick={() => setActiveTab('logistics')} color="text-emerald-400" />
          <NavButton icon={Settings} label="Debug" active={activeTab === 'simulate'} onClick={() => setActiveTab('simulate')} color="text-red-400" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans flex items-center justify-center py-0 md:py-8 relative overflow-hidden">
      
      {/* 🌌 Aurora Mesh Gradient Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Orb 1: Blue (Top-Left) */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] animate-aurora-1" />
        
        {/* Orb 2: Purple (Bottom-Right) */}
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-600/25 rounded-full blur-[150px] animate-aurora-2" />
        
        {/* Orb 3: Teal (Center-Left) */}
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] animate-aurora-3" />
        
        {/* Orb 4: Indigo (Top-Right) */}
        <div className="absolute top-10 -right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-[120px] animate-aurora-1" />
      </div>

      {/* 📱 Mobile Device Aspect Wrapper / Shell */}
      <div className="w-full max-w-md min-h-screen md:min-h-0 md:h-[850px] relative md:rounded-[2.5rem] md:border-[12px] md:border-slate-800 overflow-hidden shadow-2xl bg-[#141414]/40 backdrop-blur-md flex flex-col z-10 border border-white/5">
        {renderScreen()}
      </div>
    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick, color }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? color + ' scale-110' : 'text-gray-500 hover:text-gray-300'}`}
    >
      <Icon className={`w-5 h-5 ${active ? 'fill-current opacity-20' : ''}`} />
      <span className="text-[9px] font-bold tracking-wider uppercase">{label}</span>
      {active && (
        <span className={`w-1 h-1 rounded-full ${color.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`} />
      )}
    </button>
  );
}
