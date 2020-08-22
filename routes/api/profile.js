const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/profile/me
//@decs Get current user profile
//@access Public
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg:'There is no profile for this user'});

        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

//@route POST api/profile
//@decs Create or update user profile
//@access Private
router.post('/', [ auth, [
    check('status', 'Status is required')
    .not()
    .isEmpty(),
    check('skills','skills are required')
    .not()
    .isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json( {errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        skills,
        interests,
        photo,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    //build profile object, innitialize as empty object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(interests) profileFields.interests = interests;
    if(photo) profileFields.photo = photo;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());//turn into array
    }

    console.log(skills);
    console.log(profileFields.skills);

    //build social link
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne( {user: req.user.id});
        if(profile){
            //if theres a profile ->update
            profile = await Profile.findOneAndUpdate({ user: req.user.id}, { $set:profileFields}, {new: true});
            return res.json(profile);
        }

        //if not found, create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

    res.send('hih');
});

//@route GET api/profile
//@decs Get all profile
//@access Public
router.get('/', async (req, res) => {
    try {
        //populate from user collection and an array of fields
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route GET api/profile/user/:user_id
//@decs Get profile by user id
//@access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        //
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if(!profile) return res.status(400).json( {msg: 'There is no profile for this user'});
        res.json(profile);
    } catch (err) {
        console.error(err);
        
        if(err.name == 'CastError') {
            
            return res.status(400).json({ msg: 'Profile not found'});
            
        }
        res.status(500).send('Server Error');
    }
});

//@route DELETE api/profile
//@decs Delete profile, user and post
//@access Private
router.delete('/', auth, async (req, res) => {
    try {
        //remove users posts
        await Post.deleteMany({ user: req.user.id });
        //remove profile
        await Profile.findOneAndRemove({ user: req.user.id});
        //remove user
        await User.findOneAndRemove({ _id: req.user.id});
        res.json({msg: 'User remove'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route PUT api/profile/experience
//@decs Add profile experience
//@access Private
router.put('/experience', [auth, [
    check('title', 'Title is required')
    .not()
    .isEmpty(),
    check('company', 'Company is required')
    .not()
    .isEmpty(),
    check('from', 'From date is required')
    .not()
    .isEmpty()
]], async( req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array()});

       
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;
    //creat an object that user submitted
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});