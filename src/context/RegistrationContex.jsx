import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import BaseUrl from './../services/BaseUrl';
import { toast } from 'react-toastify';

// Create a context
const RegistrationContext = createContext();

// Create a provider component
export const RegistrationProvider = ({ children }) => {
    const [OTP, setOtp] = useState('');

    const sendOtp = async mobile => {
        console.log('email', mobile);
        try {
            const response = await axios.post(`${BaseUrl}company/otp`, {
                mobile
            });
            if (response.status === 200) {
                setOtp(response.data.otp); // Assuming the OTP is returned in response
                toast.success('OTP sent to your email!');
            }
        } catch (error) {
            toast.error('Error while sending OTP');
        }
    };

    const verifyOtp = async otp => {
        try {
            const response = await axios.post(`${BaseUrl}/company/reg'`, {
                otp
            });
            if (response.status === 200) {
                toast.success('OTP verified successfully!');
            }
        } catch (error) {
            toast.error('Error while verifying OTP');
        }
    };

    return (
        <RegistrationContext.Provider
            value={{
                OTP,

                sendOtp,
                verifyOtp
            }}
        >
            {children}
        </RegistrationContext.Provider>
    );
};

// Custom hook for using the context
export const useRegistration = () => useContext(RegistrationContext);
