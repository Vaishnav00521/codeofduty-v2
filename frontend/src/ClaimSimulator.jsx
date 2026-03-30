import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, CloudLightning, CheckCircle, Banknote, ShieldAlert } from 'lucide-react';

export default function ClaimSimulator() {
  const [simulationStep, setSimulationStep] = useState(0);

  const startSimulation = async () => {
    if (simulationStep > 0) return;
    
    // 1. Initial trigger UI state
    setSimulationStep(1);

    try {
      // 2. Perform the ACTUAL background trigger to the Spring Boot Backend
      // This simulates an external Weather/Traffic API calling our webhook
      const response = await fetch('http://localhost:8080/api/triggers/external', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          zone: "Koramangala, BLR",
          eventType: "Severe Rainstorm",
          severity: 4
        })
      });

      if (!response.ok) throw new Error("Backend Trigger Failed");

      // 3. UI purely follows for visual effect during the hackathon
      setTimeout(() => setSimulationStep(2), 1500);
      setTimeout(() => setSimulationStep(3), 3000);
      setTimeout(() => setSimulationStep(4), 4500);

    } catch (err) {
      console.error("Simulation Error:", err);
      setSimulationStep(0);
      alert("Backend trigger failed. Ensure Spring Boot is running on port 8080.");
    }
  };

  const steps = [
    { id: 1, text: "OpenWeatherMap API Triggered: Rainfall > 30mm/hr", icon: CloudLightning },
    { id: 2, text: "Platform Sync: Zepto Operations Halted in Koramangala", icon: ShieldAlert },
    { id: 3, text: "Smart Contract Execution: 4 Hours of Income Lost", icon: Banknote },
    { id: 4, text: "Instant Payout Dispatched: ₹5,230 sent to UPI via Razorpay", icon: CheckCircle }
  ];

  return (
    <div className="h-full flex-1 bg-[#141414] font-sans text-white p-5 relative overflow-hidden">
      
      {/* Background radial highlight corresponding to emergency UI */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000" style={{ opacity: simulationStep === 0 ? 1 : 0.2 }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000" style={{ opacity: simulationStep === 4 ? 1 : 0 }} />

      <div className="relative z-10 max-w-md mx-auto h-full">
        {/* Header Block */}
        <header className="mb-10 text-center">
          <div className="inline-block bg-white/10 p-3 rounded-2xl border border-white/20 shadow-lg backdrop-blur-md mb-4">
            <PlayCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Parametric Trigger Simulator</h1>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-2 px-4 leading-relaxed bg-white/5 py-2 rounded-xl border border-white/5 mt-4">
            Strictly replacing <span className="text-white font-bold">Lost Hours/Wages</span>. 
            <br/>Zero vehicle or medical coverage.
          </p>
        </header>

        {/* Dynamic Disruptor Button */}
        <button 
          onClick={startSimulation}
          disabled={simulationStep > 0}
          className={`w-full font-extrabold rounded-2xl text-[13px] md:text-sm tracking-wide px-5 py-5 text-center transition-all border shadow-2xl relative overflow-hidden group mb-10 ${
            simulationStep === 0 
              ? 'bg-red-600 hover:bg-red-500 border-red-400/50 shadow-[0_0_30px_rgba(220,38,38,0.5)] animate-[pulse_2s_ease-in-out_infinite]'
              : 'bg-slate-800 border-slate-700 text-slate-500 opacity-60 cursor-not-allowed'
          }`}
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {simulationStep === 0 ? "SIMULATE SEVERE RAINSTORM (API TRIGGER)" : "SIMULATION IN PROGRESS..."}
        </button>

        {/* The Automation Logic Processing Timeline */}
        <div className="space-y-4 mb-8">
          {steps.map((step) => {
            const isActive = simulationStep >= step.id;
            const StepIcon = step.icon;
            
            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isActive ? 1 : 0.3, x: isActive ? 0 : -10 }}
                className={`flex gap-4 p-4 rounded-2xl border transition-all duration-500 ${
                  isActive 
                    ? 'bg-white/10 border-white/20 shadow-lg backdrop-blur-md' 
                    : 'bg-white/5 border-white/5'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {isActive ? (
                    <div className="bg-emerald-500/20 p-1.5 rounded-full border border-emerald-500/50">
                      <StepIcon className="w-5 h-5 text-emerald-400" />
                    </div>
                  ) : (
                    <div className="bg-slate-800 p-1.5 rounded-full border border-slate-700">
                      <div className="w-5 h-5 rounded-full bg-slate-700/50 text-transparent" />
                    </div>
                  )}
                </div>
                <div>
                  <p className={`text-sm font-semibold leading-tight mt-1 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {step.text}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Success Output Representation */}
        <AnimatePresence>
          {simulationStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.3)] rounded-3xl p-6 text-center"
            >
              <div className="flex justify-center mb-4 mt-2">
                <Banknote className="w-12 h-12 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-emerald-400 mb-2">Payout Successful</h2>
              <p className="text-sm font-medium text-emerald-100/90 leading-relaxed max-w-[250px] mx-auto">Earnings Protected. Exact transfer successfully initiated to UPI.</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
