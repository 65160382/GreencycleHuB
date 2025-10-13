import Header from "../components/Core-UI/Header";
import Footer from "../components/Core-UI/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Breadcrumb } from "../components/Core-UI/Breadcrumb";
import DateRangePicker from "../components/Statuspage/DateRangePicker";

const STATUS_MAP = {
  "ทั้งหมด": null,
  "รอดำเนินการ": "pending",
  "กำลังดำเนินการ": "picking_up",
  "สำเร็จ": "complete",
  "ยกเลิกแล้ว": "canceled",
};

const Status = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [activeTab, setActiveTab] = useState("ทั้งหมด");
  const [reservations, setReservations] = useState([]);
  const tabs = ["ทั้งหมด", "รอดำเนินการ", "กำลังดำเนินการ", "สำเร็จ", "ยกเลิกแล้ว"];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const statusEn = STATUS_MAP[activeTab];
    fetchReservations(statusEn);
  }, [activeTab, startDate, endDate]);

  const fetchReservations = async (status) => {
    try {
      const query = new URLSearchParams();
      if (status) query.set("status", status);
      if (startDate) query.set("start", formatDatetoYMD(startDate));
      if (endDate) query.set("end", formatDatetoYMD(endDate));

      const url = `${apiUrl}/api/reserve${query.toString() ? `?${query.toString()}` : ""}`;
      const response = await fetch(url, { method: "GET", credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        setReservations(data.result);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setReservations([]);
    }
  };

  const formatDateString = (date) => {
    if (!date) return "ไม่มีข้อมูลวันที่จอง";
    return new Date(date).toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDatetoYMD = (dateStr) => {
    if (!dateStr) return undefined;
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="bg-[#f3f3f3] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-6">
        <section className="mb-3">
          <Breadcrumb />
        </section>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          {/* Tabs */}
          <div className="flex flex-wrap border-b mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium border-b-2 transition ${
                  activeTab === tab
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Date Filter */}
          <div className="mb-4">
            <DateRangePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </div>

          {/* Reservation List */}
          <div className="space-y-3">
            {reservations.map((item) => (
              <div
                key={item.res_id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-lg bg-gray-50 p-4 hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <img
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover flex-shrink-0"
                    src="https://i0.wp.com/discoverandshare.org/wp-content/uploads/2025/07/da62b-recycling_sign_green.png?fit=1024%2C1024&ssl=1"
                    alt="recycle-logo"
                  />
                  <div className="text-sm sm:text-base text-gray-700">
                    <p className="font-semibold text-gray-900">
                      หมายเลขการจอง {item.res_code}
                    </p>
                    <p>ชื่อ: {item.customers_name}</p>
                    <p>
                      วันที่จอง {formatDateString(item.res_booking_date)} รอบ{" "}
                      {item.res_time_slot}
                    </p>
                    <p className="text-gray-800">
                      สถานะ:{" "}
                      <span
                        className={`font-medium ${
                          item.res_status === "complete"
                            ? "text-green-600"
                            : item.res_status === "pending"
                            ? "text-yellow-600"
                            : item.res_status === "canceled"
                            ? "text-red-500"
                            : "text-gray-700"
                        }`}
                      >
                        {item.res_status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex sm:block">
                  <button
                    className="w-full sm:w-auto text-center rounded-md bg-green-500 text-white text-sm sm:text-base px-4 py-2 font-medium hover:bg-green-600 transition"
                    onClick={() => navigate(`/status/${item.res_id}`)}
                  >
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            ))}

            {/* กรณีไม่มีรายการ */}
            {reservations.length === 0 && (
              <div className="text-sm text-gray-500 text-center p-5 border rounded bg-gray-50">
                ไม่พบรายการในสถานะ “{activeTab}”
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Status;
