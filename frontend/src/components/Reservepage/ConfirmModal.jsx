import { IoCloseCircle } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { ReserveContext } from "../../context/ReserveContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Core-UI/Loading";

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

const ComfirmModal = ({ isOpen, onClose }) => {
  const { selectedWaste } = useContext(ReserveContext);
  const { selectedDate } = useContext(ReserveContext);
  const { user } = useContext(AuthContext);
  const { selectedAddress } = useContext(ReserveContext);
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      sumWeightAndPrice(selectedWaste);
    } catch (error) {
      console.error(error);
    }
  }, [selectedWaste]);

  // ฟังก์ชั่นสำหรับคำนวณผลรวมของราคาและน้ำหนักของขยะทุกประเภทที่จะขาย
  const sumWeightAndPrice = (items) => {
    try {
      const weightSum = items.reduce(
        (sum, it) => sum + Number(it.total_weight || 0),
        0
      );
      const priceSum = items.reduce(
        (sum, it) => sum + Number(it.total_price || 0),
        0
      );
      setTotalWeight(weightSum);
      setTotalPrice(priceSum);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดไม่สามารถคำนวณได้", error);
    }
  };

  // ฟังก์ชั่นสำหรับยืนยันการจอง
  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;

      const data = {
        bookingDate: selectedDate?.date,
        timeslot: selectedDate?.timeslot,
        amount: totalPrice,
        weight: totalWeight,
        addrId: selectedAddress?.add_id,
        recTypeIds: selectedWaste.map((item) => item.rec_type_id),
      };
      console.log("Data to submit:", data);

      // http://localhost:3000/api/reserve
      const response = await fetch(`${apiUrl}/api/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ส่ง cookies ไปด้วย
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("การจองสำเร็จ:", result);
        setIsLoading(false);
        onClose(); // ปิด modal หลังจากยืนยัน
        navigate("/booking-success/${result.resId}");
      }else{
        const errorData = await response.json();
        setIsLoading(false);
        console.error("เกิดข้อผิดพลาดในการจอง:", errorData.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("เกิดข้อผิดพลาดในการจอง:", error);
    }
  };

  return (
    <AnimatePresence>
      {/* { isLoading && <Loading/>} */}
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
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-xl items-center font-bold text-gray-900 sm:text-2xl text-center">
                  ยืนยันการจอง
                </h1>
                <IoCloseCircle
                  className="w-9 h-9 cursor-pointer text-gray-500 hover:text-red-500 transform hover:scale-110 transition-transform duration-200"
                  onClick={onClose}
                />
              </div>

              {/* Content */}
              <div className="px-6 pb-6 ">
                {/* ส่วนรายละเอียดการจอง */}
                <section className="mt-5 border rounded-xl overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 font-semibold">
                    รายละเอียดการจอง
                  </div>
                  <div className="p-4 space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">วันที่/รอบ: </span>
                      <span className="text-gray-900">
                        {selectedDate?.date || "— ยังไม่เลือก —"}
                        {selectedDate?.timeslot
                          ? ` รอบ ${selectedDate.timeslot}`
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="text-gray-500">ผู้ติดต่อ: </span>
                      <span className="text-gray-900">
                        {user?.fname
                          ? `${user.fname} ${user?.lname || ""}`
                          : "—"}
                      </span>
                      <span className="text-gray-500">เบอร์โทรศัพท์: </span>
                      {user?.phone ? `${user.phone}` : ""}
                    </div>
                    <div className="text-gray-900">
                      <div className="text-gray-500">ที่อยู่รับขยะ:</div>
                      {selectedAddress?.add_subdistrict ||
                      selectedAddress?.add_district ? (
                        <div className="mt-1 space-y-0.5">
                          <div>
                            {(selectedAddress?.add_houseno || "").trim()}{" "}
                            {selectedAddress?.add_road
                              ? `ถนน ${selectedAddress.add_road}`
                              : ""}
                          </div>
                          <div>
                            {selectedAddress?.add_subdistrict
                              ? `แขวง/ตำบล ${selectedAddress.add_subdistrict}`
                              : ""}
                          </div>
                          <div>
                            {selectedAddress?.add_district
                              ? `เขต/อำเภอ ${selectedAddress.add_district}`
                              : ""}
                            {selectedAddress?.add_province
                              ? ` จังหวัด ${selectedAddress.add_province}`
                              : ""}
                          </div>
                          <div>
                            {selectedAddress?.add_postcode
                              ? `รหัสไปรษณีย์ ${selectedAddress.add_postcode}`
                              : ""}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-1 text-gray-400">— ยังไม่ระบุ —</div>
                      )}
                    </div>
                  </div>
                </section>

                {/* รายการขยะ */}
                <section className="mt-5 border rounded-xl overflow-hidden ">
                  <div className="px-4 py-3 bg-gray-50 font-semibold">
                    รายการขยะ
                  </div>
                  {selectedWaste?.length ? (
                    <div className="divide-y">
                      <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs text-gray-500">
                        <div className="col-span-5">ประเภท</div>
                        <div className="col-span-2 text-right">ปริมาณ</div>
                        <div className="col-span-2 text-right">ราคา/กก.</div>
                        <div className="col-span-3 text-right">ราคารวม</div>
                      </div>
                      {selectedWaste.map((item) => (
                        <div
                          key={item?.rec_type_id}
                          className="grid grid-cols-12 gap-2 px-4 py-3 text-sm"
                        >
                          <div className="col-span-5 text-gray-900">
                            {item?.rec_type_name || "—"}
                          </div>
                          <div className="col-span-2 text-right text-gray-900">
                            {item?.total_weight}
                          </div>
                          <div className="col-span-2 text-right text-gray-900">
                            {parseFloat(item?.rec_type_price).toFixed(2)} บาท
                          </div>
                          <div className="col-span-3 text-right font-medium text-gray-900">
                            {parseFloat(item?.total_price).toFixed(2)} บาท
                          </div>
                        </div>
                      ))}
                      <div className="grid grid-cols-12 gap-2 px-4 py-2 text-sm text-gray-900">
                        <div className="col-span-5">รวม</div>
                        <div className="col-span-2 text-right">
                          {parseFloat(totalWeight).toFixed(2)} กิโลกรัม
                        </div>
                        <div className="col-span-2 text-right"></div>
                        <div className="col-span-3 text-right">
                          {parseFloat(totalPrice).toFixed(2)} บาท
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-sm text-gray-400">
                      ไม่มีรายการ
                    </div>
                  )}
                </section>
              </div>

              <div className="flex items-center justify-center m-2.5">
                <button onClick={handleConfirm} className="w-[150px] px-4 py-2.5 bg-[#B9FF66] text-black font-medium rounded-lg shadow-sm hover:bg-[#a7f054] focus:outline-none focus:ring-2 focus:ring-[#B9FF66]/60 transition-all duration-200">
                  ยืนยันการจอง
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ComfirmModal;
