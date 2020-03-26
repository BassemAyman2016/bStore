const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

// Require the controllers WHICH WE DID NOT CREATE YET!!
const brand = require('../controllers/brands');

// a simple test url to check that all of our files are communicating correctly.
router.post('/createBrand', middleware.verifyToken, brand.createBrand);
router.delete('/deleteBrand/:brand_id', middleware.verifyToken, brand.deleteBrand);

module.exports = router;