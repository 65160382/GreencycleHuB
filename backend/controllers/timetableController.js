const Timetable = require("../models/timetableModel");
const Timetabledetail = require("../models/timetabledetailModel");
const Reserve = require("../models/reserveModel");
//test refactor transaction
const pool = require("../config/database");
//test use nostramap api
const { sortByDistance } = require("../utils/nostramapUtils");
require("dotenv").config();


exports.createTimetable = async (req, res) => {
  // เริ่มต้น transaction
  const con = await pool.getConnection();
  try {
    await con.beginTransaction();
    const { assigndate, assigntimeslot, driveId, resId } = req.body;

    // ตรวจสอบ input
    if (
      !assigndate ||
      !assigntimeslot ||
      !driveId ||
      !resId ||
      !Array.isArray(resId)
    ) {
      return res.status(400).json({ message: { error: "ข้อมูลไม่ครบถ้วนหรือผิดรูปแบบ" } });
    }

    // เพิ่มข้อมูลลง timetable
    const timetaleId = await Timetable.insertTimetable(
      con,
      assigndate,
      assigntimeslot,
      driveId
    );

    if (!timetaleId) {
      return res.status(400).json({ message: "เกิดข้อผิดพลาดไม่มี timetableid!" });
    }

    // <---- เพิ่มเรียกใช้ api nostramap service ที่ค้นหาเส้นทางที่ใกล้ที่สุด
   
    // เตรียม values สำหรับ bulk insert
    const values = resId.map((id) => [timetaleId, id, null, null]);

    // เพิ่มข้อมูลง timetabledetail
    const result = await Timetabledetail.insertTimetabledetail(con, values);

    // เตรียม ข้อมูล Resid สำหรับ update status reserve
    const update = resId.map((id) => ["pending", id]);

    // อัปเดตสถานะรายการจอง ให้เป็น Pending
    await Reserve.updateReserve(con, update);

    // ยืนยัน transaction
    await con.commit();

    if (result) {
      res.status(200).json({ message: "หมอบหมายคนขับสำเร็จ!" });
    }
  } catch (error) {
    await con.rollback(); // rollback ข้อมูลเวลาเกิดขึ้น
    console.log("เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล", error);
  } finally {
    await con.release(); //ปิด connection
  }
};


