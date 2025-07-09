// import React from 'react'
import Header from "../components/Guestpage/Header";
import Footer from "../components/Guestpage/Footer";
import Imagenav from "../components/Homepage/Imagenav";
import Typewastenav from "../components/Homepage/typewastenav";
import Amountnav from "../components/Homepage/Amountnav";

export default function Home() {
  return (
    <div>
      <Header />
      
      {/* ส่วนของแสดงสไลด์โชว์รูปภาพพร้อมมีข้อความแนะนำ */}
      <Imagenav />
      {/* ส่วนแสดงประเภทของขยะรีไซเคิ้ลที่สามารถ filter ได้ */}
      <Typewastenav />
      {/* ส่วนแสดงจำนวนขยะที่สะสมไว้ในระบบผ่านการแสกน */}
      <Amountnav />

      <Footer />
    </div>
  );
}
