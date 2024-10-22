import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { toast } from 'react-toastify';
import BaseUrl from '../../services/BaseUrl';
export const SearchJobContext = createContext();
let id = '';
export const SearchJobProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [visibleItems, setVisibleItems] = useState([]);

    const fetch_search_job = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/getunappliedjob/${userId}`
                );

                setData(response?.data || []); // Assuming the response has a jobs array
                setVisibleItems(response?.data || []);
                setHasMore(response.data?.length > 0);
            } catch (error) {}
        }
    };

    // Load more jobs function
    const loadMoreJobs = async () => {
        if (hasMore) {
            // Fetch additional jobs (this assumes your API supports pagination)
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                return;
            }

            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/getunappliedjob/${userId}?offset=${data.length}`
                );

                const newJobs = response?.data || [];
                setData(prevData => [...prevData, ...newJobs]); // Append new jobs to the existing data
                if (newJobs.length === 0) {
                    setHasMore(false);
                } // Update hasMore based on the new jobs fetched

                console.log('Loading more jobs...');
            } catch (error) {
                console.error('Error loading more jobs:', error);
            }
        }
    };

    const applyTo_job = async jobId => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.post(
                    `${BaseUrl}candidate/jobapply/${userId}/${jobId}`
                );
                if (response.status == 200 || 201) {
                    toast.success('Job Applied successfully ');
                    fetch_search_job();
                }
            } catch (error) {}
        }
    };
    const save_job = async jobId => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.post(
                    `${BaseUrl}candidate/savejob/${userId}/${jobId}`
                );
                if (response.status == 200 || 201) {
                    toast.success('Job Saved successfully');
                    fetch_search_job();
                }
            } catch (error) {}
        }
    };

    return (
        <SearchJobContext.Provider
            value={{
                data,
                fetch_search_job,
                applyTo_job,
                save_job,
                hasMore,
                loadMoreJobs,
                setData,
                visibleItems,
                setVisibleItems
            }}
        >
            {children}
        </SearchJobContext.Provider>
    );
};
