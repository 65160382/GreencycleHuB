const User = require("../models/userModel");
const Customer = require("../models/customerModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.checkEmailQuery(email);
    if (user.length === 0) {
      return res.status(404).json({ message: { email: "อีเมลของคุณไม่ถูกต้อง!"} });
    }
    const userPass = user[0];
    const match = await User.checkPassword(password,userPass)

    if (!match) {
      return res.status(400).json({ message: { password: "รหัสผ่านไม่ถูกต้อง"}});
    }

    const payload = {
      user: {
        id: userPass.users_id,
        email: userPass.users_email,
        role: userPass.roles_id
      }
    }

    jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN},(err,token)=>{
      if(err) throw err; // ถ้ามี err ส่ง error ออกมา
      res.json({token, payload}); // ส่ง token, payload ไปให้ user
    });

  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    //ตรวจสอบ email ซ้ำหรือไม่
    const check = await User.checkEmailQuery(email);
    if(check.length>0){
      return res.status(409).json({ message: "อีเมลนี้มีในระบบแล้ว กรุณาใช้อีเมลอื่น!" });
    }
    // เพิ่มข้อมูลลงตาราง User
    const userid = await User.createUser(email, password);
    
    // เพิ่มข้อมูลลงตาราง Customer
    const result = await Customer.createCustomer(firstname,lastname,email,userid);
    
    if (result.affectedRows === 1) {
      return res.status(201).json({ message: "ลงทะเบียนสำเร็จ!" });
    } else {
      return res.status(400).json({ message: "ไม่สามารถลงทะเบียนได้" });
    }
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};
