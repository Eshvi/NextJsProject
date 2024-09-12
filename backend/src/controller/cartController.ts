// backend/controllers/cartController.ts
import { Request, Response } from "express";
import Product from '../models/productModel';
import Cart, { CartDocument } from "../models/cartModel";
// Add item to cart
export const addToCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;
  console.log(req.body);
  try {
    // Fetch product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find user's cart
    let cart = await Cart.findOne({ userId }) as CartDocument;

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (productIndex > -1) {
      // If product exists, update the quantity
      cart.items[productIndex].quantity += quantity;
    } else {
      // If product doesn't exist, add new product to cart
      cart.items.push({
        productId: productId,  // Store product's ObjectId
        quantity: quantity,    // Store quantity from request
        price: product.price   // Add price from product (for reference, not stored in cart)
      });
    }

    // Save the updated cart without totalPrice
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};


// Get user cart
export const getUserCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Remove item from cart
export const removeFromCart = async (req: Request, res: Response) => {
  const { userId, productId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId == productId
    );

    if (itemIndex > -1) {
      const item = cart.items[itemIndex];
      cart.totalPrice -=
        (await getProductPrice(item.productId)) * item.quantity;
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error });
  }
};

// Utility function (for example, fetching product price from DB)
const getProductPrice = async (productId: string): Promise<number> => {
  // Implement logic to get the price of the product
  return 100; // Replace with actual logic
};

