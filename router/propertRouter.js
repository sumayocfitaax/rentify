const express = require('express');
const router = express.Router();
const propertyController = require('../controller/propertyController.js')
const uploadImage = require('../middleWare/multer.js')
const authMiddleware = require('../middleWare/authMiddleware.js')
const adminMiddleware = require('../middleWare/adminMiddleWare.js')

router.post('/property/add', authMiddleware,uploadImage.single('images'), propertyController.addProperty);

console.log(__dirname);


router.get('/properties/get', propertyController.getAllProperties);
router.get('/property/get/:id', propertyController.getPropertyById);
router.delete('/property/delete/:id', propertyController.deleteProperty);

router.get('/property/stats', propertyController.getPropertyStats);

router.get(
  "/property/my",
  authMiddleware,
  propertyController.getMyProperties
);

router.get(
  "/admin/properties",
  authMiddleware,
  adminMiddleware,
  propertyController.getAllPropertiesAdmin
);

router.put(
  "/property/update/:id",
  authMiddleware,
  propertyController.updateProperty
);


module.exports = router

