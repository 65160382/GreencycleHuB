const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const wasteCollectController = require("../controllers/wasteController");

router.get("/waste-collections", wasteCollectController.getWeightByType);

module.exports = router;
