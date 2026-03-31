import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Zap, RefreshCw, Landmark, Activity, ActivitySquare, AlertTriangle, Database, TrendingUp, Cpu, MapPin } from 'lucide-react';

export default function SimulationSandbox() {
    // 1. Add the dynamic URL variable at the top of the component
    const API_BASE_URL = 'https://codeofduty-backend.onrender.com';

    // Admin State
    const [triggerType, setTriggerType] = useState('Heavy Rainfall');
    const [severityValue, setSeverityValue] = useState(35.0);
    const [isGpsMatch, setIsGpsMatch] = useState(true);

    const [adminLoading, setAdminLoading] = useState(false);
    const [poolBalance, setPoolBalance] = useState(1000000);
    const [nextWeekPremium, setNextWeekPremium] = useState(65);

    // Simulated Result State
    const [mobileStatus, setMobileStatus] = useState('IDLE'); // IDLE, REJECTED, APPROVED
    const [mobileBal, setMobileBal] = useState(0);
    const [receipt, setReceipt] = useState(null);

    const executeInjection = async () => {
        setAdminLoading(true);

        try {
            // 2. Swap out the hardcoded URL using backticks
            const res = await fetch(`${API_BASE_URL}/api/claims/simulate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ triggerType, severityValue: parseFloat(severityValue), isGpsMatch })
            });
            const data = await res.json();

            // ... the rest of your function remains the same

            if (data.status === 'REJECTED') {
                setMobileStatus('REJECTED');
                setReceipt(data);
            } else if (data.status === 'SUCCESS') {
                setPoolBalance(data.newPoolBalance);
                setNextWeekPremium(data.nextWeekPremium);

                setMobileStatus('APPROVED');
                setReceipt(data);

                let current = mobileBal;
                const target = mobileBal + data.payoutAmount;
                const interval = setInterval(() => {
                    current += Math.ceil((target - current) / 4) || 1;
                    setMobileBal(current);
                    if (current >= target) {
                        setMobileBal(target);
                        clearInterval(interval);
                    }
                }, 50);
            }
        } catch (e) {
            console.error(e);
            setMobileStatus('REJECTED');
            setReceipt({ message: "Network Disconnect: Java API Offline" });
        } finally {
            setAdminLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col font-sans text-white p-5 pt-8 gap-6 z-20 relative bg-transparent">

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-500/30">
                    <Cpu className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                    <h1 className="text-xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-md">
                        Injection Tools
                    </h1>
                    <p className="text-[9px] text-blue-400 font-bold tracking-[0.2em] uppercase">System Override</p>
                </div>
            </div>

            {/* Admin Config Card */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-cyan-500/20 rounded-[2rem] p-5 shadow-[0_0_30px_rgba(6,182,212,0.1)] space-y-4">
                <div>
                    <label className="text-[9px] font-bold text-blue-300 uppercase tracking-widest pl-1 mb-2 block opacity-80">Inject Hazard</label>
                    <select value={triggerType} onChange={e => setTriggerType(e.target.value)} className="w-full bg-black/40 border border-white/10 text-white text-sm font-medium rounded-xl p-3.5 outline-none focus:border-cyan-500 shadow-inner">
                        <option>Heavy Rainfall</option>
                        <option>Extreme Heat</option>
                        <option>AQI Hazard</option>
                        <option>Traffic Gridlock</option>
                    </select>
                </div>

                <div>
                    <label className="text-[9px] font-bold text-blue-300 uppercase tracking-widest pl-1 mb-2 block opacity-80">Severity Magnitude</label>
                    <input type="number" step="0.1" value={severityValue} onChange={e => setSeverityValue(e.target.value)} className="w-full bg-black/40 border border-white/10 text-white text-sm font-medium rounded-xl p-3.5 outline-none focus:border-cyan-500 shadow-inner" />
                </div>

                <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl border border-white/5">
                    <div>
                        <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-0.5">Fraud Guardian</p>
                        <p className="text-[8px] text-emerald-400 uppercase tracking-widest">GPS Match Filter</p>
                    </div>
                    <button onClick={() => setIsGpsMatch(!isGpsMatch)} className={`w-12 h-7 rounded-full transition-colors relative flex items-center ${isGpsMatch ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-red-500/20 border border-red-500/50'}`}>
                        <span className={`w-5 h-5 rounded-full bg-white shadow-md absolute transition-transform transform ${isGpsMatch ? 'translate-x-6 bg-emerald-400' : 'translate-x-1 bg-red-400'}`} />
                    </button>
                </div>

                <button onClick={executeInjection} disabled={adminLoading} className="w-full py-4 rounded-xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all bg-red-600/90 text-white border border-red-400/50 hover:bg-red-500 shadow-[0_0_30px_rgba(220,38,38,0.3)] active:scale-95 disabled:opacity-50 mt-2">
                    {adminLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-current" />}
                    {adminLoading ? 'Processing...' : 'Execute Live API'}
                </button>
            </div>

            {/* Actuarial Database Output */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/10 rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-2 mb-2"><Database className="w-3.5 h-3.5 text-cyan-500" /><p className="text-[8px] font-bold text-cyan-300 uppercase tracking-widest leading-none">Global Pool</p></div>
                    <p className="text-xl font-black tracking-tighter">₹{(poolBalance / 1000).toFixed(0)}K</p>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-md border border-purple-500/10 rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-3.5 h-3.5 text-purple-500" /><p className="text-[8px] font-bold text-purple-300 uppercase tracking-widest leading-none">Net Premium</p></div>
                    <p className="text-xl font-black tracking-tighter">₹{nextWeekPremium.toFixed(2)}</p>
                </div>
            </div>

            {/* Simulated App Result Segment */}
            <div className="w-full mt-2">
                <h2 className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-3 text-center w-full">Virtual App State</h2>

                <div className={`flex items-center justify-between px-4 py-3 rounded-xl border mb-4 transition-all duration-300 ${mobileStatus === 'REJECTED' ? 'bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : mobileStatus === 'APPROVED' ? 'bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex items-center gap-2">
                        <MapPin className={`w-3.5 h-3.5 ${mobileStatus === 'REJECTED' ? 'text-red-400' : 'text-cyan-400'}`} />
                        <span className={`text-[9px] font-bold uppercase tracking-widest ${mobileStatus === 'REJECTED' ? 'text-red-400 animate-pulse' : mobileStatus === 'APPROVED' ? 'text-cyan-400 animate-pulse' : 'text-cyan-400/50'}`}>
                            {mobileStatus === 'REJECTED' ? 'GPS ANOMALY DETECTED' : mobileStatus === 'APPROVED' ? 'THRESHOLD BREACHED' : 'SCANNING VADODARA...'}
                        </span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {mobileStatus === 'IDLE' && (
                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl border-dashed">
                            <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50"><ActivitySquare className="w-4 h-4 text-gray-500" /></div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">No active incidents.</p>
                        </motion.div>
                    )}

                    {mobileStatus === 'REJECTED' && (
                        <motion.div key="reject" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-4 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.15)] backdrop-blur-sm">
                            <div className="bg-red-500/20 p-2.5 rounded-xl border border-red-500/30"><AlertTriangle className="w-4 h-4 text-red-400" /></div>
                            <div>
                                <p className="text-[9px] font-black text-red-400 uppercase tracking-widest leading-none drop-shadow-md">Access Denied</p>
                                <p className="text-xs font-bold text-white mt-1">{receipt?.message || 'Transaction Blocked'}</p>
                            </div>
                        </motion.div>
                    )}

                    {mobileStatus === 'APPROVED' && (
                        <motion.div key="approve" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-4 p-5 bg-blue-900/40 border border-blue-500/40 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)] backdrop-blur-md">
                            <div className="bg-blue-500/20 p-2.5 rounded-xl border border-blue-500/30"><Landmark className="w-5 h-5 text-blue-400" /></div>
                            <div className="flex-1">
                                <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest drop-shadow-md">{receipt?.actionTaken}</p>
                                <p className="text-2xl font-black text-white mt-0.5 animate-pulse">₹{mobileBal.toLocaleString('en-IN')}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
