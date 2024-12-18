const User = require('../models/Usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { userType, email, password, preferences } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userType,
            email,
            password: hashedPassword,
            preferences
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Authenticate user and generate a token
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update user preferences
exports.updatePreferences = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { preferences: req.body.preferences },
            { new: true }
        );
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update user RSVPs
exports.updateRsvps = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { rsvps: req.body.rsvps },
            { new: true }
        );
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Compare raw password strings
        if (password !== user.password) {
            return res.status(400).send('Invalid credentials');
        }

        // Respond with user details (excluding password)
        res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                userType: user.userType,
                preferences: user.preferences,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal server error');
    }
};
