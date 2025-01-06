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
    const [mailModelShow, setMailModelShow] = React.useState(false);
    const [mailData, setMailData] = useState(null);
    const fetch_all_issue = async () => {
        const token = localStorage.getItem('companyToken');

        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}company/get_issue/${companyId}`
                );
                setData(response?.data);
            } catch (error) {}
        }
    };

    const fetchCompanyMails = async () => {
        const token = localStorage.getItem('companyToken');

        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}company/get_mail_issue/${companyId}`
                );
                if (response?.status == 200 || response?.status == 201) {
                    setMailData(response?.data);
                }
            } catch (error) {}
        }
    };
    function RemovePath(imageUrl) {
        if (imageUrl) {
            return imageUrl.split('\\').pop();
        }
        return 'N/A';
    }

    function toCamelCase_Name(input) {
        if (typeof input == 'string') {
            return input
                ? input
                      .toLowerCase()
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')
                : null;
        } else {
            return input;
        }
    }

    const formatDate = dateString => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
    };

    useEffect(() => {
        fetch_all_issue();
        // fetchCompanyMails();
    }, []);
    return (
        <SupportContext.Provider
            value={{
                mailData,
                data,
                fetch_all_issue,
                modalShow,
                setModalShow,
                mailModelShow,
                setMailModelShow,
                fetchCompanyMails,
                formatDate,
                toCamelCase_Name,
                RemovePath,
                setMailData,
                fetchCompanyMails,
                setData
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
