const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product = require('../controllers/products');

// a simple test url to check that all of our files are communicating correctly.
router.post('/createProduct',middleware.verifyToken, product.createProduct);
router.get('/getallProducts', product.getAllProducts)
router.put('/editProduct/:product_id',middleware.verifyToken, product.editProduct)
router.delete('/deleteProduct/:product_id',middleware.verifyToken, product.deleteProduct)
module.exports = router;