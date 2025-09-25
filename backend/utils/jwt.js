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

// สร้าง token ใหม่
exports.generateAccessTokenFromRefresh = (refreshToken) => {
  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // console.log("debug user",user);

    let payload = {
      userid: user.id,
      email: user.email,
      role: user.role,
    }

    // ถ้า role เป็น customer
    if(user.role === "customer"){
      payload = {
        ...payload,
        fname: user.fname,
        lanme: user.lname,
        phone: user.phone,
        cus_id: user.cus_id
      }
    }

    if(user.role === "driver"){
      payload = {
        ...payload,
        drivId: user.drivId,
        fname: user.fname,
        lname: user.lname,
        phone: user.phone,
        license_plate: user.license_plate,
      }
    }

    // console.log("debug payload",payload);

    const newAccessToken = jwt.sign(
      payload, // ใช้ payload เดิมจาก refresh token
      // user,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return newAccessToken;
  } catch (error) {
    console.error("Refresh token ไม่ถูกต้อง:", error);
  }
};

exports.decodedToken = (accessToken) => {
  try {
    const user = jwt.verify(accessToken, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    console.error("เกิดข้อผิดพลาด",error);
  }
}