const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://jacquelinemensah:mensah12@cluster0.tzvhj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' );
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};
module.exports = connectDB;