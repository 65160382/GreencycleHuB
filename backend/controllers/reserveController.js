const Reserve = require("../models/reserveModal");
const ReserveDetail = require("../models/reserveDetailModel");

exports.createReserve = async (req, res) => {
  try {
    const cusId = req.user.cus_id;
    const { bookingDate, timeslot, amount, addrId} = req.body;

    if(! bookingDate || !timeslot || !amount || !addrId){
        
    } 

    //create res_code หรือหมายเลขคำสั่งซื้อ
    const now = new Date();
    const date = now.toISOString().slice(0,10).replace(/-/g, ''); //แปลงวันเวลาเป็น string แบบ iso , ตัดเอาเฉพาะ "year/mounth/date" (10 ตัวแรก), dash ใน regex แล้วตามด้วย flag g) เพื่อแทนที่ ทุกเครื่องหมาย -
    const random = Math.floor(1000 + Math.random()*9000); // สร้างเลขสุ่ม 4 หลักจาก 1000 ถึง 9999
    const resCode = `RES${date}${random}`
    // console.log("test resCode:",resCode);

    // insert reserve table!
    const resId = await Reserve.insertReserve(resCode,bookingDate,timeslot,amount,cusId,addrId);
    if(!resId){
        res.status(500).json({ message: "เกิดข้อผิดพลาดไม่มี reserveId!"})
    }
    //insert reservedetail table!

    // return result
  } catch (error) {
    console.error("เกิดข้อผิดพลาดไม่สามารถเพิ่มข้อมูลลงฐานข้อมูลได้", error);
    res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดไม่สามารถเพิ่มข้อมูลลงฐานข้อมูลได้" });
  }
};
