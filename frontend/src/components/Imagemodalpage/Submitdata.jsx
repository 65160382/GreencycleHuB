import React from "react";

const Submitdata = ({ image, weight }) => {
  // เรียกใช้ api ที่อัพโหลดรูปภาพไปยัง cloudinary
  const handleImagetoCloudinary = async () => {
    try {
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
        console.log("result:", result);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดกับเซิร์ฟเวอร์", error);
    }
  };

  // เรียกใช้ api ที่อัพเดตตาราง waste_collection (image -->เป็น public url ใน cloudinary , wasteType , weight , cus_id = ?)
  // แปลงน้ำหนักจาก string เป็น decimal
  // const weightDecimal = parseFloat(weight);

  return (
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
  );
};

export default Submitdata;
