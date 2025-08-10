const Reserve = require("../models/reserveModal");
const ReserveDetail = require("../models/reserveDetailModel");
const WasteCollection = require("../models/wasteCollectionModel");

exports.createReserve = async (req, res) => {
  try {
    const cusId = req.user.cus_id;
    const { bookingDate, timeslot, amount, addrId, recTypeId} = req.body;

    // ตรวจสอบ input ทีละฟิลด์
    if (!bookingDate) return res.status(500).json({ message: { error: "ไม่ได้เลือกวันที่จอง" }});
    if (!timeslot) return res.status(500).json({ message: { error: "ไม่ได้เลือกรอบที่จอง" }});
    if (!amount) return res.status(500).json({ message: { error: "ไม่มีข้อมูลจำนวนเงินทั้งหมด" }});
    if (!addrId) return res.status(500).json({ message: { error: "ไม่มีข้อมูลที่อยู่" }});
    if (!recTypeId) return res.status(500).json({ message: { error: "ไม่มีประเภทขยะ" }});

    //create res_code หรือหมายเลขคำสั่งซื้อ
    const now = new Date();
    const date = now.toISOString().slice(0,10).replace(/-/g, ''); //แปลงวันเวลาเป็น string แบบ iso , ตัดเอาเฉพาะ "year/mounth/date" (10 ตัวแรก), dash ใน regex แล้วตามด้วย flag g) เพื่อแทนที่ ทุกเครื่องหมาย -
    const random = Math.floor(1000 + Math.random()*9000); // สร้างเลขสุ่ม 4 หลักจาก 1000 ถึง 9999
    const resCode = `RES${date}${random}`
    // console.log("test resCode:",resCode);

    // insert reserve table!
    const resId = await Reserve.insertReserve(resCode,bookingDate,timeslot,amount,cusId,addrId);
    if(!resId){
      return res.status(500).json({ message: "เกิดข้อผิดพลาดไม่มี reserveId!"});
    }
    // console.log("reserveId:",resId)

    //insert reservedetail table!
    // ค้นหาตาม id ของประเภทขยะเพื่อหาขยะแต่ละประเภทที่สะสมไว้ในแต่ละครั้ง
    const wasteRows = await WasteCollection.findWasteCollectionById(recTypeId,cusId);
    // console.log("result:",wasteId);

    const values = wasteRows.map(row => [resId, row.waste_collect_id]);
    const result = await ReserveDetail.insertReserveDetail(values);
    
    if(result){
      return res.status(200).json({ message: "บันทึกข้อมูลการจองสำเร็จ!"});
    }else{
      return res.status(500).json({ message: "เกิดข้อผิดพลาดไม่สามารถอัปโหลดข้อมูลได้"});
    }

    // return result
  } catch (error) {
    console.error("เกิดข้อผิดพลาดไม่สามารถเพิ่มข้อมูลลงฐานข้อมูลได้", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดไม่สามารถเพิ่มข้อมูลลงฐานข้อมูลได้" });
  }
};
