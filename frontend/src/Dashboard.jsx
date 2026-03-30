import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Bell, 
  Settings as SettingsIcon, 
  Landmark, 
  Map as MapIcon,
  ChevronRight,
  Activity,
  MapPin,
  RefreshCcw,
  X,
  CreditCard,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const [summary, setSummary] = useState({ totalPayout: 0.0, claimCount: 0, latestClaim: null });
  const [worker, setWorker] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOverlay, setActiveOverlay] = useState(null); // 'notifications', 'settings', 'payments'

  const fetchDashboardData = async () => {
    try {
      const [sResp, wResp, nResp] = await Promise.all([
        fetch('http://localhost:8080/api/claims/summary').then(r => r.json()),
        fetch('http://localhost:8080/api/workers/summary').then(r => r.json()),
        fetch('http://localhost:8080/api/notifications').then(r => r.json())
      ]);
      
      setSummary(sResp);
      setWorker(wResp);
      setNotifications(nResp);
    } catch (err) {
      console.error("Dashboard Sync Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const renderOverlay = () => {
    switch(activeOverlay) {
      case 'notifications': return <NotificationsOverlay notifications={notifications} onClose={() => setActiveOverlay(null)} />;
      case 'settings': return <SettingsOverlay worker={worker} onClose={() => setActiveOverlay(null)} onUpdate={fetchDashboardData} />;
      case 'payments': return <PaymentsOverlay worker={worker} onClose={() => setActiveOverlay(null)} onUpdate={fetchDashboardData} />;
      default: return null;
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
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white leading-tight">RiderShield</h1>
            <p className="text-[10px] text-gray-400 font-medium">Welcome, {worker?.fullName || 'Rider'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <div className="relative cursor-pointer hover:text-white transition-colors" onClick={() => setActiveOverlay('notifications')}>
             <Bell className="w-5 h-5" />
             {notifications.some(n => !n.isRead) && (
               <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1c1c1c]" />
             )}
          </div>
          <SettingsIcon 
            className="w-5 h-5 cursor-pointer hover:text-white transition-colors" 
            onClick={() => setActiveOverlay('settings')}
          />
        </div>
      </motion.header>
      
      {/* Location Selector */}
      <motion.div className="px-6 py-3 flex items-center gap-2 bg-[#181818] border-b border-white/5">
        <MapPin className="w-4 h-4 text-blue-500" />
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{worker?.operatingZone || 'Scanning...'}</span>
        <div className="flex-1" />
        <RefreshCcw className="w-3.5 h-3.5 text-gray-600 hover:text-white cursor-pointer" onClick={fetchDashboardData} />
      </motion.div>

      <div className="flex-1 overflow-y-auto px-5 py-6 pb-24 no-scrollbar">
        {/* Instant Payout Balance Card */}
        <div className="bg-[#242424] rounded-[2rem] p-6 shadow-xl border border-white/5 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Instant Payout Balance</p>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">₹{(summary?.totalPayout ?? 0).toFixed(2)}</h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Primary Method</p>
                <div className="flex items-center gap-3 bg-[#1c1c1c] p-2 pr-4 rounded-full border border-white/10">
                  <div className="bg-white/10 p-2 rounded-full">
                    <Landmark className="w-4 h-4 text-gray-300" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-white leading-tight">UPI ID</p>
                    <p className="text-[10px] text-gray-500 font-medium">{worker?.upiId || 'Not linked'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                disabled={loading || (summary?.totalPayout ?? 0) === 0}
                onClick={async () => {
                  setLoading(true);
                  await fetch('http://localhost:8080/api/claims/withdraw', { method: 'POST' });
                  fetchDashboardData();
                  setLoading(false);
                }}
                className={`flex-1 font-bold py-3.5 rounded-2xl text-sm transition-all shadow-lg active:scale-95 ${(summary?.totalPayout ?? 0) > 0 ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-500"}`}
              >
                {loading ? "Processing..." : "One-Tap Withdraw"}
              </button>
              <button 
                onClick={() => setActiveOverlay('payments')}
                className="flex-1 bg-white text-black font-bold py-3.5 rounded-2xl text-sm transition-all shadow-lg active:scale-95"
              >
                Manage Methods
              </button>
            </div>
        </div>

        {/* Auto-detected Claims */}
        <h3 className="text-lg font-bold text-white tracking-tight mb-5 px-1">Auto-detected Claims</h3>
        {summary.latestClaim ? (
          <div className="w-full bg-[#242424] rounded-[2rem] p-6 border border-white/5 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Incident: {summary.latestClaim?.triggerEvent}</h4>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">ID: {summary.latestClaim?.id?.substring(0,8)}</p>
              </div>
              <div className="bg-amber-400 px-3 py-1 rounded-full"><span className="text-[10px] font-extrabold text-black uppercase tracking-wider">{summary.latestClaim.status}</span></div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 opacity-50"><Activity className="w-10 h-10 mx-auto mb-3 text-gray-600" /><p className="text-sm font-bold">No active incidents detected.</p></div>
        )}
      </div>

      <AnimatePresence>
        {activeOverlay && (
          <motion.div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveOverlay(null)}>
             <motion.div className="absolute bottom-0 left-0 w-full bg-[#1c1c1c] rounded-t-[3rem] p-8 pb-12 shadow-2xl" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} onClick={e => e.stopPropagation()}>
                <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
                {renderOverlay()}
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotificationsOverlay({ notifications, onClose }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Activity Center</h2>
        <X className="w-6 h-6 text-gray-500 cursor-pointer" onClick={onClose} />
      </div>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {notifications.length > 0 ? notifications.map(n => (
          <div key={n.id} className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <p className="text-sm font-bold text-blue-400 mb-1">{n.title}</p>
            <p className="text-xs text-gray-400 leading-relaxed">{n.message}</p>
            <p className="text-[10px] text-gray-600 mt-2">{new Date(n.timestamp).toLocaleTimeString()}</p>
          </div>
        )) : <p className="text-center text-gray-500 py-10">No recent notifications</p>}
      </div>
    </div>
  );
}

function SettingsOverlay({ worker, onClose, onUpdate }) {
  const [zone, setZone] = useState(worker?.operatingZone || '');
  const [platform, setPlatform] = useState(worker?.platform || '');

  const handleUpdate = async () => {
    await fetch(`http://localhost:8080/api/workers/${worker.id}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operatingZone: zone, platform: platform })
    });
    onUpdate();
    onClose();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Rider Settings</h2>
        <X className="w-6 h-6 text-gray-500 cursor-pointer" onClick={onClose} />
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Operating Zone</label>
          <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none" value={zone} onChange={e => setZone(e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Delivery Platform</label>
          <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none" value={platform} onChange={e => setPlatform(e.target.value)} />
        </div>
        <button onClick={handleUpdate} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20">Update Profile</button>
      </div>
    </div>
  );
}

function PaymentsOverlay({ worker, onClose, onUpdate }) {
  const [upi, setUpi] = useState(worker?.upiId || '');

  const handleUpdate = async () => {
    await fetch(`http://localhost:8080/api/workers/${worker.id}/payment`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ upiId: upi })
    });
    onUpdate();
    onClose();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Payout Methods</h2>
        <X className="w-6 h-6 text-gray-500 cursor-pointer" onClick={onClose} />
      </div>
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4 mb-6 flex items-start gap-4 text-sm text-blue-100">
         <Shield className="w-5 h-5 text-blue-400 mt-1" /><p>Instant payouts are verified by Stripe & UPI for fraud prevention.</p>
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Primary UPI ID</label>
          <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500" value={upi} onChange={e => setUpi(e.target.value)} placeholder="name@upi" />
        </div>
        <button onClick={handleUpdate} className="w-full bg-white text-black font-bold py-4 rounded-2xl shadow-xl">Save Payment Method</button>
      </div>
    </div>
  );
}
