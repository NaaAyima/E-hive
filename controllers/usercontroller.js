const User = require('../models/usermodel.js');

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
