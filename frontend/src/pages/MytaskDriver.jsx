import HeaderAdmin from "../components/Admin/HeaderAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import ConfirmModal from "../components/Core-UI/Confirmmodal";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { formatDateTHStyle } from "../utils/formateDateUtils";
import {
  MapPinHouse,
  Weight,
  Clock4,
  ClipboardList,
  Truck,
  Package,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const MytaskDriver = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const naviagte = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedRound, setSelectedRound] = useState(null);
  const { user } = useContext(AuthContext);
  const [selectedPoint, setSelectedPoint] = useState("1");
  const [timetable, setTimetable] = useState([]);

  // ตรงนี้ต้องเปลี่ยนเป็นดึงจำนวนรายการจอง
  const item = [
    {
      icon: <ClipboardList size={24} />,
      total: 8,
      label: "Total Task",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Truck size={24} />,
      total: 1,
      label: "Pickup",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: <Package size={24} />,
      total: 2,
      label: "Available",
      color: "bg-green-100 text-green-600",
    },
  ];

  useEffect(() => {
    if (user?.drivId) {
      // const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const today = "2025-08-18"; // YYYY-MM-DD
      fetchData(user.drivId, today);
    }
  }, [user]);

  // http://localhost:3000/api/timetable
  const fetchData = async (drivId, date) => {
    try {
      // ใส่ query params ลงไป
      const query = new URLSearchParams({
        drivId,
        date, // "2025-09-28"
      });

      // console.log("debug params:",query)
      const url = `${apiUrl}/api/timetable${
        query.toString() ? `?${query.toString()}` : ""
      }`;

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      // console.log("debug res:",res);
      if (res.ok) {
        const data = await res.json();
        console.log("debug data:", data);
        setTimetable(data.timetable);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {isSidebarOpen && <SidebarAdmin />}

      <div className="flex flex-col flex-1">
        <HeaderAdmin onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {/* ส่วน section content */}
        <main className="flex-1 bg-white p-6">
          <h2 className="text-xl font-bold text-start mb-2.5">
            ตารางเก็บขยะวันนี้
          </h2>
          <h3 className="text-lg font-normal ">{formatDateTHStyle(Date())}</h3>

          {/* ส่วนแสดงจำนวนงาน เป็นตัวเลข*/}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-4">
            {item.map((task, index) => (
              <div
                key={index}
                className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm p-5"
              >
                {/* Icon with colored background */}
                <div className={`p-3 rounded-full mr-4 ${task.color}`}>
                  {task.icon}
                </div>

                {/* Text */}
                <div>
                  <p className="text-xl font-bold text-slate-800">
                    {task.total}
                  </p>
                  <span className="text-sm text-gray-500">{task.label}</span>
                </div>
              </div>
            ))}
          </section>

          {/* ส่วนแสดงรอบ  <---- เพิ่มเติมตรงนี้ต้อง loop เอา มาแสดงผลและแสดงผลได้มากสุด 2 รอบ*/}
          <section className="mt-4 space-y-6">
            {timetable.map((round, roundIndex) => (
              <div
                key={round.time_id}
                className="border rounded-md shadow-sm p-6 bg-white"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    รอบเก็บขยะ {round.time_slot}
                  </h2>
                  <span className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-full">
                    Pending
                  </span>
                </div>

                {/* รายละเอียดรอบ */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                  <div>
                    <div className="text-gray-500 flex flex-row gap-2">
                      <MapPinHouse size={17} />
                      <span>จุดเก็บขยะ</span>
                    </div>
                    <div className="font-medium items-center">
                      {round.total_points} จุด
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 flex flex-row gap-2">
                      <Weight size={17} />
                      <span>น้ำหนักรวม</span>
                    </div>
                    <div className="font-medium">{round.total_weight} กก.</div>
                  </div>
                  <div>
                    <div className="text-gray-500 flex flex-row gap-2">
                      <Clock4 size={17} />
                      <span>เวลาเริ่มต้น</span>
                    </div>
                    <div className="font-medium">
                      {round.time_slot.split("-")[0]} น.
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 flex flex-row gap-2">
                      <Clock4 size={17} />
                      <span>เวลาสิ้นสุด</span>
                    </div>
                    <div className="font-medium">
                      {round.time_slot.split("-")[1]} น.
                    </div>
                  </div>
                </div>

                {/* ปุ่มลำดับจุด */}
                <div className="flex gap-2 mt-4">
                  {round.items.map((point) => (
                    <button
                      key={point.res_id}
                      onClick={() => setSelectedPoint(point.res_id)}
                      className={`px-3 py-1 rounded border text-sm ${
                        selectedPoint === point.res_id
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      จุดที่ {point.time_index}
                    </button>
                  ))}
                </div>

                {/* แสดงรายละเอียดจุดที่เลือก */}
                {selectedPoint && (
                  <div className="mt-4 border rounded p-4 bg-gray-50">
                    {(() => {
                      const selected = round.items.find(
                        (p) => p.res_id === selectedPoint
                      );
                      return selected ? (
                        <>
                          <h3 className="text-sm font-semibold text-gray-700 mb-1">
                            จุดที่ {selected.time_index}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {selected.addressLine1}
                          </p>
                          <p className="text-sm text-gray-600">
                            {selected.addressLine2}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500">
                          เลือกจุดเพื่อดูรายละเอียด
                        </p>
                      );
                    })()}
                  </div>
                )}

                {/* ปุ่มเริ่มเก็บขยะ */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRound(round);
                    setIsConfirmOpen(true);
                  }}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
                >
                  เริ่มเก็บขยะ
                </button>
              </div>
            ))}
            {/* เรียกใช้ template component modal */}
          </section>
        </main>
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => {
            // ทำ action เช่น navigate ไปหน้า detail
            naviagte("/driver/tasksdetail");
            console.log("เริ่มงานรอบ:", selectedRound);
          }}
          title="ยืนยันการเริ่มงาน"
          message={`คุณต้องการเริ่มเก็บขยะรอบ ${selectedRound?.time_slot} ใช่หรือไม่?`}
        />
      </div>
    </div>
  );
};

export default MytaskDriver;
