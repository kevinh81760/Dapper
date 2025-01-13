import { User } from '../models/userModel.mjs';

export const ensureSeller = async (req, res, next) => 
{
    if (!req.session || !req.session.userId) 
    {
        return res.status(401).json({ msg: 'Unauthorized. Please log in as a seller.' });
    }

    const user = await User.findById(req.session.userId);
    if (!user || user.role !== 'seller') {
        return res.status(403).json({ msg: 'Forbidden. Only sellers can access this route.' });
    }

    next(); // User is authenticated as a seller, proceed to the next middleware/route
};