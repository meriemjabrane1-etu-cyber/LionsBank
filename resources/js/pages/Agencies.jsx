import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Search, MapPin, Navigation, Phone, Clock, Layers, Globe, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/layouts/app-layout";
import "leaflet/dist/leaflet.css";

const agenciesData = [
  { id: 1, name: "Lions Bank Maarif", address: "Maarif, Casablanca", status: "Open", cash: true, position: [33.5866, -7.6332] },
  { id: 2, name: "Lions Bank Anfa", address: "Anfa, Casablanca", status: "Closed", cash: false, position: [33.5928, -7.6536] },
  { id: 3, name: "Lions Bank Center", address: "Mohammed V, Casablanca", status: "Open", cash: true, position: [33.5941, -7.6184] },
  { id: 4, name: "Lions Bank Ain Diab", address: "Ain Diab, Casablanca", status: "Open", cash: true, position: [33.6031, -7.6721] },
  { id: 5, name: "Lions Bank Derb Sultan", address: "Derb Sultan", status: "Closed", cash: true, position: [33.5709, -7.6026] },
  { id: 6, name: "Lions Bank Sidi Maarouf", address: "Sidi Maarouf", status: "Open", cash: false, position: [33.5296, -7.6472] },
  { id: 7, name: "Lions Bank Bourgogne", address: "Bourgogne", status: "Open", cash: true, position: [33.5999, -7.6421] },
  { id: 8, name: "Lions Bank Hay Hassani", address: "Hay Hassani", status: "Closed", cash: false, position: [33.5585, -7.6786] },
  { id: 9, name: "Lions Bank Bernoussi", address: "Bernoussi, Casablanca", status: "Open", cash: true, position: [33.6138, -7.4989] },
  { id: 10, name: "Lions Bank Sidi Moumen", address: "Sidi Moumen", status: "Open", cash: true, position: [33.5758, -7.4992] },
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
      .sort((a, b) => a.distance - b.distance);
  }, [search, filter, userLocation]);

  const openMapsDirection = (agency) => {
    const [lat, lng] = agency.position;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
  };

  const breadcrumbs = [{ title: 'Agencies Map', href: '/agencies' }];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col h-[calc(100vh-64px)] bg-[#071d1d] text-white overflow-hidden relative">
        {/* Glow Effects */}
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#1bd382]/10 rounded-full blur-[150px] pointer-events-none z-0" />

        {/* Header Bar */}
        <div className="bg-[#0b2827]/80 backdrop-blur-xl border-b border-[#1a4f4d] px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1bd382]/10 rounded-xl flex items-center justify-center border border-[#1bd382]/20 shadow-[0_0_15px_rgba(27,211,130,0.15)]">
              <ShieldCheck className="w-6 h-6 text-[#1bd382]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">Secure Locations</h1>
              <p className="text-sm text-[#9CA3AF]">Find encrypted endpoints and physical branches.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <Input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search branch or location..."
                className="pl-10 bg-[#061818] border-[#1a4f4d] text-white placeholder:text-[#6B7280] focus-visible:ring-[#1bd382]/50 focus-visible:border-[#1bd382] rounded-xl h-11"
              />
            </div>
            <div className="flex bg-[#061818] p-1 rounded-xl border border-[#1a4f4d]">
              {['all', 'open', 'cash'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                    filter === f 
                    ? 'bg-[#1bd382] text-[#061818] shadow-[0_0_10px_rgba(27,211,130,0.5)]' 
                    : 'text-[#9CA3AF] hover:text-white'
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
          <div className="w-[420px] bg-[#0b2827]/90 backdrop-blur-md border-r border-[#1a4f4d] overflow-y-auto p-5 flex flex-col gap-4 shadow-xl custom-scrollbar">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-bold text-[#1bd382] uppercase tracking-[0.2em] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1bd382] animate-pulse"></div>
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
                  className={`shrink-0 p-5 rounded-[20px] border transition-all cursor-pointer group relative overflow-hidden ${
                    activeAgency?.id === agency.id 
                    ? 'border-[#1bd382] bg-[#1bd382]/10 shadow-[0_0_20px_rgba(27,211,130,0.15)]' 
                    : 'border-[#1a4f4d] hover:border-[#1bd382]/50 bg-[#061818]/50 hover:bg-[#061818]'
                  }`}
                  onClick={() => setActiveAgency(agency)}
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1bd382]/0 via-[#1bd382]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex justify-between items-center mb-3 relative z-10">
                    <h3 className="font-bold text-white group-hover:text-[#1bd382] transition-colors text-lg">{agency.name}</h3>
                    <Badge variant="outline" className={`font-bold tracking-wide ${
                      agency.status === 'Open' 
                      ? 'text-[#1bd382] border-[#1bd382]/30 bg-[#1bd382]/10' 
                      : 'text-red-400 border-red-500/30 bg-red-500/10'
                    }`}>
                      {agency.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#9CA3AF] mb-5 flex items-center gap-2 relative z-10">
                    <MapPin className="w-4 h-4 text-[#1bd382]/70" />
                    {agency.address}
                  </p>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider mb-1">Distance</span>
                        <span className="text-sm font-bold text-white">{agency.distance.toFixed(1)} <span className="text-[#9CA3AF] text-xs">KM</span></span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider mb-1">ATM Vault</span>
                        <span className={`text-sm font-bold ${agency.cash ? 'text-[#1bd382]' : 'text-red-400'}`}>
                          {agency.cash ? 'Secured' : 'Empty'}
                        </span>
                      </div>
                    </div>
                    <Button 
                      onClick={(e) => { e.stopPropagation(); openMapsDirection(agency); }}
                      className={`h-10 px-4 rounded-xl font-bold transition-all duration-300 ${
                        activeAgency?.id === agency.id
                        ? 'bg-[#1bd382] text-[#061818] hover:bg-white'
                        : 'bg-transparent border border-[#1a4f4d] text-white hover:border-[#1bd382] hover:text-[#1bd382]'
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
          <div className="flex-1 relative bg-[#030e0e]">
            {/* Dark mode styling for the map via CSS */}
            <MapContainer
              center={[33.5866, -7.6332]}
              zoom={13}
              className="h-full w-full z-0 dark-map"
              zoomControl={false}
            >
              {/* Dark map tiles matching the fintech theme */}
              <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              <Marker position={userLocation}>
                <Popup className="premium-dark-popup">
                  <div className="text-center font-bold text-[#1bd382]">Current Location</div>
                </Popup>
              </Marker>

              {agencies.map((agency) => (
                <Marker 
                  key={agency.id} 
                  position={agency.position}
                  eventHandlers={{ click: () => setActiveAgency(agency) }}
                >
                  <Popup className="premium-dark-popup">
                    <div className="w-64 p-3 bg-[#0b2827] rounded-2xl border border-[#1bd382]/30 shadow-[0_10px_40px_rgba(27,211,130,0.2)]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#1bd382]/20 rounded-xl flex items-center justify-center border border-[#1bd382]/40 shadow-[0_0_10px_rgba(27,211,130,0.3)]">
                          <ShieldCheck className="w-5 h-5 text-[#1bd382]" />
                        </div>
                        <h2 className="font-bold text-white text-lg tracking-wide">{agency.name}</h2>
                      </div>
                      
                      <div className="space-y-3 mb-5 p-3 bg-[#061818] rounded-xl border border-[#1a4f4d]">
                        <div className="flex items-center gap-3 text-sm text-[#D1D5DB]">
                          <Clock className="w-4 h-4 text-[#1bd382]" />
                          <span className="font-medium">24/7 Monitoring</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-[#D1D5DB]">
                          <Phone className="w-4 h-4 text-[#1bd382]" />
                          <span className="font-mono">+212 522-SECURE</span>
                        </div>
                      </div>

                      <Button 
                        onClick={() => openMapsDirection(agency)}
                        className="w-full bg-[#1bd382] hover:bg-white text-[#061818] rounded-xl h-12 font-bold shadow-[0_0_15px_rgba(27,211,130,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300"
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
              <Button size="icon" className="shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-xl h-12 w-12 bg-[#0b2827] border border-[#1a4f4d] hover:border-[#1bd382] hover:bg-[#1bd382]/10 text-[#9CA3AF] hover:text-[#1bd382] transition-colors"><Layers className="w-5 h-5" /></Button>
              <Button size="icon" className="shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-xl h-12 w-12 bg-[#0b2827] border border-[#1a4f4d] hover:border-[#1bd382] hover:bg-[#1bd382]/10 text-[#9CA3AF] hover:text-[#1bd382] transition-colors"><Globe className="w-5 h-5" /></Button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .leaflet-container { font-family: inherit; background: #030e0e !important; }
        .premium-dark-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          border-radius: 24px;
          padding: 0;
          box-shadow: none;
        }
        .premium-dark-popup .leaflet-popup-content {
          margin: 0;
        }
        .premium-dark-popup .leaflet-popup-tip-container { display: none; }
        .premium-dark-popup .leaflet-popup-close-button {
          color: #1bd382 !important;
          top: 12px !important;
          right: 12px !important;
          z-index: 10;
        }
        
        /* Custom scrollbar for sidebar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a4f4d;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1bd382;
        }
      `}} />
    </AppLayout>
  );
}