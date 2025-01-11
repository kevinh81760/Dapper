import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import userRoutes from './routes/userRoutes.mjs';
import connectDB from './config/mongoConnect.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Configure session store
const MongoStore = MongoDBStore(session);
app.use(
    session(
    {
        secret: process.env.SESSION_SECRET || 'your-secret-key', // Secret for signing the session ID cookie
        resave: false, // Prevent session resave if it hasn't changed
        saveUninitialized: false, // Don't save uninitialized sessions
        store: new MongoStore(
        {
            uri: process.env.MONGO_URI, // MongoDB URI from environment variables
            collection: 'sessions', // Collection to store sessions
        }),
        cookie: 
        {
            maxAge: 1000 * 60 * 60, // 1 hour
            httpOnly: true, // Prevent client-side access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        },
    })
);

// Middleware to parse JSON
app.use(express.json());

// Mount user routes
app.use('/users', userRoutes);

// Root route
app.get('/', (req, res) => 
{
    res.send('Hello, world!');
});

//Start the server
app.listen(PORT, (err) => 
    {
        if(err) 
        {
            console.error('Failed to start server: ${err.message}')
            process.exit(1);
        }
        console.log(`Running on Port ${PORT}`);
    });

