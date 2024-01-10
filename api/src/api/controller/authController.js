const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
    const saltRounds = 16; 
    return bcrypt.hash(password, saltRounds);
};

const generateAuthToken = async (user) => {
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    return token;
};

// Controller function to register a user
const registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        user.password = await hashPassword(req.body.password);
        await user.save();
        const token = await generateAuthToken(user);
        res.cookie('token', token, { httpOnly: true });
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({ error: 'Registration failed' });
    }
};

const findByCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error('Invalid password');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

// Controller function to log in a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({ error: 'Login failed' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.send({ user, token });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};

// Controller function to get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};

// Controller function to get a single user by ID
const getUser = async (req, res) => {
    try {
        const user = await User
            .findById(req.params.id)
            .populate('experiences') 
            .populate('education'); 
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser && existingUser._id.toString() !== req.params.id) {
            return res.status(400).send({ error: 'Email already exists for another user' });
        }
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        Object.assign(user, req.body);
        const updatedUser = await user.save();
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};

// Controller function to delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};

// Controller function to log out a user (single device)
const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
};

// Controller function to log out a user (all devices)
const logoutAllDevices = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    logoutAllDevices,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
