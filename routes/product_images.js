const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_images = require('../controllers/product_images');

// a simple test url to check that all of our files are communicating correctly.
router.post('/insertImage/:product_id',middleware.verifyToken, product_images.insertProductImage);
router.delete('/deleteProductImages/:product_id',middleware.verifyToken, product_images.deleteProductImages)
// router.put('/editProduct/:product_id',middleware.verifyToken, product.editProduct)
// router.delete('/deleteProduct/:product_id',middleware.verifyToken, product.deleteProduct)
module.exports = router;