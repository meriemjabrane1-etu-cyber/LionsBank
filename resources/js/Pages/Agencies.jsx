import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Search, MapPin, Navigation, Phone, Clock, Layers, Globe, ShieldCheck, Activity, Target } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/layouts/app-layout";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icons for React
const userLocationIcon = new L.DivIcon({
  className: "bg-transparent",
  iconAnchor: [16, 36],
  popupAnchor: [0, -36],
  html: `
    <div class="relative flex flex-col items-center">
      <div class="absolute inset-0 bg-[#3b82f6] rounded-full opacity-30 animate-pulse"></div>
      <div class="w-8 h-8 rounded-full border-2 border-[#3b82f6] bg-[#041F1E] flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10">
        <div class="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
      </div>
      <div class="w-0.5 h-3 bg-gradient-to-b from-[#3b82f6] to-transparent"></div>
    </div>
  `
});

const agencyIcon = new L.DivIcon({
  className: "bg-transparent",
  iconAnchor: [16, 36],
  popupAnchor: [0, -36],
  html: `
    <div class="relative flex flex-col items-center group">
      <div class="w-8 h-8 rounded-full border-2 border-[rgb(28,212,132)] bg-[#041F1E] flex items-center justify-center shadow-[0_0_15px_rgba(28,212,132,0.3)] transition-transform duration-300 group-hover:scale-110 cursor-pointer">
        <div class="w-2 h-2 rounded-full bg-[rgb(28,212,132)]"></div>
      </div>
      <div class="w-0.5 h-3 bg-gradient-to-b from-[rgb(28,212,132)] to-transparent"></div>
    </div>
  `
});

const activeAgencyIcon = new L.DivIcon({
  className: "bg-transparent",
  iconAnchor: [16, 36],
  popupAnchor: [0, -36],
  html: `
    <div class="relative flex flex-col items-center">
      <div class="absolute inset-0 bg-[rgb(28,212,132)] rounded-full opacity-30 animate-ping"></div>
      <div class="w-8 h-8 rounded-full border-2 border-[rgb(28,212,132)] bg-[rgb(28,212,132)] flex items-center justify-center shadow-[0_0_20px_rgba(28,212,132,0.6)] z-10 cursor-pointer">
        <div class="w-2 h-2 rounded-full bg-[#041F1E]"></div>
      </div>
      <div class="w-0.5 h-4 bg-gradient-to-b from-[rgb(28,212,132)] to-transparent"></div>
    </div>
  `
});

