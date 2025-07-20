import { useState } from "react";
import Loading from "../Core-UI/Loading";

export const Uploadphoto = ({ image }) => {
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
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data:", data);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      {isLoading && <Loading />}
      <button
        type="submit"
        className="border p-2.5 w-auto m-2.5 rounded-xl bg-[#B9FF66] font-medium cursor-pointer"
        onClick={handleUpload}
      >
        วิเคราะห์รูปภาพ
      </button>
    </div>
  );
};
