const express =require('express');
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const ReserveController = require("../controllers/reserveController");

router.post("/reserve", auth,ReserveController.createReserve);

module.exports = router;