const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true, min: 1 },
  availableSeats: { 
    type: Number, 
    required: true, 
    min: 0,
    validate: {
      validator: function (value) {
        return value <= this.capacity;
      },
      message: 'Available seats cannot exceed the total capacity.'
    }
  },
  rsvps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Middleware to decrease availableSeats when a user RSVPs
eventSchema.methods.addRSVP = async function (userId) {
  // Check if the user has already RSVP'd
  if (this.rsvps.includes(userId)) {
    throw new Error('User has already RSVP\'d to this event.');
  }

  // Check if there are available seats
  if (this.availableSeats <= 0) {
    throw new Error('No seats available for this event.');
  }

  // Add the user to the rsvp list
  this.rsvps.push(userId);

  // Decrement the availableSeats
  this.availableSeats--;

  // Save the updated event document
  await this.save();
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
