const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/userroute');
const eventRoutes = require('./routes/eventroute');

const app = express();


app.use(express.json()); 

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Define API routes
app.use('/users', userRoutes);
app.use('/events', eventRoutes);

// Route to serve the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// MongoDB Connection
mongoose
    .connect(
        'mongodb+srv://jacquelinemensah:mensah12@cluster0.tzvhj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
