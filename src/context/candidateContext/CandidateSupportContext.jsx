import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import BaseUrl from '../../services/BaseUrl';
import axios from 'axios';

export const CandidateSupportContext = createContext();
export const CandidateSupportProvider = ({ children }) => {
    const [supportData, setSupportData] = useState(null);
    const [modalShow, setModalShow] = useState(null);
    const [mailModelShow, setMailModelShow] = React.useState(false);
    const [Data, setdata] = useState('shajivr');
    const [hide, setHide] = useState(1);
    const fetch_Candidate_issue = async () => {
        const token = localStorage.getItem('Candidate_token');

        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/get_issue/${userId}`
                );
                setSupportData(response?.data?.data);
            } catch (error) {}
        }
    };
    function RemovePath(imageUrl) {
        if (imageUrl) {
            return imageUrl.split('\\').pop();
        }
        return 'N/A';
    }
    const formatDate = dateString => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
    };
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

    return (
        <CandidateSupportContext.Provider
            value={{
                hide,
                setHide,
                supportData,
                fetch_Candidate_issue,
                Data,
                modalShow,
                setModalShow,
                mailModelShow,
                setMailModelShow,
                RemovePath,
                formatDate,
                toCamelCase_Name
            }}
        >
            {children}
        </CandidateSupportContext.Provider>
    );
};
