const Timetable = require('../models/timetableModel');
const Timetabledetail = require('../models/timetabledetailModel');
const Reserve = require("../models/reserveModel");

exports.createTimetable = async (req,res) => {
    try {
        const { assigndate, assigntimeslot, driveId, resId } = req.body;

        // ตรวจสอบ input
        if (!assigndate || !assigntimeslot || !driveId || !resId || !Array.isArray(resId)) {
        return res.status(400).json({ message: { error: "ข้อมูลไม่ครบถ้วนหรือผิดรูปแบบ" } });
        }

        // เพิ่มข้อมูลลง timetable 
        const timetaleId = await Timetable.insertTimetable(assigndate,assigntimeslot,driveId);
        
        if(!timetaleId){
            return res.status(400).json({ message: "เกิดข้อผิดพลาดไม่มี timetableid!"});
        }

        // เตรียม values สำหรับ bulk insert
        const values = resId.map((id) => [timetaleId, id, null, null]);
        
        // เพิ่มข้อมูลง timetabledetail
        const result = await Timetabledetail.insertTimetabledetail(values);

        // เตรียม ข้อมูล Resid สำหรับ update status reserve
        const update = resId.map((id) => ['pending',id]);
        // อัปเดตสถานะรายการจอง ให้เป็น Pending 
        await Reserve.updateReserve(update);
        
        if(result){
            res.status(200).json({ message : "หมอบหมายคนขับสำเร็จ!"});
        }

    } catch (error) {
        console.log("เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล",error);
    }
};