import Header from "../components/Core-UI/Header";
import Footer from "../components/Core-UI/Footer";
import StepComponent from "../components/Reservepage/StepComponent";
import PersonalComponent from "../components/Reservepage/PersonalComponent";
import DateComponent from "../components/Reservepage/DateComponent";
import { ChevronLeft } from "lucide-react";

const Reserve = ({ isLoggedIn }) => {
  return (
    <div className="bg-[#f3f3f3]">
      <Header isLoggedIn={isLoggedIn} />

      {/* content div */}
      <div className="flex flex-col px-10 py-4  ">

        {/* ปุ่มย้อนกลับ + หัวข้อ + progress bar  */}
        <div className="p-2.5">
          <section className="flex  m-2.5  font-medium">
            <ChevronLeft className="cursor-pointer"/>
            <p className="hover:text-green-600 transition-colors cursor-pointer">กลับสู่หน้าหลัก</p>
          </section>
          <h1 className="font-bold m-2.5">จองคิวรับซื้อขยะ</h1>
          <section className="flex flex-col m-2.5 text-base">
            <p>ขั้นตอนที่ 1 จาก 2 : กรอกข้อมูลรายละเอียดส่วนตัว</p>
            {/* ส่วน progress bar */}
            <div className="mt-4 overflow-hidden rounded-full bg-[#d9d9d9]">
              <div className="h-2 w-1/3 rounded-full bg-[#349A2D]"></div>
            </div>
          </section>
        </div>

        {/* step 1 กรอกข้อมูลส่วนตัว */}
        <StepComponent stepNumber={1} title={"ข้อมูลส่วนตัว"}>
          <PersonalComponent />
        </StepComponent>

        {/* step 2 เลือกวันที่และรอบที่ต้องการจอง */}
        <StepComponent stepNumber={2} title={"เลือกวันที่และรอบที่ต้องการจอง"}>
          <DateComponent/>
        </StepComponent>

        {/* step 3 เลือกประเภทของขยะรีไซเคิลที่ต้องการขาย */}
        <StepComponent stepNumber={3} title={"เลือกประเภทของขยะรีไซเคิลที่ต้องการขาย"}>
          <label>ประเภทของขยะ</label>
          {/* ประเภทของขยะ ที่ดึงมากจาก table waste_collection */}
          <label>จำนวนปริมาณขยะที่สะสม</label>
          {/* จำนวนปริมาณขยะที่สะสม ที่ดึงมาจาก table waste_collection */}
          <label>ราคาต่อกิโลกรัม</label>
          {/* ราคาต่อกิโลกรัม ที่ดึงมาจาก table recycle_type */}
          <label>ราคาทั้งหมด</label>
          <p>""</p>
        </StepComponent>

        {/* step 4 เลือกที่อยู่ */}
        <StepComponent stepNumber={4} title={"เลือกที่อยู่"}>
          {/* แสดงที่อยู่ในฐานข้อมูลที่ค่า default เป็น true */}
          <p>" "</p>
        </StepComponent>

        {/* ปุ่มยืนยัน */}
        <div className="flex justify-center m-2.5 p-2.5">
          <button
            className="w-[110px] px-4 py-2.5 bg-[#B9FF66] text-black font-medium rounded-2xl shadow-md hover:bg-[#a7f054] focus:outline-none focus:ring-2 focus:ring-[#B9FF66]/60 transition-all duration-200"
            type="submit"
          >
            ยืนยัน
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reserve;
