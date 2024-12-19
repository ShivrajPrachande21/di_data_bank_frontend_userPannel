import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import BaseUrl from '../../services/BaseUrl';
import axios from 'axios';

export const CandidateSupportContext = createContext();
export const CandidateSupportProvider = ({ children }) => {
    const [supportData, setSupportData] = useState(null);
    const [modalShow, setModalShow] = useState(null);
    const [Data, setdata] = useState('shajivr');
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

    return (
        <CandidateSupportContext.Provider
            value={{
                supportData,
                fetch_Candidate_issue,
                Data,
                modalShow,
                setModalShow
            }}
        >
            {children}
        </CandidateSupportContext.Provider>
    );
};
