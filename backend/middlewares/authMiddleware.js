const jwt = require("jsonwebtoken");
require("dotenv").config();

// สร้าง token เวลาผู้ใช้ login หรือ register
exports.createToken = (payload) => {
  try {
    const token = jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return token;
    }catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ไม่สามารถสร้าง Token ได้!" });
  }
};

// ตรวจสอบว่ามี token หรือไม่เป็นการตรวจสอบว่าผู้ใช้ login หรือไม่
exports.auth = async (req, res, next) => {
  try {
    // const token = req.headers["authtoken"]; // token ที่ต้องส่งให้ Front-end
    const token = req.cookies.token; // ตรวจสอบ token ใน cookies
    if (!token) {
      return res.status(401).json({ message: "ไม่มี Token!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); //ตรวจสอบ Token
    req.user = decoded; // ส่งข้อมูลไปเก็บไว้ในตัวแปร req.user
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};
