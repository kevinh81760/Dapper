import { User } from '../models/userModel.mjs';

export async function registerUser(req, res) 
{
    try 
    {
        const { username, password } = req.body;

        // Basic validation
        if(!username || !password)
        {
            return res.status(400).json({ msg: 'Username and password are required.' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if(existingUser)
        {
            return res.status(400).json({ msg: 'User already exists.' });
        }

        const newUser = new User({ username, password });
        newUser.save; 

        return res.status(201).json({ msg: 'User registered successfully.' });
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
}