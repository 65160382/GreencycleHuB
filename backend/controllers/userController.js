const User = require("../models/userModel");
const Customer = require("../models/customerModel");

exports.findUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.findOne(email, password);
    if (!users) {
      return res.status(404).json({ message: "ไม่พบ email นี้ในระบบ" });
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};

// fname,lname,email,password
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
