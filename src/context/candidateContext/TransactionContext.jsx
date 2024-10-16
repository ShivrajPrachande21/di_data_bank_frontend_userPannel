import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import BaseUrl from '../../services/BaseUrl';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactionData, setTransactionData] = useState([]);
    const fetch_transaction = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/transaction/${userId}`
                );
                setTransactionData(response?.data);
            } catch (error) {}
        }
    };

    return (
        <TransactionContext.Provider
            value={{
                transactionData,
                fetch_transaction
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};
