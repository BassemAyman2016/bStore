const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const admin = require('../controllers/admins');
// const middleware = require('../middleware/login')

// a simple test url to check that all of our files are communicating correctly.
router.post('/signup', admin.adminSighUp);

module.exports = router;