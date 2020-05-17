const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

const product_images = require('../controllers/product_images');

router.post('/insertImage/:product_id',middleware.verifyToken, product_images.insertProductImage);
router.delete('/deleteProductImages/:product_id',middleware.verifyToken, product_images.deleteProductImages)
router.delete('/deleteSingleImage/:image_id',middleware.verifyToken, product_images.deleteSingleImage)
router.put('/restoreDeletedImages/:product_id',middleware.verifyToken, product_images.restoreDeletedImages)
// router.put('/editProduct/:product_id',middleware.verifyToken, product.editProduct)
// router.delete('/deleteProduct/:product_id',middleware.verifyToken, product.deleteProduct)
module.exports = router;