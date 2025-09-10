const express = require("express");
const router = express.Router();
const { auth, checkAdmin } = require("../middlewares/authMiddleware");
const DriverController = require("../controllers/driverController");

// query driver ที่ยังไม่มีวันที่และรอบ ตรงกับตาราง timetable
router.get("/admin/drivers/available",auth,checkAdmin,DriverController.getAvailableDrivers);

module.exports = router;
