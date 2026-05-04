import { usePage } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Agencies() {
  const { agencies } = usePage().props;

  return (
    <div className="min-h-screen bg-[#F5F7F6] p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#111827]">
          Agencies & ATMs
        </h1>
        <p className="text-[#6B7280] mt-1">
          Find nearest agencies and check ATM cash availability
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-4">
          <MapContainer
            center={[33.5731, -7.5898]}
            zoom={12}
            className="h-[560px] w-full rounded-xl overflow-hidden"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {agencies.map((agency) => (
              <Marker
                key={agency.id}
                position={[
                  Number(agency.latitude),
                  Number(agency.longitude),
                ]}
              >
                <Popup>
                  <strong>{agency.name}</strong>
                  <br />
                  {agency.address}
                  <br />
                  ATMs: {agency.atms?.length ?? 0}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="space-y-4">
          {agencies.map((agency) => (
            <div
              key={agency.id}
              className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-5"
            >
              <h2 className="font-semibold text-[#111827]">
                {agency.name}
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                {agency.address}
              </p>

              <div className="mt-4 space-y-2">
                {agency.atms?.map((atm) => (
                  <div
                    key={atm.id}
                    className="flex items-center justify-between bg-[#F5F7F6] rounded-lg px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#111827]">
                        {atm.name}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {atm.status}
                      </p>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        atm.cash_available
                          ? "bg-[#D1FAE5] text-[#0F9D8A]"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {atm.cash_available ? "Cash available" : "No cash"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}