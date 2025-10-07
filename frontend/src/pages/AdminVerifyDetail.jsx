import SidebarAdmin from "../components/Admin/SidebarAdmin";
import HeaderAdmin from "../components/Admin/HeaderAdmin";
import { useState } from "react";
import ComfirmModal from "../components/Core-UI/Confirmmodal"

const AdminVerifyDetail = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  //   test
  // mock data
  const record = {
    bookingId: "BK-2024-001",
    customerName: "สมชาย ใจดี",
    wasteType: "พลาสติก",
    bookedWeight: 15.5,
    collectionDate: "2024-01-15",
    pricePerKg: 30,
    estimatedPayment: 465,
    photoUrl: "/placeholder.svg",
  };

  const [actualWeight, setActualWeight] = useState(record.bookedWeight);
  const [adminNotes, setAdminNotes] = useState("");
  const calculatedPayment = (actualWeight * record.pricePerKg).toFixed(2);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    // TODO: call API update status reserve → "completed"
  };

  return (
    <div className="flex min-h-screen">
      {isSidebarOpen && <SidebarAdmin />}
      <div className="flex flex-col flex-1">
        <HeaderAdmin onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {/* Content */}
        <main className="flex-1 bg-white p-6">
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              รายละเอียดการจอง
            </h2>

            {/* ข้อมูลผู้จอง */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-gray-500">รหัสการจอง</p>
                <p className="font-semibold">{record.bookingId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ชื่อลูกค้า</p>
                <p className="font-semibold">{record.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ประเภทขยะ</p>
                <span className="inline-block px-2 py-1 text-sm bg-green-100 text-green-700 rounded-md">
                  {record.wasteType}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">วันที่เก็บขยะ</p>
                <p>
                  {new Date(record.collectionDate).toLocaleDateString("th-TH")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">น้ำหนักที่จอง</p>
                <p>{record.bookedWeight} กก.</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ราคาต่อกิโลกรัม</p>
                <p className="text-green-700 font-semibold">
                  {record.pricePerKg} บาท
                </p>
              </div>
            </div>

            {/* รูปภาพหลักฐาน */}
            <div className="mb-8">
              <p className="font-medium mb-2">รูปภาพหลักฐาน</p>
              <div className="overflow-hidden rounded-lg border border-gray-300">
                <img
                  src={record.photoUrl}
                  alt="waste evidence"
                  className="w-full object-cover"
                />
              </div>
            </div>

            {/* ฟอร์มตรวจสอบ */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    น้ำหนักจริง (กก.) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={actualWeight}
                    onChange={(e) =>
                      setActualWeight(parseFloat(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                  {actualWeight !== record.bookedWeight && (
                    <p className="text-sm text-yellow-600 mt-1">
                      แตกต่างจากที่จอง{" "}
                      {(actualWeight - record.bookedWeight).toFixed(1)} กก.
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    จำนวนเงินที่จะโอน (บาท)
                  </label>
                  <div className="border border-green-300 bg-green-50 p-2 rounded-md font-semibold text-green-700">
                    {calculatedPayment}
                  </div>
                  <p className="text-xs text-gray-500">
                    {actualWeight} กก. × {record.pricePerKg} บาท/กก.
                  </p>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  หมายเหตุ (ถ้ามี)
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 min-h-[80px]"
                  placeholder="เช่น น้ำหนักแตกต่างเล็กน้อย เนื่องจาก..."
                />
              </div>

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
                  onClick={()=>setIsConfirmOpen(true)}
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
                message={`คุณต้องการโอนเงิน ${calculatedPayment} บาท ให้กับ ${record.customerName} ใช่หรือไม่?`}
                onConfirm={() => handleConfirm()}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminVerifyDetail;
