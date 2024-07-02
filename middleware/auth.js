import jwt from 'jsonwebtoken';
import config from 'config';

const authMiddleware = (req, res, next) => {
    // Get token from the header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, "secret");
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Export the middleware using ES6 export syntax
export default authMiddleware;
