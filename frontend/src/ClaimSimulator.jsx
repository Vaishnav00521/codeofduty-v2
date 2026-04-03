import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from './api';
import { PlayCircle, ShieldAlert, CloudLightning, Banknote, HelpCircle, Loader2 } from 'lucide-react';

export default function ClaimSimulator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [claimResult, setClaimResult] = useState(null);

  const handleTrigger = async () => {
    setIsLoading(true);
    setError(null);
    setClaimResult(null);

    try {
      const data = await api.post('/api/claims/trigger', { zone: "Koramangala", platform: "Zepto" });
      setClaimResult(data);
    } catch (err) {
      setError(err.message || "Failed to trigger the API.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex-1 bg-[#141414] font-sans text-white p-5 relative overflow-hidden">
      <div className="max-w-md mx-auto relative z-10 pt-10">
        <header className="mb-10 text-center">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Live Parametric Trigger Engine</h1>
          <div className="mt-4 flex flex-col gap-2 relative">
            <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <ShieldAlert size={14} /> Strictly replacing Lost Hours/Wages.
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 text-blue-500 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <HelpCircle size={14} /> Zero vehicle/medical coverage.
            </div>
          </div>
        </header>

        <button
          onClick={handleTrigger}
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-2xl text-[13px] tracking-wide px-5 py-5 text-center transition-all shadow-[0_0_30px_rgba(220,38,38,0.5)] active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
        >
          <CloudLightning size={18} />
          TRIGGER SEVERE RAINSTORM (LIVE API)
        </button>

        {isLoading && (
          <div className="mt-8 text-center p-6 bg-white/5 rounded-2xl border border-white/10 animate-pulse">
            <Loader2 className="w-8 h-8 mx-auto text-blue-400 animate-spin mb-3" />
            <p className="text-sm font-bold text-blue-400">Executing Smart Contract & Polling OpenWeatherMap...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 text-center p-6 bg-red-500/10 rounded-2xl border border-red-500/30">
            <p className="text-sm font-bold text-red-500">{error}</p>
          </div>
        )}

        <AnimatePresence>
          {claimResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.3)] rounded-3xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
              <div className="flex items-center gap-3 mb-4 border-b border-emerald-500/20 pb-4">
                <div className="bg-emerald-500/20 p-2 rounded-full">
                  <Banknote className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-emerald-400">Success Receipt</h2>
                  <p className="text-[10px] text-emerald-200/50 uppercase tracking-widest">{claimResult.transactionId}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-100/60">Status</span>
                  <span className="font-bold text-emerald-400">{claimResult.status}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-100/60">Trigger Event</span>
                  <span className="font-bold text-emerald-400 text-right max-w-[150px]">{claimResult.triggerEvent}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-100/60">Action Logic</span>
                  <span className="font-bold text-emerald-400 text-right">{claimResult.action}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-100/60">Hours Reimbursed</span>
                  <span className="font-bold text-emerald-400">{claimResult.hoursLost} hrs</span>
                </div>
                <div className="mt-4 pt-4 border-t border-emerald-500/20 flex justify-between items-end">
                  <span className="text-xs uppercase tracking-widest text-emerald-100/60 font-bold">Total Payout</span>
                  <span className="text-3xl font-extrabold text-emerald-400">₹{claimResult.payoutAmount}.00</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
