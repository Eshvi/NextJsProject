"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import '../signin/page.css'
const Register: React.FC = () => {
    // State to hold form input values
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [passErr, setPassErr] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const router = useRouter();

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(emailValue);
        if (emailRegex.test(emailValue)) {
            setError(null);
        } else {
            setError('Invalid email address');
        }
    };

    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);
        if (passwordValue.length <= 8) {
            setPassErr('Password length must be more than 8 characters');
        } else {
            setPassErr(null);
        }
    };

    // Handle the form submission
    const signup = async (e: FormEvent) => {
        e.preventDefault(); // Prevent the default form submission
    
        // Validate fields before submission
        if (!email || !password || !confirmPassword || !contact) {
            setFormError("Please fill out all fields.");
            return;
        }
        if (password !== confirmPassword) {
            setFormError("Passwords do not match.");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:3002/user/sign-up", { email, password, contact });
            console.log(response);
    
            setFormError(null); // Clear any previous errors
    
            // Check if response contains a string message
            if (typeof response.data.message === 'string') {
                alert(response.data.message);
                router.push('/');
            } else {
                alert('Sign up successful!');
                router.push('/');
            }
    
        } catch (err: any) {
            console.log(err);
    
            // Handle backend error messages
            if (err.response && typeof err.response.data.message === 'string') {
                setFormError(err.response.data.message);
            } else {
                setFormError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div id='bg'>
            <form className="form" onSubmit={signup}>
                <div className="flex-column">
                    <label htmlFor="email">Email</label>
                </div>
                <div className="inputForm">
                    <input
                        required
                        placeholder="Enter your Email"
                        className="input"
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                {error && <span className='text-danger' style={{fontSize:'18px'}}>{error}</span>}

                <div className="flex-column">
                    <label htmlFor="password">Password</label>
                </div>
                <div className="inputForm">
                    <input
                        required
                        placeholder="Enter your Password"
                        className="input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePassword}
                    />
                </div>
                {passErr && <span className='text-danger' style={{fontSize:'18px'}}>{passErr}</span>}

                <div className="flex-column">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <div className="inputForm">
                    <input
                        required
                        placeholder="Enter your Password Again"
                        className="input"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="flex-column">
                    <label htmlFor="contact">Contact</label>
                </div>
                <div className="inputForm">
                    <input
                        placeholder="Enter your Contact"
                        className="input"
                        type="text"
                        id="contact"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
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
                    Sign Up
                </button>
                <p className="p">
                    Already have an account? <Link href="/">Sign In</Link>
                </p>
            </form>

            {/* Display form error */}
            {formError && <div className="error-message">{formError}</div>}
        </div>
    );
}

export default Register;
