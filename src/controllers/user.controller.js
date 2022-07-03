const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        if (!user)
            return res.status(404).json({err: 'User not found'})
        res.send(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.register = async (req, res) => {
    try {
        if (req.body.password != req.body.repeatPassword)
            return res.status(400).json({ msg: 'The passwords do not match'});
        const user = await User.findOne({ email: req.body.email});
        if (user) 
            return res.status(400).json({ msg: 'The user does exist'});

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        });

        newUser.salt = newUser.makeSalt();
        newUser.password = await newUser.encryptPassword(req.body.password);
        await newUser.save();
        return res.status(200).json({ msg: 'User saved successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'dont register user' });
    }
}

exports.login = async (req, res) => {
    try {
        if (!req.body.password || !req.body.email)
            return res.status(400).json({ msg: 'The password and email are required' });
        
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(404).json({ msg: 'The user does not exist'});
        const isAuth = await user.authenticate(req.body.password);
        if (!isAuth)
            return res.status(404).json({ msg: 'Credentials are not valid'});
        const token = jwt.sign(user.userToken(), process.env.JWT_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '365d'});
        return res.status(200).json({ authToken: token, refreshToken });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'dont login' });
    }
}