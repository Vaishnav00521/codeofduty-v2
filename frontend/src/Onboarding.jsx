import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, MapPin, Zap } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
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
    <div className="h-full flex-1 bg-[#141414] font-sans text-white flex items-center justify-center relative py-4 md:py-8 overflow-hidden">
      


      {/* Main Form Container - Card removed, now full-width mobile layout */}
      <motion.div 
        className="w-full max-w-md px-10 py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg mb-2 relative z-10">
            <span className="text-white">Rider</span><span className="text-[#f5db94]">Shield</span>
          </h1>
          <p className="text-sm text-slate-400 font-medium uppercase tracking-widest relative z-20">AI-Powered Income Protection</p>
        </motion.div>

        {/* Form Input Elements */}
        <motion.div variants={itemVariants} className="space-y-5 mb-8">
          
          {/* Input 1: Full Name */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input 
              type="text" 
              className="w-full bg-black/20 border border-white/10 text-white text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-11 p-3.5 placeholder-slate-500 outline-none transition-all shadow-inner" 
              placeholder="Rahul Kumar"
              defaultValue="Rahul Kumar"
            />
          </div>

          {/* Input 2: Delivery Platform */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Briefcase className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input 
              type="text" 
              className="w-full bg-black/20 border border-white/10 text-white text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-11 p-3.5 placeholder-slate-500 outline-none transition-all shadow-inner" 
              placeholder="Zepto"
              defaultValue="Zepto"
            />
          </div>

          {/* Input 3: Operating Zone */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input 
              type="text" 
              className="w-full bg-black/20 border border-white/10 text-white text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-11 p-3.5 placeholder-slate-500 outline-none transition-all shadow-inner" 
              placeholder="Koramangala, BLR"
              defaultValue="Koramangala, BLR"
            />
          </div>

        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mb-6">
          <button 
            type="button"
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-lg px-5 py-4 text-center shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all border border-blue-400/30"
          >
            Initialize AI Risk Engine
          </button>
        </motion.div>

        {/* Trust Badge Constraints */}
        <motion.div variants={itemVariants} className="text-center px-4">
          <p className="text-xs text-slate-400 leading-relaxed">
             Strictly covering Loss of Income from <span className="text-slate-300 font-medium">Weather & Social Disruptions.</span>
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}
