const express = require("express");
const router = express.Router();
const { auth, checkAdmin,checkDriver } = require("../middlewares/authMiddleware");
const TimetableController = require("../controllers/timetableController");

// router.post("/admin/timetable",auth,checkAdmin,TimetableController.createTimetable);
router.post("/admin/timetable",auth,checkAdmin,TimetableController.createTimetable);
// router.get("/timetable",auth,TimetableController.getTimetable);
router.get("/timetable",TimetableController.getTimetable);
router.get("/timetable/:id",TimetableController.getTimetableById);

router.get("/driver/timetable/summary", TimetableController.getDriverTaskSummary);

//อัปเดต
router.patch("/timetable/start/:timeid",TimetableController.updateTimetableStart);
router.patch("/timetable/arrive/:timeid",TimetableController.updateTimetableFinish);


module.exports = router;