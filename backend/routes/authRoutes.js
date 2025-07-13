const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/login',authController.loginUser);
router.post('/register',authController.registerUser);
// เรียกใช้ Middleware เพื่อตรวจสอบว่าผู้ใช้ login เข้ามาด้วยการตรวจสอบ token
router.get('/auth',auth,authController.checkAuth)


module.exports = router;