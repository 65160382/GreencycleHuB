const Timetable = require("../models/timetableModel");
const Timetabledetail = require("../models/timetabledetailModel");
const Reserve = require("../models/reserveModel");
//test refactor transaction
const pool = require("../config/database");
require("dotenv").config();

exports.createTimetable = async (req, res) => {
  // เริ่มต้น transaction
  const con = await pool.getConnection();
  try {
    await con.beginTransaction();
    const { assigndate, assigntimeslot, driveId, reserve } = req.body;

    // ตรวจสอบ input
    if (
      !assigndate ||
      !assigntimeslot ||
      !driveId ||
      !reserve ||
      !Array.isArray(reserve)
    ) {
      return res
        .status(400)
        .json({ message: { error: "ข้อมูลไม่ครบถ้วนหรือผิดรูปแบบ" } });
    }

    // debug value: [ { index: 1, resId: 2 }, { index: 2, resId: 3 } ]
    // console.log("debug value:", reserve); // ต้องได้ค่าเป็น  array object ของแต่ละรายการจอง

    // เพิ่มข้อมูลลง timetable
    const timetableId = await Timetable.insertTimetable(
      con,
      assigndate,
      assigntimeslot,
      driveId
    );

    if (!timetableId) {
      return res
        .status(400)
        .json({ message: "เกิดข้อผิดพลาดไม่มี timetableid!" });
    }

    // console.log("debug:", data);

    // เตรียม values สำหรับ bulk insert
    const values = reserve.map((item) => [
      timetableId,
      item.index,
      item.resId,
      null,
      null,
    ]);
    // console.log("debug data bluk insert:",values)

    // เพิ่มข้อมูลง timetabledetail
    await Timetabledetail.insertTimetabledetail(con, values);

    // เตรียม ข้อมูล Resid สำหรับ update status reserve
    const update = reserve.map((item) => ["pending", item.resId]);
    // console.log("debug update value:",update);

    // อัปเดตสถานะรายการจอง ให้เป็น Pending
    await Reserve.updateReserve(con, update);

    // ยืนยัน transaction
    const result = await con.commit();

    if (result) {
      res.status(200).json({ message: "หมอบหมายคนขับสำเร็จ!" });
    }
  } catch (error) {
    await con.rollback(); // rollback ข้อมูลเวลาเกิดขึ้น
    console.log("เกิดข้อผิดพลาดกับเซิร์ฟเวอร์!", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  } finally {
    await con.release(); //ปิด connection
  }
};
