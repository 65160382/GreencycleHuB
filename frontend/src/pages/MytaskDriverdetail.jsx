import HeaderAdmin from "../components/Admin/HeaderAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, User, Phone, Mail, Clock } from "lucide-react";

const MytaskDriverdetail = () => {
  const { timeId } = useParams(); //ดึง id ตารางเดินรถจาก url
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [items, setItems] = useState([]);
  const [currentIndex, setIscurrentIndex] = useState(0);
  const currentItem = items[currentIndex];

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
        setItems(data.results);
      }
    };
    fetchdata();
    // calculateRoute();
  }, [timeId]);

  //เรียกฟังก์ชั่นสำหรับคำนวณเส้นทาง
  useEffect(() => {
    if (!items.length) return;

    let from, to;
    if (currentIndex === 0) {
      from = companyLocation;
      to = items[0];
    } else if (currentIndex < items.length) {
      from = items[currentIndex - 1];
      to = items[currentIndex];
    } else {
      from = items[items.length - 1];
      to = companyLocation;
    }

    calculateRoute(from, to);
  }, [currentIndex, items]);

  //ฟังก์ชั่นสำหรับเรียก express คำนวณเส้นทาง
  const calculateRoute = async (from, to) => {
    try {
      //http://localhost:3000/api/route
      const res = await fetch(`${apiUrl}/api/route`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ from,to }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log("debug data:", data);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดไม่สามารถคำนวณเส้นทางได้", error);
    }
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
          <div className="w-full h-72 border border-gray-300 rounded-lg mb-6 bg-white shadow-sm flex items-center justify-center">
            <p className="text-gray-400">[แผนที่ / จุดหมาย]</p>
          </div>

          {/* ข้อมูลจุดหมาย */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              จุดที่ {currentItem?.time_index}
            </h2>

            {/* ที่อยู่ */}
            <div className="mb-5">
              <div className="flex items-center text-gray-600 mb-1">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="font-medium">ที่อยู่</span>
              </div>
              <p className="text-gray-800 bg-gray-50 rounded-md px-3 py-2 border">
                {currentItem?.addressLine1} {currentItem?.addressLine2}
              </p>
            </div>

            {/* ข้อมูลลูกค้า */}
            <div className="mb-5">
              <div className="flex items-center text-gray-600 mb-1">
                <User className="w-4 h-4 mr-2" />
                <span className="font-medium">ข้อมูลลูกค้า</span>
              </div>
              <div className="bg-gray-50 rounded-md p-3 border space-y-1">
                <p>ชื่อ: {currentItem?.customers_name}</p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />{" "}
                  {currentItem?.cus_email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-500" />{" "}
                  {currentItem?.cus_phone}
                </p>
              </div>
            </div>

            {/* เวลา */}
            {/* <div className="mb-5">
              <div className="flex items-center text-gray-600 mb-1">
                <Clock className="w-4 h-4 mr-2" />
                <span className="font-medium">เวลาเก็บ</span>
              </div>
              <p className="px-3 py-1 inline-block rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                {new Date(currentItem.time_date).toLocaleDateString("th-TH")} |{" "}
                {currentItem.time_slot}
              </p>
            </div> */}

            {/* หมายเหตุ */}
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm rounded">
              หมายเหตุ: อย่าลืมกดปุ่ม "ถึงจุดหมาย" เมื่อไปถึงแล้ว
            </div>
          </div>

          {/* ปุ่มหลัก */}
          <button
            // onClick={""}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium shadow"
          >
            ถึงจุดหมาย
          </button>
        </main>
      </div>
    </div>
  );
};

export default MytaskDriverdetail;
