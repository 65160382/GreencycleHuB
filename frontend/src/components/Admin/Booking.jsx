import React, { useEffect, useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import {
  TicketCheck,
  Hourglass,
  CircleCheck,
  Search,
  Clock,
  CalendarDays,
  CalendarCheck,
} from "lucide-react";

const Booking = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [reserves, setReserves] = useState([]);
  const [statusCount, setStatusCount] = useState({});
  // const [assignDriver, setAssignDriver] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/admin/reserve`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log("debug data:", data);
        // เก็บรายการจองทั้งหมด
        setReserves(data.result);

        // แปลง status array → เป็น object แบบ key:value
        const statusObj = {};
        data.status.forEach((item) => {
          statusObj[item.res_status] = item.total;

          setStatusCount(statusObj);
        });
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเชื่อมต่อเซิรฟ์เวอร์!", error);
    }
  };

  // ฟังก์ชั่นสำหรับจัดรูปแบบวันที่ toLocaleDateString()
  const formatDateString = (date) => {
    // const date = reservations.res_booking_date;
    if (!date) return "ไม่มีข้อมูลวันที่จอง";

    // ถ้าใช้ "th-TH" → จะได้เป็น 15/08/2568 (พ.ศ.)
    const formattedDate = new Date(date).toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  const item = [
    {
      img: <TicketCheck size={24} />,
      total: reserves.length,
      label: "Total Booking",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      img: <CalendarCheck size={24} />,
      total: statusCount.confirmed,
      label: "Confirm Booking",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      img: <Hourglass size={24} />,
      total: statusCount.pending,
      label: "Pending Booking",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      img: <CircleCheck size={24} />,
      total: statusCount.completed,
      label: "Complete Booking",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {isSidebarOpen && <SidebarAdmin />}
      <div className="flex flex-col flex-1">
        <HeaderAdmin onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 bg-white p-6">
          {/* header */}
          <h2 className="text-2xl font-bold text-start mb-6">
            Booking Management
          </h2>

          {/* แสดงจำนวนรายการจองต่างๆ */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {item.map((item) => (
              <div
                key={item.res_id}
                className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm p-5"
              >
                <div
                  className={`p-3 rounded-full mr-4 ${item.bgColor} ${item.iconColor}`}
                >
                  {item.img}
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-800">
                    {item.total}
                  </p>
                  <span className="text-sm text-gray-500">{item.label}</span>
                </div>
              </div>
            ))}
          </section>

          {/* reserve sections */}
          <section className="mb-8">
            <div className="flex flex-col border border-gray-200 rounded-md p-4 bg-white shadow-sm">
              {/* top */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {["All", "Confirm", "Complete"].map((label, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-md border text-sm font-medium 
              text-gray-600 border-gray-300 hover:bg-emerald-100 hover:text-emerald-700 
              focus:outline-none focus:ring-2 focus:ring-emerald-400 
              transition duration-200`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Search bar */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative w-full max-w-sm">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                      <Search size={18} />
                    </span>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 
                      transition"
                    />
                  </div>
                  <button
                    type="button"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 
                    transition shadow-sm"
                  >
                    Search
                  </button>
                </div>
              </div>
              {/* main */}
              <div className="flex flex-col mt-4 gap-4">
                {/* card */}
                {reserves.map((item) => (
                  <div
                    key={item.res_id}
                    className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      {/* profile + info */}
                      <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                        <div className="w-12 h-12 bg-gray-500 rounded-full text-white flex items-center justify-center font-semibold">
                          C
                        </div>
                        <div>
                          <h2 className="font-semibold text-gray-800">
                            {item.customers_name}
                          </h2>
                          <p className="text-sm text-gray-600">
                            {item.addressLine1}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.addressLine2}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <div className="flex items-center gap-1">
                              <CalendarDays size={14} />
                              <span>
                                {formatDateString(item.res_booking_date)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{item.res_time_slot}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* status + action */}
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                          {item.res_status}
                        </span>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md transition">
                          Assigned
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Booking;
