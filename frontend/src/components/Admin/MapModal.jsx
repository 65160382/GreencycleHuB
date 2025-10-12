// import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { X } from 'lucide-react';

import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- แก้ปัญหา marker icon ไม่ขึ้นใน react-leaflet ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// --- ฟังก์ชันเปลี่ยนมุมมองเมื่อ center เปลี่ยน ---
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// --- Modal Component ---
export default function MapModal({ isOpen, onClose, lat, lon, address }) {
  if (!isOpen) return null;

  const position = [parseFloat(lat), parseFloat(lon)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-lg font-semibold">ตำแหน่งบ้านลูกค้า</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-xl"
          >
            <X/>
          </button>
        </div>

        {/* แผนที่ */}
        <div className="h-[400px]">
          <MapContainer
            center={position}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <ChangeView center={position} zoom={15} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <strong>ที่อยู่ลูกค้า:</strong>
                <br />
                {address || `Lat: ${lat}, Lon: ${lon}`}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 flex justify-end border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}
