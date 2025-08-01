import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

const AddressSelector = () => {
  const [address, setAddress] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  // http://localhost:3000/api/addresses
  const fetchData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/addresses`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        // fliter ข้อมูลใน array เพื่อหาข้อมูลที่อยู่เริ่มต้นด้วย find
        const defaultAddress = data.result.find(
          (item) => item.add_default === 1
        );
        // console.log("ทดลองใช้ filter:",defaultAddress)
        setAddress(defaultAddress);
      }
    } catch (error) {
      console.error("เกิดข้อผิดลพลาดกับเซิรฟ์เวอร์", error);
    }
  };

  return (
    <>
      {address ? (
        <div className="border rounded-lg p-4 flex flex-col gap-4 bg-white">
          <div className="flex justify-between items-start">
            {/* ข้อมูลที่อยู่ */}
            <div className="flex flex-col text-sm text-gray-700 space-y-1">
              <span>
                <strong>ที่อยู่: </strong>
                {address.add_houseno} ถนน {address.add_road}
              </span>
              <span>
                <strong>แขวง/ตำบล:</strong> {address.add_subdistrict}
              </span>
              <span>
                <strong>เขต/อำเภอ:</strong> {address.add_district}
              </span>
              <span>
                <strong>จังหวัด:</strong> {address.add_province}
              </span>
              <span>
                <strong>รหัสไปรษณีย์:</strong> {address.add_postcode}
              </span>
            </div>

            {/* ปุ่มแก้ไข */}
            <div className="">
              <button
                type="button"
                className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                แก้ไข
              </button>
            </div>
          </div>

          {/* ป้ายค่าเริ่มต้น */}
          <div className="border border-[#EA4335] w-fit px-2.5 py-1 text-xs text-[#EA4335] font-bold rounded-sm ">
            ค่าเริ่มต้น
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="flex items-center border-2 border-dashed border-gray-300 p-4 gap-2 rounded-lg hover:bg-gray-50 transition text-gray-600"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">เพิ่มที่อยู่</span>
        </button>
      )}
    </>
  );
};

export default AddressSelector;
