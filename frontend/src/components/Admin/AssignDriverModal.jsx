import { MessageCircleMore, Phone, Target } from "lucide-react";
import { useState, useEffect } from "react";
import Spinloading from "../Core-UI/Spinloading";
import { toast } from "react-toastify";

const AssignDriverModal = ({ onClose, date, timeslot, resid }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (date && timeslot) {
      fetchData();
    }
  }, [date, timeslot]);

  useEffect(() => {
    if(resid) return console.log("debug res",resid);
  },[resid]);

  // http://localhost:3000/api/admin/drivers/available?date=?timeslot=?
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const query = new URLSearchParams();
      query.set("date", date);
      query.set("timeslot", timeslot);
      const url = `${apiUrl}/api/admin/drivers/available?${query.toString()}`;
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        // console.log("test data:", data.result);
        setAvailableDrivers(data.result);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเชื่อมต่อเซิรฟ์เวอร์!", error);
    } finally{
      setIsLoading(false);
    }
  };

  // http://localhost:3000/api/admin/timetable
  const handleAssignDriver = async () => {
    if (!selectedDriverId) {
      toast.warn("กรุณาเลือกคนขับก่อนทำการหมอบหมาย");
      return;
    }

    if (!resid || resid.length === 0) {
      toast.warn("ยังไม่มีรายการจองที่เลือก");
      return;
    }

    try {
      setIsLoading(true);
      const data = {
        assigndate: date,
        assigntimeslot: timeslot,
        driveId: selectedDriverId,
        resId: resid,
      };

      console.log("test data:",data)

      const res = await fetch(`${apiUrl}/api/admin/timetable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message || "หมอบหมายคนขับสำเร็จแล้ว");
        onClose(); // ปิด modal
      }else{
        toast.error(result.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเชื่อมต่อเซิรฟ์เวอร์!", error);
      toast.error("เชื่อมต่อเซิร์ฟเวอร์ล้มเหลว");
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <>
    { isLoading && <Spinloading/>}
      {/* CONTENT */}
      <section className="flex flex-col gap-4 py-4 px-2">
        {/* Section Header */}
        <h2 className="text-lg font-semibold text-gray-700">
          Available Drivers
        </h2>

        {availableDrivers ? (
          // คนขับ
          availableDrivers.map((item) => (
            <div key={item.driv_id} className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
              <label
                className="flex items-center gap-3 p-4 border rounded-md shadow-sm cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="driver"
                  className="accent-green-600"
                  value={item.driv_id}
                  // checked={selectedDriverId === index}
                  onChange={(e) => setSelectedDriverId(e.target.value)}
                />
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-800">
                      {item.driv_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      โทร:{item.driv_phone}
                    </p>
                    <p className="text-sm text-gray-500">
                      ทะเบียน: {item.driv_license_plate}
                    </p>
                  </div>
                  <div className="flex gap-2 text-gray-500 ">
                    <MessageCircleMore className="w-5 h-5 cursor-pointer hover:text-blue-500" />
                    <Phone className="w-5 h-5 cursor-pointer hover:text-green-500" />
                  </div>
                </div>
              </label>
            </div>
          ))
        ) : (
          // หากไม่มีคนขับว่าง
          <p className="text-sm text-red-500">ไม่พบคนขับว่างในรอบนี้</p>
        )}
      </section>

      {/* FOOTER */}
      <section className="flex border-t border-gray-200 justify-end pt-4 px-2">
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="border py-1 px-4 rounded-md font-medium hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white py-1 px-4 rounded-md font-medium hover:bg-green-700"
            onClick={handleAssignDriver}
          >
            Assign Driver
          </button>
        </div>
      </section>
    </>
  );
};

export default AssignDriverModal;
