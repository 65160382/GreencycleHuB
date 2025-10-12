import HeaderAdmin from "../components/Admin/HeaderAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/Core-UI/Modal";
import DestinationInfo from "../components/Driver/DestinationInfo";
import ConfirmWasteModal from "../components/Driver/ConfirmWasteModal";
// --- เพิ่ม imports ใหม่ ---
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

// แก้ icon marker ไม่ขึ้น
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ช่วย fit กล้องให้เห็น polyline พอดี
function FitBoundsOnRoute({ polyline }) {
  const map = useMap();
  useEffect(() => {
    if (polyline && polyline.length > 1) {
      const bounds = L.latLngBounds(polyline);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [polyline, map]);
  return null;
}

const depotIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const destinationIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


const MytaskDriverdetail = () => {
  const { timeId } = useParams(); //ดึง id ตารางเดินรถจาก url
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCompelteModalOpen, setIsCompelteModalOpen] = useState(false);
  const [isTravelStarted, setIsTravelStarted] = useState(false); // สถานะเริ่มเดินทาง
  const [items, setItems] = useState([]); //เก็บ รายการบ้านที่ต้องไปทั้งหมด
  const [currentIndex, setIscurrentIndex] = useState(0); //ตำแหน่งบ้านปัจจุบันเพื่อเอาไปเทียบกับ items
  const currentItem = items?.[currentIndex]; //เก็บข้อมูลรายละเอียดการจองตาม currentindex
  const navigate = useNavigate();
  // test openrouteservice
  const [polyline, setPolyline] = useState([]);

  // const [routeSummary, setRouteSummary] = useState({
  //   distance: null,
  //   duration: null,
  // });

  // ค่าพิกัดบริษัท (อ่านจาก .env ถ้ามี, ถ้าไม่มีก็ fallback)
  const depotLat = Number(import.meta.env.VITE_DEPOT_LAT || 13.288378);
  const depotLon = Number(import.meta.env.VITE_DEPOT_LON || 100.924359);
  const [startMarker, setStartMarker] = useState([depotLat, depotLon]);

  // ดึงข้อมูลบ้านทั้งหมดที่ต้องไปตามลำดับ
  useEffect(() => {
    // http://localhost:3000/api/timetable/:id
    const fetchdata = async () => {
      const res = await fetch(`${apiUrl}/api/timetable/${timeId}`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log("debug data:", data);
        setItems(data.mergedResult);
      }
    };
    fetchdata();
    // calculateRoute();
  }, [timeId]);

  // openrouteservice
  // สร้างเส้นทางทุกครั้งที่ items พร้อม และ currentItem เปลี่ยน
  useEffect(() => {
    const fetchRoute = async () => {
      if (!items.length || !currentItem) return;

      const startLat =
        currentIndex === 0
          ? depotLat
          : Number(items[currentIndex - 1]?.add_lat);
      const startLon =
        currentIndex === 0
          ? depotLon
          : Number(items[currentIndex - 1]?.add_lon);

      const destLat = Number(currentItem.add_lat);
      const destLon = Number(currentItem.add_lon);

      const waypoints = [
        { lat: startLat, lon: startLon },
        { lat: destLat, lon: destLon },
      ];

      try {
        const res = await fetch(`${apiUrl}/api/route`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ waypoints }),
        });

        if (res.ok) {
          const data = await res.json();
          setPolyline(data.route.polyline || []);
          setStartMarker([startLat, startLon]); // อัปเดต marker จุดเริ่มต้นที่นี่
        } else {
          console.error("เรียกเส้นทางไม่สำเร็จ");
          setPolyline([]);
        }
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการเรียกเส้นทาง", err);
        setPolyline([]);
      }
    };

    fetchRoute();
  }, [items, currentIndex, currentItem, apiUrl, depotLat, depotLon]);


  //ฟังก์ชั่นสำหรับเรียกเส้นทางถัดไป
  const handleConfirm = async () => {
    // ปิด modal ก่อน
    setIsOpenModal(false);
    setIsTravelStarted(false); // รีเซ็ตให้พร้อมบ้านถัดไป

    await fetch(`${apiUrl}/api/timtabledetail/arrive/${currentItem.res_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    // ถ้าไม่ใช่บ้านสุดท้าย → ไปบ้านถัดไป
    if (currentIndex < items.length - 1) {
      setIscurrentIndex(currentIndex + 1);
    } else {
      console.log("จบรอบการเดินรถแล้ว");
      // เรียกใช้  http://localhost:3000/api/timetable/arrive/:timeid
      await fetch(`${apiUrl}/api/timetable/arrive/${currentItem.time_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      setIsCompelteModalOpen(true); //เรียกใช้ modal จบงานสำเร็จ
    }
  };

  //ฟังก์ชั่นสำหรับอัพเดต timestamp ตอนเริ่มเดินรถ
  const handleStartTravel = async () => {
    setIsTravelStarted(true);
    // เรียกใช้ api สำหรับ update เวลาเริ่มต้น
    await fetch(`${apiUrl}/api/timtabledetail/start/${currentItem.res_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  };

  return (
    <div className="flex min-h-screen">
      {isSidebarOpen && <SidebarAdmin />}
      <div className="flex flex-col flex-1">
        <HeaderAdmin onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {/* ส่วน section content */}
        <main className="flex-1 bg-gray-50 p-6">
          {/* Header แสดงรอบเวลา */}
          <div className="flex items-center justify-between border-b pb-2 mb-4">
            <button
              onClick={() => window.history.back()}
              className="text-sm text-gray-600"
            >
              &lt; กลับ
            </button>
            <div className="text-center flex-1">
              <p className="font-medium">รอบ 9.00-12.00 น.</p>
              <p className="text-sm text-gray-500">1 / ? จุด</p>
            </div>
            {/* <button className="text-sm text-blue-600">เสร็จสิ้น</button> */}
          </div>

          {/* กล่องแผนที่ */}
          <div className="relative overflow-hidden w-full h-72 border border-gray-300 rounded-lg mb-6 bg-white shadow-sm">
            <MapContainer
              center={[depotLat, depotLon]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* หมุดบริษัท / จุดเริ่มต้น */}
              <Marker position={startMarker} icon={depotIcon}>
                <Popup>ตำแหน่งปัจจุบัน</Popup>
              </Marker>

              {/* หมุดปลายทางปัจจุบัน */}
              {currentItem && (
                <Marker
                  position={[
                    Number(currentItem.add_lat),
                    Number(currentItem.add_lon),
                  ]}
                  icon={destinationIcon}
                >
                  <Popup>จุดหมาย</Popup>
                </Marker>
              )}

              {/* เส้นทาง */}
              {polyline.length > 1 && (
                <>
                  <Polyline positions={polyline} weight={5} />
                  <FitBoundsOnRoute polyline={polyline} />
                </>
              )}
            </MapContainer>
          </div>

          {/* ข้อมูลจุดหมาย */}
          <DestinationInfo currentItem={currentItem} />

          {/* ปุ่มหลัก */}
          {!isTravelStarted ? (
            // 🔹 ปุ่มเริ่มเดินทาง
            <button
              onClick={handleStartTravel}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow"
            >
              เริ่มเดินทาง
            </button>
          ) : (
            // 🔹 ปุ่มถึงจุดหมาย
            <button
              onClick={() => setIsOpenModal(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium shadow"
            >
              {currentIndex === items.length - 1
                ? "ถึงจุดหมายสุดท้าย"
                : "ถึงจุดหมาย"}
            </button>
          )}
        </main>

        {/* เรียกใช้ ConfirmModal */}
        <Modal
          isOpen={isOpenModal}
          title="ยืนยันการรับขยะ"
          onClose={() => setIsOpenModal(false)}
          // widthClass="w-1/2"
        >
          <ConfirmWasteModal
            isOpen={isOpenModal}
            onClose={() => setIsOpenModal(false)}
            onConfirm={handleConfirm}
            currentItem={currentItem}
          />
        </Modal>

        {/* Modal แจ้งเสร็จสิ้นรอบ */}
        <Modal
          isOpen={isCompelteModalOpen}
          onClose={() => {
            setIsCompelteModalOpen(false);
            navigate("/driver/tasks");
          }}
          // widthClass="w-96"
        >
          <div className="text-center bg-white rounded-lg ">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6 animate-pulse-once">
              {/*
          แทนที่ด้วย Icon Component จริงที่คุณใช้ เช่น:
          <CheckCircleIcon className="h-10 w-10 text-green-600" />
        */}
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>

            {/* หัวข้อแสดงความยินดี */}
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              ตารางเดินรถรอบนี้สำเร็จแล้ว!
            </h3>

            {/* ข้อความรายละเอียด */}
            <p className="text-gray-600 mb-4 text-md">
              คุณได้เก็บขยะครบทุกจุดในรอบนี้เรียบร้อยแล้ว **ยอดเยี่ยมมาก!**
            </p>

            {/* ข้อความแสดงความขอบคุณ (เน้นย้ำ) */}
            <p className="font-extrabold text-lg text-green-700 mb-6">
              ขอบคุณสำหรับการทำงานที่ยอดเยี่ยมและปลอดภัย!
            </p>

            {/* ปุ่มกลับหน้าหลัก */}
            <button
              onClick={() => {
                setIsCompelteModalOpen(false);
                navigate("/driver/tasks");
              }}
              className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              กลับสู่รายการงาน
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MytaskDriverdetail;
