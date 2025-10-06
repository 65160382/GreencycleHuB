import HeaderAdmin from "../components/Admin/HeaderAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, User, Phone, Mail, Clock } from "lucide-react";
import Modal from "../components/Core-UI/Modal";
import DestinationInfo from "../components/Driver/DestinationInfo";
import ConfirmWasteModal from "../components/Driver/ConfirmWasteModal";
import {
  loadNostraScript,
  initializeMap,
  drawRoute,
  clearRoute,
} from "../utils/nostraMapUtils";

const MytaskDriverdetail = () => {
  const { timeId } = useParams(); //ดึง id ตารางเดินรถจาก url
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_NOSTRA_API_KEY;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCompelteModalOpen, setIsCompelteModalOpen] = useState(false);
  const [isTravelStarted, setIsTravelStarted] = useState(false); // สถานะเริ่มเดินทาง
  const [items, setItems] = useState([]); //เก็บ รายการบ้านที่ต้องไปทั้งหมด
  const [currentIndex, setIscurrentIndex] = useState(0); //ตำแหน่งบ้านปัจจุบันเพื่อเอาไปเทียบกับ items
  const currentItem = items?.[currentIndex]; //เก็บข้อมูลรายละเอียดการจองตาม currentindex
  const [route, setRoute] = useState([]); //เก็บเส้นทางที่คำนวณเเล้ว

  const navigate = useNavigate();

  //test2
  const [map, setMap] = useState(null);

  //test
  const [companyLocation] = useState({
    name: "Company",
    lat: 13.288378,
    lon: 100.924359,
  });

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

  //เรียกฟังก์ชั่นสำหรับคำนวณเส้นทาง
  // useEffect(() => {
  //   if (!items.length) return;

  //   let from, to;
  //   if (currentIndex === 0) {
  //     from = companyLocation;
  //     to = items[0];
  //   } else if (currentIndex < items.length) {
  //     from = items[currentIndex - 1];
  //     to = items[currentIndex];
  //   } else {
  //     from = items[items.length - 1];
  //     to = companyLocation;
  //   }

  //   calculateRoute(from, to);
  // }, [currentIndex, items]);

  // โหลด script nostramap สำหรับทำแผนที่
  // useEffect(() => {
  //   loadNostraScript(apiKey, () => {
  //     const mapInstance = initializeMap(13.288378, 100.924359);
  //     setMap(mapInstance);
  //   });
  // }, []);

  //ฟังก์ชั่นสำหรับเรียก express คำนวณเส้นทาง
  // const calculateRoute = async (from, to) => {
  //   try {
  //     const res = await fetch(`${apiUrl}/api/route`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify({ from, to }),
  //     });
  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log("debug route data:", data);
  //       // setRoute(data.routedata);

  //       if (data.results) {
  //         clearRoute();
  //         drawRoute(data.results); // ส่งทั้ง object
  //       }
  //     }
  //   } catch (error) {
  //     console.error("เกิดข้อผิดพลาดไม่สามารถคำนวณเส้นทางได้", error);
  //   }
  // };

  //ฟังก์ชั่นสำหรับเรียกเส้นทางถัดไป
  const handleConfirm = async () => {
    // ปิด modal ก่อน
    setIsOpenModal(false);
    setIsTravelStarted(false); // รีเซ็ตให้พร้อมบ้านถัดไป

    await fetch(`${apiUrl}/api/timtabledetail/arrive/${currentItem.res_id}`,{
      method:"PATCH",
      headers: { "Content-Type": "application/json" },
      credentials:"include",
    })

    // ถ้าไม่ใช่บ้านสุดท้าย → ไปบ้านถัดไป
    if (currentIndex < items.length - 1) {
      setIscurrentIndex(currentIndex + 1);
    } else {
      console.log("จบรอบการเดินรถแล้ว");
      // เรียกใช้  http://localhost:3000/api/timetable/arrive/:timeid
      await fetch(`${apiUrl}/api/timetable/arrive/${currentItem.time_id}`,{
        method:"PATCH",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
      })
      setIsCompelteModalOpen(true); //เรียกใช้ modal จบงานสำเร็จ
    }
  };

  //ฟังก์ชั่นสำหรับอัพเดต timestamp ตอนเริ่มเดินรถ
  const handleStartTravel = async () => {
    setIsTravelStarted(true);
    // เรียกใช้ api สำหรับ update เวลาเริ่มต้น
    await fetch(`${apiUrl}/api/timtabledetail/start/${currentItem.res_id}`,{
      method:"PATCH",
      headers: { "Content-Type": "application/json" },
      credentials:"include",
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
          <div
            id="map"
            className="relative overflow-hidden w-full h-72 border border-gray-300 rounded-lg mb-6 bg-white shadow-sm"
          ></div>

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
          title="งานในรอบนี้เสร็จสิ้นแล้ว 🎉"
          onClose={() => {
            setIsCompelteModalOpen(false);
            navigate("/driver/tasks");
          }}
          // widthClass="w-1/3"
        >
          <div className="text-center p-6">
            <p className="text-gray-700 mb-4">
              คุณได้เก็บขยะครบทั้งหมดในรอบนี้เรียบร้อยแล้ว
            </p>
            <p className="font-semibold text-green-600 mb-6">
              ขอบคุณสำหรับการทำงานที่ยอดเยี่ยม!
            </p>
            <button
              onClick={() => {
                setIsCompelteModalOpen(false);
                navigate("/driver/tasks");
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              กลับหน้าหลัก
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MytaskDriverdetail;
