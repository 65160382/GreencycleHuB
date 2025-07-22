import React from "react";

const Submitdata = ({ image, weight }) => {
  const handleSubmit = () => {
    console.log("image:", image);
    // แปลงน้ำหนักจาก string เป็น decimal
    const weightDecimal = parseFloat(weight);
    console.log("weight:", weightDecimal);
  };

  // เรียกใช้ api ที่อัพโหลดรูปภาพไปยัง cloudinary

  // เรียกใช้ api ที่อัพเดตตาราง waste_collection (image -->เป็น public url ใน cloudinary , wasteType , weight , cus_id = ?)

  return (
    <div className="flex justify-center items-cemter m-2.5 p-2.5">
      {weight ? (
        <button
          type="submit"
          className="w-[100px] px-4 py-2.5 bg-[#B9FF66] text-black font-medium rounded-xl shadow-md hover:bg-[#a7f054] focus:outline-none focus:ring-2 focus:ring-[#B9FF66]/60 transition-all duration-200"
          onClick={handleSubmit}
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
