import HeaderAdmin from "../components/Admin/HeaderAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import { useState } from "react";
import { formatDateTHStyle } from "../utils/formateDateUtils";
import {
  MapPinHouse,
  Weight,
  Clock4,
  ClipboardList,
  Truck,
  Package,
} from "lucide-react";

const MytaskDriver = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState("1");
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

  const points = {
    1: {
      name: "ที่อยู่ 1",
      detail: "123 หมู่บ้านตัวอย่าง ซอย 1 แขวงคลองสาน เขตบางรัก กรุงเทพมหานคร",
    },
    2: {
      name: "ที่อยู่ 2",
      detail: "456 หมู่บ้านพัฒนา ซอย 2 แขวงบางนา เขตบางนา กรุงเทพมหานคร",
    },
    3: {
      name: "ที่อยู่ 3",
      detail: "789 หมู่บ้านใหม่ ถ.สุขาภิบาล 5 เขตสายไหม กรุงเทพฯ",
    },
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

          {/* ส่วนแสดงจำนวนงาน */}
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

          {/* <h3 className="">รอบเช้า 9.00-12.00</h3> */}

          {/* ส่วนแสดงรอบ */}
          <section className="mt-4 ">
            <div className="border rounded-md shadow-sm p-6 bg-white">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">รอบเก็บขยะ 9.00-12.00</h2>
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
                  <div className="font-medium items-center">3 จุด</div>
                </div>
                <div>
                  <div className="text-gray-500 flex flex-row gap-2">
                    <Weight size={17} />
                    <span>น้ำหนักรวม</span>
                  </div>
                  <div className="font-medium">25 กก.</div>
                </div>
                <div>
                  <div className="text-gray-500 flex flex-row gap-2">
                    <Clock4 size={17} />
                    <span>เวลาเริ่มต้น</span>
                  </div>
                  <div className="font-medium">9:00 น.</div>
                </div>
                <div>
                  <div className="text-gray-500 flex flex-row gap-2">
                    <Clock4 size={17} />
                    <span>เวลาสิ้นสุด</span>
                  </div>
                  <div className="font-medium">12:00 น.</div>
                </div>
              </div>

              {/* ปุ่มลำดับจุด */}
              <div className="flex gap-2 mt-4">
                {Object.keys(points).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPoint(key)}
                    className={`px-3 py-1 rounded border text-sm ${
                      selectedPoint === key
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    จุดที่ {key}
                  </button>
                ))}
              </div>

              {/* แสดงรายละเอียดจุดที่เลือก */}
              <div className="mt-4 border rounded p-4 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  {points[selectedPoint].name}
                </h3>
                <p className="text-sm text-gray-600">
                  {points[selectedPoint].detail}
                </p>
              </div>

              {/* ปุ่มเริ่มเก็บขยะ */}
              <button
                type="button"
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
              >
                เริ่มเก็บขยะ
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MytaskDriver;
