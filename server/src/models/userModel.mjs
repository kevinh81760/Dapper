import mongoose from "mongoose";
import bcrypt from 'bcrptjs';

// Define Schema
const userSchema = new mongoose.Schema(
    {   
        username: { type: String, required: true, unique: true},
        password: { type: String, required: true }
    },
    {
    timestamps: true 
    }
);
    
// Pre-save hook to hash passwords
userSchema.pre('save', async function (next) 
{
    if(!this.isModified('password')) 
    {
        return next();
    }
    try 
    {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(err) 
    {
        return next(err);
    }
});

export const User = mongoose.model('User', userSchema);