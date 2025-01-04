import mongoose from "mongoose";

const UserSchema = new mongoose.Schema
({
    username: 
    {
        type: String,
        required: true,
        unique: true,
    },
    displayName: 
    {
        type: String,
    },
    password: 
    {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', async function (next) 
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

export const User = mongoose.model('User', UserSchema);