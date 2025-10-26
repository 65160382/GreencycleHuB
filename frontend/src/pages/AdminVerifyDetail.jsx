import SidebarAdmin from "../components/Admin/SidebarAdmin";
import HeaderAdmin from "../components/Admin/HeaderAdmin";
import { useState, useEffect } from "react";
import ComfirmModal from "../components/Core-UI/Confirmmodal";
import { useParams, useNavigate } from "react-router-dom";
import Spinloading from "../components/Core-UI/Spinloading";

const AdminVerifyDetail = () => {
  const { resId } = useParams(); // ดึงไอดีรายการจองจาก url
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // state จัดการ loading
  const [reserve, setReserve] = useState({});
  const [wasteList, setWasteList] = useState([]); // เก็บรายละเอียดย่อยของรายการจอง
  // const [adminNotes, setAdminNotes] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  // สร้าง state สำหรับน้ำหนักจริงของแต่ละประเภท
  const [actualWeights, setActualWeights] = useState([]);

  useEffect(() => {
  const fetchReserveByid = async () => {
    setIsLoading(true); //  เริ่มโหลด
    try {
      const res = await fetch(`${apiUrl}/api/reserve/${resId}`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log("debug data:", data.result);
        setReserve(data.result.reserveResult);
        setWasteList(data.result.reserveDetailResult);
      } else {
        console.error("โหลดข้อมูลไม่สำเร็จ:", res.status);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดกับเซิร์ฟเวอร์", error);
    } finally {
      setIsLoading(false); //  ปิด loading หลังจากจบจริง
    }
  };

  fetchReserveByid();
}, [resId]);


  useEffect(() => {
    if (wasteList.length > 0) {
      // เซ็ตน้ำหนักจริงตามข้อมูลที่ดึงมาจาก backend
      const initWeights = wasteList.map(
        (item) => parseFloat(item.total_weight) || 0
      );
      setActualWeights(initWeights);
    }
  }, [wasteList]);

  // ฟังก์ชันคำนวณยอดรวมแต่ละประเภท
  const calculateSubtotal = (weight, pricePerKg) => {
    return (parseFloat(weight) * parseFloat(pricePerKg)).toFixed(2);
  };

  // คำนวณยอดรวมทั้งหมด
  const totalPayment = actualWeights
    .reduce((sum, weight, idx) => {
      const price = parseFloat(wasteList[idx].rec_type_price) || 0;
      return sum + weight * price;
    }, 0)
    .toFixed(2);

  // คำนวณความต่างระหว่างน้ำหนักจริงที่กรอก กับน้ำหนักเดิมที่จองไว้
  const calculateDiff = (index) => {
    const booked = parseFloat(wasteList[index].total_weight) || 0;
    const actual = parseFloat(actualWeights[index]) || 0;
    const diff = actual - booked;
    return diff.toFixed(1);
  };

  // ฟังก์ชันเมื่อกรอกน้ำหนักจริง
  const handleWeightChange = (index, value) => {
    const updated = [...actualWeights];
    updated[index] = parseFloat(value) || 0;
    setActualWeights(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = async() => {
    // setIsLoading(true);
    setShowConfirm(false);
    navigate("/admin/verify/success", {
      state: {
        bookingCode: reserve.res_code,
        customerName: reserve.customername,
        totalAmount: totalPayment,
      },
    });
    // TODO: call API update status reserve → "complete"
    await fetch(`${apiUrl}/api/reserve/${resId}`,{
      method:"PATCH",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({ status:"complete"})
    })
  };

  return (
    <div className="flex min-h-screen">
      {isSidebarOpen && <SidebarAdmin />}
      <div className="flex flex-col flex-1">
        <HeaderAdmin onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {/* Content */}
        {isLoading && <Spinloading/>}
        
        <main className="flex-1 bg-white p-6">
          {reserve ? (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              {/* header */}
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                รายละเอียดการจอง
              </h2>

              {/* ข้อมูลผู้จอง */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-500">รหัสการจอง</p>
                  <p className="font-semibold">{reserve.res_code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ชื่อลูกค้า</p>
                  <p className="font-semibold">{reserve.customername}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ประเภทขยะ</p>
                  <span className="inline-block px-2 py-1 text-sm bg-green-100 text-green-700 rounded-md">
                    {reserve.type}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">วันที่เก็บขยะ</p>
                  <p>{new Date(reserve.date).toLocaleDateString("th-TH")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">น้ำหนักที่จอง</p>
                  <p>{reserve.res_weight} กก.</p>
                </div>
              </div>

              {/* รูปภาพหลักฐาน */}
              {/* <div className="mb-8">
                <p className="font-medium mb-2">รูปภาพหลักฐาน</p>
                <div className="overflow-hidden rounded-lg border border-gray-300">
                  <img
                    src={record.photoUrl}
                    alt="waste evidence"
                    className="w-full object-cover"
                  />
                </div>
              </div> */}

              {/* ฟอร์มตรวจสอบ */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ถ้ามีหลายประเภทขยะ */}
                {wasteList.length > 0 ? (
                  wasteList.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 mb-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        {/* ชื่อประเภทขยะ */}
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {item.rec_type_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            ราคาต่อกิโลกรัม: {item.rec_type_price} บาท
                          </p>
                        </div>

                        {/* ช่องกรอกน้ำหนักจริง */}
                        <div className="flex-1">
                          <label className="block text-sm text-gray-600 mb-1">
                            น้ำหนักจริง (กก.)
                          </label>
                          <input
                            type="number"
                            step="0.1" //เพิ่มขึ้นทีละ 0.1
                            min={0} // ใส่ attribute min ของ type number เพื่อป้องกันค่าติดลบ
                            value={actualWeights[index] ?? ""} //เพิ่ม fallback ป้องกัน undefined
                            onChange={(e) =>
                              handleWeightChange(index, e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md p-2 text-right"
                            required
                          />
                          {/* แสดงความแตกต่างน้ำหนัก */}
                          {actualWeights[index] !== undefined ? (
                            actualWeights[index] !==
                            parseFloat(item.total_weight) ? (
                              <p
                                className={`text-xs mt-1 ${
                                  calculateDiff(index) > 0
                                    ? "text-green-600"
                                    : "text-yellow-600"
                                }`}
                              >
                                แตกต่างจากที่จอง {calculateDiff(index)} กก.
                              </p>
                            ) : (
                              <p className="text-xs mt-1 text-gray-500">
                                เท่ากับที่จอง
                              </p>
                            )
                          ) : null}
                        </div>

                        {/* จำนวนเงินที่จะโอน */}
                        <div className="flex-1 text-right">
                          <p className="text-sm text-gray-600 mb-1">
                            จำนวนเงินที่จะโอน
                          </p>
                          <div className="border border-green-300 bg-green-50 p-2 rounded-md font-semibold text-green-700">
                            {calculateSubtotal(
                              actualWeights[index],
                              item.rec_type_price
                            )}{" "}
                            บาท
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {actualWeights[index]} กก. × {item.rec_type_price}{" "}
                            บาท/กก.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    ไม่มีข้อมูลขยะในรายการนี้
                  </p>
                )}

                {/* รวมยอดทั้งหมด */}
                <div className="text-right font-semibold text-green-700 text-lg">
                  รวมทั้งหมด: {totalPayment} บาท
                </div>

                {/* ปุ่ม */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    onClick={() => setIsConfirmOpen(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    ยืนยันและโอนเงิน
                  </button>
                </div>
              </form>

              {/* Modal ยืนยัน */}
              {showConfirm && (
                <ComfirmModal
                  isOpen={isConfirmOpen}
                  onClose={() => setIsConfirmOpen(false)}
                  title="ยืนยันการโอนเงิน"
                  message={`คุณต้องการโอนเงิน ${totalPayment} บาท ให้กับ ${reserve.customername} ใช่หรือไม่?`}
                  onConfirm={() => handleConfirm()}
                />
              )}
            </div>
          ) : (
            <p>เกิดข้อผิดพลาด</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminVerifyDetail;
