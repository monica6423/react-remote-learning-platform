const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
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

//@route POST api/profile
//@decs Get all profile with load more function
//@access Public
router.post('/postload', async (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);


    let findArgs = {};
 

    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    console.log(findArgs)



    try {
        //populate from user collection and an array of fields
        const profiles = await Profile.find(findArgs)
        .populate('user', ['name', 'avatar'])
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit);
        res.json({profiles, postSize: profiles.length});

       
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


//@route DELETE api/profile/experience/exp_id
//@decs Delete experience from profile
//@access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id});
        //kick out that exp_id
        console.log(typeof foundProfile.experience);
        foundProfile.experience = foundProfile.experience.filter(
            exp => exp._id.toString() !== req.params.exp_id
        );
       
        console.log(typeof req.params.exp_id);


        await foundProfile.save();
        return res.status(200).json(foundProfile);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
//@route PUT api/profile/education
//@decs Add profile education
//@access Private
router.put('/education', [auth, [
    check('school', 'School is required')
    .not()
    .isEmpty(),
    check('degree', 'Degree is required')
    .not()
    .isEmpty(),
    check('fieldofstudy', 'Field of study is required')
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
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;
    //creat an object that user submitted
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//@route DELETE api/profile/education/exp_id
//@decs Delete education from profile
//@access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id});
        console.log(typeof foundProfile.education);
        foundProfile.education = foundProfile.education.filter(
            edu => edu._id.toString() !== req.params.edu_id
        );
       
        console.log(typeof req.params.edu_id);


        await foundProfile.save();
        return res.status(200).json(foundProfile);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


module.exports = router;
