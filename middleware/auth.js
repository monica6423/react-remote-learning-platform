const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //get token from the header
    const token = req.header('x-auth-token');

    //check if no token
    if (!token) {
        return res.status(401).json({ msg: ' no token, authorization denied' });
    }

    //verify token
    try {
        jwt.verify(token, config.get('jwtSecret'));        
        next();
    } catch (err) {
        res.status(401).json({ msg: 'token is not valid' });
    }
}