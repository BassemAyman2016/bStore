const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

// Require the controllers WHICH WE DID NOT CREATE YET!!
const customer = require('../controllers/customers');

// a simple test url to check that all of our files are communicating correctly.
router.post('/customerSignup', customer.customerSignup);
router.get('/getAllCustomers',middleware.verifyToken, customer.getAllCustomers);
router.get('/viewProfile',middleware.verifyToken, customer.viewProfile);
router.put('/editProfile',middleware.verifyToken, customer.editProfile);
router.delete('/deactivateProfile/:user_id',middleware.verifyToken, customer.deactivateProfile);
router.post('/confirm/:id', customer.confirmAccount);

module.exports = router;