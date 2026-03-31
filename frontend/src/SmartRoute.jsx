import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Navigation, 
  CloudRain, 
  Cloud,
  Sun,
  CloudSnow,
  Wind,
  Thermometer,
  Clock, 
  AlertTriangle, 
  MapPin, 
  Store,
  ArrowRight,
  Radio,
  Satellite,
  Zap,
  TrendingUp,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// ─── Leaflet Default Icon Fix ───────────────────────────────────────────────
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
L.Marker.prototype.options.icon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// TomTom API Key (matches backend)
const TOMTOM_KEY = 'hdm2x34JfpKIgWTuU6jAiPDMml8QWz1j';

// ─── Custom Marker Factory ───────────────────────────────────────────────────
const createCustomIcon = (color, IconComp) => {
  const html = renderToStaticMarkup(
    <div style={{
      background: `${color}22`,
      border: `2px solid ${color}`,
      borderRadius: '50%',
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 0 16px ${color}88`
    }}>
      <IconComp size={18} color={color} />
    </div>
  );
  return L.divIcon({ html, className: '', iconSize: [36, 36], iconAnchor: [18, 18] });
};

// ─── Pulsing "Live" Worker Marker ───────────────────────────────────────────
const createLiveWorkerIcon = () => {
  const html = `
    <div style="position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center;">
      <div style="
        position:absolute;
        width:40px;height:40px;
        border-radius:50%;
        background:rgba(59,130,246,0.2);
        animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
      "></div>
      <div style="
        width:18px;height:18px;
        border-radius:50%;
        background:#3b82f6;
        border:3px solid white;
        box-shadow:0 0 20px #3b82f6;
        z-index:1;
      "></div>
    </div>
  `;
  return L.divIcon({ html, className: '', iconSize: [40, 40], iconAnchor: [20, 20] });
};

// ─── Map Auto-Follow Component ───────────────────────────────────────────────
function FollowWorker({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, map.getZoom(), { animate: true, duration: 1 });
  }, [position, map]);
  return null;
}

// ─── Main Component ──────────────────────────────────────────────────────────
// ─── Weather condition → icon/color map ─────────────────────────────────────
function WeatherIcon({ condition, size = 16 }) {
  const c = (condition || '').toLowerCase();
  if (c.includes('rain') || c.includes('drizzle')) return <CloudRain size={size} className="text-blue-400" />;
  if (c.includes('cloud')) return <Cloud size={size} className="text-gray-400" />;
  if (c.includes('snow')) return <CloudSnow size={size} className="text-cyan-300" />;
  if (c.includes('wind') || c.includes('squall')) return <Wind size={size} className="text-teal-400" />;
  if (c.includes('clear')) return <Sun size={size} className="text-yellow-400" />;
  return <Cloud size={size} className="text-gray-500" />;
}

export default function SmartRoute() {
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPositionIdx, setCurrentPositionIdx] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [showWeather, setShowWeather] = useState(true);
  const intervalRef = useRef(null);

  // Bangalore: Zepto Store → HSR Layout Customer
  const start = { lat: 12.9344, lon: 77.6101, name: 'Zepto Store #12' };
  const end   = { lat: 12.9141, lon: 77.6413, name: 'HSR Layout Customer' };

  // ── Fetch route from backend ────────────────────────────────────────────
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/logistics/smart-route?sLat=${start.lat}&sLon=${start.lon}&eLat=${end.lat}&eLon=${end.lon}`
        );
        const data = await res.json();
        setRouteData(data);
      } catch (err) {
        console.error('Route fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoute();
  }, []);

  // ── Live tracking simulation ────────────────────────────────────────────
  const polylineCoords = routeData?.route?.points?.map(p => [p.latitude, p.longitude]) || [];

  const startTracking = () => {
    if (isTracking || polylineCoords.length === 0) return;
    setIsTracking(true);
    setCurrentPositionIdx(0);
    intervalRef.current = setInterval(() => {
      setCurrentPositionIdx(prev => {
        const next = prev + 1;
        if (next >= polylineCoords.length - 1) {
          clearInterval(intervalRef.current);
          setIsTracking(false);
          return prev;
        }
        return next;
      });
    }, 1000);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const currentPos = polylineCoords[currentPositionIdx] ?? null;
  // Remaining route = from current position onwards
  const remainingRoute = polylineCoords.slice(currentPositionIdx);

  const trafficDelay = routeData?.route?.trafficDelaySeconds || 0;
  const eta = Math.round((routeData?.route?.travelTimeSeconds || 0) / 60);
  const distanceKm = ((routeData?.route?.lengthMeters || 0) / 1000).toFixed(1);
  const progressPct = polylineCoords.length > 0
    ? Math.round((currentPositionIdx / (polylineCoords.length - 1)) * 100)
    : 0;

  // ── Dynamic Route Hazard Analysis ─────────────────────────────────────
  const hasRainAlert = routeData?.weatherAlerts?.some(w => w.condition?.includes('Rain'));
  const isHighRisk = trafficDelay > 300 || hasRainAlert;
  const isElevatedRisk = trafficDelay > 60 && !isHighRisk;
  
  const routeColor = isHighRisk ? '#ef4444' : isElevatedRisk ? '#f59e0b' : '#3b82f6';
  const pulseClass = isHighRisk ? 'animate-pulse' : '';

  // ── Loading state ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-transparent text-white gap-5">
        <div className="relative">
          <Satellite className="w-14 h-14 text-blue-500 animate-pulse" />
          <Radio className="w-5 h-5 text-emerald-400 absolute -top-1 -right-1 animate-bounce" />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-blue-400 tracking-[0.2em] uppercase animate-pulse">
            Acquiring Satellite Lock
          </p>
          <p className="text-[10px] text-gray-600 mt-1">Connecting to TomTom Traffic Grid...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-transparent font-sans text-white relative p-4 pb-0 overflow-hidden">

      {/* ── Map (takes all available height above the bento box) ─────────── */}
      <div className="flex-1 relative rounded-t-3xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        <MapContainer
          center={[start.lat, start.lon]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          {/* Layer 1 – Esri Satellite Base */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri"
          />

          {/* Layer 2 – TomTom Live Traffic Flow Overlay */}
          <TileLayer
            url={`https://api.tomtom.com/traffic/map/4/tile/flow/relative/{z}/{x}/{y}.png?key=${TOMTOM_KEY}`}
            attribution="Traffic &copy; TomTom"
            opacity={0.7}
          />

          {/* Remaining route polyline — glowing dynamic color */}
          {remainingRoute.length > 1 && (
            <Polyline
              className={pulseClass}
              positions={remainingRoute}
              pathOptions={{ 
                 color: routeColor, 
                 weight: isHighRisk ? 7 : 5, 
                 opacity: 0.9, 
                 lineJoin: 'round', 
                 lineCap: 'round',
                 dashArray: isHighRisk ? '10 10' : undefined
              }}
            />
          )}

          {/* Completed route — dimmed */}
          {currentPositionIdx > 0 && (
            <Polyline
              positions={polylineCoords.slice(0, currentPositionIdx + 1)}
              pathOptions={{ color: '#1e3a5f', weight: 4, opacity: 0.5, dashArray: '6 4' }}
            />
          )}

          {/* Store marker */}
          <Marker position={[start.lat, start.lon]} icon={createCustomIcon('#3b82f6', Store)}>
            <Popup>{start.name}</Popup>
          </Marker>

          {/* Destination marker */}
          <Marker position={[end.lat, end.lon]} icon={createCustomIcon('#ef4444', MapPin)}>
            <Popup>{end.name}</Popup>
          </Marker>

          {/* Live worker marker */}
          {currentPos && (
            <Marker position={currentPos} icon={createLiveWorkerIcon()}>
              <Popup>🛵 Rider is here</Popup>
            </Marker>
          )}

          {/* Weather alert mid-point marker */}
          {routeData?.weatherAlerts?.some(w => w.condition?.includes('Rain')) && (
            <Marker
              position={[(start.lat + end.lat) / 2, (start.lon + end.lon) / 2]}
              icon={createCustomIcon('#fbbf24', CloudRain)}
            >
              <Popup>⚠️ Rain detected on route</Popup>
            </Marker>
          )}

          {/* Auto-follow the rider */}
          {isTracking && currentPos && <FollowWorker position={currentPos} />}
        </MapContainer>

        {/* ── Floating top status bar ─────────────────────────────────── */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-3 shadow-2xl">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isTracking ? 'bg-emerald-400 animate-pulse' : 'bg-gray-600'}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                {isTracking ? 'Live Tracking' : 'Satellite View'}
              </span>
            </span>
            <span className="text-gray-600">|</span>
            <Satellite className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-semibold text-blue-400">
              {distanceKm} km
            </span>
          </div>
        </div>

        {/* ── Progress bar (only while tracking) ─────────────────────── */}
        {isTracking && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 z-[1000]">
            <div
              className="h-full bg-blue-500 transition-all duration-1000"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}
      </div>

      {/* ── Smart Bento Box ────────────────────────────────────────────────── */}
      <div className="px-4 py-4 pb-8 backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-b-3xl flex-shrink-0 mb-4 z-20">

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
            <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <p className="text-lg font-black">{eta - Math.round((eta * progressPct) / 100)}<span className="text-xs font-medium text-gray-500">m</span></p>
            <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">ETA</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
            <TrendingUp className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p className="text-lg font-black">{progressPct}<span className="text-xs font-medium text-gray-500">%</span></p>
            <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Progress</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
            <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <p className="text-lg font-black">+{Math.round(trafficDelay / 60)}<span className="text-xs font-medium text-gray-500">m</span></p>
            <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Delay</p>
          </div>
        </div>

        {/* ── Weather Forecast Accordion ──────────────────────────────────── */}
        <div className="mb-3">
          <button
            onClick={() => setShowWeather(v => !v)}
            className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 hover:bg-white/10 transition-all"
          >
            <span className="flex items-center gap-2">
              {routeData?.weatherAlerts?.[0] && (
                <WeatherIcon condition={routeData.weatherAlerts[0].condition} size={14} />
              )}
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Weather Forecast</span>
            </span>
            {showWeather ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
          </button>

          {showWeather && (
            <div className="mt-2 space-y-2">
              {routeData?.weatherAlerts && routeData.weatherAlerts.length > 0 ? (
                routeData.weatherAlerts.map((w, i) => {
                  const hasAlert = w.alert && w.alert !== 'Clear';
                  return (
                    <div key={i} className={`rounded-2xl p-3 border ${
                      hasAlert
                        ? 'bg-amber-500/10 border-amber-500/20'
                        : 'bg-white/5 border-white/10'
                    }`}>
                      {/* Condition Row */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <WeatherIcon condition={w.condition} size={18} />
                          <div>
                            <p className="text-sm font-bold text-white">{w.condition}</p>
                            <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">
                              {w.lat?.toFixed(3)}°N, {w.lon?.toFixed(3)}°E
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                          <Thermometer size={11} className="text-orange-400" />
                          <span className="text-[11px] font-bold text-white">{w.temp?.toFixed(1)}°C</span>
                        </div>
                      </div>

                      {/* Alert Banner */}
                      {hasAlert && (
                        <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-xl px-3 py-1.5">
                          <AlertTriangle size={11} className="text-amber-400 flex-shrink-0" />
                          <p className="text-[10px] text-amber-300 font-semibold">{w.alert}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-3">
                  <Sun size={18} className="text-yellow-400" />
                  <p className="text-[11px] text-gray-400">No weather alerts. Conditions are clear.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* AI Suggestion */}
        <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-3 mb-3">
          <AlertTriangle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-gray-300 leading-relaxed">
            {routeData?.recommendation || 'Route clear. Safe driving!'}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={startTracking}
          disabled={isTracking || polylineCoords.length === 0}
          className={`w-full font-bold py-4 rounded-2xl text-[13px] flex items-center justify-center gap-2 transition-all active:scale-95 ${
            isTracking
              ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30'
              : 'bg-white text-black hover:bg-blue-50'
          }`}
        >
          {isTracking ? (
            <><Radio className="w-4 h-4 animate-pulse" /> Tracking Live...</>
          ) : (
            <><Navigation className="w-4 h-4" /> Start Live Tracking <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>

      {/* Pulsing animation injected directly (no extra CSS file needed) */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .leaflet-container { background: #0a0a0a !important; }
      `}</style>
    </div>
  );
}
