import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BaseUrl from '../../services/BaseUrl';
import { jwtDecode } from 'jwt-decode';

const TrasactionsData = () => {
    const [transactionData, settransactionData] = useState({});
    const fetch_transaction = async () => {
        const token = localStorage.getItem('companyToken');

        // Decode the token to get the payload
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;
        try {
            const response = await axios.get(
                `${BaseUrl}company/get_transaction/company/${companyId}`
            );
            settransactionData(response?.data);
        } catch (error) {}
    };
    useEffect(() => {
        fetch_transaction();
    }, []);
    return { transactionData };
};

export default TrasactionsData;
