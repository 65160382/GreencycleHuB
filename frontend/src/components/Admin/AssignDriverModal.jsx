import { IoCloseCircle } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  CalendarDays,
  Clock,
  MapPin,
  MessageCircleMore,
  Phone,
} from "lucide-react";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
};

const AssignDriverModal = ({ isOpen, onClose, resId }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [reserveDetail, setReserveDetail] = useState({});
  const [wasteCollection, setWasteCollection] = useState([]);

  useEffect(() => {
    if (resId) {
      fetchReserveById(resId);
    }
  }, [resId]);

  const fetchReserveById = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/api/reserve/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log("test result", data.result);
        setReserveDetail(data.result.reserveResult); //รายละเอียดการจอง
        setWasteCollection(data.result.reserveDetailResult);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเชื่อมต่อเซิรฟ์เวอร์!", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-50 flex justify-center items-start p-4 pt-16 overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto relative">
              {/* Modal Header */}
              <section className="flex items-start justify-between ">
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl text-center">
                  Assign Driver to Booking
                </h1>
                <IoCloseCircle
                  className="w-9 h-9 cursor-pointer text-gray-500 hover:text-red-500 transform hover:scale-110 transition-transform duration-200"
                  onClick={onClose}
                />
              </section>

              {/* แสดงเนื้อหา*/}
              <section className="flex flex-row gap-2.5">
                <section className="flex flex-col gap-4 p-4 my-5 border rounded-md w-full max-w-md bg-gray-50">
                  {/* Header: โปรไฟล์ผู้จอง */}
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 bg-gray-500 rounded-full text-white flex items-center justify-center font-semibold">
                        C
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-800">
                          {reserveDetail?.customername || "ไม่พบชื่อ"}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {reserveDetail?.cus_email}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 text-gray-500">
                      <MessageCircleMore className="w-5 h-5 cursor-pointer hover:text-blue-500" />
                      <Phone className="w-5 h-5 cursor-pointer hover:text-green-500" />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-2 text-sm text-gray-600 items-center">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {reserveDetail?.add_houseno} {reserveDetail?.add_road}{" "}
                      {reserveDetail?.add_subdistrict}{" "}
                      {reserveDetail?.add_district}{" "}
                      {reserveDetail?.add_province}{" "}
                      {reserveDetail?.add_postcode}
                    </span>
                  </div>

                  {/* Date + Time */}
                  <div className="flex gap-4 text-sm text-gray-600 items-center">
                    <div className="flex gap-1 items-center">
                      <CalendarDays className="w-4 h-4" />
                      <span>
                        {new Date(
                          reserveDetail?.res_booking_date
                        ).toLocaleDateString("th-TH", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Clock className="w-4 h-4" />
                      <span>{reserveDetail?.res_time_slot}</span>
                    </div>
                  </div>

                  {/* สถานะ + สรุปราคา */}
                  <div className="flex justify-between text-sm text-gray-700 border-t pt-3 mt-2">
                    <div>
                      <p>
                        สถานะ:{" "}
                        <span className="font-semibold text-indigo-600">
                          {reserveDetail?.res_status}
                        </span>
                      </p>
                      <p>
                        น้ำหนักรวม:{" "}
                        <span className="font-medium">
                          {reserveDetail?.res_weight} kg
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500">ยอดรวม</p>
                      <p className="text-lg font-bold text-green-600">
                        {reserveDetail?.res_amount} ฿
                      </p>
                    </div>
                  </div>
                </section>

                <section className="flex flex-col gap-2.5 p-4">
                  {/* Search */}
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
                  <h2 className="font-medium">Available drivers:</h2>
                  {/* card driver */}
                  <div className="flex flex-col gap-4 p-4  border rounded-md w-full max-w-md bg-gray-50"></div>
                </section>
              </section>

              {/* ส่วนท้ายสุดแสดงปุ่ม actions */}
              <section className="flex border-t border-gray-200 justify-end  py-2">
                <div className="flex gap-2">
                  {/* Cancel Button */}
                  <button
                    onClick={onClose}
                    className="flex items-center border border-gray-300 text-gray-600 bg-white px-4 py-2 rounded-md 
                 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition text-sm font-medium"
                  >
                    Cancel
                  </button>

                  {/* Assign Driver Button */}
                  <button
                    className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md 
                 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                 transition text-sm font-medium shadow-sm"
                  >
                    Assign Driver
                  </button>
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AssignDriverModal;
