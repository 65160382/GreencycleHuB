const jwt = require("jsonwebtoken");
require("dotenv").config();

// สร้าง token เวลาผู้ใช้ login หรือ register
exports.createToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return token;
    }catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ไม่สามารถสร้าง Token ได้!" });
  }
};

// refreshtoken ต่ออายุ token อัตโนมัติ 
exports.createRefreshToken = (payload) => {
  try {
    const refreshToken = jwt.sign(payload , process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN});
    return refreshToken;
  } catch (error) {
    console.log(error);
  }
};

exports.generateAccessTokenFromRefresh = (refreshToken) => {
  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = jwt.sign(
      { id: user.id, email:user.email, role: user.role}, // ใช้ payload เดิมจาก refresh token
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return newAccessToken;
  } catch (error) {
    console.error("Refresh token ไม่ถูกต้อง:", error);
  }
};