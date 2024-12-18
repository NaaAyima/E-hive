const Event = require('../models/Eventmodel');
const User = require('../models/Usermodel'); 

// Controller to get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('rsvps', 'email');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Controller to get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('rsvps', 'email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};

// Controller to create a new event (Admin Only)
exports.createEvent = async (req, res) => {
  try {
    const { name, date, location, description, capacity } = req.body;

    // Create the event
    const event = new Event({
      name,
      date,
      location,
      description,
      capacity,
      availableSeats: capacity, // Initially all seats are available
    });

    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Controller to RSVP a user to an event
exports.rsvpEvent = async (req, res) => {
  const { userId } = req.body; // User ID from the request body
  const { id: eventId } = req.params; // Event ID from the route parameters

  try {
    // Find the event by its ID
    const event = await Event.findById(eventId);

    // Check if the event exists
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user has already RSVP'd
    if (event.rsvps.includes(userId)) {
      return res.status(400).json({ message: 'User has already RSVP\'d to this event' });
    }

    // Add the user to the RSVPs array
    event.rsvps.push(userId);

    // Decrement the availableSeats if applicable
    if (event.availableSeats > 0) {
      event.availableSeats -= 1;
    } else {
      return res.status(400).json({ message: 'No available seats for this event' });
    }

    // Save the updated event
    await event.save();

    // Respond with success
    res.status(200).json({
      message: 'User successfully RSVP\'d to event',
      availableSeats: event.availableSeats,
      rsvps: event.rsvps,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error RSVPing to event', error: error.message });
  }
};

// Controller to update RSVP (only modifies the RSVP list)
exports.updateRSVP = async (req, res) => {
  const { userId, action } = req.body; // action can be "add" or "remove"
  const { id: eventId } = req.params;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (action === 'add') {
      if (event.rsvps.includes(userId)) {
        return res.status(400).json({ message: 'User already RSVP\'d to this event.' });
      }
      if (event.availableSeats <= 0) {
        return res.status(400).json({ message: 'No available seats for this event.' });
      }
      event.rsvps.push(userId);
      event.availableSeats--;
    } else if (action === 'remove') {
      if (!event.rsvps.includes(userId)) {
        return res.status(400).json({ message: 'User has not RSVP\'d to this event.' });
      }
      event.rsvps = event.rsvps.filter((id) => id.toString() !== userId.toString());
      event.availableSeats++;
    } else {
      return res.status(400).json({ message: 'Invalid action. Use "add" or "remove".' });
    }

    await event.save();

    res.status(200).json({
      message: `User successfully ${action === 'add' ? 'added to' : 'removed from'} RSVP list`,
      availableSeats: event.availableSeats,
      rsvps: event.rsvps,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating RSVP', error: error.message });
  }
};

// Controller to update an existing event
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', updatedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

// Controller to delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};