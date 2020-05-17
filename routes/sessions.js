const express = require('express');
const router = express.Router();
const session = require('../controllers/sessions');

router.post('/login', session.Login);
router.post('/requestPasswordReset', session.requestPasswordReset);
router.post('/resetPassword/:token', session.resetPassword);

module.exports = router;