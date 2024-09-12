"use client"
import React, { useState, useEffect } from 'react';
import './page.css';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Product {
  productId: any;
  id: number;
  name: string;
  price: number;
  image: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  let user = sessionStorage.getItem("user");

  const parsedUser: any = JSON.parse(user as string);
      const userId = parsedUser?._id;
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_GET_CART;
    axios.get(`${url}/${userId}`)
    .then(result=>{
      console.log("isCartOpen", isCartOpen);
      
      console.log("cart list",result.data.items)
      setCartItems(result.data.items)
      setIsCartOpen(!isCartOpen)
    }).catch(err=>{
      console.log(err)
    });
    // Fetch cart items from localStorage or backend if using a server
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // For persistent cart
  };

  const handleRemoveFromCart = (productId: any) => {
    // Remove item from frontend (state)
    const updatedCart = cartItems.filter(item => item.productId._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  
    // Remove item from backend cart
    const url = process.env.NEXT_PUBLIC_REMOVE_FROM_CART
    axios.delete(`${url}/${userId}/${productId}`)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Item removed from cart!',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(err => {
        console.error("Error removing item from cart:", err.response?.data || err.message);
        Swal.fire({
          icon: 'success',
          title: 'Item removed succesfully!',
          text: 'The selected item has been moved',
        });
      });
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      <button className="cart-icon" onClick={toggleCart}>
        🛒 Cart ({cartItems.length})
      </button>

      {isCartOpen && (
        <div className="cart-container">
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cartItems.map((item,index) => (
                <li key={index} className="cart-item">
                  <img src={item.productId.thumbnail} alt={item.productId.title} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h3>{item.productId.title}</h3>
                    <p>${item.productId.price.toFixed(2)}</p>
                    <button onClick={() => handleRemoveFromCart(item.productId._id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
