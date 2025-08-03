const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const addressController = require("../controllers/addressController");

router.get("/addresses", auth, addressController.getAllAddress);
router.get("/addresses/default", auth, addressController.getDefaultAddress);
router.post("/addresses", auth, addressController.createAddress);
// เหลือ update address
router.patch("/addresses/:id/default", auth ,addressController.updateDeafultAddress);
router.delete("/addresses/:id", auth, addressController.deleteAddress);


module.exports = router;
