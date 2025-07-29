const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const { auth } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware"); // import multer middleware

// ใช้ upload.single("image") เพื่อดึงไฟล์จาก field name = "image"
router.post("/predict", upload.single("image"), auth, imageController.predictImage);
router.post("/image", upload.single("image"), auth,imageController.uploadImage);
router.post("/waste-collection",auth,imageController.createWasteCollection);

router.get("/recycle-type",imageController.getRecycleType);

module.exports = router;
