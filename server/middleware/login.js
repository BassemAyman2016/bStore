const tokenKey = require('../config/setup').secretOrKey
const jwt = require('jsonwebtoken')
require('dotenv').config();

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the tokenc
        if (bearer[0] !== 'bearer') {
            return res.status(400).send({ status: 'failure', message: 'Authentication Failed' })
        } else {
            req.token = bearerToken;
            // Next middleware
            jwt.verify(req.token, tokenKey, async(err, authData) => {
                if (err) {
                    if(err.name && err.name=="TokenExpiredError"){
                        return res.status(400).send({ status: 'failure', message: 'Session token expired , please logout and login again' })
                    }
                    return res.status(400).send({ status: 'failure', message: 'Authentication Failed' })
                } else {
                    req.id = authData.id
                    next()
                }
            })
        }
    } else {
        // Forbidden
        return res.status(403).send({ status: 'failure', message: 'Unauthorized' });
    }
}

module.exports = {
    verifyToken
}