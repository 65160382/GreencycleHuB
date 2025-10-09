import SidebarAdmin from "../components/Admin/SidebarAdmin";
import HeaderAdmin from "../components/Admin/HeaderAdmin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingCode, customerName, totalAmount } = location.state || {};
  return (
    <div className="flex min-h-screen">
      {isSidebarOpen && <SidebarAdmin />}
      <div className="flex bg-gray-50 flex-col flex-1">
        <HeaderAdmin onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {/* content  */}
        <div className="flex  items-center justify-center bg-gray-50 p-6">
          {/* <div className="w-full max-w-md border-2 border-green-200 bg-white p-8 rounded-2xl text-center relative overflow-hidden shadow-lg"> */}
          <div className="w-full max-w-md border-2  bg-white p-8 rounded-2xl text-center relative overflow-hidden shadow-lg">
            {/* Gradient background effect */}
            {/* <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-transparent to-blue-50 pointer-events-none" /> */}

            <div className="relative z-10">
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-gradient-to-br from-green-500 to-blue-400 p-4 shadow-lg shadow-green-200">
                  <CheckCircle className="h-16 w-16 text-white" />
                </div>
              </div>

              {/* Title */}
              <div className="mb-2 flex items-center justify-center gap-2">
                {/* <Sparkles className="h-5 w-5 text-green-600" /> */}
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
                  โอนเงินสำเร็จ
                </h1>
                {/* <Sparkles className="h-5 w-5 text-green-600" /> */}
              </div>

              <p className="mb-6 text-gray-500">
                ระบบได้ทำการโอนเงินให้กับลูกค้าเรียบร้อยแล้ว
              </p>

              {/* Summary Card */}
              <div className="mb-8 space-y-3 rounded-lg border border-green-100 bg-gradient-to-br from-gray-50 to-green-50 p-4 shadow-sm">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">รหัสการจอง</span>
                  <span className="font-mono font-semibold text-green-700">
                    {bookingCode || "BK-2025-001"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">ชื่อลูกค้า</span>
                  <span className="text-gray-900 font-medium">
                    {customerName || "ไม่ระบุ"}
                  </span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">จำนวนเงินที่โอน</span>
                  <span className="font-mono text-xl font-bold text-green-600">
                    {totalAmount ? `${totalAmount} บาท` : "0 บาท"}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate("/admin")}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-400 text-white font-semibold py-2 rounded-md hover:opacity-90 transition-opacity shadow-md"
                >
                  กลับสู่หน้าหลัก
                </button>

                <button
                  onClick={() => navigate("/admin/verify")}
                  className="w-full border border-green-300 text-gray-800 font-medium py-2 rounded-md hover:bg-green-50 transition-colors"
                >
                  ตรวจสอบรายการถัดไป
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
