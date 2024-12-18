const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userType: { type: String, required: true, enum: ['admin', 'user'] },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: { 
    type: [String], 
    default: [] 
  },
  rsvps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
