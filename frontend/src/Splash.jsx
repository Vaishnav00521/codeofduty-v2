import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function Splash({ onLoginClick }) {
  // Bubbles data for the visualization based on the mockup
  const bubbles = [
    { size: 85, top: '25%', left: '25%', value: '56.4%', label: 'Risk', color: 'bg-[#0088ff]' },
    { size: 70, top: '20%', left: '50%', value: '5.8%', label: 'Rate', color: 'bg-[#00aaff]' },
    { size: 75, top: '15%', left: '75%', value: '30.0%', label: 'Cover', color: 'bg-[#0077ff]' },
    { size: 95, top: '45%', left: '20%', value: '31.5%', label: 'Alerts', color: 'bg-[#00ccff]' },
    { size: 85, top: '40%', left: '45%', value: '7.4%', label: 'Status', color: 'bg-[#0055ff]' },
    { size: 60, top: '35%', left: '65%', value: '11.1%', label: 'Trend', color: 'bg-[#0088ff]' },
    { size: 90, top: '55%', left: '80%', value: '7.2%', label: 'Claims', color: 'bg-[#0066ee]' },
    { size: 75, top: '70%', left: '25%', value: '8.4%', label: 'Payout', color: 'bg-[#0099ff]' },
    { size: 65, top: '80%', left: '45%', value: '13.7%', label: 'Inc', color: 'bg-[#00aaff]' },
    { size: 80, top: '85%', left: '65%', value: '5%', label: 'Growth', color: 'bg-[#0077ff]' },
    { size: 95, top: '75%', left: '85%', value: '31.6%', label: 'Volume', color: 'bg-[#0088ff]' },
  ];

  return (
    <div className="h-full flex-1 bg-[#141414] font-sans text-white flex flex-col items-center justify-between py-12 px-6 relative overflow-hidden">
      
      {/* Top Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 z-10"
      >
        <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
          <span className="text-white">Rider</span><span className="text-[#f5db94]">Shield</span>
        </h1>
      </motion.div>

      {/* Center Graph Visualization */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative w-full max-w-[320px] h-[320px] my-10 flex items-center justify-center flex-shrink-0"
      >
        {/* Background decorative white clouds/blobs */}
        <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-white rounded-full opacity-[0.8] mix-blend-overlay blur-sm"></div>
        <div className="absolute top-[20%] -left-[10%] w-[60%] h-[60%] bg-white rounded-full opacity-[0.9] mix-blend-overlay"></div>
        <div className="absolute -bottom-[5%] right-[0%] w-[70%] h-[70%] bg-white rounded-full opacity-[0.9] mix-blend-overlay"></div>
        
        {/* Abstract lines imitating a background line chart */}
        <svg className="absolute inset-0 w-full h-full opacity-40 z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M5,40 Q25,20 40,40 T80,30" fill="none" stroke="#66b3ff" strokeWidth="0.8" />
          <path d="M10,80 Q35,90 50,60 T90,50" fill="none" stroke="#ffb366" strokeWidth="0.8" />
          <path d="M0,60 Q20,70 50,40 T100,60" fill="none" stroke="white" strokeWidth="0.5" />
          
          {/* Small decorative dots */}
          <circle cx="80" cy="30" r="1.5" fill="#f5db94" />
          <circle cx="90" cy="50" r="1.5" fill="#66b3ff" />
          <circle cx="50" cy="60" r="1.5" fill="white" />
        </svg>

        {/* Vertical Bar chart mockup at the bottom of the graphic */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-end gap-[3px] h-28 w-[70%] opacity-80 z-0">
          {[40, 60, 30, 80, 50, 90, 70, 40, 85, 65, 45, 75, 55, 30, 60, 40, 80, 30, 50, 90].map((h, i) => (
            <div key={i} className={`flex-1 rounded-t-sm ${i % 3 === 0 ? 'bg-blue-300' : 'bg-blue-500'}`} style={{ height: `${h}%` }}></div>
          ))}
        </div>

        {/* Data Bubbles */}
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 120 }}
            className={`absolute flex flex-col items-center justify-center rounded-full shadow-2xl ${bubble.color} z-10`}
            style={{
              width: bubble.size,
              height: bubble.size,
              top: bubble.top,
              left: bubble.left,
              transform: 'translate(-50%, -50%)',
              backdropFilter: 'blur(4px)',
              background: `linear-gradient(135deg, ${bubble.color.replace('bg-', '')} 0%, rgba(0,50,200,0.8) 100%)`
            }}
          >
            <span className="text-[9px] font-semibold text-white/90 uppercase tracking-wider mb-0.5">{bubble.label}</span>
            <span className="text-sm font-bold text-white tracking-tight">{bubble.value}</span>
            <span className="text-[10px] text-white/60 font-bold mt-0.5">—</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Content Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center w-full z-10 flex flex-col items-center mt-auto"
      >
        <h2 className="text-[22px] font-bold mb-3 leading-tight tracking-tight px-4 text-white drop-shadow-md">
          Automatic protection for Q-commerce
        </h2>
        <p className="text-[15px] font-medium text-gray-300 mb-10 px-6 drop-shadow-sm">
          See live risk, status, and payouts instantly.
        </p>
        
        {/* Login Button positioned in the down center */}
        <button 
          onClick={onLoginClick}
          className="w-full max-w-[280px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl py-4 text-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] border border-blue-400/30 active:scale-95"
        >
          Login
        </button>

        {/* Small Bottom Right Shield Icon */}
        <div className="absolute bottom-8 right-8 mix-blend-overlay opacity-80">
          <Shield className="w-8 h-8 text-white fill-white" />
        </div>
      </motion.div>

    </div>
  );
}
