import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList,
  Plus,
  Map as MapIcon,
  Camera,
  CheckCircle2,
  Clock,
  X,
  ShieldCheck,
  ChevronRight,
  RefreshCcw,
  Loader2,
  AlertTriangle
} from 'lucide-react';

export default function Claims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [oneTap, setOneTap] = useState(true);

  // Manual Claim Form State
  const [manualClaim, setManualClaim] = useState({
    triggerEvent: "Inclement Weather / Hazard",
    lostHours: 0,
    description: "",
    evidence: ""
  });

  // 1. Define the dynamic base URL at the top level of your component
  const API_BASE_URL = 'https://codeofduty-backend.onrender.com';

  const fetchClaims = async () => {
    try {
      // 2. Use backticks (`) and ${} to inject the dynamic URL
      const resp = await fetch(`${API_BASE_URL}/api/claims`);
      const data = await resp.json();
      setClaims(data);
    } catch (err) {
      console.error("Claims Fetch Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleSubmitManual = async () => {
    setSubmitting(true);
    try {
      // 3. Update this fetch call with backticks as well
      const res = await fetch(`${API_BASE_URL}/api/claims/manual`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...manualClaim,
          payoutAmount: 0.0, // Calculated by AI in backend usually
          status: "PENDING"
        })
      });
      // ... rest of your function
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          fetchClaims();
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="h-full flex-1 bg-transparent font-sans text-white flex flex-col relative overflow-hidden">

      <div className="flex-1 overflow-y-auto px-5 pt-8 pb-24 no-scrollbar">
        {/* Past Claims Section */}
        <motion.section variants={itemVariants} initial="hidden" animate="visible" className="mb-8">
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-lg font-bold">Past Claims</h2>
            <RefreshCcw className="w-3.5 h-3.5 text-gray-600 hover:text-white cursor-pointer" onClick={fetchClaims} />
          </div>
          <div className="space-y-3">
            {claims.length > 0 ? claims.map((claim) => (
              <div key={claim.id} className="bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm rounded-2xl p-4 flex justify-between items-center group active:scale-95 transition-all hover:bg-white/10">
                <div className="flex-1">
                  <p className="text-sm font-bold text-white mb-0.5">Claim #{claim.id?.substring(0, 8)}</p>
                  <p className="text-[10px] text-gray-500 font-medium">
                    {claim.triggerEvent} • <span className="text-gray-400">₹{(claim.payoutAmount ?? 0).toFixed(2)}</span>
                    {claim.evidence && <span className="text-blue-400 ml-2 border border-blue-500/30 px-1 py-0.5 rounded text-[8px]">EVIDENCE ATTACHED</span>}
                  </p>
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${claim.status === 'APPROVED' ? 'text-emerald-400 bg-emerald-400/10' :
                  claim.status === 'PENDING' ? 'text-amber-400 bg-amber-400/10' :
                    'text-blue-400 bg-blue-400/10'
                  }`}>
                  {claim.status}
                </div>
              </div>
            )) : (
              <div className="text-center py-8 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                <p className="text-xs text-gray-400 italic">No claims processed yet.</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Secure Payment Methods Section (Static display, managed in Home) */}
        <motion.section variants={itemVariants} initial="hidden" animate="visible" className="mb-8">
          <div className="bg-slate-900/50 backdrop-blur-md border border-emerald-500/20 rounded-[2rem] p-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div className="flex justify-between items-start mb-6">
              <div className="max-w-[150px]">
                <h3 className="text-base font-bold mb-1">Encrypted Payouts</h3>
                <p className="text-[10px] text-gray-500 leading-tight">All banking data is hashed and verified by RiderShield AI.</p>
              </div>
              <ShieldCheck className="w-8 h-8 text-blue-500/50" />
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-white/5">
              <p className="text-xs font-bold text-gray-300">One-tap withdrawal</p>
              <button onClick={() => setOneTap(!oneTap)} className={`w-12 h-6 rounded-full p-1 transition-colors ${oneTap ? 'bg-blue-600' : 'bg-gray-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${oneTap ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </motion.section>

        {/* Manual Claim (Edge Case) Section */}
        <motion.section variants={itemVariants} initial="hidden" animate="visible" className="mb-4">
          <div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.15)] rounded-[2rem] p-6">
            <h3 className="text-base font-bold text-blue-400 mb-6 border-b border-blue-500/20 pb-2">Manual Claim Request</h3>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Incident Category</p>
                <select
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-blue-500"
                  value={manualClaim.triggerEvent}
                  onChange={e => setManualClaim({ ...manualClaim, triggerEvent: e.target.value })}
                >
                  <option>Inclement Weather / Hazard</option>
                  <option>Road Closure / Protests</option>
                  <option>Platform Technical Glitch</option>
                  <option>Medical Emergency</option>
                </select>
              </div>

              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Estimated Lost Hours</p>
                <input
                  type="number"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white outline-none"
                  placeholder="e.g. 2"
                  value={manualClaim.lostHours}
                  onChange={e => setManualClaim({ ...manualClaim, lostHours: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Incident Description</p>
                <textarea
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm h-32 text-white outline-none resize-none"
                  placeholder="Describe what happened..."
                  value={manualClaim.description}
                  onChange={e => setManualClaim({ ...manualClaim, description: e.target.value })}
                />
              </div>

              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 flex items-center gap-1"><Camera className="w-3 h-3" /> Evidence / Proof Link</p>
                <input
                  type="text"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-blue-500"
                  placeholder="Photo URL or detailed proof..."
                  value={manualClaim.evidence}
                  onChange={e => setManualClaim({ ...manualClaim, evidence: e.target.value })}
                />
              </div>

              <button
                onClick={handleSubmitManual}
                disabled={submitting || !manualClaim.description}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl text-[13px] transition-all shadow-lg active:scale-95 disabled:bg-gray-800 disabled:text-gray-500 flex justify-center items-center gap-2"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Claim for AI Review"}
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Success Alert Overlay */}
      <AnimatePresence>
        {success && (
          <motion.div className="absolute top-10 left-0 w-full px-5 z-[200]" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}>
            <div className="bg-emerald-500 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6" />
              <p className="text-xs font-bold leading-tight">Claim Submitted Successfully!<br /><span className="font-medium opacity-80">AI Analysis in progress.</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
