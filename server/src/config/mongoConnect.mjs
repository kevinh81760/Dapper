import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async () => 
{
    try 
    {
        await mongoose.connect(process.env.MONGO_URI, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Database");
    } 
    catch (err) 
    {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); 
    }
};

export default connectDB;