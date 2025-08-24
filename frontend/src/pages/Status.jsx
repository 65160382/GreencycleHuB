import Header from "../components/Core-UI/Header";
import Footer from "../components/Core-UI/Footer";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useState,useEffect } from "react";
import { Breadcrumb } from "../components/Core-UI/Breadcrumb";
import DateRangePicker from "../components/Statuspage/DateRangePicker";

const STATUS_MAP = {
  "ทั้งหมด": null,
  "รอดำเนินการ": "pending",
  "กำลังดำเนินการ": "picking_up",
  "สำเร็จ": "completed",
  "ยกเลิกแล้ว": "canceled",
};

const Status = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [activeTab, setActiveTab] = useState("ทั้งหมด");
  const [reservations, setReservations] = useState([]);
  const tabs = ["ทั้งหมด", "รอดำเนินการ","กำลังดำเนินการ", "สำเร็จ", "ยกเลิกแล้ว"];
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  useEffect(()=> {
    const statusEn = STATUS_MAP[activeTab]; // map ไทย -> อังกฤษ (หรือ null)
    fetchReservations(statusEn);
  },[activeTab, startDate, endDate])


  // http://localhost:3000/reserve
  const fetchReservations = async (status) => {
    try {
      const query = new URLSearchParams();

      if(status) query.set("status",status);
      if(startDate) query.set("start",formatDatetoYMD(startDate));
      if(endDate) query.set("end",formatDatetoYMD(endDate));

      const url = `${apiUrl}/api/reserve${query.toString() ? `?${query.toString()}` : ""}`;

      const response = await fetch(url,{
        method: "GET",
        credentials:"include", // ส่ง cookies ไปด้วย
      });
      if(response.ok){
        const data = await response.json();
        // console.log("Reservations:",data);
        setReservations(data.result);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setReservations([]); // ป้องกันค้างค่าเก่า
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

  const formatDatetoYMD = (dateStr) => {
    if(!dateStr) return undefined;
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };


  return (
    <div className="bg-[#f3f3f3]">
      <Header />
      {/* Content div */}
      <div className="flex flex-col px-10 py-4">
        <section className="flex m-2.5 font-medium py-2.5">
          <Breadcrumb/>
        </section>
        
        <div className="min-h-screen bg-gray-50 p-4 rounded-md shadow-sm">
          {/* Tabs */}
          <div className="flex border-b mb-4">
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

          {/* filterDate */}
          <div className="mb-4 relative">
            <DateRangePicker startDate={startDate}  setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
          </div>

          {/* List */}
          <div className="space-y-3">
            {reservations.map((item) => (
              <div
                key={item.res_id}
                className="flex items-start gap-4 rounded-md border bg-white p-4 shadow-sm"
              >
                {/* Placeholder image */}
                <img 
                className="h-20 w-20 rounded-md object-cover"
                src="https://i0.wp.com/discoverandshare.org/wp-content/uploads/2025/07/da62b-recycling_sign_green.png?fit=1024%2C1024&ssl=1" alt="recycle-logo">
                </img>
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-gray-800">
                    หมายเลขการจอง {item.res_code}
                  </p>
                  <p>ชื่อ {item.customers_name}</p>
                  <p>
                    วันที่จอง {formatDateString(item.res_booking_date)} รอบ {item.res_time_slot}
                  </p>
                  <p className="text-gray-800">สถานะ: 
                    <span className="text-green-600 pl-1 font-medium">
                      {item.res_status}
                    </span>
                  </p>
                </div>

                <button 
                  className="shrink-0 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  onClick={() => navigate(`/status/${item.res_id}`)}
                  >
                  ดูรายละเอียด
                </button>
              </div>
            ))}

            {/* กรณีไม่มีรายการ */}
            {reservations.length === 0 && (
              <div className="text-sm text-gray-500 p-4 border rounded bg-white">
                ไม่พบรายการในสถานะ “{activeTab}”
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Status;
