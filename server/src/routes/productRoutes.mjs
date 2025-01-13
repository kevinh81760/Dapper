import { Router } from 'express';
import { addProduct, getProducts } from '../controllers/productController.mjs';
import { ensureAuthenticated } from '../middlewares/authMiddleware.mjs';
import { ensureSeller } from '../middlewares/sellerAuthMiddleware.mjs';

const router = Router();

// Add a Product (Seller Only)
router.post('/add', passport.authenticate('session'), ensureAuthenticated, ensureSeller, addProduct);

// Get All Products (Public)
router.get('/', getProducts);

export default router;
