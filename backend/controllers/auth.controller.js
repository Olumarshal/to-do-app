const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with email already exists.' });
        }

        const password_hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: password_hash });
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL });

        res.status(201).json({ message: 'Signup Successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL });

        res.status(200).json({ message: 'Login Successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};

exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully.' });
};
