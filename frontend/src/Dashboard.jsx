import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Bell, Settings, MapPin, RefreshCw, Landmark, Activity, ActivitySquare, ShieldAlert, Zap, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [triggerState, setTriggerState] = useState(0);
  const [balRollup, setBalRollup] = useState(0);
  const [receipt, setReceipt] = useState(null);

  const API_BASE_URL = 'https://codeofduty-backend.onrender.com';

  // Initial Sync
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/claims/summary`)
      .then(r => r.json())
      .then(d => setBalRollup(d.totalPayout || 0))
      .catch(err => console.error("Initial load fail", err));
  }, []);

  const handleTrigger = async () => {
    if (triggerState > 0) return;
    setTriggerState(1);

    try {
      const res = await fetch(`${API_BASE_URL}/api/claims/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zone: "Vadodara", platform: "Zepto" })
      });
      const data = await res.json();
      setReceipt(data);

      setTimeout(() => {
        setTriggerState(2);
      }, 1500);

      setTimeout(() => {
        setTriggerState(3);

        let current = balRollup;
        const target = balRollup + (data.payoutAmount || 5230);
        const interval = setInterval(() => {
          current += Math.ceil((target - current) / 4) || 1;
          setBalRollup(current);
          if (current >= target) {
            setBalRollup(target);
            clearInterval(interval);
          }
        }, 50);
      }, 3000);

    } catch (e) {
      console.error(e);
      setTriggerState(0);
    }
  };

  return (
    <div className="px-5 pt-8 text-white relative h-full w-full">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 p-2 rounded-xl border border-blue-500/30">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight uppercase">CodeofDuty</h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest leading-none mt-1">Welcome, Rider</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
          <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
        </div>
      </div>

      {/* Telemetry Bar */}
      <div className={`flex items-center justify-between px-4 py-3 rounded-xl border mb-6 transition-all duration-300 ${triggerState >= 1 ? 'bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-white/5 border-white/10'}`}>
        <div className="flex items-center gap-2">
          <MapPin className={`w-4 h-4 ${triggerState >= 1 ? 'text-red-400' : 'text-cyan-400'}`} />
          <span className={`text-[10px] font-bold uppercase tracking-widest ${triggerState >= 1 ? 'text-amber-400 animate-pulse' : 'text-cyan-400/50'}`}>
            {triggerState >= 1 ? 'WEATHER THRESHOLD BREACHED (>30mm/hr)' : 'SCANNING VADODARA...'}
          </span>
        </div>
        <RefreshCw className={`w-4 h-4 cursor-pointer hover:rotate-180 transition-transform ${triggerState >= 1 ? 'text-red-400' : 'text-cyan-400'}`} />
      </div>

      {/* Payout Card */}
      <div className="bg-slate-900/50 border border-blue-500/20 rounded-3xl p-6 mb-8 relative overflow-hidden group shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-5">
          <div>
            <p className="text-[10px] text-blue-300/80 font-bold uppercase tracking-widest mb-1.5">Instant Payout Balance</p>
            <motion.h2 className={`text-4xl font-black tracking-tight ${triggerState === 3 ? 'text-blue-400' : 'text-white'}`}>
              ₹{balRollup.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </motion.h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Primary Method</p>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
              <Landmark className="w-3 h-3" /> UPI ID (Linked)
            </div>
          </div>
        </div>

        <div className="flex gap-3 relative z-10">
          <button className={`flex-1 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-500 ${triggerState === 3 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-slate-800/80 text-slate-500 border border-slate-700/50 cursor-not-allowed'}`}>
            One-Tap Withdraw
          </button>
          <button className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-wider text-white transition-all">
            Manage Methods
          </button>
        </div>
      </div>

      {/* Trigger & Claims */}
      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 drop-shadow-md">
        <Activity className="w-4 h-4 text-cyan-400" /> Auto-detected Claims
      </h3>

      <AnimatePresence mode="wait">
        {triggerState < 2 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl mb-8 border-dashed">
            <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50"><ActivitySquare className="w-5 h-5 text-gray-500" /></div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">No active incidents detected.</p>
          </motion.div>
        ) : (
          <motion.div key="alert" initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex items-center gap-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl mb-8 shadow-[0_0_20px_rgba(245,158,11,0.15)] relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/20 rounded-full blur-xl" />
            <div className="bg-amber-500/20 p-2.5 rounded-xl border border-amber-500/30">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest drop-shadow-md">Zepto Operations Halted</p>
              <p className="text-sm font-bold text-white mt-0.5">{receipt?.hoursLost || 4} Hours Lost</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleTrigger}
        disabled={triggerState > 0}
        className={`w-full py-5 rounded-2xl font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 ${triggerState === 0 ? 'bg-red-600 text-white border border-red-400/50 hover:bg-red-500 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:-translate-y-1 active:scale-[0.98]' : triggerState === 1 || triggerState === 2 ? 'bg-red-900 border border-red-500/30 text-red-300 animate-pulse' : 'bg-slate-800/50 text-slate-600 border border-slate-700/50 cursor-not-allowed shadow-none'}`}
      >
        <Zap className={`w-5 h-5 ${triggerState === 0 ? 'fill-current' : ''}`} />
        {triggerState === 0 ? 'TRIGGER SEVERE RAINSTORM (LIVE API)' : triggerState >= 3 ? 'SIMULATION COMPLETE' : 'PROCESSING WEATHER DATA...'}
      </button>

      <AnimatePresence>
        {triggerState === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-8 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-4 shadow-[0_0_40px_rgba(16,185,129,0.3)] backdrop-blur-xl relative overflow-hidden z-20">
            <div className="absolute -right-10 -top-10 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full" />
            <div className="flex items-center gap-3 mb-2 relative z-10">
              <div className="p-2 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-emerald-300 tracking-wider">Razorpay Success Receipt</p>
                <p className="text-[13px] font-bold text-emerald-50">₹{(receipt?.payoutAmount || 5230).toFixed(2)} transferred</p>
              </div>
            </div>
            <p className="text-[8px] text-emerald-500/60 font-mono tracking-widest mt-2">HASH: {receipt?.transactionId || 'rzp_sim_1234'}</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
