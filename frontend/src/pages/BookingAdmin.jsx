import { useEffect, useState } from "react";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import HeaderAdmin from "../components/Admin/HeaderAdmin";
import BookingSummaryCard from "../components/Admin/BookingSummaryCard";
import ReserveCard from "../components/Admin/ReserveCard";
import { Search } from "lucide-react";

const BookingAdmin = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [reserves, setReserves] = useState([]);
  const [statusCount, setStatusCount] = useState({});
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Confirm", "Pending", "Complete"];
  // const [assignDriver, setAssignDriver] = useState("");

  const STATUS_MAP = {
    All: null,
    Confirm: "confirmed",
    Pending: "pending",
    Complete: "completed",
    Canceled: "canceled",
  };

  useEffect(() => {
    const status = STATUS_MAP[activeTab];
    fetchData(status);
  }, [activeTab]);

  const fetchData = async (status) => {
    try {
      const query = new URLSearchParams();
      if (status) query.set("status", status);
      const url = `${apiUrl}/api/admin/reserve${query.toString() ? `?${query.toString()}` : ""}`;


      // console.log("fetching from:", url);

      const res = await fetch(url, {
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
        (data.status || []).forEach((item) => {
          statusObj[item.res_status] = item.total;
        });
        setStatusCount(statusObj);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเชื่อมต่อเซิรฟ์เวอร์!", error);
    }
  };

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
          <BookingSummaryCard reserves={reserves} statusCount={statusCount} />

          {/* reserve sections */}
          <section className="mb-8">
            <div className="flex flex-col border border-gray-200 rounded-md p-4 bg-white shadow-sm">
              {/* top */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-medium text-sm border-b-2 ${
                        activeTab === tab
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
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
                <ReserveCard reserves={reserves} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default BookingAdmin;
