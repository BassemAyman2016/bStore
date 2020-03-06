const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

// Require the controllers WHICH WE DID NOT CREATE YET!!
const category = require('../controllers/categories');

// a simple test url to check that all of our files are communicating correctly.
router.post('/createCategory',middleware.verifyToken, category.createCategory);

module.exports = router;