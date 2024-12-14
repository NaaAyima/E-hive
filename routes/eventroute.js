const express = require('express');
const eventController = require('../controllers/eventcontroller');

const router = express.Router();

// Get all events
router.get('/', eventController.getAllEvents);

// Get a single event by ID
router.get('/:id', eventController.getEventById);

// Create a new event
router.post('/', eventController.createEvent);

// Update an existing event
router.put('/:id', eventController.updateEvent);

// Delete an event
router.delete('/:id', eventController.deleteEvent);

module.exports = router;