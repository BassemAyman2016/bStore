const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

// Require the controllers WHICH WE DID NOT CREATE YET!!
const admin = require('../controllers/admins');
// const middleware = require('../middleware/login')

// a simple test url to check that all of our files are communicating correctly.
router.post('/signup', admin.adminSighUp);
router.delete('/deleteCustomer/:user_id', middleware.verifyToken,admin.adminDeleteCustomer)
router.delete('/deactivateCustomer/:user_id', middleware.verifyToken,admin.deactivateAccount)
router.put('/activateCustomer/:user_id', middleware.verifyToken,admin.activateAccount)

module.exports = router;