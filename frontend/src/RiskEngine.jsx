import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, TrendingUp, CloudRain, ShieldCheck, AlertOctagon, Map, RefreshCw } from 'lucide-react';

export default function RiskEngine() {
  // 1. Add the dynamic URL variable here inside your component
  const API_BASE_URL = 'https://codeofduty-backend.onrender.com';

  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. Swap out the hardcoded URL for the dynamic one using backticks
    fetch(`${API_BASE_URL}/api/risk/summary`)
      .then(res => res.json())
      .then(data => {
        setRiskData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-transparent">
        <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full flex-1 bg-transparent font-sans text-white p-5 pt-8 relative overflow-hidden">
      <div className="absolute -top-20 left-10 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 w-full h-full max-w-md mx-auto">

        <motion.header className="flex items-center gap-3 mb-8" variants={itemVariants}>
          <div className="bg-purple-500/20 p-3 rounded-2xl border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <BrainCircuit className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">AI Risk Profiling</h1>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Loss of Income ONLY</p>
          </div>
        </motion.header>

        <motion.div variants={itemVariants} className="mb-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-6">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-5 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" /> Premium Breakdown
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-400">Base Weekly Rate</span>
                <span className="text-white">₹{riskData?.baseRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-400">AI Zone Multiplier ({riskData?.riskLevel})</span>
                <span className="text-amber-400">+₹{riskData?.zoneMultiplier.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-400 flex items-center gap-1.5"><CloudRain className="w-4 h-4 text-blue-400" /> Predictive Weather Surcharge</span>
                <span className="text-amber-400">+₹{riskData?.weatherSurcharge.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Final Premium</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white tracking-tighter">₹{riskData?.totalWeekly.toFixed(2)}</span>
                  <span className="text-sm text-slate-400 font-medium">/ week</span>
                </div>
              </div>
              <div className="bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                <span className="text-[10px] font-bold text-blue-400 tracking-wider">LOCKED TO ZONE</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <div className="bg-white/5 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] rounded-3xl p-5 relative overflow-hidden">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
              <Map className="w-4 h-4 text-blue-400" /> Dynamic Risk Node
            </h2>

            <div className="w-full h-32 bg-slate-950 rounded-2xl border border-slate-800 relative flex items-center justify-center overflow-hidden mb-4">
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
              <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
              <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,1)] animate-pulse flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex gap-3 relative z-10 backdrop-blur-md shadow-[0_0_10px_rgba(239,68,68,0.1)]">
              <AlertOctagon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-200 font-medium leading-relaxed">
                <span className="font-bold text-red-400 block mb-0.5">Alert Level: {riskData?.riskLevel}</span>
                {riskData?.message}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-emerald-950/40 border border-emerald-500/20 backdrop-blur-lg shadow-[0_0_25px_rgba(16,185,129,0.05)] rounded-3xl p-5">
            <h2 className="text-sm font-semibold text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Fraud Prevention System
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-emerald-900/40 p-3 rounded-xl border border-emerald-800/50">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-sm font-medium text-emerald-100">GPS Telemetry: Verified</span>
              </div>
              <div className="flex items-center gap-3 bg-emerald-900/40 p-3 rounded-xl border border-emerald-800/50">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-sm font-medium text-emerald-100">Historical Claim Anomaly: None</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
