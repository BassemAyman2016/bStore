const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

// Require the controllers WHICH WE DID NOT CREATE YET!!
const category = require('../controllers/categories');

// a simple test url to check that all of our files are communicating correctly.
router.post('/createCategory',middleware.verifyToken, category.createCategory);
router.delete('/deleteCategory/:category_id',middleware.verifyToken, category.deleteCategory);
router.get('/getCategories', category.getCategories);

module.exports = router;