import { Router } from 'express';
import { registerUser } from '../controllers/userController.mjs';
import { ensureAuthenticated } from '../middlewares/authMiddleware.mjs';

const router = Router();

//User Registration
router.post('/register', registerUser);

//User Login
router.post('/login', loginUser);

// User Logout
router.post('/logout', logoutUser);

// Protected Example Route
router.get('/profile', ensureAuthenticated, (req, res) => 
{
    res.json({ msg: 'Welcome to your profile!', userId: req.session.userId });
});

export default router;