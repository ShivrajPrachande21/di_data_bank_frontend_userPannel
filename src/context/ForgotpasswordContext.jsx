// ForgotPasswordContext.jsx
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import BaseUrl from '../services/BaseUrl';
import { toast } from 'react-toastify';

// Create ForgotPasswordContext
const ForgotPasswordContext = createContext();

// Custom hook to use ForgotPasswordContext
export const useForgotPassword = () => useContext(ForgotPasswordContext);

export const ForgotPasswordProvider = ({ children }) => {
    const [currentStep, setcurrentStep] = useState(1);
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [OTP, setotp] = useState('');

    const handleForgotPassword = async email => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
        try {
            // Replace with your API endpoint
            const response = await axios.post(
                `${BaseUrl}company/forgotpassword`,
                {
                    email
                }
            );
            if (response.status == 200) {
                setotp(response.data?.OTP);
                toast.success('Otp sent successfully');
                setSuccessMessage('Password reset link sent to your email.');
                setcurrentStep(prev => prev + 1);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error;
            toast.error(errorMessage);
            setError('Failed to send reset link. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    console.log('OTPPP', OTP);

    return (
        <ForgotPasswordContext.Provider
            value={{
                OTP,
                email,
                setEmail,
                loading,
                error,
                successMessage,
                handleForgotPassword,
                currentStep,
                setcurrentStep
            }}
        >
            {children}
        </ForgotPasswordContext.Provider>
    );
};

export default ForgotPasswordProvider;
