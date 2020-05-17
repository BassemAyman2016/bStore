const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

const product = require('../controllers/products');

router.post('/createProduct',middleware.verifyToken, product.createProduct);
router.get('/getallProducts', product.getAllProducts)
router.put('/editProduct/:product_id',middleware.verifyToken, product.editProduct)
router.delete('/deleteProduct/:product_id',middleware.verifyToken, product.deleteProduct)
router.get('/getSingleProduct/:product_id',middleware.verifyToken, product.getSingleProduct)
module.exports = router;