"use client";
import React, { useState, FormEvent } from "react";
import "./page.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Handle sign in
  const signIn = async (e: FormEvent) => {
    e.preventDefault();

    // Basic validation to ensure email and password are not empty
    if (!email || !password) {
      setError("Please fill in all fields");
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all fields",
      });
      return;
    }

    try {
      // const url: any = process.env.NEXT_PUBLIC_SIGN_IN;
      const url: string = "http://localhost:3002/user/sign-in";
      console.log(email, password);
      
      const response = await axios.post(url, { email, password });

      console.log(response.data.user);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      // Clear any previous errors
      setError(null);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: response.data.message,
      });
      router.push("/product");
    } catch (err: any) {
      console.error(err);
      // Specific error handling for email and password
      if (err.response && err.response.status === 401) {
        if (err.response.data.error === "Invalid email") {
          Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "The email address you entered is not registered.",
          });
        } else if (err.response.data.error === "Wrong password") {
          Swal.fire({
            icon: "error",
            title: "Wrong Password",
            text: "The password you entered is incorrect.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Please check your credentials and try again.",
          });
        }
      } else {
        setError("Login failed. Please check your credentials and try again.");
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  };

  return (
    <div className="bg-dark">
      <form className="form" onSubmit={signIn}>
        <div className="flex-column">
          <label htmlFor="email">Email</label>
        </div>
        <div className="inputForm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
          >
            <g id="Layer_3" data-name="Layer 3">
              <path d="M30.853 13.87a15 15 0 00-29.729 4.082 15.1 15.1 0 0012.876 12.918 15.6 15.6 0 002.016.13 14.85 14.85 0 007.715-2.145 1 1 0 10-1.031-1.711 13.007 13.007 0 115.458-6.529 2.149 2.149 0 01-4.158-.759V6.695a1 1 0 00-2 0v1.726a8 8 0 10.2 10.325 4.135 4.135 0 007.83.274 15.2 15.2 0 00.823-7.455zm-14.853 8.13a6 6 0 116-6 6.006 6.006 0 01-6 6z" />
            </g>
          </svg>
          <input
            placeholder="Enter your Email"
            className="input"
            required
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex-column">
          <label htmlFor="password">Password</label>
        </div>
        <div className="inputForm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="-64 0 512 512"
          >
            <path d="M336 512H48c-26.453 0-48-21.523-48-48V240c0-26.476 21.547-48 48-48h288c26.453 0 48 21.523 48 48v224c0 26.476-21.547 48-48 48zM48 224c-8.812 0-16 7.168-16 16v224c0 8.832 7.188 16 16 16h288c8.812 0 16-7.168 16-16V240c0-8.832-7.188-16-16-16zm0 0" />
            <path d="M304 224c-8.832 0-16-7.168-16-16v-80c0-52.93-43.07-96-96-96s-96 43.07-96 96v80c0 8.832-7.168 16-16 16s-16-7.168-16-16v-80C64 73.406 121.406 16 192 16s128 57.406 128 128v80c0 8.832-7.168 16-16 16zm0 0" />
          </svg>
          <input
            placeholder="Enter your Password"
            className="input"
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <span className="span">Forgot password?</span>
        </div>
        <button type="submit" className="button-submit">
          Sign In
        </button>
        <p className="p">
          Do not have an account? <Link href="/user/signup">Sign Up</Link>
        </p>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
