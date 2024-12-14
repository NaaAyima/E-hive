const Event = require('../models/Eventmodel');

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new event
exports.createEvent = async (req, res) => {
    const { name, date, location, description, capacity, availableSeats } = req.body;
    const event = new Event({
        name,
        date,
        location,
        description,
        capacity,
        availableSeats
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const { name, date, location, description, capacity, availableSeats } = req.body;
        if (name) event.name = name;
        if (date) event.date = date;
        if (location) event.location = location;
        if (description) event.description = description;
        if (capacity) event.capacity = capacity;
        if (availableSeats) event.availableSeats = availableSeats;

        const updatedEvent = await event.save();
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await event.remove();
        res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};