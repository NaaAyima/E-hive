const express = require('express');
const userController = require('../controllers/usercontroller');

const router = express.Router();

// Create a new user
router.post('/users', userController.createUser);

// Authenticate user and generate a token
router.post('/users/login', userController.loginUser);

// Get user by ID
router.get('/users/:id', userController.getUserById);

// Update user by ID
router.put('/users/:id', userController.updateUser);

// Delete user by ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;