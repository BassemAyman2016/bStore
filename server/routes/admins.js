const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

const admin = require('../controllers/admins');

router.post('/signup', admin.adminSighUp);
router.delete('/deleteCustomer/:user_id', middleware.verifyToken,admin.adminDeleteCustomer)
router.delete('/deactivateCustomer/:user_id', middleware.verifyToken,admin.deactivateAccount)
router.put('/activateCustomer/:user_id', middleware.verifyToken,admin.activateAccount)

module.exports = router;