const agenciesData = [
  { id: 1, name: "Lions Bank Maarif", address: "Maarif, Casablanca", status: "Open", cash: true, position: [33.5866, -7.6332] },
  { id: 2, name: "Lions Bank Anfa", address: "Anfa, Casablanca", status: "Closed", cash: false, position: [33.5928, -7.6536] },
  { id: 3, name: "Lions Bank Center", address: "Mohammed V, Casablanca", status: "Open", cash: true, position: [33.5941, -7.6184] },
  { id: 4, name: "Lions Bank Ain Diab", address: "Ain Diab, Casablanca", status: "Open", cash: true, position: [33.6031, -7.6721] },
  { id: 5, name: "Lions Bank Derb Sultan", address: "Derb Sultan", status: "Closed", cash: true, position: [33.5709, -7.6026] },
  { id: 6, name: "Lions Bank Sidi Maarouf", address: "Sidi Maarouf", status: "Open", cash: false, position: [33.5296, -7.6472] },
];

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function Agencies() {
  const [userLocation, setUserLocation] = useState([33.5731, -7.5898]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeAgency, setActiveAgency] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => setUserLocation([33.5731, -7.5898])
    );
  }, []);

  const agencies = useMemo(() => {
    return agenciesData
      .map((agency) => ({
        ...agency,
        distance: getDistanceKm(userLocation[0], userLocation[1], agency.position[0], agency.position[1]),
      }))
      .filter((agency) => {
        const matchesSearch = agency.name.toLowerCase().includes(search.toLowerCase()) || agency.address.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || (filter === "open" && agency.status === "Open") || (filter === "cash" && agency.cash);
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }, [search, filter, userLocation]);

  const openMapsDirection = (agency) => {
    const [lat, lng] = agency.position;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
  };

  const breadcrumbs = [{ title: 'Agencies Map', href: '/agencies' }];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col h-[calc(100vh-64px)] bg-[#F8FAFC] dark:bg-[#041F1E] text-slate-900 dark:text-white overflow-hidden relative transition-colors duration-500">
        {/* Glow Effects */}
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[rgb(28,212,132)]/5 rounded-full blur-[150px] pointer-events-none z-0" />

        {/* Header Bar */}
        <div className="bg-[#062B29]/80 backdrop-blur-xl border-b border-white/10 px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[rgb(28,212,132)]/10 rounded-xl flex items-center justify-center border border-[rgb(28,212,132)]/20 shadow-[0_0_15px_rgba(28,212,132,0.1)]">
              <ShieldCheck className="w-6 h-6 text-[rgb(28,212,132)]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">Secure Locations</h1>
              <p className="text-sm text-white/40">Find encrypted endpoints and physical branches.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search branch..."
                className="pl-10 bg-[#041F1E] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[rgb(28,212,132)]/50 focus-visible:border-[rgb(28,212,132)] rounded-xl h-11"
              />
            </div>
            <div className="flex bg-[#041F1E] p-1 rounded-xl border border-white/10">
              {['all', 'open', 'cash'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                    filter === f 
                    ? 'bg-[rgb(28,212,132)] text-[#041F1E] shadow-[0_0_10px_rgba(28,212,132,0.3)]' 
                    : 'text-white/40 hover:text-white'
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden z-10">
          {/* Sidebar List */}
          <div className="w-[420px] bg-[#062B29]/90 backdrop-blur-md border-r border-white/10 overflow-y-auto p-6 flex flex-col gap-4 shadow-xl custom-scrollbar">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-bold text-[rgb(28,212,132)] uppercase tracking-[0.2em] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[rgb(28,212,132)] animate-pulse"></div>
                Active Endpoints ({agencies.length})
              </span>
            </div>
            
            <AnimatePresence mode="popLayout">
              {agencies.map((agency) => (
                <motion.div
                  key={agency.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`shrink-0 p-5 rounded-[24px] border transition-all cursor-pointer group relative overflow-hidden ${
                    activeAgency?.id === agency.id 
                    ? 'border-[rgb(28,212,132)] bg-[rgb(28,212,132)]/10 shadow-[0_0_20px_rgba(28,212,132,0.1)]' 
                    : 'border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveAgency(agency)}
                >
                  <div className="flex justify-between items-center mb-3 relative z-10">
                    <h3 className="font-bold text-white group-hover:text-[rgb(28,212,132)] transition-colors text-lg">{agency.name}</h3>
                    <Badge variant="outline" className={`font-bold tracking-wide ${
                      agency.status === 'Open' 
                      ? 'text-[rgb(28,212,132)] border-[rgb(28,212,132)]/30 bg-[rgb(28,212,132)]/10' 
                      : 'text-rose-400 border-rose-500/30 bg-rose-500/10'
                    }`}>
                      {agency.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-white/40 mb-5 flex items-center gap-2 relative z-10">
                    <MapPin className="w-4 h-4 text-[rgb(28,212,132)]/70" />
                    {agency.address}
                  </p>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/20 font-bold uppercase tracking-wider mb-1">Distance</span>
                        <span className="text-sm font-bold text-white">{agency.distance?.toFixed(1)} <span className="text-white/40 text-xs">KM</span></span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/20 font-bold uppercase tracking-wider mb-1">Status</span>
                        <span className={`text-sm font-bold ${agency.cash ? 'text-[rgb(28,212,132)]' : 'text-rose-400'}`}>
                          {agency.cash ? 'Secured' : 'Empty'}
                        </span>
                      </div>
                    </div>
                    <Button 
                      onClick={(e) => { e.stopPropagation(); openMapsDirection(agency); }}
                      className={`h-10 px-4 rounded-xl font-bold transition-all duration-300 ${
                        activeAgency?.id === agency.id
                        ? 'bg-[rgb(28,212,132)] text-[#041F1E] hover:bg-white'
                        : 'bg-white/5 border border-white/10 text-white hover:border-[rgb(28,212,132)] hover:text-[rgb(28,212,132)]'
                      }`}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Route
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Map Section */}
          <div className="flex-1 relative bg-[#020D0D]">
            <MapContainer
              center={[33.5866, -7.6332]}
              zoom={13}
              className="h-full w-full z-0 dark-map"
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              <Marker position={userLocation} icon={userLocationIcon}>
                <Popup className="premium-dark-popup">
                  <div className="text-center font-bold text-[#3b82f6]">Current Location</div>
                </Popup>
              </Marker>

              {agencies.map((agency) => (
                <Marker 
                  key={agency.id} 
                  position={agency.position}
                  icon={activeAgency?.id === agency.id ? activeAgencyIcon : agencyIcon}
                  eventHandlers={{ click: () => setActiveAgency(agency) }}
                >
                  <Popup className="premium-dark-popup">
                    <div className="w-64 p-4 bg-[#062B29] rounded-[2rem] border border-[rgb(28,212,132)]/30 shadow-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[rgb(28,212,132)]/20 rounded-xl flex items-center justify-center border border-[rgb(28,212,132)]/40 shadow-[0_0_10px_rgba(28,212,132,0.2)]">
                          <ShieldCheck className="w-5 h-5 text-[rgb(28,212,132)]" />
                        </div>
                        <h2 className="font-bold text-white text-lg tracking-wide">{agency.name}</h2>
                      </div>
                      
                      <div className="space-y-3 mb-5 p-3 bg-[#041F1E] rounded-xl border border-white/5">
                        <div className="flex items-center gap-3 text-sm text-white/60">
                          <Clock className="w-4 h-4 text-[rgb(28,212,132)]" />
                          <span className="font-medium">24/7 Monitoring</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/60">
                          <Phone className="w-4 h-4 text-[rgb(28,212,132)]" />
                          <span className="font-mono">+212 522-SECURE</span>
                        </div>
                      </div>

                      <Button 
                        onClick={() => openMapsDirection(agency)}
                        className="w-full bg-[rgb(28,212,132)] hover:bg-white text-[#041F1E] rounded-xl h-12 font-bold shadow-lg transition-all duration-300"
                      >
                        <Navigation className="w-5 h-5 mr-2" />
                        Establish Route
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Controls Overlay */}
            <div className="absolute top-6 right-6 flex flex-col gap-3 z-[400]">
              <Button size="icon" className="shadow-2xl rounded-xl h-12 w-12 bg-[#062B29] border border-white/10 hover:border-[rgb(28,212,132)] hover:bg-[rgb(28,212,132)]/10 text-white/40 hover:text-[rgb(28,212,132)] transition-colors"><Layers className="w-5 h-5" /></Button>
              <Button size="icon" className="shadow-2xl rounded-xl h-12 w-12 bg-[#062B29] border border-white/10 hover:border-[rgb(28,212,132)] hover:bg-[rgb(28,212,132)]/10 text-white/40 hover:text-[rgb(28,212,132)] transition-colors"><Globe className="w-5 h-5" /></Button>
              <Button size="icon" onClick={() => setUserLocation(userLocation)} className="shadow-2xl rounded-xl h-12 w-12 bg-[#062B29] border border-white/10 hover:border-[rgb(28,212,132)] hover:bg-[rgb(28,212,132)]/10 text-white/40 hover:text-[rgb(28,212,132)] transition-colors"><Target className="w-5 h-5" /></Button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .leaflet-container { font-family: inherit; background: #020D0D !important; }
        .premium-dark-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          border-radius: 32px;
          padding: 0;
          box-shadow: none;
        }
        .premium-dark-popup .leaflet-popup-content {
          margin: 0;
        }
        .premium-dark-popup .leaflet-popup-tip-container { display: none; }
        .premium-dark-popup .leaflet-popup-close-button {
          color: rgb(28,212,132) !important;
          top: 16px !important;
          right: 16px !important;
          z-index: 10;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(28,212,132);
        }
      `}} />
    </AppLayout>
  );
}
