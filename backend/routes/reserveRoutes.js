const express =require('express');
const router = express.Router();
const { auth,checkAdmin } = require("../middlewares/authMiddleware");
const ReserveController = require("../controllers/reserveController");

router.post("/reserve", auth,ReserveController.createReserve);
router.get("/reserve/:id", auth, ReserveController.getReserveById);
// router.get("/reserve",auth,ReserveController.getAllReserves);
// get Reserve + fillter
router.get("/reserve",auth,ReserveController.getReserves);
router.get("/admin/reserve",auth,checkAdmin,ReserveController.getAllReserves);
// router.get("/reserve/",auth,ReserveController.getReserveStatus);

module.exports = router;