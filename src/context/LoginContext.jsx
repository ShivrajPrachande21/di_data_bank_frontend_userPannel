import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from '../services/BaseUrl';
import { useNavigate } from 'react-router-dom';
export const LoginContext = createContext();

// Custom hook to use login context

export const LoginProvider = ({ children }) => {
    // State for login form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State for loading button
    const [loading, setLoading] = useState(false);

    // Clear states after success
    const clearStates = () => {
        setEmail('');
        setPassword('');
        setLoading(false);
    };

    const handleLogin = async logiData => {
        console.log('lOGIN in COntext', logiData.email);
        setLoading(true);
        try {
            // Replace with your login endpoint
            const response = await axios.post(`${BaseUrl}/company/login`, {
                email: logiData.email, // Sending email directly
                password: logiData.password
            });

            // Simulate successful response
            if (response.status === 200) {
                toast.success('Login successful!');
                clearStates();
                // Navigate to dashboard or any other page
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <LoginContext.Provider
            value={{
                email,
                setEmail,
                password,
                setPassword,
                handleLogin,
                loading
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);
