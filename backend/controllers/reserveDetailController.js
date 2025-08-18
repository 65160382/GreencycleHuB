const ReserveDetail = require("../models/reserveDetailModel");

exports.getReserveDetailById = async (req, res) => {
    try {
        const resId = req.params.id;
        const result = await ReserveDetail.getReserveDetailById(resId);
        if(result && result.length > 0) {
            res.status(200).json({ result });
        }else{
            res.status(404).json({ message: "ไม่พบข้อมูลรายละเอียดการจอง!" });
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดไม่สามารถดึงข้อมูลรายละเอียดการจองได้", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดไม่สามารถดึงข้อมูลรายละเอียดการจองได้" });
    }
}