import { IoCloseCircle } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

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

const AddressModal = ({ isOpen, onClose, onUpdate }) => {
  const [allAddresses, setAllAddresses] = useState([]);
  const [selectedDefaultId, setSelectedDefaultId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchAllAddress(); // ดึงข้อมูลเฉพาะเมื่อ Modal เปิด
    }
  }, [isOpen]);

  //http://localhost:3000/api/addresses
  const fetchAllAddress = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/addresses`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("All addresses:", data.result);
        setAllAddresses(data.result);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลที่อยู่", error);
    }
  };

  //http://localhost:3000/api/addresses/:id/default
  const handleSelectDefault = async (id) => {
    try {
      if (!id) {
        console.error("ไม่มี id ของ address ที่เลือก");
        return;
      }
      // console.log("id ที่เลือกคือ", id);
      setSelectedDefaultId(id);
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/addresses/${id}/default`, {
        method: "PATCH",
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        console.log("result:", result);
        fetchAllAddress() //เรียก api ดึงข้อมูลที่อยู่ใหม่
        onUpdate(); //อัปเดตที่อยู่เริ่มต้นที่ parent component โดยการเรียกใช้ fetchData() ใน AddressSelctor.jsx
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดไม่สามารถเปลี่ยนที่อยู่ปัจจุบันได้!", error);
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
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl text-center">
                  ที่อยู่ของฉัน
                </h1>
                <IoCloseCircle
                  className="w-9 h-9 cursor-pointer text-gray-500 hover:text-red-500 transform hover:scale-110 transition-transform duration-200"
                  onClick={onClose}
                />
              </div>

              {/* แสดงที่อยู่ทั้งหมด */}
              <div className="space-y-4">
                {allAddresses.map((address) => (
                  <div
                    key={address.add_id}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition relative"
                  >
                    {/* Badge ตำแหน่ง default */}
                    {address.add_default === 1 && (
                      <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        ค่าเริ่มต้น
                      </span>
                    )}

                    {/* radio สำหรับเลือกที่อยู่เป็น default */}
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="defaultAddress"
                        value={address.add_id}
                        className="mr-2"
                        checked={address.add_default === 1}
                        onChange={() => handleSelectDefault(address.add_id)}
                      />
                    </div>

                    {/* Content address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
                      <p>
                        <span className="font-semibold">บ้านเลขที่: </span>
                        {address.add_houseno}
                      </p>
                      <p>
                        <span className="font-semibold">ถนน: </span>
                        {address.add_road}
                      </p>
                      <p>
                        <span className="font-semibold">ตำบล/แขวง: </span>
                        {address.add_subdistrict}
                      </p>
                      <p>
                        <span className="font-semibold">อำเภอ/เขต: </span>
                        {address.add_district}
                      </p>
                      <p>
                        <span className="font-semibold">จังหวัด: </span>
                        {address.add_province}
                      </p>
                      <p>
                        <span className="font-semibold">รหัสไปรษณีย์: </span>
                        {address.add_postcode}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        className="px-3 py-1 text-sm bg-[#04AA6D] text-white rounded-md hover:bg-[#1e8d64]"
                      >
                        แก้ไข
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1 text-sm bg-[#f44336] text-white rounded-md hover:bg-[#e43f33]"
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                ))}

                {/* ปุ่มเพิ่มที่อยู่ */}
                <div>
                  <button
                    type="button"
                    className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 p-4 gap-2 rounded-lg hover:bg-gray-50 text-gray-600"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-sm font-medium">เพิ่มที่อยู่</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddressModal;
