import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  Plus, 
  Map as MapIcon, 
  Camera, 
  CheckCircle2, 
  Clock, 
  XCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function Claims() {
  const [oneTap, setOneTap] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="h-full flex-1 bg-[#141414] font-sans text-white flex flex-col relative">
      
      <motion.div 
        className="flex-1 overflow-y-auto px-5 py-6 pb-24 no-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Past Claims Section */}
        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-lg font-bold mb-4 px-1">Past Claims</h2>
          <div className="space-y-3">
            {/* Claim 1 */}
            <div className="bg-[#1c1c1c] border border-white/5 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-white mb-0.5">Claim #RS-20260310-01</p>
                <p className="text-[10px] text-gray-500 font-medium">2026-03-10 • <span className="text-gray-400">₹5,976.00</span></p>
              </div>
              <div className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider bg-emerald-400/10 px-2 py-1 rounded-full">Paid</div>
            </div>
            {/* Claim 2 */}
            <div className="bg-[#1c1c1c] border border-white/5 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-white mb-0.5">Claim #RS-20260305-04</p>
                <p className="text-[10px] text-gray-500 font-medium">2026-03-05 • <span className="text-gray-400">₹3,984.00</span></p>
              </div>
              <div className="text-blue-400 text-[10px] font-bold uppercase tracking-wider bg-blue-400/10 px-2 py-1 rounded-full">Approved</div>
            </div>
            {/* Claim 3 */}
            <div className="bg-[#1c1c1c] border border-white/5 rounded-2xl p-4 flex justify-between items-center opacity-60">
              <div>
                <p className="text-sm font-bold text-white mb-0.5">Claim #RS-20260228-11</p>
                <p className="text-[10px] text-gray-500 font-medium">2026-02-28 • <span className="text-gray-400">₹0.00</span></p>
              </div>
              <div className="text-red-400 text-[10px] font-bold uppercase tracking-wider bg-red-400/10 px-2 py-1 rounded-full">Rejected</div>
            </div>
          </div>
        </motion.section>

        {/* Secure Payment Methods Section */}
        <motion.section variants={itemVariants} className="mb-8">
          <div className="bg-[#1c1c1c] border border-white/5 rounded-[2rem] p-6 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div className="max-w-[150px]">
                <h3 className="text-base font-bold mb-1">Secure Payment Methods</h3>
                <p className="text-[10px] text-gray-500 leading-tight">Bank and Wallets are encrypted and verified</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold px-4 py-2.5 rounded-full transition-all active:scale-95 shadow-lg">
                Add Method
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-[11px] text-gray-400 font-medium">Preferred: <span className="text-white font-bold">Bank ••••1245 • Verified</span></p>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <p className="text-xs font-bold text-gray-300">One-tap withdrawal</p>
                <button 
                  onClick={() => setOneTap(!oneTap)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${oneTap ? 'bg-blue-600' : 'bg-gray-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${oneTap ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Manual Claim (Edge Case) Section */}
        <motion.section variants={itemVariants} className="mb-4">
          <div className="bg-[#1c1c1c] border border-blue-500/20 rounded-[2rem] p-6">
            <h3 className="text-base font-bold text-blue-400 mb-6 border-b border-blue-500/20 pb-2">Manual Claim (Edge Case)</h3>
            
            <div className="space-y-6">
              {/* Date & Time */}
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Date & Time</p>
                <div className="bg-black/20 p-4 rounded-2xl border border-white/5 text-sm text-gray-400 font-medium tracking-wide">
                  2026-03-27 08:00
                </div>
              </div>

              {/* Location */}
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Location (tap to select)</p>
                <div className="w-full h-36 bg-slate-800/50 rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center group cursor-pointer">
                  {/* Mock Map View */}
                  <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
                     <MapIcon className="w-full h-full p-8 text-white/20" />
                     <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                     <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                     <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-1">
                     <div className="bg-blue-600/20 p-2 rounded-full border border-blue-500/30">
                        <MapIcon className="w-4 h-4 text-blue-400" />
                     </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Description</p>
                <div className="bg-black/20 p-4 rounded-2xl border border-white/5 text-sm h-24 text-gray-500 font-medium italic">
                  Describe what happened (max 500 chars)
                </div>
              </div>

              {/* Upload */}
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Upload Photo / Video (optional)</p>
                <div className="flex gap-4 items-center">
                  <button className="flex items-center gap-2 bg-white text-black font-bold text-[11px] px-4 py-2.5 rounded-full hover:bg-gray-200 transition-all">
                    <Plus className="w-4 h-4" /> Add Media
                  </button>
                  <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden bg-gray-900 flex items-center justify-center group relative">
                     <div className="w-full h-full bg-amber-600/20 flex items-center justify-center">
                        <Camera className="w-5 h-5 text-amber-500/50" />
                     </div>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                    <div className="w-3 h-3 bg-blue-600 rounded-sm" />
                  </div>
                  <span className="text-[11px] text-gray-300 font-medium">I confirm this report is accurate</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                    <div className="w-3 h-3 bg-blue-600 rounded-sm" />
                  </div>
                  <span className="text-[11px] text-gray-300 font-medium">I allow AI analysis of my data for this claim</span>
                </label>
              </div>

              {/* Footer Info */}
              <div className="pt-2">
                <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                  Estimated payout: <span className="text-white">₹0.00</span> • Expected review: <span className="text-white">24-72 hrs</span> • Fees: <span className="text-white">₹83.00 processing</span> (if payout to external bank)
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl text-[13px] transition-all shadow-lg active:scale-95 shadow-blue-600/10">
                  Submit Manual Claim
                </button>
                <button className="bg-white text-black font-bold py-4 px-6 rounded-2xl text-[13px] transition-all shadow-lg active:scale-95">
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>

    </div>
  );
}
