import Header from "../components/Core-UI/Header";
import Footer from "../components/Core-UI/Footer";
import { ChevronLeft,MapPinCheck } from "lucide-react";
import { Link } from "react-router-dom";
import ProgessBar from "../components/Statuspage/ProgessBar";
import TableReserve from "../components/Statuspage/TableReserve";

const Statusdetail = () => {
  // const steps = [
  //   { label: "จองสำเร็จ", note: "26-06-2025 12:15" },
  //   { label: "รอดำเนินการ", note: "" },
  //   { label: "กำลังดำเนินการ", note: "" },
  //   { label: "ถึงจุดหมาย", note: "" },
  //   { label: "เสร็จสิ้น", note: "" }
  // ];


//   const getData = () => {
//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;

//     } catch (error) {
//       console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
//     }
//   }

  return (
    <div className="bg-[#f3f3f3]">
      <Header />
      {/* Content div */}
      <div className="flex flex-col px-10 py-4">
        {/* ปุ่มกลับสู่หน้าหลัก */}
        <section className="flex m-2.5 font-medium">
          <ChevronLeft className="cursor-pointer" />
          <Link
            to={"/home"}
            className="hover:text-green-600 transition-colors cursor-pointer"
          >
            กลับสู่หน้าหลัก
          </Link>
        </section>

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
                <span className="font-semibold text-gray-900"></span>
              </div>
              <div className="text-sm ">
                ชื่อผู้จอง <span className="font-medium text-gray-900"></span>
              </div>
              <div className="text-sm ">วันที่ทำรายการ: </div>
              <div className="text-sm ">วันนัดรับ: </div>
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
          <div className="px-5 py-6">
            <div className="text-sm font-medium text-gray-800">สถานะการจอง</div>
            {/* <div className='w-full px-6 items-center justify-center'> */}
            {/* <ProgessBar steps={steps} current={2}></ProgessBar> */}
            {/* </div> */}
          </div>

          {/* รายการขยะการที่จอง */}
          <TableReserve/>

          {/* address */}
          <div className="">
            {/* header */}
            <div className="font-semibold text-gray-800 px-5 py-2">
              ที่อยู่สำหรับรับขยะ
            </div>
            {/* address detail */}
            <div className="px-5 py-2">
              <p>test</p>
              <p>test</p>
              <p>test</p>
            </div>
          </div>

          {/* actions */}
          <div className="flex items-center justify-center py-5">
            <button className="border rounded-lg p-2.5 bg-[#EA4335]" type="button">
              <span className="px-4 py-2 text-sm font-semibold text-white ">
                ยกเลิกการจอง
              </span>
            </button>
          </div>

          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Statusdetail;
