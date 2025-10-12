const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const addressController = require("../controllers/addressController");

router.get("/addresses", auth, addressController.getAllAddress);
router.get("/addresses/default", auth, addressController.getDefaultAddress);
router.get("/addresses/:id",auth,addressController.getAddressById);
// เพิ่มข้อมูลที่อยู่
router.post("/addresses", auth, addressController.createAddress);
// เหลือ update address
router.patch("/addresses/:id/default", auth ,addressController.updateDeafultAddress);
router.patch("/addresses/:id",auth, addressController.updateAddress)
router.delete("/addresses/:id", auth, addressController.deleteAddress);


module.exports = router;
