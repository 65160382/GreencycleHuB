const express = require("express");
const router = express.Router();
const { auth, checkAdmin } = require("../middlewares/authMiddleware");
const TimetableController = require("../controllers/timetableController");

router.post("/admin/timetable",auth,checkAdmin,TimetableController.createTimetable);

module.exports = router;