const WasteCollection = require("../models/wasteCollectionModel");

// ดึงข้อมูลขยะของผู้ใช้ทั้งหมดทุกประเภทมาแสดงผลพร้อมหาผลรวมของน้ำหนัก
exports.getWeightByType = async (req, res) => {
    try {
        const cusId = Number(req.user.cus_id);
        const [result] = await WasteCollection.getWasteBytype(cusId);
        if(result){
            res.status(200).json({result});
        }else{
            res.status(404).json({ message: "ไม่พบข้อมูลขยะที่สะสมไว้!"})
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดไม่สามารถดึงข้อมูลมาแสดงผลได้",error)
        res.status(500).json({ message: "เกิดข้อผิดพลาดไม่สามารถดึงข้อมูลมาแสดงผลได้!"});
    }
}