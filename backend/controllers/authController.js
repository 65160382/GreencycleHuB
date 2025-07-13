const User = require("../models/userModel");
const Customer = require("../models/customerModel");
const jwt = require("jsonwebtoken");
const { createToken } = require("../middlewares/authMiddleware");
require("dotenv").config();

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.checkEmailQuery(email);
    if (user.length === 0) {
      return res.status(404).json({ message: { email: "อีเมลของคุณไม่ถูกต้อง!"} });
    }
    const userPass = user[0];
    const match = await User.checkPassword(password, userPass);

    if (!match) {
      return res.status(400).json({ message: { password: "รหัสผ่านไม่ถูกต้อง"}});
    }

    const payload = {
      user: {
        id: userPass.users_id,
        email: userPass.users_email,
        role: userPass.roles_id,
      },
    };

    // เรียกใช้ฟังก์ชั่น createToken
    const token = createToken(payload);

    // เก็บ token ลง cookie
    res.cookie("token", token, {
      httpOnly: true, // ป้องกัน XSS
      secure: false,
      samesite: "None", // อนุญาตให้ cookie ข้าม origin ได้ กรณีรันคนละ port
      maxAge: 3000000,
    });

    res.json({ payload }); // ส่ง payload ไปให้ user
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    //ตรวจสอบ email ซ้ำหรือไม่
    const check = await User.checkEmailQuery(email);
    if (check.length > 0) {
      return res
        .status(409)
        .json({ message: "อีเมลนี้มีในระบบแล้ว กรุณาใช้อีเมลอื่น!" });
    }
    // เพิ่มข้อมูลลงตาราง User
    const userid = await User.createUser(email, password);

    // เพิ่มข้อมูลลงตาราง Customer
    const result = await Customer.createCustomer(
      firstname,
      lastname,
      email,
      userid
    );

    if (result.affectedRows === 1) {
      const payload = {
        user: {
          id: userid,
          email: email,
        },
      };

      // เรียกใช้ฟังก์ชั่น createToken
      const token = createToken(payload);

      // เก็บ token ลง cookie
      res.cookie("token", token, {
        httpOnly: true, // ป้องกัน XSS
        secure: false,
        samesite: "None", // อนุญาตให้ cookie ข้าม origin ได้ กรณีรันคนละ port
        maxAge: 3000000,
      });

      return res.status(201).json({ message: "ลงทะเบียนสำเร็จ!" }, { payload });
    } else {
      return res.status(400).json({ message: "ไม่สามารถลงทะเบียนได้" });
    }
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};

exports.checkAuth = async (req,res) =>{
 return res.status(200).json({ user: req.user });
};