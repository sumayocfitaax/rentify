const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const userModel = require('../models/userModel')

router.post('/user/register', userController.userRegister);
router.post('/user/login', userController.userLogin)
router.get('/user/getAll', userController.getAllUsers)
router.delete('/user/delete/:id', userController.deleteUser)

router.post('/admin/login', userController.adminLogin)

// backend/routes/userRoutes.js
// 🚨 Place this route BEFORE your admin middleware check!
router.get('/user/publicCount', async (req, res) => {
  try {
    // .countDocuments() is incredibly fast and only sends back a single number, not private data!
    const totalUsers = await userModel.countDocuments(); 
    return res.json({ success: true, count: totalUsers });
  } catch (error) {
    console.error("Error calculating user metrics:", error);
    return res.json({ success: false, count: 0 });
  }
});

module.exports = router
