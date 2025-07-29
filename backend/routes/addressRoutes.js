const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const addressController = require("../controllers/addressController");

router.get("/addresses",addressController.getAddress);
router.post("/addresses",addressController.createAddress)
// เหลือ update address
router.delete("/addresses/:id", addressController.deleteAddress);


module.exports = router;
