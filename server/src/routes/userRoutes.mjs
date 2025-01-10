import { Router } from 'express';
import { registerUser } from '../controllers/userController.mjs';

const router = Router();

router.post('/register', registerUser);

export default router;