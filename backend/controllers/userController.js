const User = require("../models/userModel");

exports.findUser = async (req, res) => {
  try {
    const { email,password } = req.body;
    const users = await User.findOne(email,password);
    if (!users) {
      return res.status(404).json({ message: "ไม่พบ email นี้ในระบบ" });
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};

// fname,lname,email,password
exports.insertUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.register(email, password);
    if (!users) {
      return res.status(404).json({ message: "ไม่สามารถเพิ่มข้อมูลได้" });
    }
    res.json(users);
    console.log(users);
    res.status(201).json({ message: "ลงทะเบียนสำเร็จ", userId: users.insertId }); // ✅ เพิ่ม response กลับให้ชัดเจน
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};
