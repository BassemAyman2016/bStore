const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

const brand = require('../controllers/brands');

router.post('/createBrand', middleware.verifyToken, brand.createBrand);
router.delete('/deleteBrand/:brand_id', middleware.verifyToken, brand.deleteBrand);
router.get('/getBrands/', brand.getBrands);

module.exports = router;