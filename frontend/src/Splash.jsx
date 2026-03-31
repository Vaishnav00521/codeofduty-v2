import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, RefreshCw, Shield } from 'lucide-react';

export default function Splash({ onLoginClick }) {
  
  // High-fidelity nodes positioning to strictly prevent layout overflow
  const nodes = [
    { label1: 'Vadodara', label2: 'Weather: Scanning', top: '15%', left: '22%', align: 'left' },
    { label1: '', label2: 'Rainfall: 1.2mm', top: '12%', left: '78%', align: 'right' },
    { label1: '', label2: 'Traffic: Low', top: '45%', left: '83%', align: 'right' },
    { label1: 'Pulsing light', label2: 'AQI: 55', top: '78%', left: '78%', align: 'right' },
    { label1: '', label2: 'AI Risk Score: Stable', top: '72%', left: '22%', align: 'left' },
  ];

  const Sparkline = ({ color }) => (
    <svg className="w-16 h-6 shrink-0 opacity-80" viewBox="0 0 100 30" preserveAspectRatio="none">
      <path 
        d="M0,25 Q15,10 25,20 T50,5 T75,25 T100,10" 
        fill="none" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round"
        className="drop-shadow-md"
      />
    </svg>
  );

  return (
    <div className="h-full w-full flex-1 font-sans text-white flex flex-col items-center justify-start py-8 px-4 relative overflow-y-auto no-scrollbar z-20 bg-transparent">
      
      {/* 1. Header Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center shrink-0 mb-4 z-10 w-full">
        <Shield className="w-12 h-12 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] fill-blue-500/10 stroke-[1.2px] mb-2" />
        <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-xl flex items-center">
          <span className="text-white drop-shadow-sm">Rider</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">Shield</span>
        </h1>
      </motion.div>

      {/* 2. Main Dashboard Glass Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-[340px] bg-[#0b1426]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-4 flex flex-col items-center shadow-[0_0_40px_rgba(34,211,238,0.1)] relative z-10 mx-auto border-t-white/20"
      >
        
        {/* Telemetry Bar (Inside the card) */}
        <div className="w-full bg-[#111a30]/80 border border-blue-400/20 rounded-full py-2.5 px-4 flex items-center justify-between shadow-inner mb-6 z-20">
           <MapPin className="w-4 h-4 text-cyan-400 animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] shrink-0" />
           <span className="text-[9px] font-bold tracking-widest uppercase text-white/90 truncate px-2">
             LIVE STATUS: REAL-TIME MONITORING - VADODARA
           </span>
           <RefreshCw className="w-3.5 h-3.5 text-white/60 animate-spin shrink-0" style={{ animationDuration: '3s' }} />
        </div>

        {/* The Holographic Radar Hero Graphic */}
        <div className="relative w-full h-[280px] flex items-center justify-center shrink-0 mb-6">
          
          {/* Sweeping Radar Effect */}
          <div className="absolute inset-2 rounded-full bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(34,211,238,0.3)_360deg)] animate-[spin_4s_linear_infinite]" />
          
          {/* Holographic Glowing Rings */}
          <div className="absolute inset-0 rounded-full border-[1px] border-cyan-500/30 border-dashed animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-8 rounded-full border-[0.5px] border-blue-400/40 animate-[spin_20s_linear_infinite_reverse] shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]" />
          <div className="absolute inset-16 rounded-full border-[0.5px] border-cyan-400/30" />
          
          {/* Intense Core Glow */}
          <div className="absolute w-16 h-16 bg-cyan-400/40 blur-2xl rounded-full animate-pulse z-0" />
          
          {/* Horizontal Grid Line */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          
          {/* Central Hologram Shield Asset */}
          <img 
            src="/shield.svg" 
            alt="Holographic Shield Core" 
            className="absolute z-10 w-28 h-28 object-contain animate-pulse drop-shadow-[0_0_25px_rgba(34,211,238,0.6)] saturate-150" 
          />

          {/* Floating Strict-Bounded Data Tags */}
          {nodes.map((node, i) => {
            const isLeft = node.align === 'left';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`absolute flex items-center gap-2 z-20 flex-row`}
                style={{ top: node.top, left: node.left, transform: 'translate(-50%, -50%)' }}
              >
                  {isLeft ? (
                     <>
                       <div className="flex flex-col items-end leading-tight">
                          {node.label1 && <span className="text-[8.5px] text-white/70 tracking-wide font-medium">{node.label1}</span>}
                          <span className="text-[10px] font-bold text-cyan-50 tracking-wider whitespace-nowrap drop-shadow-md">{node.label2}</span>
                       </div>
                       <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee] animate-pulse shrink-0" />
                     </>
                  ) : (
                     <>
                       <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee] animate-pulse shrink-0" />
                       <div className="flex flex-col items-start leading-tight">
                          {node.label1 && <span className="text-[8.5px] text-white/70 tracking-wide font-medium">{node.label1}</span>}
                          <span className="text-[10px] font-bold text-cyan-50 tracking-wider whitespace-nowrap drop-shadow-md">{node.label2}</span>
                       </div>
                     </>
                  )}
              </motion.div>
            )
          })}
        </div>

        {/* Action Widgets Area */}
        <div className="w-full flex justify-between gap-3 mb-2">
           {/* Coverage Card */}
           <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-3 flex flex-col shadow-inner backdrop-blur-md">
              <span className="text-[9px] text-white/60 mb-1 tracking-wide">Coverage:</span>
              <div className="flex items-end justify-between">
                <span className="text-xl font-bold text-white">1,236</span>
                <Sparkline color="#22d3ee" />
              </div>
           </div>
           
           {/* Statis Card */}
           <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-3 flex flex-col shadow-inner backdrop-blur-md">
              <span className="text-[9px] text-white/60 mb-1 tracking-wide">Statis:</span>
              <div className="flex items-end justify-between">
                <span className="text-xl font-bold text-white">2,246</span>
                <Sparkline color="#facc15" />
              </div>
           </div>
        </div>

      </motion.div>

      {/* 3. Footer Section (Outside Glass Container) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-full max-w-[340px] flex flex-col items-center shrink-0 mt-3 pb-4 z-10"
      >
         <h2 className="text-[15px] font-bold mb-1 text-white text-center drop-shadow-md tracking-tight">
           Automatic protection for Q-commerce
         </h2>
         <p className="text-[10px] font-medium text-slate-300 mb-5 text-center px-4">
           See live risk, status, and payouts instantly.
         </p>
         
         <button 
            onClick={onLoginClick}
            className="w-[90%] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full py-3.5 shadow-lg border border-white/20 text-[11px] font-black tracking-widest text-white uppercase active:scale-95 transition-all mb-4"
          >
            CONNECT RIDER ACCOUNT
         </button>

         <div className="flex items-center justify-center gap-1.5 opacity-60">
            <Shield className="w-3.5 h-3.5 text-blue-300 fill-blue-500/20" />
            <p className="text-[9px] font-medium text-white/90 tracking-wide">Secured by Azure AI & Smart Contracts</p>
         </div>
      </motion.div>

    </div>
  );
}
