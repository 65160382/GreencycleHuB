const User = require("../models/userModel");
const Customer = require("../models/customerModel");
const { createToken } = require("../middlewares/authMiddleware");
require("dotenv").config();

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("email",email);
    // console.log("password",password);
    const [user] = await User.checkEmailQuery(email);
    // console.log("ข้อมูลในตาราง user",user);
    if (!user) {
      return res
        .status(404)
        .json({ message: { email: "อีเมลของคุณไม่ถูกต้อง!" } });
    }

    const match = await User.checkPassword(password, user.users_password);
    // console.log("รหัสถูกต้องหรือไม่",match)
    if (!match) {
      return res
        .status(400)
        .json({ message: { password: "รหัสผ่านไม่ถูกต้อง" } });
    }
    //ดึงข้อมูลจาก user พร้อมเปลี่ยนชื่อ users_id --> uid
    const { users_id: uid, users_email, roles_name } = user;

    // เก็บ payload แค่นี้ก่อนในกรณีที่เป็น role อื่น
    let payload = {
      id: uid,
      email: users_email,
      role: roles_name,
    };

    // console.log("payload ก่อนเพิ่ม",payload);

    // ถ้า Role เป็น customer เก็บข้อมูลเพิ่ม
    if (roles_name === "customer") {
      // ดึงข้อมูล customer ตาม user_id
      const [customer] = await Customer.getCustomer(uid);
      // console.log("debug customer:", customer);
      const { cus_id, cus_fname, cus_lname, cus_phone } = customer;

      payload = {
        ...payload, //รวมข้อมูลของเดิม
        fname: cus_fname,
        lname: cus_lname,
        phone: cus_phone,
        cus_id: cus_id, //เก็บค่า cus_id
      };
    };

    // console.log("Payload ก่อนเก็บลง token!",payload);

    // เรียกใช้ฟังก์ชั่น createToken
    const token = createToken(payload);

    // เก็บ token ลง cookie
    res.cookie("token", token, {
      httpOnly: true, // ป้องกัน XSS
      secure: false,
      samesite: "None", // อนุญาตให้ cookie ข้าม origin ได้ กรณีรันคนละ port
      maxAge: 3000000,
    });

    res.json({ payload }); // ส่ง payload ไปให้ react
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
    const cusId = await Customer.createCustomer(
      firstname,
      lastname,
      email,
      userid
    );

    // ดึงข้อมูล user เพื่อนำข้อมูลไปเก็บไว้ใน payload
    const rolename = await User.getRolename(userid);

    console.log("test role user:", rolename);

    // ส่งค่า customerid ไป ใส่ไว้ใน token เมื่อผู้ใช้สมัครสมาชิก
    if (cusId) {
      const payload = {
        id: userid,
        email: email,
        cus_id: cusId,
        fname: firstname,
        lname: lastname,
        role: rolename,
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

      return res.status(201).json({
        message: "ลงทะเบียนสำเร็จ!",
        payload,
      });
    } else {
      return res.status(400).json({ message: "ไม่สามารถลงทะเบียนได้" });
    }
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};

exports.checkAuth = async (req, res) => {
  const { id, email, role, fname, lname, phone, cus_id } = req.user;
  return res
    .status(200)
    .json({ user: { id, email, role, fname, lname, phone, cus_id } });
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "ออกจากระบบสำเร็จ!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};
