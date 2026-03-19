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
    <div className="min-h-screen bg-slate-950 font-sans text-white flex items-center justify-center relative py-4 md:py-8 overflow-hidden">
      
      {/* Plexus Vibe Glows (Neural Network AI aesthetic) */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] animate-[pulse_4s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] animate-[pulse_3s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Form Container */}
      <motion.div 
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 relative z-10 m-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20 shadow-lg backdrop-blur-md">
              <Zap className="w-10 h-10 text-blue-400 fill-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">CodeofDuty</h1>
          <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">AI-Powered Income Protection</p>
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
