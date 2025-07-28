import React from "react";

const DateComponent = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="font-medium">วันที่จอง</label>
        <input
          type="date"
          placeholder="เลือกวันที่"
          className="border border-[#D4D7E3] rounded-lg p-2 cursor-pointer"
        />

        <label>รอบที่ต้องการจอง</label>
        <select className="border border-[#D4D7E3] rounded-lg p-2 cursor-pointer">
          <option value="">เลือกรอบที่ต้องการ</option>
          <option value="9.00-12.00">9.00-12.00</option>
          <option value="13.00-17.00">13.00-17.00</option>
        </select>
      </div>
    </>
  );
};

export default DateComponent;
