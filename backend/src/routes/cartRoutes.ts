// backend/routes/cartRoutes.ts
import express from 'express';
import { addToCart, getUserCart, removeFromCart } from '../controller/cartController';

const router = express.Router();

router.post('/cart/add', addToCart);
router.get('/cart/:userId', getUserCart);
router.delete('/cart/remove/:userId/:productId', removeFromCart);

export default router;
