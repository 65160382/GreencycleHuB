const Timetable = require("../models/timetableModel");
const Timetabledetail = require("../models/timetabledetailModel");
const Reserve = require("../models/reserveModel");
//test refactor transaction
const pool = require("../config/database");
//test use nostramap api
const { fetchClosetFacility, getClosestFacility } = require("../utils/nostramapUtils");
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
      return res
        .status(400)
        .json({ message: { error: "ข้อมูลไม่ครบถ้วนหรือผิดรูปแบบ" } });
    }

    // test version ใหม่
    const incident = [{ name: "Company", lat: 13.288378, lon: 100.924359 }]
    const facilities = resId.map((item, index) => ({
      name: String(item.id ?? `facility${index}`),
      lat: Number(item.lat),
      lon: Number(item.lon),
    }));

    const params = {
      key: process.env.NOSTRAMAP_API_KEY,
      incident: JSON.stringify(incident),
      facilities: JSON.stringify(facilities),
      mode: "Car",
      impedance: "Time",
      targetFacilityCount: facilities.length,
      language: "L",
      directionLanguage: "English",
      cutOff: 60,
      returnedAGSResult: "True",
      outSR: 4326,
    };

    // console.log("debug value:", resId); // ต้องได้ค่าเป็น  array object { id: resid lat:lat lon:lon } ของแต่ละรายการจอง

    // เพิ่มข้อมูลลง timetable
    // const timetaleId = await Timetable.insertTimetable(
    //   con,
    //   assigndate,
    //   assigntimeslot,
    //   driveId
    // );

    // if (!timetaleId) {
    //   return res.status(400).json({ message: "เกิดข้อผิดพลาดไม่มี timetableid!" });
    // }

    // <---- เพิ่มเรียกใช้ api nostramap service ที่ค้นหาเส้นทางที่ใกล้ที่สุด
    // const response = await getClosestFacility(params);
    // const response = await fetchClosetFacility(resId);
    console.log("response utils :",response)
    if (!response) {
      return res.status(502).json({ message: "NOSTRA API error" });
    }
    // console.log("debug:", data);

    // เตรียม values สำหรับ bulk insert
    // const values = resId.map((id) => [timetaleId, id, null, null]);

    // เพิ่มข้อมูลง timetabledetail
    // const result = await Timetabledetail.insertTimetabledetail(con, values);

    // เตรียม ข้อมูล Resid สำหรับ update status reserve
    // const update = resId.map((id) => ["pending", id]);

    // อัปเดตสถานะรายการจอง ให้เป็น Pending
    // await Reserve.updateReserve(con, update);

    // ยืนยัน transaction
    // await con.commit();

    // if (result) {
    //   res.status(200).json({ message: "หมอบหมายคนขับสำเร็จ!" });
    // }
  } catch (error) {
    await con.rollback(); // rollback ข้อมูลเวลาเกิดขึ้น
    console.log("เกิดข้อผิดพลาดกับเซิร์ฟเวอร์!", error);
  } finally {
    await con.release(); //ปิด connection
  }
};
