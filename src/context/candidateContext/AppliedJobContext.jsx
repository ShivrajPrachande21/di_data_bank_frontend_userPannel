import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { toast } from 'react-toastify';
import BaseUrl from '../../services/BaseUrl';
import { useParams } from 'react-router-dom';

export const AppliedJobContext = createContext();

export const AppliedJobProvider = ({ children }) => {
    const [appliedJobData, setAppliedJobData] = useState(null);
    const [savedJobData, setsavedJobData] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetch_applied_job = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/appliedjob/${userId}`
                );

                setAppliedJobData(response?.data);
            } catch (error) {}
        }
    };

    const fetchSavedJob = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}/candidate/savedjob/${userId}`
                );
                setsavedJobData(response?.data);
                console.log('Saved  Jobs', response?.data);
            } catch (error) {}
        }
    };

    // reject offerd letter
    const reject_Offered_letter = async jobId => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.put(
                    `${BaseUrl}candidate/applicent/reject_offer/${jobId}/${userId}`
                );
                if (response.status == 200 || 201) {
                    toast.success('Offer letter rejected successfully');
                }
            } catch (error) {
                toast.error('error');
            }
        }
    };

    const Accept_offer_lettter=async(jobId)=>{
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.put(
                    `${BaseUrl}candidate/applicent/accept_offer/${jobId}/${userId}`
                );
                if (response.status == 200 || 201) {
                    toast.success('Offer letter Accepted successfully');
                }
            } catch (error) {
                toast.error('error');
            }
        }
    }

    useEffect(() => {
        fetchSavedJob();
    }, []);
    return (
        <AppliedJobContext.Provider
            value={{
                appliedJobData,
                fetch_applied_job,
                fetchSavedJob,
                savedJobData,
                reject_Offered_letter,
                Accept_offer_lettter
            }}
        >
            {children}
        </AppliedJobContext.Provider>
    );
};
