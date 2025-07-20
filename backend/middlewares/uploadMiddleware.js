// uploadMiddleware.js
const multer = require("multer");

// ใช้ memoryStorage เพื่อให้เก็บไฟล์ไว้ใน buffer แทน filesystem
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
