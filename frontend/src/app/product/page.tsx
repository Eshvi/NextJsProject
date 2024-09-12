"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./page.css";
import Navbar from "../Navbar/page";
import axios from "axios";
import { fetchProducts } from "../utils/api";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'; // Import SweetAlert2

interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  thumbnail: string;
  quantity?: number;
}

export default function Product() {
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [products, setProduct] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchProducts()
      .then((response) => {
        console.log(response);
        setProduct(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Add to cart
  const addToCart = async (productId: string): Promise<void> => {
    try {
      // Retrieve the logged-in user from sessionStorage
      let user = sessionStorage.getItem("user");
      if (!user) {
        console.error("User not logged in");
        return;
      }

      const parsedUser: any = JSON.parse(user as string);
      const userId = parsedUser?._id;

      console.log(userId, productId);

      // Make an API request to add the product to the cart
      const url = process.env.NEXT_PUBLIC_ADD_TO_CART;
      const response = await axios.post(`${url}`, {
        userId,
        productId,
        quantity: 1,
      });

      if (response.data) {
        console.log("Product added to cart:", response.data.items);
        console.log("Total Price:", response.data.totalPrice);

        // Show SweetAlert2 message
        Swal.fire({
          title: 'Success!',
          text: 'Item added to cart',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // Show SweetAlert2 error message
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add item to cart',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="product-page">
        <div className="layout-wrapper">
          {/* Left side images or text */}
          <div className="side-section left-section">
            <img
              id="p2"
              src="./Images/discount.png"
              alt="Left Side"
              className="side-image"
            />
          </div>

          {/* Main content */}
          <div className="main-content">
            <div className="brand-sticker">
              <img
                id="p1"
                src="./Images/p10.png"
                alt="AGIO"
                className="brand-logo"
              />
            </div>
            <div className="hero-section">
              <div className="hero-content">
                <h1 className="hero-title">Explore Top Fashion Trends</h1>
                <p className="hero-subtitle">
                  Limited Time Offers Just for You!
                </p>
                <button className="btn btn-light hero-button">Shop Now</button>
              </div>
            </div>
            <div className="product-container">
              <div className="heading-container">
                <h1 id="h1" className="text-center">
                  Trending Products
                </h1>
              </div>
              <div className="row">
                {products?.map((data: Product) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 mb-4"
                    key={data.id}
                  >
                    <div className="card product-card h-100">
                      <div className="product-image-wrapper">
                        <img
                          src={data.thumbnail}
                          className="card-img-top product-image"
                          alt={data.title}
                        />
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{data.title}</h5>
                        <p className="card-text">{data.brand}</p>
                        <p className="card-text category">{data.category}</p>
                        <h6 className="price mt-auto">${data.price}</h6>
                      </div>
                      <div className="card-footer">
                        <button
                          id="btn-cart"
                          className="btn btn-primary"
                          onClick={() => addToCart(data._id.toString())}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side images or text */}
        </div>
      </div>
    </>
  );
}
