export const ensureAuthenticated = (req, res, next) => 
{
    if (req.session && req.session.userId) 
    {
        next(); // User is authenticated, proceed to the next middleware/route
    } 
    else 
    {
        res.status(401).json({ msg: 'Unauthorized. Please log in.' });
    }
};