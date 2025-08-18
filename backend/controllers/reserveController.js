const Reserve = require("../models/reserveModal");
const ReserveDetail = require("../models/reserveDetailModel");
const WasteCollection = require("../models/wasteCollectionModel");

// ฟังก์ชันสำหรับสร้างรหัสการจอง
const createReserveCode = () => {
  const now = new Date();
  const date = now.toISOString().slice(0,10).replace(/-/g, ''); //แปลงวันเวลาเป็น string แบบ iso , ตัดเอาเฉพาะ "year/mounth/date" (10 ตัวแรก), dash ใน regex แล้วตามด้วย flag g) เพื่อแทนที่ ทุกเครื่องหมาย -
  const random = Math.floor(1000 + Math.random()*9000); // สร้างเลขสุ่ม 4 หลักจาก 1000 ถึง 9999
  const resCode = `RES${date}${random}`
  return resCode;
};

// ฟังก์ชั่นสำหรับสร้างการจอง
exports.createReserve = async (req, res) => {
  try {
    const cusId = req.user.cus_id;
    const { bookingDate, timeslot, amount, weight, addrId, recTypeIds} = req.body;

    // ตรวจสอบ input ทีละฟิลด์
    if (!bookingDate) return res.status(400).json({ message: { error: "ไม่ได้เลือกวันที่จอง" }});
    if (!timeslot) return res.status(400).json({ message: { error: "ไม่ได้เลือกรอบที่จอง" }});
    if (amount == null) return res.status(400).json({ message: { error: "ไม่มีข้อมูลจำนวนเงินทั้งหมด" }});
    if (weight == null) return res.status(400).json({ message: { error: "ไม่มีข้อมูลจำนวนน้ำหนักทั้งหมด" }});
    if (!addrId) return res.status(400).json({ message: { error: "ไม่มีข้อมูลที่อยู่" }});
    if (!recTypeIds) return res.status(400).json({ message: { error: "ไม่มีประเภทขยะ" }});

    //create res_code หรือหมายเลขคำสั่งซื้อ
    const resCode = createReserveCode();
    // console.log("test resCode:",resCode);
    
    // insert reserve table!
    const resId = await Reserve.insertReserve(resCode,bookingDate,timeslot,amount,weight,cusId,addrId);
    if(!resId){
      return res.status(400).json({ message: "เกิดข้อผิดพลาดไม่มี reserveId!"});
    }
    // console.log("reserveId:",resId)

    //insert reservedetail table!
    // ค้นหาตาม id ของประเภทขยะเพื่อหาขยะแต่ละประเภทที่สะสมไว้ในแต่ละครั้ง
    const wasteRows = await WasteCollection.findWasteCollectionById(recTypeIds,cusId);
    // console.log("result:",wasteId);

    // สร้าง array ของค่า [resId, waste_collect_id] สำหรับแต่ละประเภทขยะ เพื่อเตรียม insert ลงใน reserve_detail
    const values = wasteRows.map(row => [resId, row.waste_collect_id]); 
    const result = await ReserveDetail.insertReserveDetail(values);
    
    if(result){
      return res.status(200).json({ message: "บันทึกข้อมูลการจองสำเร็จ!", resId: resId});
    }else{
      return res.status(500).json({ message: "เกิดข้อผิดพลาดไม่สามารถอัปโหลดข้อมูลได้"});
    }

    // return result
  } catch (error) {
    console.error("เกิดข้อผิดพลาดไม่สามารถเพิ่มข้อมูลลงฐานข้อมูลได้", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดไม่สามารถเพิ่มข้อมูลลงฐานข้อมูลได้" });
  }
};

exports.getReserveById = async (req,res) =>{
  try {
    const resId = req.params.id;
    const cusId = req.user.cus_id;

    // ตรวจสอบว่ามีการส่ง resId มาหรือไม่
    if (!resId) {
      return res.status(400).json({ message: "ไม่มีข้อมูลรหัสการจอง" });
    }

    // Promise.all() ใช้สำหรับรอผลลัพธ์จากทั้งสองโมเดล
    const [reserveResult, reserveDetailResult] = await Promise.all([Reserve.getReserveById(cusId, resId), ReserveDetail.getReserveDetailById(resId)]);
    // destructure ผลลัพธ์จากทั้งสองโมเดล
    const result = { reserveResult, reserveDetailResult }; 

    if(reserveResult && reserveDetailResult){
      res.status(200).json({ result });
    }else{
      res.status(404).json({ message: "ไม่พบข้อมูลการจอง!" });
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลการจอง", error);
  }
}
