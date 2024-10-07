import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import BaseUrl from '../services/BaseUrl';
// Create the context
const SupportContext = createContext();

// Create the provider component
export const SupportProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [modalShow, setModalShow] = React.useState(false);

    const fetch_all_issue = async () => {
        const token = localStorage.getItem('companyToken');
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;
        try {
            const response = await axios.get(
                `${BaseUrl}company/get_issue/${companyId}`
            );
            setData(response?.data);
        } catch (error) {}
    };

    console.log('data', data);
    useEffect(() => {
        fetch_all_issue();
    }, []);
    return (
        <SupportContext.Provider
            value={{
                data,
                fetch_all_issue,
                modalShow,
                setModalShow
            }}
        >
            {children}
        </SupportContext.Provider>
    );
};

// Custom hook to use the Support context
export const useSupport = () => {
    return useContext(SupportContext);
};
