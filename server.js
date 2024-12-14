import express, { json, static as serveStatic } from 'express';
import { connect } from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import userRoutes from './routes/userroute.js'; // Ensure this file exists
import eventRoutes from './routes/eventroute.js'; // Ensure this file exists

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware to parse JSON
app.use(json());

// Serve static files from the 'frontend' folder
app.use(serveStatic(join(__dirname, 'frontend')));

// Define API routes
app.use('/users', userRoutes);
app.use('/events', eventRoutes);

// Route to serve the landing page
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'frontend', 'index.html'));
});

// MongoDB Connection
(async () => {
    try {
        await connect('mongodb+srv://jacquelinemensah:mensah12@cluster0.tzvhj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
})();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
