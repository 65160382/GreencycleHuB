import Header from "../components/Core-UI/Header";
import Footer from "../components/Core-UI/Footer";
import StepComponent from "../components/Reservepage/StepComponent";
import PersonalComponent from "../components/Reservepage/PersonalComponent";
import DateComponent from "../components/Reservepage/DateComponent";
import RecycleTypeSelector from "../components/Reservepage/RecycleTypeSelector";
import AddressSelector from "../components/Reservepage/AddressSelector";
import ConfirmModal from "../components/Reservepage/ConfirmModal";
import { ReserveContext } from "../context/ReserveContext";
import { Breadcrumb } from "../components/Core-UI/Breadcrumb";
import { useState, useEffect, useContext } from "react";
import Spinloading from "../components/Core-UI/Spinloading";
import { Link } from "react-router-dom";

const Reserve = () => {
  const [wasteCollections, setWasteCollections] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedWaste, selectedDate } = useContext(ReserveContext);

  useEffect(() => {
    fetchWasteCollection();
  }, []);

  //ดึงข้อมูลขยะที่ผู้ใช้สะสมเอาไว้มาแสดงผล http://localhost:3000/api/waste-collections
  const fetchWasteCollection = async () => {
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/waste-collections`, {
        method: "GET",
        credentials: "include", // ส่ง cookies ไปด้วย
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("data:", data);
        setWasteCollections(data.result); // destructure จากส่งทั้ง object เป็นส่งค่า array
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!", error);
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  return (
    <div className="bg-[#f3f3f3] min-h-screen flex flex-col">
      <Header />
      {isLoading && <Spinloading />}

      <div className="flex-1 flex flex-col px-10 py-4">
        <div className="p-2.5">
          <section className="flex m-2.5 font-medium">
            <Breadcrumb />
          </section>
          <h1 className="font-bold m-2.5">จองคิวรับซื้อขยะ</h1>
        </div>

        {/* เงื่อนไขตรวจสอบว่ามีขยะหรือไม่ */}
        {wasteCollections.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center py-20 text-gray-600">
            <div className="bg-white shadow-sm rounded-xl p-8 max-w-md">
              <p className="text-xl font-semibold mb-2">
                ยังไม่มีขยะรีไซเคิลที่พร้อมขาย 
              </p>
              <p className="text-sm text-gray-500 mb-5">
                กรุณาบันทึกขยะสะสมก่อนทำการจองคิวรับซื้อขยะ
              </p>
              <div className="mt-6 text-center  sm:flex-row sm:justify-between">
              <span className="">
                กลับไปที่หน้า
                <Link to={"/home"} className="pl-2 text-[#349A2D] font-semibold hover:underline">
                  หน้าหลัก
                </Link>
              </span>
            </div>
            </div>
          </div>
        ) : (
          <>
            {/* มีขยะ -> แสดงส่วนจองปกติ */}
            <StepComponent
              stepNumber={1}
              title={"เลือกประเภทของขยะรีไซเคิลที่ต้องการขาย"}
            >
              <RecycleTypeSelector wasteCollections={wasteCollections} />
            </StepComponent>

            <StepComponent
              stepNumber={2}
              title={"เลือกวันที่และรอบที่ต้องการจอง"}
            >
              <DateComponent />
            </StepComponent>

            <StepComponent stepNumber={3} title={"ข้อมูลส่วนตัว"}>
              <PersonalComponent />
            </StepComponent>

            <StepComponent stepNumber={4} title={"เลือกที่อยู่"}>
              <AddressSelector />
            </StepComponent>

            <div className="flex justify-center m-2.5 p-2.5">
              {selectedWaste && selectedDate ? (
                <button
                  className="w-[110px] px-4 py-2.5 bg-[#B9FF66] text-black font-medium rounded-lg shadow-md hover:bg-[#a7f054] focus:outline-none focus:ring-2 focus:ring-[#B9FF66]/60 transition-all duration-200"
                  type="submit"
                  onClick={() => setIsOpen(true)}
                >
                  ถัดไป
                </button>
              ) : (
                <button
                  className="w-[110px] px-4 py-2.5 bg-[#f3f3f3] text-black font-medium rounded-lg shadow-md"
                  disabled
                >
                  ถัดไป
                </button>
              )}
            </div>

            <ConfirmModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Reserve;
