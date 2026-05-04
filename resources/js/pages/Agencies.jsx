import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import "resources/css/app.css";

const agenciesData = [
  { id: 1, name: "Lions Bank Maarif", address: "Maarif, Casablanca", status: "Open", cash: true, position: [33.5866, -7.6332] },
  { id: 2, name: "Lions Bank Anfa", address: "Anfa, Casablanca", status: "Closed", cash: false, position: [33.5928, -7.6536] },
  { id: 3, name: "Lions Bank Center", address: "Mohammed V, Casablanca", status: "Open", cash: true, position: [33.5941, -7.6184] },
  { id: 4, name: "Lions Bank Ain Diab", address: "Ain Diab, Casablanca", status: "Open", cash: true, position: [33.6031, -7.6721] },
  { id: 5, name: "Lions Bank Derb Sultan", address: "Derb Sultan", status: "Closed", cash: true, position: [33.5709, -7.6026] },
  { id: 6, name: "Lions Bank Sidi Maarouf", address: "Sidi Maarouf", status: "Open", cash: false, position: [33.5296, -7.6472] },
  { id: 7, name: "Lions Bank Bourgogne", address: "Bourgogne", status: "Open", cash: true, position: [33.5999, -7.6421] },
  { id: 8, name: "Lions Bank Hay Hassani", address: "Hay Hassani", status: "Closed", cash: false, position: [33.5585, -7.6786] },
  { id: 1, name: "Lions Bank Bernoussi ", address: "Bernoussi, Casablanca", status: "Open", cash: true, position: [33.6138, -7.4989] },
  { id: 2, name: "Lions Bank Bernoussi ", address: "Hay Bernoussi", status: "Open", cash: false, position: [33.6079, -7.5106] },
  { id: 3, name: "Lions Bank Qodss ", address: "Sidi Bernoussi", status: "Closed", cash: true, position: [33.6202, -7.5063] },
  { id: 4, name: "Lions Bank Ain Sebaa 1", address: "Ain Sebaa, Casablanca", status: "Open", cash: true, position: [33.6065, -7.5329] },
  { id: 5, name: "Lions Bank Ain tizi wisli 2", address: "Route de Rabat, Ain Sebaa", status: "Open", cash: true, position: [33.6121, -7.5457] },
  { id: 6, name: "Lions Bank Ain hliwa 3", address: "Zone Industrielle Ain Sebaa", status: "Closed", cash: false, position: [33.6002, -7.5398] },
  { id: 7, name: "Lions Bank Ain Bdr 4", address: "Boulevard Chefchaouni", status: "Open", cash: false, position: [33.6174, -7.5521] },
  { id: 8, name: "Lions Bank marjane Ain Sebaa  5", address: "Gare Ain Sebaa", status: "Open", cash: true, position: [33.6029, -7.5255] },
  { id: 9, name: "Lions Bank Sidi Moumen 1", address: "Sidi Moumen", status: "Open", cash: true, position: [33.5758, -7.4992] },
  { id: 10, name: "Lions Bank Sidi Moumen 2", address: "Hay Moulay Rachid / Sidi Moumen", status: "Closed", cash: false, position: [33.5683, -7.5108] },
  { id: 11, name: "Lions Bank Sidi Moumen 3", address: "Bd Sidi Moumen", status: "Open", cash: false, position: [33.5827, -7.4884] },
  { id: 12, name: "Lions Bank Roche Noire 1", address: "Roche Noire", status: "Open", cash: true, position: [33.5971, -7.5802] },
  { id: 13, name: "Lions Bank Roche Noire 2", address: "Bd Moulay Ismail", status: "Open", cash: false, position: [33.5909, -7.5724] },
  { id: 14, name: "Lions Bank Roche Noire 3", address: "Gare Casa Voyageurs", status: "Closed", cash: true, position: [33.5891, -7.5907] },
  { id: 15, name: "Lions Bank Roche Noire 4", address: "Ain Borja / Roche Noire", status: "Open", cash: true, position: [33.6037, -7.5688] },
];

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function Agencies() {
  const [userLocation, setUserLocation] = useState([33.5731, -7.5898]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => setUserLocation([33.5731, -7.5898])
    );
  }, []);

  const agencies = useMemo(() => {
    return agenciesData
      .map((agency) => {
        const distance = getDistanceKm(
          userLocation[0],
          userLocation[1],
          agency.position[0],
          agency.position[1]
        );

        return {
          ...agency,
          distance,
        };
      })
      .filter((agency) => {
        const matchesSearch =
          agency.name.toLowerCase().includes(search.toLowerCase()) ||
          agency.address.toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
          filter === "all" ||
          (filter === "open" && agency.status === "Open") ||
          (filter === "closed" && agency.status === "Closed") ||
          (filter === "cash" && agency.cash);

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => a.distance - b.distance);
  }, [search, filter, userLocation]);

  const openMapsDirection = (agency) => {
    const [lat, lng] = agency.position;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F5F7F6] p-6 text-black">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#111827]">LionsBank Map</h1>
          <p className="text-[#6B7280]">
            Search agencies, check availability, and get directions.
          </p>
        </div>

        <div className="flex gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agency..."
            className="w-[300px] rounded-2xl bg-white border border-[#E5E7EB] px-5 py-3 text-sm text-black outline-none focus:ring-2 focus:ring-[#0F9D8A]"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-2xl bg-white border border-[#E5E7EB] px-5 py-3 text-sm text-black outline-none focus:ring-2 focus:ring-[#0F9D8A]"
          >
            <option value="all">All</option>
            <option value="open">Open only</option>
            <option value="cash">Cash available</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[28px] shadow-sm border border-[#E5E7EB] overflow-hidden">
        <MapContainer
          center={[33.5866, -7.6332]}
          zoom={12}
          className="h-[680px] w-full map-green"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap &copy; CARTO"
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          <Marker position={userLocation}>
            <Popup>
              <div className="text-black">
                <strong>Your location</strong>
              </div>
            </Popup>
          </Marker>

          {agencies.map((agency) => (
            <Marker key={agency.id} position={agency.position}>
              <Popup>
                <div className="w-[240px] text-black">
                  <h2 className="font-bold text-[#111827]">{agency.name}</h2>
                  <p className="text-sm text-[#6B7280]">{agency.address}</p>

                  <p className="text-sm mt-2">
                    Distance:{" "}
                    <span className="font-semibold text-[#0F9D8A]">
                      {agency.distance.toFixed(1)} km
                    </span>
                  </p>

                  <p className="text-sm">
                    Status:{" "}
                    <span
                      className={
                        agency.status === "Open"
                          ? "font-semibold text-[#0F9D8A]"
                          : "font-semibold text-red-500"
                      }
                    >
                      {agency.status}
                    </span>
                  </p>

                  <p className="text-sm">
                    ATM cash:{" "}
                    <span className={agency.cash ? "text-[#0F9D8A]" : "text-red-500"}>
                      {agency.cash ? "Available" : "No cash"}
                    </span>
                  </p>

                  <button
                    onClick={() => openMapsDirection(agency)}
                    className="mt-3 w-full rounded-lg bg-[#0F9D8A] hover:bg-[#0D9488] py-2 text-white transition"
                  >
                    Direction
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}