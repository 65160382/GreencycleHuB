import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  MessageCircleMore,
  Phone,
} from "lucide-react";
import Modal from "../Core-UI/Modal"; 

const ReserveDetail = ({ isOpen, onClose, resId }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [reserveDetail, setReserveDetail] = useState({});
  // const [wasteCollection, setWasteCollection] = useState([]);

  useEffect(() => {
    if (resId) {
      // console.log("debug resId",resId);
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
        setReserveDetail(data.result.reserveResult); // รายละเอียดการจอง
        // setWasteCollection(data.result.reserveDetailResult);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเชื่อมต่อเซิรฟ์เวอร์!", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="รายละเอียดการจอง" widthClass="max-w-4xl">
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
              {new Date(reserveDetail?.res_booking_date).toLocaleDateString("th-TH", {
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
              สถานะ: <span className="font-semibold text-indigo-600">{reserveDetail?.res_status}</span>
            </p>
            <p>
              น้ำหนักรวม: <span className="font-medium">{reserveDetail?.res_weight} kg</span>
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
    </Modal>
  );
};

export default ReserveDetail;
