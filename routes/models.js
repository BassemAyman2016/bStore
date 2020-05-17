const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

const model = require('../controllers/models');

router.post('/createModel', middleware.verifyToken, model.createModel);
router.delete('/deleteModel/:model_id', middleware.verifyToken, model.deleteModel);
router.get('/getModels', model.getModels);

module.exports = router;