import Header from "../components/Core-UI/Header";
import Footer from "../components/Core-UI/Footer";
import Imagenav from "../components/Homepage/Imagenav";
import Typewastenav from "../components/Homepage/typewastenav";
import Amountnav from "../components/Homepage/Amountnav";
import { useState, useEffect } from "react";

export default function Home({ isLoggedIn }) {
  // กำหนด state เพื่อไว้เปลี่ยนค่าของจำนวนขยะที่สะสมในระบบ
  const [waste, setWaste] = useState(0);

  // ดึงข้อมูล api ของจำนวนขยะที่ผู้ใช้คนนี้สะสมไว้ใน database
  // http://localhost:3000/api/getwaste
  const getWaste = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getwaste", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        setWaste(response); //
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!", error);
    }
  };

  // เรียกใช้ useEffect เพื่อให้อัพเดตข้อมูลทุกครั้งที่มีการโหลดหน้าใหม่
  useEffect(() => {
    getWaste();
  }, [waste]);

  //ส่งข้อมูลไปให้ component amountnav แสดงผลต่อ

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />

      {/* ส่วนของแสดงสไลด์โชว์รูปภาพพร้อมมีข้อความแนะนำ */}
      <Imagenav />
      {/* ส่วนแสดงประเภทของขยะรีไซเคิ้ลที่สามารถ filter ได้ */}
      {/* <Typewastenav /> */}
      {/* ส่วนแสดงจำนวนขยะที่สะสมไว้ในระบบผ่านการแสกน */}
      {/* <Amountnav /> */}

      {/* <Footer waste={waste} /> */}
    </div>
  );
}
