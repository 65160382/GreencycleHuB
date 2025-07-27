import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Core-UI/Loading";

const Submitdata = ({ image, weight, wasteType, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  // เรียกใช้ api ที่อัพโหลดรูปภาพไปยัง cloudinary
  const handleImagetoCloudinary = async () => {
    try {
      setIsLoading(true); // เริ่มแสดง ui loading
      const formData = new FormData();
      formData.append("image", image.file); //แปลง image เป็น object

      // http://localhost:3000/api/image
      const response = await fetch("http://localhost:3000/api/image", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        console.log("อัพโหลดรูปภาพไป cloudinary สำเร็จ!");
        submitWasteCollection(result);
      } else {
        setIsLoading(false);
        toast.error("อัพโหลดรูปภาพไม่สำเร็จ");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("เกิดข้อผิดพลาดกับเซิร์ฟเวอร์", error);
    }
  };

  // เรียกใช้ api ที่อัพเดตตาราง waste_collection image -->เป็น public url ใน cloudinary , wasteType , weight , cus_id = ?
  const submitWasteCollection = async (result) => {
    try {
      // ค่าที่ส่งมามี public_id , secure_url
      if (!result) {
        console.log("ไม่ได้มี public_id, secure_url ที่ได้จาก cloudianry");
      }

      const weightDecimal = parseFloat(weight); // แปลงน้ำหนักจาก string เป็น decimal

      // กำหนดข้อมูลที่จะส่งไว้ใน object
      const data = {
        public_id: result.public_id,
        secure_url: result.secure_url,
        waste_type: wasteType,
        weight: weightDecimal,
      };
      console.log("recheck", data);

      // http://localhost:3000/api/waste-collection
      const response = await fetch(
        "http://localhost:3000/api/waste-collection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // แปลง data ให้เป็น json แล้วส่ง
          credentials: "include",
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // ปิด modal
        onSuccess();
        toast.success("บันทึกข้อมูลสำเร็จ!");
      } else {
        toast.error("บันทึกข้อมูลไม่สำเร็จ");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดกับเซิร์ฟเวอร์", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex justify-center items-cemter m-2.5 p-2.5">
        {weight ? (
          <button
            type="submit"
            className="w-[100px] px-4 py-2.5 bg-[#B9FF66] text-black font-medium rounded-xl shadow-md hover:bg-[#a7f054] focus:outline-none focus:ring-2 focus:ring-[#B9FF66]/60 transition-all duration-200"
            onClick={handleImagetoCloudinary}
          >
            ยืนยัน
          </button>
        ) : (
          <button
            type="submit"
            disabled
            className="w-[100px] px-4 py-2.5 bg-[#F3F3F3] text-[#353637]-medium rounded-xl shadow-md "
          >
            ยืนยัน
          </button>
        )}
      </div>
    </>
  );
};

export default Submitdata;
