const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users/login',userController.findUser);
router.post('/user/register',userController.insertUser);


module.exports = router;