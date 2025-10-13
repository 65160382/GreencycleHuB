import { useEffect, useState } from "react";
import { Volume2, Camera, X } from "lucide-react";
import Modal from "../Core-UI/Modal";
import Uploadfile from "./Uploadfile";
import { Uploadphoto } from "./Uploadphoto";
import Submitdata from "./Submitdata";
// import { IoCloseCircle } from "react-icons/io5";

const Imagemodal = ({ isOpen, onClose }) => {
  const [image, setImage] = useState(null);
  const [wasteType, setWasteType] = useState("");
  const [weight, setWeight] = useState("");
  const [predictResult, setPredictResult] = useState(null);
  const [progressStep, setProgressStep] = useState(30); // เริ่มต้น 30% ตอนอัปโหลด

  // เคลียร์ข้อมูลเมื่อ modal ปิด
  useEffect(() => {
    if (!isOpen) {
      setImage(null);
      setWasteType("");
      setPredictResult(null);
      setWeight("");
      setProgressStep(30);
    }
  }, [isOpen]);

  const handleFileSelect = (file) => {
    if (file) {
      setImage({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  const deleteFileSelect = () => {
    setImage(null);
    setWeight("");
    setPredictResult(null);
  };

  //progressbar
  // เมื่อวิเคราะห์เสร็จให้ขยับ progress ไป 70%
  useEffect(() => {
    if (predictResult) {
      setProgressStep(70);
    }
  }, [predictResult]);

  // เมื่อบันทึกสำเร็จให้ progress เต็มและปิด modal
  const handleSuccess = () => {
    setProgressStep(100);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="สแกนรูปภาพขยะรีไซเคิล"
      widthClass="max-w-4xl"
    >
      <div className="p-2.5 space-y-4 max-h-[80vh] overflow-y-auto">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${progressStep}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 font-medium">
            <span>อัปโหลดรูปภาพ</span>
            <span>ตรวจสอบข้อมูล</span>
            <span>เสร็จสิ้น</span>
          </div>
        </div>

        {/* ส่วนคำแนะนำ */}
        <div className="flex flex-row gap-2.5 border p-3 rounded-xl border-[#FFEAA7] bg-[#FFF3CD] shadow-sm">
          <Volume2 className="w-5 text-[#856404]" />
          <p className="text-[#856404] text-sm">
            <strong>คำแนะนำ:</strong> ถ่ายรูปขยะ 1
            ชิ้นเพื่อให้ระบบวิเคราะห์ประเภท
            จากนั้นกรอกน้ำหนักรวมของขยะทั้งหมดเพื่อยืนยันจำนวน
          </p>
        </div>

        {/* ส่วนอัปโหลดรูป */}
        <div className="mt-3 font-medium">
          <h1 className="mb-2.5">
            อัปโหลดรูปขยะ 1 ชิ้น (สำหรับวิเคราะห์ประเภทของขยะ)
          </h1>
          <label
            htmlFor="File"
            className="flex flex-col items-center rounded border border-gray-300 p-4 text-gray-900 shadow-sm sm:p-6 cursor-pointer hover:border-[#B9FF66]"
          >
            <Camera className="w-7 h-7" />
            <span className="mt-2 text-base">ลากรูปภาพมาวางที่นี่ หรือ</span>

            <span className="mt-2 inline-block rounded-2xl border bg-[#f3f3f3] px-3 py-1.5 text-center text-xs font-medium text-gray-700 shadow-sm hover:bg-[#D2FF95] hover:border-[#B9FF66]">
              เลือกไฟล์
            </span>
            <Uploadfile onFileSelect={handleFileSelect} />
          </label>
        </div>

        {/* หมายเหตุ */}
        <div className="">
          <p className="text-sm text-gray-700 mt-2">
            <strong>หมายเหตุ:</strong> หมวดหมู่ขยะที่สามารถตรวจจับได้ ได้แก่
            PET, HDPE, กระป๋องอะลูมิเนียม, กล่องกระดาษ, ขวดแก้ว
          </p>

          {/* preview รูปภาพ */}
          <div className="relative flex justify-center items-center mt-3">
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
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-[3px] hover:bg-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ปุ่มอัปโหลดไปวิเคราะห์ */}
        {!predictResult && (
          <div className="flex justify-center mt-4">
            <Uploadphoto image={image} setPredictResult={setPredictResult} />
          </div>
        )}

        {/* ผลลัพธ์การวิเคราะห์ */}
        {predictResult && (
          <>
            {/* แสดงผลลัพธ์การวิเคราะห์ */}
            <section className="mt-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-400 rounded-2xl shadow-sm p-5 flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-md mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-xl font-bold text-green-800 mb-1">
                ผลลัพธ์การวิเคราะห์
              </h2>
              <p className="text-xl font-extrabold text-green-700 tracking-wide">
                {predictResult.label}
              </p>

              <div className="mt-3 flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full border border-green-300 shadow-inner">
                <p className="text-sm text-gray-700 font-medium">
                  ความน่าจะเป็นการตรวจจับ:
                </p>
                <span className="text-base font-semibold text-green-700">
                  {predictResult.probabilities}%
                </span>
              </div>
            </section>

            <div className="flex flex-row gap-2.5 border p-3 mt-4 rounded-xl border-[#FFEAA7] bg-[#FFF3CD] shadow-sm">
              <Volume2 className="w-5 text-[#856404]" />
              <p className="text-[#856404] text-sm">
                <strong>คำแนะนำ:</strong>{" "}
                กรุณาชั่งน้ำหนักและกรอกน้ำหนักรวมของขยะรีไซเคิลชนิดนี้
              </p>
            </div>

            {/* ฟอร์มกรอกน้ำหนัก */}
            <div className="flex flex-col sm:flex-row gap-2 mt-3 mb-2 items-start sm:items-center font-medium">
              {/* The label/text for total weight */}
              <p className="flex shrink-0">จำนวนน้ำหนักขยะรวมทั้งหมดที่คุณมี</p>

              {/* The input field and the unit 'kg' group */}
              <div className="flex flex-row gap-2 items-center w-full sm:w-auto">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="border border-[#D4D7E3] bg-[#F7FBFF] text-[#353637] rounded-xl px-2.5 py-2 w-full sm:w-[200px]"
                  placeholder="กรอกน้ำหนัก"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <p className="flex shrink-0">กิโลกรัม</p>
              </div>
            </div>

            {/* ปุ่มบันทึก */}
            <div className="flex justify-center mt-4">
              <Submitdata
                image={image}
                weight={weight}
                wasteType={predictResult.label}
                onSuccess={handleSuccess}
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default Imagemodal;
