import Header from "../components/Core-UI/Header";
import Footer from "../components/Core-UI/Footer";
import { MapPinCheck, MapPin } from "lucide-react";
import { useParams,useNavigate } from "react-router-dom";
import ProgressBar from "../components/Statuspage/ProgressBar";
import TableReserve from "../components/Statuspage/TableReserve";
import { Breadcrumb } from "../components/Core-UI/Breadcrumb";
import { useEffect, useState } from "react";
import { formatDateString } from "../utils/formateDateUtils";
import ConfirmModal from "../components/Core-UI/Confirmmodal";

const Statusdetail = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { resId } = useParams();
  const [reserve, setReserve] = useState({});
  const [details, setDetails] = useState([]);
  const [step, setStep] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate()

  const status_MAP = {
    confirmed: "0",
    pending: "1",
    picking_up: "2",
    collected: "3",
    completed: "5",
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // ตรวจสอบ state reserve แล้วทำการ map status เป็นตัวเลขที่กำหนดไว้เพื่อส่งให้ component progressbar
  useEffect(() => {
    if (reserve.res_status) {
      const stepNumber = status_MAP[reserve.res_status];
      setStep(stepNumber);
      // console.log(step);
    }
  }, [reserve]);

  // ดึงข้อมูลรายการจอง http://loclahost:3000/api/reserve/:resid
  const fetchReservations = async () => {
    try {
      const respone = await fetch(`${apiUrl}/api/reserve/${resId}`, {
        method: "GET",
        credentials: "include", // ส่ง cookies ไปด้วย
      });
      if (respone.ok) {
        const data = await respone.json();
        console.log("Reservations:", data.result);
        setReserve(data.result.reserveResult);
        setDetails(data.result.reserveDetailResult);
      }
      if (reserve.res_status) {
        console.log(reserve.res_status);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  };

  // update reserve status http://localhost:3000/api/reserve/:resid
  const handleCancel = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/reserve/${resId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "canceled" }),
      });
      if(res.ok){
        console.log("ยกเลิกรายการจองสำเร็จ!");
        navigate("/status");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์", error);
    }
  };

  return (
    <div className="bg-[#f3f3f3]">
      <Header />
      {/* Content div */}
      <div className="flex flex-col px-10 py-4">
        <Breadcrumb />

        {/* header */}
        <div className="rounded-md shadow-sm bg-gradient-to-r from-[#B9FF66] to-[#5AF3A7] p-4 my-4 mx-auto w-full max-w-5xl">
          <h1 className="font-semibold text-lg">รายละเอียดการจอง</h1>
        </div>

        {/* reserve&detail */}
        <div className="mx-auto w-full max-w-5xl bg-white">
          {/* topbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
            <div className="space-y-1">
              <div className="text-base font-semibold ">
                หมายเลขการจอง{" "}
                <span className="font-semibold text-gray-900">
                  {reserve.res_code}
                </span>
              </div>
              <div className="text-sm ">
                ชื่อผู้จอง{" "}
                <span className="font-medium text-gray-900">
                  {reserve.customername}
                </span>
              </div>
              {/* <div className="text-sm ">วันที่ทำรายการ: {} </div> */}
              <div className="text-sm ">
                วันนัดรับ: {formatDateString(reserve.res_booking_date)} รอบ{" "}
                {reserve.res_time_slot}
              </div>
            </div>
            {/* ปุ่มแสดงแผนที่ */}
            <button
              className="inline-flex items-center gap-2 rounded-md shadow-sm p-2 bg-[#B9FF66]"
              type="button"
            >
              <span className="">ติดตามคำสั่งซื้อ</span>
              <MapPinCheck className="h-4 w-4 " />
            </button>
          </div>

          {/* status reserve */}
          <ProgressBar currentStep={parseInt(step)} />

          {/* รายการขยะการที่จอง */}
          <TableReserve details={details} reserve={reserve} />

          {/* Address Card */}
          <div className="mx-5 my-3 rounded-md border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center px-2.5 py-2 gap-2 border-b border-gray-200">
              <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
                <MapPin className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800">
                ที่อยู่สำหรับรับขยะ
              </h3>
            </div>

            {/* Body */}
            <div className="px-4 py-3 text-sm text-gray-700 space-y-1">
              <p>
                {reserve.add_province} {reserve.add_district}{" "}
                {reserve.add_subdistrict}
              </p>
              <p>
                {reserve.add_houseno} {reserve.add_road} {reserve.add_postcode}
              </p>
            </div>
          </div>

          {/* actions */}
          <div className="flex items-center justify-center py-5">
            <button
              className="border rounded-lg p-2.5 bg-[#EA4335]"
              type="button"
              onClick={() => setIsConfirmOpen(true)}
              hidden={reserve.res_status !== "confirmed"}
              disabled={reserve.res_status !== "confirmed"}
            >
              <span className="px-4 py-2 text-sm font-semibold text-white">
                ยกเลิกการจอง
              </span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="ยืนยันยกเลิกรายการจอง"
        message={`คุณต้องการยกเลิกรายการจองนี้ใช่หรือไม่?`}
        onConfirm={() => handleCancel()}
      />
      <Footer />
    </div>
  );
};

export default Statusdetail;
