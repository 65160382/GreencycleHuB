import Header from "../components/Core-UI/Header";
import Footer from "../components/Core-UI/Footer";
import Imagenav from "../components/Homepage/Imagenav";
import WasteDashboard from "../components/Homepage/WasteDashboard";
import StepGuides from "../components/Guestpage/StepGuides";
import { useState, useEffect } from "react";

export default function Home() {
  const [wasteCollections, setWasteCollections] = useState(null);

  // ดึงข้อมูลขยะที่ผู้ใช้สะสมเอาไว้มาแสดงผล
  useEffect(() => {
    const fetchWasteCollection = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/api/waste-collections`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data:", data);

          // map ชื่อประเภทให้ตรงกับ key ที่ใช้ใน dashboard
          const mapName = {
            "Plastic-PET": "PET",
            "Plastic-HDPE": "HDPE",
            "Bottle-Glass": "Glass",
            "Card-Box": "Box",
            "Can-Aluminium": "Can",
          };

          // เตรียม object เปล่า
          const mapped = { PET: 0, HDPE: 0, Glass: 0, Box: 0, Can: 0 };

          // วน loop จาก data.result
          data.result.forEach((item) => {
            const key = mapName[item.rec_type_name] || null;
            if (key) mapped[key] = parseFloat(item.total_weight) || 0;
          });

          setWasteCollections(mapped);
        } else {
          console.error("ไม่สามารถดึงข้อมูลได้:", response.status);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดกับเซิร์ฟเวอร์!", error);
      }
    };

    fetchWasteCollection();
  }, []);

  return (
    <div>
      <Header />
      <Imagenav />

      <div className="p-6">
        <WasteDashboard wasteCollections={wasteCollections} />
      </div>

      <StepGuides />
      <Footer />
    </div>
  );
}
