import { ReserveContext } from "./ReserveContext";
import { useState } from "react";

// สร้าง Component Provider
export const ReserveProvider = ({ children }) => {
  const [selectedWaste, setSelectedWaste] = useState([]);
  const [selectedDate, setSelectedDate] = useState({date:"",timeslot:""});
  const [selectedAddress, setselectedAddress] = useState([]);

  return (
    <ReserveContext.Provider
      value={{
        selectedWaste, // เก็บค่าขยะที่เลือกจาก checkbox
        setSelectedWaste, // อัพเดตค่าขยะที่เลือก
        selectedDate, // เก็บค่าวันที่ที่เลือก จาก input date
        setSelectedDate, // อัพเดตค่าวันที่ที่เลือก
        selectedAddress, // เก็บค่าที่อยู่ที่เลือก
        setselectedAddress, // กำหนดค่าที่อยู่ที่เลือก
      }}
    >
      {children}
    </ReserveContext.Provider>
  );
};

export default ReserveProvider;
