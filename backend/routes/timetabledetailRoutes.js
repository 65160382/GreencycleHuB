const express = require("express");
const router = express.Router();
const { auth, checkDriver } = require("../middlewares/authMiddleware");
const Timetabledetail = require("../controllers/timetableDetailController")

router.patch("/timtabledetail/start/:resId",Timetabledetail.updatestartTime);
router.patch("/timtabledetail/arrive/:resId",Timetabledetail.updatearriveTime);

module.exports = router;