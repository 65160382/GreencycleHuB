const Driver = require("../models/driverModel");

exports.getAvailableDrivers = async (req, res) => {
  try {
    const { date, timeslot } = req.query;
    const result = await Driver.getdriverAvaiable(date, timeslot);
    if (result) {
      return res.status(200).json({ result });
    } else {
      return res.status(404).json({ message: "ไม่พบข้อมูลของคนขับ" });
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดไม่สามารถดึงข้อมูลจากฐานข้อมูลได้", error);
  }
};
