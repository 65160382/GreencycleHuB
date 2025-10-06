import { useEffect, useState } from "react";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import HeaderAdmin from "../components/Admin/HeaderAdmin";
import BookingSummaryCard from "../components/Admin/BookingSummaryCard";
import ReserveCard from "../components/Admin/ReserveCard";
import Modal from "../components/Core-UI/Modal";
import AssignDriverModal from "../components/Admin/AssignDriverModal";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

const BookingAdmin = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [reserves, setReserves] = useState([]);
  const [statusCount, setStatusCount] = useState({});
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Confirm", "Pending", "Complete"];
  // const [assignDriver, setAssignDriver] = useState("");
  const [selectedResid, setSelectedResid] = useState([]); // array ของ res_id เพิ่ม lat,lon
  const [selectedDate, setSelectedDate] = useState(""); // object: { [res_id]: { date, timeslot } }
  const [selectedTimeslot, setSelectedTimeslot] = useState(""); // object: { [res_id]: { date, timeslot } }

  const STATUS_MAP = {
    All: null,
    Confirm: "confirmed",
    Pending: "pending",
    Complete: "complete",
    Canceled: "canceled",
  };

  useEffect(() => {
    const status = STATUS_MAP[activeTab];
    fetchData(status);
  }, [activeTab]);

  // debug
  // useEffect(() => {
  //   console.log("resid", selectedResid);
  //   console.log("date&timeslot", selectedDate, " ", selectedTimeslot);
  // }, [selectedResid, selectedDate, selectedTimeslot]);

  // ฟิลเตอร์รายการจองตามวันที่และรอบที่เลือก
  const filterReserves =
    selectedDate && selectedTimeslot
      ? reserves.filter(
          (item) =>
            item.res_booking_date?.slice(0, 10) === selectedDate &&
            item.res_time_slot === selectedTimeslot
        )
      : reserves;

  const fetchData = async (status) => {
    try {
      const query = new URLSearchParams();
      if (status) query.set("status", status);
      const url = `${apiUrl}/api/admin/reserve${
        query.toString() ? `?${query.toString()}` : ""
      }`;

      // console.log("fetching from:", url);

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        // console.log("debug data:", data.result);
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
          {/* <BookingSummaryCard reserves={reserves} statusCount={statusCount} /> */}

          {/* reserve sections */}
          <section className="mb-8">
            <div className="flex flex-col border border-gray-200 rounded-md p-4 bg-white shadow-sm">
              {/* top */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* filter date & timeslot */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex gap-4 ">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border px-2 py-1 rounded-md"
                  />
                  <select
                    value={selectedTimeslot}
                    onChange={(e) => setSelectedTimeslot(e.target.value)}
                    className="border px-2 py-1 rounded-md"
                  >
                    <option value="">-- เลือกรอบเวลา --</option>
                    <option value="9.00-12.00">9.00-12.00</option>
                    <option value="13.00-17.00">13.00-17.00</option>
                  </select>
                </div>
                </div>

                {/* สร้างตาราง timetable */}
                <div className="flex items-center justify-end w-full md:w-auto">
                  {/* <div className="flex flex-row items-center border border-blue-500 rounded-md p-2 gap-2 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white hover:border-transparent cursor-pointer "> */}
                  <div
                    onClick={() => {
                      if (!selectedDate) {
                        toast.warn("กรุณาเลือกวันที่ก่อน!");
                        return;
                      }
                      if(!selectedTimeslot){
                        toast.warn("กรุณาเลือกรอบที่ต้องการก่อน!");
                        return;
                      }
                      setIsOpenModal(true);
                    }}
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-medium rounded p-2 gap-2 cursor-pointer "
                  >
                    <Plus size={20} />
                    <button>สร้างรอบรถ {selectedResid.length > 0 ? `(${selectedResid.length})` : " "}</button>
                  </div>
                  {/* Modal หมอยหมายคนขับรถ */}
                  <Modal
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    title={"Assign Driver"}
                  >
                    <AssignDriverModal
                      onClose={() => {setIsOpenModal(false); fetchData();}} // reload data ใน BookingAdmin
                      date={selectedDate}
                      timeslot={selectedTimeslot}
                      resid={selectedResid}
                    />
                  </Modal>
                </div>
              </div>

              {/* main */}
              <div className="flex flex-col mt-4 gap-4">
                {/* card */}
                {filterReserves.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    ไม่พบรายการจองในวันที่และรอบเวลาที่เลือก
                  </p>
                ) : (
                  <ReserveCard
                    reserves={filterReserves}
                    setResid={setSelectedResid}
                  />
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default BookingAdmin;
