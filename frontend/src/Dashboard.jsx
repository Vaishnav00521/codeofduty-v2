import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap,
  MapPin,
  CloudLightning,
  Activity
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
    <div className="min-h-screen bg-slate-950 font-sans text-white flex justify-center py-0 md:py-8 relative overflow-hidden">
      
      {/* Subtle radial-gradient glow effects in the corners */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Mobile App Container */}
      <div className="w-full max-w-md min-h-screen md:min-h-[850px] relative z-10 md:rounded-[2.5rem] md:border md:border-white/10 overflow-hidden shadow-2xl bg-black/10">
        
        <motion.div 
          className="px-5 py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Nav: Glassy header */}
          <motion.header 
            className="flex justify-between items-center mb-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl px-4 py-3" 
            variants={itemVariants}
          >
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-white fill-white" />
              <h1 className="text-xl font-bold text-white tracking-tight">CodeofDuty</h1>
            </div>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center font-bold border border-white/30 text-white shadow-inner">
              R
            </div>
          </motion.header>

          {/* Zone Tag */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/20 text-sm font-medium text-white">
              <MapPin className="w-4 h-4 text-blue-400" />
              Zepto Zone: Koramangala
              <div className="w-2 h-2 bg-white rounded-full animate-pulse ml-1 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
            </div>
          </motion.div>

          {/* Critical Rule Banner */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-3 text-center">
              <p className="text-xs font-medium text-slate-300 tracking-wide uppercase">
                Active Policy: <span className="text-emerald-400 font-bold tracking-wide">Loss of Income ONLY</span>
              </p>
            </div>
          </motion.div>

          {/* The Hero Card (Weekly Premium) */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-6 relative overflow-hidden">
              
              {/* Glass reflection swoosh */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-30 pointer-events-none" />

              <div className="relative z-10">
                <p className="text-slate-400 text-sm font-semibold mb-4 uppercase tracking-widest text-center w-full">
                  AI Adjusted Premium
                </p>
                
                <div className="flex items-baseline justify-center gap-2 mb-6">
                  <span className="text-6xl font-extrabold text-white tracking-tighter drop-shadow-md">₹65</span>
                  <span className="text-xl text-slate-400 font-medium">/ week</span>
                </div>

                {/* AI Alert Notification */}
                <div className="bg-amber-500/10 border border-amber-500/30 backdrop-blur-md rounded-2xl p-4 shadow-lg shadow-amber-500/5">
                  <p className="text-sm text-amber-100/90 leading-relaxed font-medium">
                    <span className="text-amber-400 font-bold tracking-wide">⚠️ +₹15 this week:</span> 85% probability of severe waterlogging.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Live Triggers (Grid Layout) */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 gap-4">
              
              {/* Box 1: Weather API */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-5 flex flex-col justify-between aspect-square relative hover:bg-white/15 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="bg-white/10 p-3 rounded-2xl text-white border border-white/20 backdrop-blur-md">
                    <CloudLightning className="w-6 h-6" />
                  </div>
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.9)] mt-2 mr-1"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Weather API</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1 leading-snug">Rainfall/AQI</p>
                </div>
              </motion.div>

              {/* Box 2: Traffic Data */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-5 flex flex-col justify-between aspect-square relative hover:bg-white/15 transition-colors"
               >
                <div className="flex justify-between items-start mb-2">
                  <div className="bg-white/10 p-3 rounded-2xl text-white border border-white/20 backdrop-blur-md">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.9)] mt-2 mr-1"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Traffic Data</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1 leading-snug">Strike Blockades</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
