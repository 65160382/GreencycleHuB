const express = require('express');
const router = express.Router();
const mapController = require("../controllers/mapController");
const { auth, checkAdmin } = require("../middlewares/authMiddleware");

// router.get("/map")

module.exports = router;