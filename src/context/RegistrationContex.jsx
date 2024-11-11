import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import BaseUrl from './../services/BaseUrl';
import { toast } from 'react-toastify';

// Create a context
const RegistrationContext = createContext();

// Create a provider component
export const RegistrationProvider = ({ children }) => {
    const [OTP, setOtp] = useState('');

    const [HideOTP, setHideOTP] = useState(null);
    const sendOtp = async email => {
        try {
            const response = await axios.post(`${BaseUrl}company/otp`, {
                email
            });
            if (response.status == 200 || response.status == 201) {
                setOtp(response.data.OTP); // Assuming the OTP is returned in response
                setHideOTP(prev => !prev);
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
                verifyOtp,
                HideOTP,
                setHideOTP
            }}
        >
            {children}
        </RegistrationContext.Provider>
    );
};

// Custom hook for using the context
export const useRegistration = () => useContext(RegistrationContext);
