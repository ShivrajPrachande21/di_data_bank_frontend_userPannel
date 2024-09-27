import React, { createContext, useState, useContext, useEffect } from 'react';
import BaseUrl from '../services/BaseUrl';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// Create the context
const SubscriptionContext = createContext();
let datapayment = {};
// Create the provider component
export const SubscriptionProvider = ({ children }) => {
    const [subscriptionData, SetsubscriptionData] = useState(null);
    const [topUpData, SettopUpData] = useState(null);
    const [loading, setloading] = useState(null);
    const [paymentLoading, SetpaymentLoading] = useState(null);
    const [paymentData, SetpaymentData] = useState(datapayment);

    const fetch_all_subscription = async () => {
        setloading(true);
        const token = localStorage.getItem('companyToken');
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;
        try {
            const response = await axios.get(
                `${BaseUrl}/company/get_allsubscription/${companyId}`
            );
            SetsubscriptionData(response?.data);
            if (response?.status == 200) {
                setloading(false);
            }
        } catch (error) {}
    };
    console.log('datapayment', datapayment);
    const fetch_top_ups = async () => {
        const token = localStorage.getItem('companyToken');
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;
        try {
            const response = await axios.get(
                `${BaseUrl}company/get_topup_plane/${companyId}`
            );
            SettopUpData(response?.data);
        } catch (error) {}
    };

    const initiatePayment = async sub_id => {
        SetpaymentLoading(true);
        try {
            // Fetch token from localStorage and decode company ID
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const id = decodedToken?._id;

            // Log the sub_id and companyId for debugging

            const response = await axios.post(`${BaseUrl}/company/payment`, {
                id,
                sub_id
            });
            if (response.status === 200) {
                datapayment = response?.data;
                SetpaymentData(response?.data);

                const paymentLink = response?.data?.paymentLink;
                if (paymentLink) {
                    window.open(paymentLink, '_blank');
                }
            }
            RunVerify();
        } catch (error) {
            console.error('Error during payment initiation:', error);
        }
    };

    useEffect(() => {
        if (paymentData) {
            get_payment_success_status();
        }
    }, [paymentData]);

    const get_payment_success_status = async () => {
        console.log('Payment Data in get_payment_success_status:', paymentData); // Add this line

        // if (!subscriptionId || !paymentMethod || !orderId) {
        //     console.error('Missing payment data.');
        //     return;
        // }

        try {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id;

            const response = await axios.post(`${BaseUrl}/company/verify`, {
                orderId: datapayment?.order_id,
                subscriptionId: datapayment?.subscription_id,
                companyId: companyId,
                paymentMethod: datapayment?.payment_methods
            });
            if (response?.status === 200 || response?.status === 201) {
                SetpaymentLoading(false);
                window.location.reload();
            }

            console.log('Verification response:', response.data);
        } catch (error) {
            console.error('Error during verification:', error);
        }
    };
    function RunVerify() {
        const intervalId = setInterval(() => {
            get_payment_success_status();
        }, 1000); // Call every 1 second

        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
        }, 1000 * 60 * 5);

        // Watch paymentLoading and clear intervals if it's false
        const checkPaymentLoading = setInterval(() => {
            if (paymentLoading === false) {
                clearInterval(intervalId); // Clear the interval for get_payment_success_status
                clearTimeout(timeoutId); // Clear the 5-minute timeout
                clearInterval(checkPaymentLoading); // Clear this watcher interval
            }
        }, 500); // Check paymentLoading every 500 milliseconds
    }

    console.log('payment data', paymentData);
    useEffect(() => {
        fetch_all_subscription();
        fetch_top_ups();
    }, []);

    return (
        <SubscriptionContext.Provider
            value={{
                paymentLoading,
                subscriptionData,
                topUpData,
                loading,
                fetch_all_subscription,
                fetch_top_ups,
                initiatePayment
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
};

// Custom hook to use the SubscriptionContext
export const useSubscription = () => {
    return useContext(SubscriptionContext);
};
