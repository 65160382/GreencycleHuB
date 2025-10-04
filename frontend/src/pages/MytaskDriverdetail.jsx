import HeaderAdmin from "../components/Admin/HeaderAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, User, Phone, Mail, Clock } from "lucide-react";
import Modal from "../components/Core-UI/Modal";
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
  const [items, setItems] = useState([]);
  const [currentIndex, setIscurrentIndex] = useState(0);
  const currentItem = items?.[currentIndex]; //เก็บข้อมูลรายละเอียดการจอง
  const [route, setRoute] = useState([]); //เก็บเส้นทางที่คำนวณเเล้ว

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
  const nextRoute = async () => {
    try {
      // setIscurrentIndex(currentIndex + 1);
      if (currentIndex < items.length - 1) {
        setIscurrentIndex(currentIndex + 1);
        console.log(`กำลังไปบ้านหลังที่ ${currentIndex}`);
      } else {
        console.log("ไม่มีบ้านให้ไปต่อแล้ว");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด", error);
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
          <div
            id="map"
            className="relative overflow-hidden w-full h-72 border border-gray-300 rounded-lg mb-6 bg-white shadow-sm"
          ></div>

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

            {/* หมายเหตุ */}
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm rounded">
              หมายเหตุ: อย่าลืมกดปุ่ม "ถึงจุดหมาย" เมื่อไปถึงแล้ว
            </div>
          </div>

          {/* ปุ่มหลัก */}
          {currentIndex < items.length - 1 ? (
            <button
              // onClick={() => nextRoute()}
              // Modal ยืนยันการรับขยะ
              onClick={() => setIsOpenModal(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium shadow"
            >
              ถึงจุดหมาย
            </button>
          ) : (
            <button
              // onClick={() => nextRoute()}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium shadow"
            >
              เสร็จสิ้น
            </button>
          )}
        </main>

        {/* เรียกใช้ ConfirmModal */}
        <Modal
          isOpen={isOpenModal}
          title="ยืนยันการรับขยะ"
          onClose={() => setIsOpenModal(false)}
          widthClass="w-1/2"
        >
          <div className="p-6">
            {/* ส่วนหัว */}
            <div className="mb-4 border-b pb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                รายละเอียดการรับขยะจากลูกค้า
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                โปรดตรวจสอบรายการขยะก่อนกดยืนยันการรับ
              </p>
            </div>

            {/* ตรวจสอบว่ามีข้อมูลหรือไม่ */}
            {currentItem?.wastes && currentItem.wastes.length > 0 ? (
              <div className="space-y-3">
                {currentItem.wastes.map((waste, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border rounded-lg px-4 py-3 hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {waste.rec_type_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        น้ำหนักรวม: {waste.total_weight} กก.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        ราคาต่อกก.: {waste.waste_collect_price} บาท
                      </p>
                      <p className="text-base font-semibold text-green-600">
                        รวม {parseFloat(waste.total_price).toFixed(2)} บาท
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                ไม่มีข้อมูลรายการขยะในจุดนี้
              </p>
            )}

            {/* สรุปราคารวม */}
            {currentItem?.wastes && currentItem.wastes.length > 0 && (
              <div className="mt-6 border-t pt-4 flex justify-between items-center">
                <p className="font-semibold text-gray-700">ราคารวมทั้งหมด</p>
                <p className="text-xl font-bold text-green-600">
                  {currentItem.wastes
                    .reduce(
                      (sum, item) => sum + parseFloat(item.total_price),
                      0
                    )
                    .toFixed(2)}{" "}
                  บาท
                </p>
              </div>
            )}

            {/* ปุ่มกดยืนยัน/ยกเลิก */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsOpenModal(false)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => {
                  // TODO: เพิ่มฟังก์ชัน update สถานะรายการจองที่นี่
                  setIsOpenModal(false);
                }}
                className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                ยืนยันการรับขยะ
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MytaskDriverdetail;
