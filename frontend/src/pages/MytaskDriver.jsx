import HeaderAdmin from "../components/Admin/HeaderAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import ConfirmModal from "../components/Core-UI/Confirmmodal";
import SummaryStatus from "../components/Driver/SummaryStatus";
import TimetableCard from "../components/Driver/TimetableCard";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { formatDateTHStyle } from "../utils/formateDateUtils";
import { AuthContext } from "../context/AuthContext";

const MytaskDriver = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedRound, setSelectedRound] = useState(null);
  const { user } = useContext(AuthContext);
  const [selectedPoint, setSelectedPoint] = useState("1");
  const [timetable, setTimetable] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    if (user?.drivId) {
      // const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const today = "2025-08-18"; // YYYY-MM-DD
      fetchData(user.drivId, today);
      fetchSummary(user.drivId);
    }
  }, [user]);

  // http://localhost:3000/api/timetable
  const fetchData = async (drivId, date) => {
    try {
      // ใส่ query params วันที่ลงไปเพราะว่าจะแสดงแค่รายวัน
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
      console.error("เกิดข้อผิดพลาดทางเซิร์ฟเวอร์", error);
    }
  };

  // http://localhost:3000/api/timetable/summary
  const fetchSummary = async (drivId) => {
    try {
      const res = await fetch(
        `${apiUrl}/api/driver/timetable/summary?drivId=${drivId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        // console.log("debug summary data",data);
        setSummary({
          total: data.summary.total_tasks || 0,
          completed: data.summary.completed_tasks || 0,
          pending: data.summary.pending_tasks || 0,
        });
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์", error);
    }
  };

  // เรียกใช้ api เพื่ออัพเดตสถานะและ timestamp http://localhost:3000/api/timetable/start/:timeid
  const handleUpdateTimetable = async () => {
    try {
      await fetch(`${apiUrl}/api/timetable/start/${selectedRound.time_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดทางเซิร์ฟเวอร์", error);
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

          {/* ส่วนแสดงจำนวนงาน เป็นตัวเลข -->ต้องแก้ไขให้เป็นตัวเลขจริงด้วยโดยการดึงข้อมูลแล้วส่ง props ไป*/}
          <SummaryStatus  summary={summary}/>

          {/* ส่วนแสดงรอบ  <---- เพิ่มเติมตรงนี้ต้อง loop เอา มาแสดงผลและแสดงผลได้มากสุด 2 รอบ*/}
          <section className="mt-4 space-y-6">
            {timetable.length > 0 ? (
              timetable.map((round) => (
                // refactor แยกออกเป็น Component
                <TimetableCard
                  key={round.time_id}
                  round={round}
                  selectedPoint={selectedPoint}
                  onSelectPoint={setSelectedPoint}
                  onStart={() => {
                    setSelectedRound(round);
                    setIsConfirmOpen(true);
                  }}
                />
              ))
            ) : (
              <div className="text-center border bg-white border-gray-200 py-10 rounded-lg text-gray-600">
                <p className="text-lg font-medium mb-1">
                  ไม่มีตารางการเก็บขยะในวันนี้
                </p>
                <p className="text-sm text-gray-400">
                  ระบบจะอัปเดตรอบการเดินรถใหม่ในวันถัดไป
                </p>
              </div>
            )}
          </section>
        </main>

        {/* เรียกใช้ template component modal */}
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => {
            // อัปเดต timetable status,starttime
            handleUpdateTimetable();
            // navigate ไปหน้า detail
            navigate(`/driver/tasksdetail/${selectedRound.time_id}`);
          }}
          title="ยืนยันการเริ่มงาน"
          message={`คุณต้องการเริ่มเก็บขยะรอบ ${selectedRound?.time_slot} ใช่หรือไม่?`}
        />
      </div>
    </div>
  );
};

export default MytaskDriver;
