const jwt = require('jsonwebtoken');
require('dotenv').config();
// exports.isAuthenticated =  (req, res, next) => {
//     if(req.session.user){
//         next();
//     }else{
//         return res.status(401).json({message: "กรุณาเข้าสู่ระบบกก่อน!"})
//     }
// }

exports.auth = async (req, res, next) =>{
    try {
        const token = req.headers["authtoken"] // token ที่ต้องส่งให้ Front-end
        if(!token){
            return res.status(401).json({message: "ไม่มี Token!"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET); //ตรวจสอบ Token
        req.user = decoded // ส่งข้อมูลไปเก็บไว้ในตัวแปร req.user 
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์"})
    }
}
