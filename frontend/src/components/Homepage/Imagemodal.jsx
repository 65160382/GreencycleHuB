import { IoCloseCircle } from "react-icons/io5";
import { Volume2, Camera, X } from "lucide-react";
import Uploadfile from "./Uploadfile";
import { Uploadphoto } from "./Uploadphoto";
import { useEffect, useState } from "react";

const Imagemodal = ({ isOpen, onClose }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      deleteFileSelect(); // ลบรูปเมื่อปิด modal
    }
  }, [isOpen]);

  const handleFileSelect = (file) => {
    if (file) {
      setImage({
        file,
        previewUrl: URL.createObjectURL(file), //สร้าง object url image ขึ้นมาโดยส่งค่า parameter เข้าไป
      });
    }
  };

  const deleteFileSelect = async () => {
    setImage(null);
    console.log("ลบภาพที่เลือกแล้ว!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 p-4 pt-16 overflow-y-auto">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl text-center">
            สแกนรูปภาพขยะรีไซเคิล
          </h1>
          <IoCloseCircle className="w-9 h-9 cursor-pointer" onClick={onClose} />
        </div>

        {/* ส่วน progress bar */}
        <div className="p-2.5">
          <div className="mt-4 overflow-hidden rounded-full bg-gray-200">
            <div className="h-2 w-1/3 rounded-full bg-[#349A2D]"></div>
          </div>
          <div className="flex flex-row text-center items-center justify-center gap-2.5 p-5">
            <p className="px-2.5 py-2 rounded-2xl bg-[#E9FFC7] text-[#349A2D]">
              อัปโหลดรูปภาพ
            </p>
            <p className="px-2.5 py-2 rounded-2xl bg-[#F3F3F3] text-[#353637]">
              ตรวจสอบข้อมูล
            </p>
            <p className="px-2.5 py-2 rounded-2xl bg-[#F3F3F3] text-[#353637]">
              เสร็จสิ้น
            </p>
          </div>
        </div>

        {/* ส่วนคำแนะนำ */}
        <div className="flex flex-row gap-2.5 justify-center items-center border p-2.5 rounded-xl border-[#FFEAA7] bg-[#FFF3CD] shadow-sm">
          <Volume2 className="w-5 text-[#856404]" />
          <p className="text-[#856404] ">
            คำแนะนำ : กรุณาถ่ายรูปขยะ 1 ชิ้น เพื่อให้ระบบวิเคราะห์ประเภท
            จากนั้นกรอกจำนวนขยะที่มีทั้งหมดเพื่อยืนยันจำนวน{" "}
          </p>
        </div>

        {/* //ส่วนเพิ่มรูปภาพ */}
        <div className="mt-5 mb-2 font-medium">
          <h1 className="mb-2.5">
            อัปโหลดรูปขยะ 1 ชิ้น (สำหรับวิเคราะห์ประเภทของขยะ)
          </h1>
          <label
            htmlFor="File"
            className="flex flex-col items-center rounded border border-gray-300 p-4 text-gray-900 shadow-sm sm:p-6 cursor-pointer"
          >
            <Camera className="w-7 h-7" />
            <span className="mt-2 text-base">ลากรูปภาพมาวางที่นี่ หรือ</span>

            {/* ปุ่มเพิ่มไฟล์ */}
            <span className="mt-2 inline-block rounded-2xl border bg-[#f3f3f3] px-3 py-1.5 text-center text-xs font-medium text-gray-700 shadow-sm hover:bg-[#D2FF95] hover:border-[#B9FF66]">
              เลือกไฟล์
            </span>
            <Uploadfile onFileSelect={handleFileSelect} />
          </label>
        </div>

        {/* หมายเหตุใต้รูป */}
        <div className="">
          <p className="text-base">
            <strong>หมายเหตุ : </strong> หมวดหมู่ของขยะที่สามารถตรวจจับได้
            ได้แก่ Plastic PET, Plastic HDPE, Can aluminuim, Card Box, Bottle
            glass
          </p>

          {/* preview แสดงรูปภาพที่อัปโหลดเข้ามา */}
          <div
            id="preview"
            className="relative flex justify-center items-center w-auto pt-2.5 pb-2.5"
          >
            {image && (
              <div className="relative">
                <img
                  src={image.previewUrl}
                  alt="preview"
                  className="w-64 h-auto object-contain rounded shadow"
                />
                <button
                  type="button"
                  onClick={deleteFileSelect}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full  hover:bg-red-700"
                >
                  <X className="p-[1px]" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ปุ่มอัปโหลดไฟล์ */}
        <div className="flex justify-center">
          <Uploadphoto />
        </div>
      </div>
    </div>
  );
};

export default Imagemodal;
