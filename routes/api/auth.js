const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const User = require('../../models/User');
//@route GET api/auth
//@decs Test route
//@access Public
router.get('/', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )
        if (req.method === 'OPTIONS') {
            res.status(200).end()
            return
        }
        res.status(500).send('server error');
    }
});


//@route POST api/auth
//@decs Authenticate user and get token
//@access Public
router.post('/', [

    check('email', '  Please include a valid email').isEmail(),
    check('password', '  Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )
        if (req.method === 'OPTIONS') {
            res.status(200).end()
            return
        }
        //see if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: '  Invalid Credentials' }] });
        }

        //plain text password that just input vs password got from db
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: '  Invalid Credentials' }] });
        }

        //return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET,
            { expiresIn: 3600000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }


});

module.exports = router;