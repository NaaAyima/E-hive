const express = require('express');
const eventController = require('../controllers/eventcontroller');

const router = express.Router();

// Route to get all events
router.get('/', eventController.getAllEvents);

// Route to get a single event by ID
router.get('/:id', eventController.getEventById);

// Route to create a new event (Admin Only)
router.post('/', eventController.createEvent);

// Route to RSVP a user to an event
router.post('/:id/rsvp', eventController.rsvpEvent);

// Route to update RSVP (only modifies the RSVP list)
router.put('/:id/rsvp', eventController.updateRSVP);

// Route to update an existing event
router.put('/:id', eventController.updateEvent);

// Route to delete an event
router.delete('/:id', eventController.deleteEvent);

module.exports = router;