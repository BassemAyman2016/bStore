const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const session = require('../controllers/sessions');
// const middleware = require('../middleware/login')

// a simple test url to check that all of our files are communicating correctly.
router.post('/login', session.Login);

module.exports = router;