import { useContext, useEffect } from "react";
import { ReserveContext } from "../../context/ReserveContext";

const DateComponent = () => {
  const { selectedDate, setSelectedDate } = useContext(ReserveContext);
  // useEffect(() => {
  //   console.log("ทดสอบแสดงผลค่าวันที่ที่เลือก:", selectedDate);
  // }, [selectedDate]);
  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="font-medium">วันที่จอง</label>
        <input
          type="date"
          placeholder="เลือกวันที่"
          onChange={(e) =>
            setSelectedDate((prev) => ({ //prev คือ ค่าปัจจุบันของ state (ก่อนที่จะอัปเดต)
              ...prev, //...prev คือ การคัดลอกค่าทั้งหมด ใน array เก่ามา
              date: e.target.value,
            }))
          }
          className="border border-[#D4D7E3] rounded-lg p-2 cursor-pointer"
        />

        <label>รอบที่ต้องการจอง</label>
        <select
          onChange={(e) =>
            setSelectedDate((prev) => ({ //prev คือ ค่าปัจจุบันของ state (ก่อนที่จะอัปเดต)
              ...prev, //...prev คือ การคัดลอกค่าทั้งหมด ใน array เก่ามา
              timeslot: e.target.value,
            }))
          }
          className="border border-[#D4D7E3] rounded-lg p-2 cursor-pointer"
        >
          <option value="">เลือกรอบที่ต้องการ</option>
          <option value="9.00-12.00">9.00-12.00</option>
          <option value="13.00-17.00">13.00-17.00</option>
        </select>
      </div>
    </>
  );
};

export default DateComponent;
