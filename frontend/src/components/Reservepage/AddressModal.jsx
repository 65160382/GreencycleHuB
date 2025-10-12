import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
// import Modal from "./Modal";
import Modal from "../Core-UI/Modal";
import AddAddressModal from "./AddAddressModal";

const AddressModal = ({ isOpen, onClose, onUpdate }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [allAddresses, setAllAddresses] = useState([]);
  const [selectedDefaultId, setSelectedDefaultId] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (isOpen) fetchAllAddress();
  }, [isOpen]);

  // ดึงข้อมูลที่อยู่ทั้งหมด
  const fetchAllAddress = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/api/addresses`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setAllAddresses(data.result);
      }
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลที่อยู่", err);
    }
  };

  // เปลี่ยนที่อยู่เริ่มต้น
  const handleSelectDefault = async (id) => {
    try {
      if (!id) return console.error("ไม่มี id ของ address ที่เลือก");
      setSelectedDefaultId(id);

      const res = await fetch(`${apiUrl}/api/addresses/${id}/default`, {
        method: "PATCH",
        credentials: "include",
      });

      if (res.ok) {
        const result = await res.json();
        console.log("ตั้งค่า default สำเร็จ:", result);
        fetchAllAddress();
        onUpdate();
      }
    } catch (err) {
      console.error("เกิดข้อผิดพลาดไม่สามารถเปลี่ยนที่อยู่ได้!", err);
    }
  };

  // ลบข้อมูลที่อยู่
  const DeleteAddressSelect = async (id) => {
    if (!id) return console.error("ไม่มี id ของ address ที่เลือก");
    try {
      const res = await fetch(`${apiUrl}/api/addresses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        console.log("ลบที่อยู่สำเร็จ!");
        fetchAllAddress();
        // onUpdate();
      }
    } catch (error) {
      console.log("เกิดข้อผิดพลาด", error);
    }
  };

  return (
    <>
      {/* Modal หลัก */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="ที่อยู่ของฉัน"
        widthClass="max-w-4xl"
      >
        <div className="space-y-4">
          {allAddresses.map((address) => (
            <div
              key={address.add_id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition relative"
            >
              {/* Badge ค่าเริ่มต้น */}
              {address.add_default === 1 && (
                <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  ค่าเริ่มต้น
                </span>
              )}

              {/* radio สำหรับเลือก default */}
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

              {/* เนื้อหาที่อยู่ */}
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

              {/* ปุ่มแก้ไข/ลบ */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  // เรียกใช้ Modal แสดงที่อยู่
                  onClick={() => {
                    onClose(); // ปิด Modal ที่อยู่ไปก่อน
                    setEditId(address.add_id); //เก็บ id ของที่อยู่ที่ต้องการแก้ไขส่งเป็น props
                    setIsAddOpen(true); //เรียกใช้ modal เพิ่มที่อยู่
                  }}
                  className="px-3 py-1 text-sm bg-[#04AA6D] text-white rounded-md hover:bg-[#1e8d64]"
                >
                  แก้ไข
                </button>
                <button
                  type="button"
                  // เรียกใช้ api ลบข้อมูลที่อยู่
                  onClick={() => DeleteAddressSelect(address.add_id)}
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
              onClick={() => {
                onClose(); // ปิด Modal ที่อยู่ไปก่อน
                setEditId("");
                setIsAddOpen(true); //เรียกใช้ modal เพิ่มที่อยู่
              }}
              className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 p-4 gap-2 rounded-lg hover:bg-gray-50 text-gray-600"
            >
              <Plus className="w-5 h-5" />
              <span className="text-sm font-medium">เพิ่มที่อยู่</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal เพิ่ม/แก้ไขที่อยู่ (ตัวเดียวใช้ร่วมกัน) */}
      <AddAddressModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddSuccess={fetchAllAddress}
        mode={editId ? "edit" : "add"} // ถ้ามี editId แสดงว่าเป็นโหมดแก้ไข
        editId={editId} // ส่ง id ของที่อยู่ที่ต้องการแก้ไข
      />
    </>
  );
};

export default AddressModal;
