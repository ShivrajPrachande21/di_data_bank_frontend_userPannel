import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { toast } from 'react-toastify';
import BaseUrl from '../../services/BaseUrl';
import { useParams } from 'react-router-dom';

export const AppliedJobContext = createContext();
const DEFAULT_PAGE_SIZE = 10;
export const AppliedJobProvider = ({ children }) => {
    const [appliedJobData, setAppliedJobData] = useState([]);
    const [savedJobData, setsavedJobData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [seletedValue, setSelectedValue] = useState('All');

    const fetch_applied_job = async filter => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/appliedjob/${userId}/${currentPage}/${DEFAULT_PAGE_SIZE}/${seletedValue}`
                );
                const { data, page } = response?.data || {};
    
                if (!data || !Array.isArray(data)) {
                    console.error('Invalid response format');
                    setHasMore(false);
                    return;
                }
    
                // Filter out duplicates
                const newItems = data.filter(
                    item => !appliedJobData.some(existingItem => existingItem._id === item._id)
                );
    
                setAppliedJobData(prevData =>
                    currentPage ==1 ? data : [...prevData, ...newItems]
                );
    
                // Update pagination state
                if (data.length == DEFAULT_PAGE_SIZE) {
                    setHasMore(true);
                    setCurrentPage(parseInt(page) + 1);
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                setHasMore(false);
            }


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
                let data = response?.data?.data;
                let page = response?.data?.page;
                setsavedJobData(response?.data);

                let newItem = data.filter(
                    item =>
                        !savedJobData.some(
                            existingItem => existingItem._id == item._id
                        )
                );
                setsavedJobData(prevCandidates => [
                    ...prevCandidates,
                    ...newItem
                ]);
                if (data.length == 10) {
                    setHasMore(true);
                    setCurrentPage(parseInt(page) + 1);
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                setHasMore(false);
            }
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

    const Accept_offer_lettter = async jobId => {
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
    };

    useEffect(() => {
        fetchSavedJob();
    }, []);
    return (
        <AppliedJobContext.Provider
            value={{
                appliedJobData,
                setAppliedJobData,
                fetch_applied_job,
                setCurrentPage,
                currentPage,
                hasMore,
                setHasMore,
                fetchSavedJob,
                savedJobData,
                setsavedJobData,
                reject_Offered_letter,
                Accept_offer_lettter,
                seletedValue, setSelectedValue
            }}
        >
            {children}
        </AppliedJobContext.Provider>
    );
};
