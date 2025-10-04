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

// แสดงตารางการเดินรถตามวันที่ของคนขับ
exports.getTimetable = async (req, res) => {
  try {
    const { drivId, date } = req.query;

    if (!drivId || !date) {
      return res.status(400).json({ message: "กรุณาระบุ drivId และ date" });
    }

    const results = await Timetable.fetchTimetable(drivId, date);
    console.log("debug results:", results);

    // test ยังไม่เข้าใจ flow ต้องนี้เรื่องการ group object
    // Group ตาม time_id
    const grouped = results.reduce((acc, item) => {
      if (!acc[item.time_id]) {
        acc[item.time_id] = {
          time_id: item.time_id,
          time_date: item.time_date,
          time_slot: item.time_time_slot,
          items: [],
          total_weight: 0, // <-- เก็บน้ำหนักรวม
        };
      }

      acc[item.time_id].items.push({
        res_id: item.res_id,
        time_index: item.time_index,
        addressLine1: item.addressLine1,
        addressLine2: item.addressLine2,
        weight: parseFloat(item.res_weight), // เก็บน้ำหนักของแต่ละบ้าน
        lat:item.add_lat,
        lon:item.add_lon
      });

      acc[item.time_id].total_weight += parseFloat(item.res_weight); // บวกน้ำหนัก
      return acc;
    }, {});

    const timetable = Object.values(grouped).map((group) => ({
      ...group,
      total_points: group.items.length,
    }));

    // console.log("debug timetable:",timetable);
    // return res.status(200).json({ timetable });

    if (timetable) {
      return res.status(200).json({ timetable });
    } else {
      return res
        .status(404)
        .json({ message: "ไม่พบข้อมูลตารางการเดินรถของคนขับ!" });
    }
  } catch (error) {
    console.log("เกิดข้อผิดพลาดกับเซิร์ฟเวอร์!", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};

exports.getTimetableById = async(req,res) => {
  try {
    const timeId = req.params.id;

    if(!timeId){
      return res.status(404).json({ message: "ไม่มีข้อมูลตารางเดินรถที่เลือก" })
    }

    const results = await Timetable.fetchTimetablebyid(timeId);
    // console.log("debug results",results);

    if(!results.length){
      return res.status(404).json({message: "ไม่พบข้อมูลรายการจองในรอบการเดินรถนี้"})
    }

    // map res_id ของตารางเดินรถออกมา
    const resIds = results.map((item)=> item.res_id)

    const wasteSummaries = await Promise.all(
      resIds.map((id)=> Reserve.getReserveWasteSummary(id))
    );
    // console.log("debug waste summary:",wasteSummaries);

    const mergedResult = results.map((item,index)=> ({
      ...item,
      wastes: wasteSummaries[index], //ขยะของรายการจองนี้
    }))
    // console.log("debug merge value:",mergedResult);

    return res.status(200).json({ message: "ดึงข้อมูลสำเร็จ", mergedResult });

  } catch (error) {
    console.log("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์",error);
  }
}
