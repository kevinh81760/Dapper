import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.mjs';
import connectDB from './config/mongoConnect.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/users', userRoutes);

app.listen(PORT, (err) => 
{
    if(err) 
    {
        console.error('Failed to start server: ${err.message}')
        process.exit(1);
    }
    console.log(`Running on Port ${PORT}`);
});

app.get('/', (req, res) => 
{
    res.send('Hello, world!');
});

