import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import BaseUrl from '../../services/BaseUrl';

export const SubscriptionContext = createContext();

export const SubscriptionsProvider = ({ children }) => {
    const [SubscriptinData, setSubscriptionData] = useState([]);
    const [currentSubscription, SetCurrentSubscription] = useState({});
    const fetch_Subscrtipion = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/get_allsubscription/${userId}`
                );
                setSubscriptionData(response?.data);
            } catch (error) {}
        }
    };

    const fetch_CurrentSubscrtipion = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/get_currentusing/subscription/${userId}`
                );
                SetCurrentSubscription(response?.data[0]);
            } catch (error) {}
        }
    };

    return (
        <SubscriptionContext.Provider
            value={{
                SubscriptinData,
                fetch_Subscrtipion,
                fetch_CurrentSubscrtipion,
                currentSubscription
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
};
