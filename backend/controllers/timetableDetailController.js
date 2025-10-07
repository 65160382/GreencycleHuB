const Timetabledetail = require("../models/timetabledetailModel");
const Reserve = require("../models/reserveModel");

const pool = require("../config/database");

exports.updatestartTime = async (req, res) => {
  const con = await pool.getConnection();
  try {
    await con.beginTransaction();
    const { resId } = req.params;

    await Timetabledetail.updateTimestartByid(con, resId);
    const update = ["picking_up", resId];

    // อัพเดตสถานะเป็น picking_up
    await Reserve.updateReserve(con, update);

    await con.commit(); // ยินยัน transaction
    return res.status(200).json({ message: "อัพเดตสถานะสำเร็จ!" });

  } catch (error) {
    await con.rollback(); // rollback ข้อมูลเวลาเกิด error ขึ้น
    console.error("เกิดข้อผิดพลาดกับ Controller", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  } finally {
    await con.release();
  }
};

exports.updatearriveTime = async (req, res) => {
  const con = await pool.getConnection();
  try {
    await con.beginTransaction();
    const { resId } = req.params;
    // update timestamp ตอนถึงบ้านลูกค้า
    await Timetabledetail.updateTimearriveByid(con, resId);

    const update = ["collected", resId];
    // อัพเดตสถานะรายการจองให้เป็น collected เพื่อแสดงว่าคนขับรถขยะมาแล้ว
    await Reserve.updateReserve(con, update);

    await con.commit(); // ยินยัน transaction
    return res.status(200).json({ message: "อัพเดตสถานะสำเร็จ!" });

  } catch (error) {
    await con.rollback(); // rollback ข้อมูลเวลาเกิด error ขึ้น
    console.error("เกิดข้อผิดพลาดกับ Controller", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  } finally {
    await con.release(); // ปิด connection
  }
};
