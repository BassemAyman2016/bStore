const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

// Require the controllers WHICH WE DID NOT CREATE YET!!
const model = require('../controllers/models');

// a simple test url to check that all of our files are communicating correctly.
router.post('/createModel', middleware.verifyToken, model.createModel);
router.delete('/deleteModel/:model_id', middleware.verifyToken, model.deleteModel);
router.get('/getModels', model.getModels);

module.exports = router;