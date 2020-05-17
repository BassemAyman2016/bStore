const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

const customer = require('../controllers/customers');

router.post('/customerSignup', customer.customerSignup);
router.get('/getAllCustomers',middleware.verifyToken, customer.getAllCustomers);
router.get('/viewProfile',middleware.verifyToken, customer.viewProfile);
router.put('/editProfile',middleware.verifyToken, customer.editProfile);
router.delete('/deactivateProfile/:user_id',middleware.verifyToken, customer.deactivateProfile);
router.post('/confirm/:id', customer.confirmAccount);

module.exports = router;