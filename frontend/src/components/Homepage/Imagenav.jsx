import Imagemodal from "../Imagemodalpage/Imagemodal";
import { TbZoomScan } from "react-icons/tb";
import { useState } from "react";
//    {/* ส่วนของแสดงสไลด์โชว์รูปภาพพร้อมมีข้อความแนะนำ */}
const Imagenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-full h-[360px]">
      {/* รูปภาพพื้นหลัง */}
      <img
        src="home-separate.jpg"
        alt="recycle-image"
        className="w-full h-full object-cover"
      />

      {/* overlay ดำโปร่ง */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* เนื้อหาวางทับบนรูป */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">สวัสดี คุณ :</h1>
          <p className="text-base md:text-lg">
            คุณยังไม่มีจำนวนขยะสะสมอยู่ในระบบ <br />
            สามารถคลิกที่ปุ่ม "สแกนขยะ" เพื่อเริ่มสะสมขยะเลย
          </p>
        </div>

        <div onClick={() => setIsOpen(true)} className="flex justify-center items-center gap-2 mt-4 bg-green-500 px-5 py-2 rounded-full text-white font-semibold shadow hover:bg-green-600 transition cursor-pointer">

          <TbZoomScan className="w-7 h-7"/>
          <button type="button">สแกนขยะ</button>
        </div>

        <div className="mt-6 max-w-xl">
          <p className="text-sm md:text-base text-gray-200">
            <strong>คำแนะนำ:</strong> ผู้ใช้สามารถทำการสแกนภาพของวัตถุรีไซเคิล
            เพื่อเพิ่มข้อมูลลงในระบบ เมื่อสแกนเสร็จสิ้น
            ระบบจะแสดงจำนวนประเภทของขยะรีไซเคิลที่สะสมไว้
          </p>
        </div>
      </div>
      {/* เรียกใช้งาน modal */}
      <Imagemodal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Imagenav;
