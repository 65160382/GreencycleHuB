const express = require("express");
const router = express.Router();
const { auth, checkAdmin,checkDriver } = require("../middlewares/authMiddleware");
const TimetableController = require("../controllers/timetableController");

// router.post("/admin/timetable",auth,checkAdmin,TimetableController.createTimetable);
router.post("/admin/timetable",auth,checkAdmin,TimetableController.createTimetable);
// router.get("/timetable",auth,TimetableController.getTimetable);
router.get("/timetable",TimetableController.getTimetable);
router.get("/timetable/:id",TimetableController.getTimetableById)


module.exports = router;