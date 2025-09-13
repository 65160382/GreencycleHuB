const jwt = require("jsonwebtoken");
require("dotenv").config();

// ตรวจสอบว่ามี token หรือไม่เป็นการตรวจสอบว่าผู้ใช้ login หรือไม่
exports.auth = async (req, res, next) => {
  try {
    // const token = req.headers["authtoken"]; // token ที่ต้องส่งให้ Front-end
    const token = req.cookies.token ; // ตรวจสอบ token ใน cookies
    if (!token) {
      return res.status(401).json({ message: "ไม่มี Token!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); //ตรวจสอบ Token
    req.user = decoded; // ส่งข้อมูลไปเก็บไว้ในตัวแปร req.user
    // console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};


exports.checkAdmin = async (req, res, next) => {
  try {
    if(!req.user){
      return res.status(401).json({message: "ผู้ใช้ยังไม่เข้าสู่ระบบ"});
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "คุณไม่มีสิทธิ์เข้าถึง (Admin เท่านั้น)" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์"})
  }
}

exports.checkDriver = async (req,res,next) => {
  try {
    if(!req.user){
      return res.status(401).json({message: "ผู้ใช้ยังไม่เข้าสู่ระบบ"});
    }

    if (req.user.role !== "driver") {
      return res.status(403).json({ message: "คุณไม่มีสิทธิ์เข้าถึง (driver เท่านั้น)" });
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์"})
  }
}


