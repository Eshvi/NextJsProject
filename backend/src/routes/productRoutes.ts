import express from 'express';
import { getProduct, addProduct,getAllProducts, updateProduct, deleteProduct } from '../controller/productController';

const router = express.Router();

// Route to get a product by its ID
router.get('/product/:productId', getProduct);
router.get('/getAll', getAllProducts);

// Route to add a new product
router.post('/product/add', addProduct);

// Route to update a product by its ID
router.put('/product/update/:productId', updateProduct);

// Route to delete a product by its ID
router.delete('/product/delete/:productId', deleteProduct);

export default router;
