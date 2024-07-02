import express from 'express';
import request from 'request';
import config from 'config';
import { Router } from 'express';
import auth from '../middleware/auth.js';
import { check, validationResult } from 'express-validator';
import Profile from '../models/Profile.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

const router = Router();

//@route GET api/profile/me
//@decs Get current user profile
//@access Public
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
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
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
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

    // Build profile object, initialize as empty object
    const profileFields = {
        user: req.user.id,
        company,
        website,
        location,
        bio,
        status,
        interests,
        photo,
        skills: skills.split(',').map(skill => skill.trim())
    };

    // Build social links
    profileFields.social = { youtube, twitter, facebook, linkedin, instagram };

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            // If profile found, update it
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }

        // If no profile found, create a new one
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

//@route GET api/profile
//@decs Get all profiles
//@access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route POST api/profile/postload
//@decs Get profiles with pagination and filters
//@access Public
router.post('/postload', async (req, res) => {
    const { order = 'desc', sortBy = '_id', limit = 100, skip = 0, filters = {} } = req.body;

    let findArgs = {};
    for (let key in filters) {
        if (filters[key].length > 0) {
            if (key === 'price') {
                findArgs[key] = {
                    $gte: filters[key][0],
                    $lte: filters[key][1]
                };
            } else {
                findArgs[key] = filters[key];
            }
        }
    }

    try {
        const profiles = await Profile.find(findArgs)
            .populate('user', ['name', 'avatar'])
            .sort([[sortBy, order]])
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        res.json({ profiles, postSize: profiles.length });
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
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err);
        if (err.name == 'CastError') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

//@route DELETE api/profile
//@decs Delete profile, user and posts
//@access Private
router.delete('/', auth, async (req, res) => {
    try {
        await Post.deleteMany({ user: req.user.id });
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route PUT api/profile/experience
//@decs Add profile experience
//@access Private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } = req.body;

    const newExp = { title, company, location, from, to, current, description };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route DELETE api/profile/experience/:exp_id
//@decs Delete experience from profile
//@access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience = profile.experience.filter(exp => exp._id.toString() !== req.params.exp_id);
        await profile.save();
        return res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route PUT api/profile/education
//@decs Add profile education
//@access Private
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

    const newEdu = { school, degree, fieldofstudy, from, to, current, description };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route DELETE api/profile/education/:edu_id
//@decs Delete education from profile
//@access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education = profile.education.filter(edu => edu._id.toString() !== req.params.edu_id);
        await profile.save();
        return res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
