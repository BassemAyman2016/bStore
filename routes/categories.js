const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

const category = require('../controllers/categories');

router.post('/createCategory',middleware.verifyToken, category.createCategory);
router.delete('/deleteCategory/:category_id',middleware.verifyToken, category.deleteCategory);
router.get('/getCategories', category.getCategories);

module.exports = router;