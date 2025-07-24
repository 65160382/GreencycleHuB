import { useState } from "react";
import Loading from "../Core-UI/Loading";

export const Uploadphoto = ({ image, setPredictResult }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData(); //ใช้สำหรับสร้าง form data เหมือนกับข้อมูลที่ถูกส่งจาก <form>
      formData.append("image", image.file); //image.file คือ ค่า (value) ที่จะส่งไป ซึ่งเป็น File object ที่ได้จาก input type="file"

      //ส่งข้อมูลไปยัง api
      const response = await fetch("http://localhost:3000/api/predict", {
        method: "POST",
        body: formData, //ส่งข้อมูลรูปภาพไปยัง api
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data:", data);
        setPredictResult(data); //เก็บผลลัพธ์การวิเคราะห์ประเภทขยะ
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {image ? (
        <button
          type="submit"
          className="w-[140px] px-4 py-2.5 bg-[#B9FF66] text-black font-medium rounded-xl shadow-md hover:bg-[#a7f054] focus:outline-none focus:ring-2 focus:ring-[#B9FF66]/60 transition-all duration-200"
          onClick={handleUpload}
        >
          วิเคราะห์รูปภาพ
        </button>
      ) : (
        <button
          type="submit"
          className="w-[140px] px-4 py-2.5 bg-[#F3F3F3] text-[#353637] font-medium rounded-xl shadow-md "
          disabled={!image}
        >
          วิเคราะห์รูปภาพ
        </button>
      )}
    </>
  );
};
