import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from './api';
import { User, Briefcase, MapPin, Zap, RefreshCw, Hexagon } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const [formData, setFormData] = useState({
    fullName: "Rahul Kumar",
    platform: "Zepto",
    operatingZone: "Vadodara, GJ"
  });

  const [loading, setLoading] = useState(false);

  const handleInitialize = async () => {
    setLoading(true);
    try {
      await api.post('/api/workers/onboard', formData);
      onComplete();
    } catch (err) {
      console.error("Onboarding failed:", err);
      onComplete(); // fallback for UI demonstration
    } finally {
      setLoading(false);
    }
  };

  // ... (keep the rest of your component's return statement the same)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="h-full flex-1 bg-transparent font-sans text-white flex items-center justify-center relative py-8 px-6 overflow-hidden z-20 w-full">
      <motion.div
        className="w-full max-w-sm flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Elements */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-10">
          <div className="relative mb-5 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Hexagon className="w-16 h-16 text-blue-500 stroke-1 animate-[spin_10s_linear_infinite]" />
            <User className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-md">
            Profile Sync
          </h1>
          <p className="text-[10px] text-blue-400/80 font-bold tracking-[0.2em] uppercase mt-2">Connecting Active Nodes</p>
        </motion.div>

        {/* Input Form Box */}
        <motion.div variants={itemVariants} className="space-y-4 mb-8 p-6 bg-slate-900/60 border border-blue-500/20 backdrop-blur-2xl rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.1)]">

          <div className="relative group">
            <p className="text-[9px] text-blue-300 font-bold uppercase tracking-widest pl-1 mb-1.5 opacity-80">Rider Identity</p>
            <div className="absolute inset-y-0 left-0 pl-4 top-[22px] flex items-center pointer-events-none">
              <User className="h-4 w-4 text-blue-500/50 group-focus-within:text-cyan-400 transition-colors" />
            </div>
            <input
              type="text"
              className="w-full bg-black/40 border border-white/10 text-white text-sm font-medium rounded-xl focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block pl-11 p-3.5 placeholder-slate-600 outline-none transition-all shadow-inner"
              placeholder="Rahul Kumar"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="relative group pt-1">
            <p className="text-[9px] text-blue-300 font-bold uppercase tracking-widest pl-1 mb-1.5 opacity-80">Telemetry Platform</p>
            <div className="absolute inset-y-0 left-0 pl-4 top-[26px] flex items-center pointer-events-none">
              <Briefcase className="h-4 w-4 text-blue-500/50 group-focus-within:text-cyan-400 transition-colors" />
            </div>
            <input
              type="text"
              className="w-full bg-black/40 border border-white/10 text-white text-sm font-medium rounded-xl focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block pl-11 p-3.5 placeholder-slate-600 outline-none transition-all shadow-inner"
              placeholder="Zepto"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            />
          </div>

          <div className="relative group pt-1">
            <p className="text-[9px] text-blue-300 font-bold uppercase tracking-widest pl-1 mb-1.5 opacity-80">Operations Sector</p>
            <div className="absolute inset-y-0 left-0 pl-4 top-[26px] flex items-center pointer-events-none">
              <MapPin className="h-4 w-4 text-blue-500/50 group-focus-within:text-cyan-400 transition-colors" />
            </div>
            <input
              type="text"
              className="w-full bg-black/40 border border-white/10 text-white text-sm font-medium rounded-xl focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block pl-11 p-3.5 placeholder-slate-600 outline-none transition-all shadow-inner"
              placeholder="Koramangala, BLR"
              value={formData.operatingZone}
              onChange={(e) => setFormData({ ...formData, operatingZone: e.target.value })}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-auto">
          <button
            type="button"
            onClick={handleInitialize}
            disabled={loading}
            className="w-full bg-blue-600/90 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl text-[12px] py-4.5 p-4 text-center shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all flex justify-center items-center gap-3 backdrop-blur-md border border-blue-400/40 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> ESTABLISHING LINK...</>
            ) : (
              <><Zap className="w-4 h-4" /> Initialize Connection</>
            )}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
