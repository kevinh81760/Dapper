import { Router } from 'express';
import { registerUser } from '../controllers/userController.mjs';
import { ensureAuthenticated } from '../middlewares/authMiddleware.mjs';
import passport from '../config/passport.mjs';

const router = Router();

//User Registration
router.post('/register', registerUser);

//Seller Login
router.post('/login',
    passport.authenticate('local', 
    {
        successRedirect: '/dashboard', // Redirect on successful login
        failureRedirect: '/login',    // Redirect on failure
        failureFlash: true,           // Optional: Show error messages
    })
);

// User Logout
router.post('/logout', logoutUser);

// Protected Example Route
router.get('/profile', ensureAuthenticated, (req, res) => 
{
    res.json({ msg: 'Welcome to your profile!', userId: req.session.userId });
});

export default router;