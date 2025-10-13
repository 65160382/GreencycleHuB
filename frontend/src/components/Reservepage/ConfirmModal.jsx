import { useContext, useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { ReserveContext } from "../../context/ReserveContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../Core-UI/Loading";
import Modal from "../Core-UI/Modal";

const ConfirmModal = ({ isOpen, onClose }) => {
  const { selectedWaste, selectedDate, selectedAddress } = useContext(ReserveContext);
  const { user } = useContext(AuthContext);
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedWaste?.length) {
      const weightSum = selectedWaste.reduce((sum, it) => sum + Number(it.total_weight || 0), 0);
      const priceSum = selectedWaste.reduce((sum, it) => sum + Number(it.total_price || 0), 0);
      setTotalWeight(weightSum);
      setTotalPrice(priceSum);
    }
  }, [selectedWaste]);

  // ฟังก์ชันยืนยันการจอง
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

      const response = await fetch(`${apiUrl}/api/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        navigate(`/booking-success/${result.resId}`);
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Error booking:", errorData.message);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการจอง:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ยืนยันการจอง"
      widthClass="max-w-3xl"
    >
      <div className="p-3 sm:p-5 space-y-5 max-h-[80vh] overflow-y-auto text-gray-800">
        {isLoading && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <Loading />
          </div>
        )}

        {/* รายละเอียดการจอง */}
        <section className="border rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-[#f8faf9] text-black font-semibold">รายละเอียดการจอง</div>
          <div className="p-4 space-y-3 text-sm sm:text-base">
            <div>
              <span className="text-gray-500">วันที่/รอบ: </span>
              <span className="text-gray-900">
                {selectedDate?.date || "— ยังไม่เลือก —"}{" "}
                {selectedDate?.timeslot ? `รอบ ${selectedDate.timeslot}` : ""}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-x-2 text-gray-900">
              <span className="text-gray-500">ผู้ติดต่อ:</span>
              <span>
                {user?.fname ? `${user.fname} ${user?.lname || ""}` : "—"}
              </span>
              <span className="text-gray-500">เบอร์โทรศัพท์:</span>
              <span>{user?.phone || "—"}</span>
            </div>

            <div>
              <div className="text-gray-500">ที่อยู่รับขยะ:</div>
              {selectedAddress ? (
                <div className="mt-1 space-y-0.5 break-words">
                  <div>{selectedAddress.add_houseno || ""} {selectedAddress.add_road ? `ถนน ${selectedAddress.add_road}` : ""}</div>
                  <div>{selectedAddress.add_subdistrict ? `แขวง/ตำบล ${selectedAddress.add_subdistrict}` : ""}</div>
                  <div>
                    {selectedAddress.add_district ? `เขต/อำเภอ ${selectedAddress.add_district}` : ""}
                    {selectedAddress.add_province ? ` จังหวัด ${selectedAddress.add_province}` : ""}
                  </div>
                  <div>{selectedAddress.add_postcode ? `รหัสไปรษณีย์ ${selectedAddress.add_postcode}` : ""}</div>
                </div>
              ) : (
                <div className="mt-1 text-gray-400">— ยังไม่ระบุ —</div>
              )}
            </div>
          </div>
        </section>

        {/* รายการขยะ */}
        <section className="border rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-[#f8faf9] text-black font-semibold">รายการขยะ</div>
          {selectedWaste?.length ? (
            <div className="divide-y text-sm sm:text-base">
              <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs sm:text-sm text-gray-500">
                <div className="col-span-5">ประเภท</div>
                <div className="col-span-2 text-right">ปริมาณ</div>
                <div className="col-span-2 text-right">ราคา/กก.</div>
                <div className="col-span-3 text-right">ราคารวม</div>
              </div>
              {selectedWaste.map((item) => (
                <div
                  key={item.rec_type_id}
                  className="grid grid-cols-12 gap-2 px-4 py-2 text-gray-800"
                >
                  <div className="col-span-5">{item.rec_type_name}</div>
                  <div className="col-span-2 text-right">{item.total_weight}</div>
                  <div className="col-span-2 text-right">
                    {parseFloat(item.rec_type_price).toFixed(2)} บาท
                  </div>
                  <div className="col-span-3 text-right font-medium">
                    {parseFloat(item.total_price).toFixed(2)} บาท
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-12 gap-2 px-4 py-2 font-semibold">
                <div className="col-span-5">รวม</div>
                <div className="col-span-2 text-right">{totalWeight.toFixed(2)} กก.</div>
                <div className="col-span-2"></div>
                <div className="col-span-3 text-right text-green-700">{totalPrice.toFixed(2)} บาท</div>
              </div>
            </div>
          ) : (
            <div className="px-4 py-5 text-center text-gray-400">ไม่มีรายการขยะ</div>
          )}
        </section>

        {/* ปุ่มยืนยัน */}
        <div className="flex justify-center mt-5">
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full sm:w-[160px] px-4 py-2.5 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition disabled:opacity-50"
          >
            ยืนยันการจอง
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
