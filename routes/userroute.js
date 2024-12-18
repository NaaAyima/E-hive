const express = require('express');
const userController = require('../controllers/usercontroller');

const router = express.Router();

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user preferences
router.put('/:id/preferences', userController.updatePreferences);

// Update user RSVPs
router.put('/:id/rsvps', userController.updateRsvps);

// Create a new user
router.post('/', userController.createUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

// Get all users
router.get('/', userController.getAllUsers);

// User login
router.post('/login', userController.login);

module.exports = router;