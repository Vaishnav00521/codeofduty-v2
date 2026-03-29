import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Bell, 
  Settings as SettingsIcon, 
  Landmark, 
  Map as MapIcon,
  ChevronRight,
  Activity,
  MapPin
} from 'lucide-react';

export default function Dashboard() {
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
    <div className="h-full flex-1 bg-[#141414] font-sans text-white flex flex-col relative overflow-hidden">
      
      {/* Top Header Section */}
      <motion.header 
        className="px-6 py-5 flex justify-between items-center bg-[#1c1c1c] border-b border-white/5"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-full shadow-lg">
            <Shield className="w-5 h-5 text-white fill-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">RiderShield</h1>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <Bell className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          <SettingsIcon className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
        </div>
      </motion.header>
      
      {/* Location Selector / Status Bar */}
      <motion.div 
        className="px-6 py-3 flex items-center gap-2 bg-[#181818] border-b border-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <MapPin className="w-4 h-4 text-blue-500" />
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Koramangala, BLR</span>
      </motion.div>

      <motion.div 
        className="flex-1 overflow-y-auto px-5 py-6 pb-24 no-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Instant Payout Balance Card */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-[#242424] rounded-[2rem] p-6 shadow-xl border border-white/5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Instant Payout Balance</p>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">₹64.00</h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Primary Method</p>
                <div className="flex items-center gap-3 bg-[#1c1c1c] p-2 pr-4 rounded-full border border-white/10">
                  <div className="bg-white/10 p-2 rounded-full">
                    <Landmark className="w-4 h-4 text-gray-300" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-white leading-tight">Bank ••••</p>
                    <p className="text-[10px] text-gray-500 font-medium">1245</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Available for one-tap withdrawal after approval
            </p>

            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-lg active:scale-95">
                One-Tap Withdraw
              </button>
              <button className="flex-1 bg-white text-black font-bold py-3.5 rounded-2xl text-sm transition-all shadow-lg active:scale-95">
                Manage Methods
              </button>
            </div>
          </div>
        </motion.div>

        {/* Auto-detected Claims Header */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-5 px-1">
          <h3 className="text-lg font-bold text-white tracking-tight">Auto-detected Claims</h3>
        </motion.div>

        {/* Ongoing Claims Container */}
        <motion.div variants={itemVariants} className="w-full">
          
          {/* Claim Card 1: Sudden Stop */}
          <div className="w-full bg-[#242424] rounded-[2rem] p-6 border border-white/5 relative overflow-hidden group">
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Incident: Sudden Stop</h4>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Detected: 2026-03-27 08:14</p>
              </div>
              <div className="bg-amber-400 px-3 py-1 rounded-full shadow-lg shadow-amber-400/10">
                <span className="text-[10px] font-extrabold text-black uppercase tracking-wider">Pending</span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <div>
                <p className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-widest">Lost hours</p>
                <p className="text-2xl font-bold text-white">3.5h</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-widest">Payout</p>
                <p className="text-2xl font-bold text-white">₹30.00</p>
                <p className="text-[10px] text-gray-500 font-medium mt-0.5">₹8.50/hr × 3.5h</p>
              </div>
            </div>

            {/* Evidence Thumbnails */}
            <div className="mb-6">
              <p className="text-gray-400 text-xs font-bold mb-3 uppercase tracking-widest">Evidence</p>
              <div className="flex gap-3">
                <div className="w-14 h-14 rounded-full bg-[#1c1c1c] border border-white/10 flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full bg-slate-800 relative">
                      <div className="absolute inset-x-0 top-1/2 h-0.5 bg-red-600/40 rotate-12" />
                      <div className="absolute inset-y-1/2 left-1/2 w-0.5 bg-blue-600/40 -rotate-12" />
                      <p className="absolute bottom-1 right-1 text-[6px] text-white/20 font-bold">GPS</p>
                   </div>
                </div>
                <div className="w-14 h-14 rounded-full bg-[#1c1c1c] border border-white/10 flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full bg-slate-700/50">
                      <MapIcon className="w-full h-full p-3.5 text-blue-400/30" />
                   </div>
                </div>
                <div className="w-14 h-14 rounded-full bg-[#1c1c1c] border border-white/10 flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full flex flex-col items-start justify-center p-2 opacity-30">
                      <div className="w-full h-0.5 bg-white/20 mb-1 rounded-full" />
                      <div className="w-3/4 h-0.5 bg-white/20 mb-1 rounded-full" />
                      <div className="w-1/2 h-0.5 bg-white/30 rounded-full" />
                   </div>
                </div>
              </div>
            </div>

            {/* AI Rationale */}
            <div className="bg-[#1c1c1c] rounded-2xl p-4 border border-white/5">
              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                <span className="text-blue-400 font-bold block mb-1">AI Rationale:</span>
                Speed sensor spike + GPS idle window indicates interruption. Confidence 92%.
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center text-[10px] text-gray-500 font-bold tracking-wider uppercase">
               <span>Expected payout: 24-48 hrs</span>
               <ChevronRight className="w-4 h-4 text-gray-600" />
            </div>

          </div>



        </motion.div>

      </motion.div>

    </div>
  );
}
