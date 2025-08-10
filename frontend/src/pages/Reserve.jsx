import Header from "../components/Core-UI/Header";
import Footer from "../components/Core-UI/Footer";
import StepComponent from "../components/Reservepage/StepComponent";
import PersonalComponent from "../components/Reservepage/PersonalComponent";
import DateComponent from "../components/Reservepage/DateComponent";
import RecycleTypeSelector from "../components/Reservepage/RecycleTypeSelector";
import AddressSelector from "../components/Reservepage/AddressSelector";
import ConfirmModal from "../components/Reservepage/ConfirmModal";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Reserve = ({ isLoggedIn }) => {
  const [wasteCollections, setWasteCollections] = useState([]);
  const [isOpen, setIsOpen] = useState(false); 
  // const [address, setAddress] = useState("");

  useEffect(() => {
    fetchWasteCollection();
  }, []);

  //ดึงข้อมูลขยะที่ผู้ใช้สะสมเอาไว้มาแสดงผล http://localhost:3000/api/waste-collections
  const fetchWasteCollection = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(
        `${apiUrl}/api/waste-collections`,
        {
          method: "GET",
          credentials: "include", // ส่ง cookies ไปด้วย
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log("data:", data);
        setWasteCollections(data.result); // destructure จากส่งทั้ง object เป็นส่งค่า array 
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!", error);
    }
  };

  return (
    <div className="bg-[#f3f3f3]">
      <Header isLoggedIn={isLoggedIn} />

      {/* content div */}
      <div className="flex flex-col px-10 py-4  ">
        {/* ปุ่มย้อนกลับ + หัวข้อ + progress bar  */}
        <div className="p-2.5">
          <section className="flex  m-2.5  font-medium">
            <ChevronLeft className="cursor-pointer" />
            <Link to={"/home"} className="hover:text-green-600 transition-colors cursor-pointer" >กลับสู่หน้าหลัก</Link>
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

        {/* step 1 เลือกประเภทของขยะรีไซเคิลที่ต้องการขาย */}
        <StepComponent
          stepNumber={1}
          title={"เลือกประเภทของขยะรีไซเคิลที่ต้องการขาย"}
        >
          <RecycleTypeSelector wasteCollections={wasteCollections} />
        </StepComponent>

        {/* step 2 เลือกวันที่และรอบที่ต้องการจอง */}
        <StepComponent stepNumber={2} title={"เลือกวันที่และรอบที่ต้องการจอง"}>
          <DateComponent />
        </StepComponent>

        {/* step 3 กรอกข้อมูลส่วนตัว */}
        <StepComponent stepNumber={3} title={"ข้อมูลส่วนตัว"}>
          <PersonalComponent />
        </StepComponent>

        {/* step 4 เลือกที่อยู่ */}
        <StepComponent stepNumber={4} title={"เลือกที่อยู่"}>
          <AddressSelector/>
        </StepComponent>

        {/* ปุ่มยืนยัน */}
        <div className="flex justify-center m-2.5 p-2.5">
          <button
            className="w-[110px] px-4 py-2.5 bg-[#B9FF66] text-black font-medium rounded-lg shadow-md hover:bg-[#a7f054] focus:outline-none focus:ring-2 focus:ring-[#B9FF66]/60 transition-all duration-200"
            type="submit"
            onClick={()=> setIsOpen(true)}
          >
            ถัดไป
          </button>
        </div>
      </div>

      <Footer />
      <ConfirmModal isOpen={isOpen} onClose={()=> setIsOpen(false)} />
    </div>
  );
};

export default Reserve;
