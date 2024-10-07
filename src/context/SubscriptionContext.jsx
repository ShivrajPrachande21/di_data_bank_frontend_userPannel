import React, { createContext, useState, useContext, useEffect } from 'react';
import BaseUrl from '../services/BaseUrl';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// Create the context
const SubscriptionContext = createContext();
let datapayment = {};
let top_up_data = {};
// Create the provider component
export const SubscriptionProvider = ({ children }) => {
    const [subscriptionData, SetsubscriptionData] = useState(null);
    const [topUpData, SettopUpData] = useState(null);
    const [loading, setloading] = useState(null);
    const [paymentLoading, SetpaymentLoading] = useState(null);
    const [paymentData, SetpaymentData] = useState(datapayment);
    const [TopPaymentData, setTopPaymentData] = useState(top_up_data);
    const [EarlyBuy, SetEarlyData] = useState(null);
    const [RenewData, SetRenewData] = useState(null);
    const [topUp_id, setTopUp_id] = useState('');
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

    // Fetch Early buy Data
    const fetch_all_renew = async () => {
        setloading(true);
        const token = localStorage.getItem('companyToken');
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;
        try {
            const response = await axios.get(
                `${BaseUrl}company/get_earlysubcription/${companyId}`
            );
            SetEarlyData(response?.data);
            if (response?.status == 200) {
                setloading(false);
            }
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
        // console.log('Payment Data in get_payment_success_status:', paymentData); // Add this line

        // if (!subscriptionId || !paymentMethod || !orderId) {
        //     console.error('Missing payment data.');
        //     return;
        // }

        try {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id;

            const response = await axios.post(`${BaseUrl}company/verify`, {
                orderId: datapayment?.order_id,
                subscriptionId: datapayment?.subscription_id,
                companyId: companyId,
                paymentMethod: datapayment?.payment_methods
            });
            if (response?.status === 200 || response?.status === 201) {
                SetpaymentLoading(false);
                window.location.reload();
            }
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

    const topup_initiatePayment = async topup_id => {
        SetpaymentLoading(true);
        setTopUp_id(topup_id);

        try {
            console.log('data?', topup_id);
            // Fetch token from localStorage and decode company ID
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const company_id = decodedToken?._id;

            // Log the sub_id and companyId for debugging

            const response = await axios.post(
                `${BaseUrl}company/topup_plane/payment`,
                {
                    company_id,
                    topup_id
                }
            );
            if (response.status === 200) {
                top_up_data = response?.data;
                setTopPaymentData(response?.data);

                const paymentLink = response?.data?.paymentLink;
                if (paymentLink) {
                    window.open(paymentLink, '_blank');
                }
            }
            RuntopUp_verify();
        } catch (error) {
            console.error('Error during payment initiation:', error);
        }
    };

    const fetch_topUp_success_status = async to => {
        console.log('top_up_data', top_up_data);
        try {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id;

            const response = await axios.post(
                `${BaseUrl}company/topup_plane/verify`,
                {
                    orderId: top_up_data?.order_id,
                    topupId: top_up_data?.topupId,
                    companyId: companyId,
                    paymentMethod: top_up_data?.payment_methods
                }
            );
            if (response?.status === 200 || response?.status === 201) {
                SetpaymentLoading(false);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error during verification:', error);
        }
    };

    function RuntopUp_verify() {
        const toUpIntervelId = setInterval(() => {
            fetch_topUp_success_status();
        }, 1000); // Call every 1 second

        const ToptimeoutId = setTimeout(() => {
            clearInterval(toUpIntervelId);
        }, 1000 * 60 * 5);

        // Watch paymentLoading and clear intervals if it's false
        const checkPaymentLoading = setInterval(() => {
            if (paymentLoading === false) {
                clearInterval(toUpIntervelId); // Clear the interval for get_payment_success_status
                clearTimeout(ToptimeoutId); // Clear the 5-minute timeout
                clearInterval(checkPaymentLoading); // Clear this watcher interval
            }
        }, 500);
    }

    //Renew Subscription plane
    // Fetch Early buy Data
    const fetch_all_early = async () => {
        setloading(true);
        const token = localStorage.getItem('companyToken');
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;
        try {
            const response = await axios.get(
                `${BaseUrl}company/get_renewplane/${companyId}`
            );
            SetRenewData(response?.data);
            if (response?.status == 200) {
                setloading(false);
            }
        } catch (error) {}
    };

    useEffect(() => {
        fetch_all_subscription();
        fetch_top_ups();
        fetch_all_renew();
        fetch_all_early();
    }, []);

    return (
        <SubscriptionContext.Provider
            value={{
                paymentLoading,
                subscriptionData,
                topUpData,
                loading,
                EarlyBuy,
                RenewData,
                fetch_all_subscription,
                fetch_top_ups,
                initiatePayment,
                topup_initiatePayment
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
