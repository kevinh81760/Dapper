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
        await newUser.save(); 

        return res.status(201).json({ msg: 'User registered successfully.' });
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
}

export async function loginUser(req, res)
{
    try
    {
        const{ username, password } = req.body;

        // Basic validation
        if (!username || !password) 
        {
            return res.status(400).json({ msg: 'Username and password are required.' });
        }

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) 
        {
            return res.status(400).json({ msg: 'Invalid username or password.' });
        }

         // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
        {
            return res.status(400).json({ msg: 'Invalid username or password.' });
        }

        // Store user ID in session
        req.session.userId = user._id;

        return res.json({ msg: 'Login successful', user: { id: user._id, username: user.username } });
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({ msg: 'Server error', error: err.message })
    }
}

export const logoutUser = (req, res) => 
{
    req.session.destroy((err) => 
    {
        if(err)
        {
            return res.status(500).json({ msg: 'Failed to log out.' });
        }
        res.clearCookie('connect.sid'); 
        return res.json({ msg: 'Logout successful' });
    });
}