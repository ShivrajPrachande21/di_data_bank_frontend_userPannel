import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { toast } from 'react-toastify';
import BaseUrl from '../../services/BaseUrl';
export const SearchJobContext = createContext();

export const SearchJobProvider = ({ children }) => {
    const [hasMore, setHasMore] = useState(true);
    const [visibleItems, setVisibleItems] = useState([]);
    const [ currentPage,setCurrentPage]=useState(1)

    const fetch_search_job = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/getunappliedjob/${userId}/${currentPage}/${10}`
                );
                let data=response?.data?.data;
                let page=response?.data?.page
                    const newItems = data.filter(
                        (item) => !visibleItems.some((existingItem) => existingItem._id == item._id)
                    );
            
                    setVisibleItems((prevCandidates) => [...prevCandidates, ...newItems]);
                if (data.length ==10) {
                        setHasMore(true);
                        setCurrentPage(parseInt(page)+ 1); 
                  
                } else {
                    setHasMore(false); 
                }
            }
            catch (err) {
                setHasMore(false);
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
                fetch_search_job,
                applyTo_job,
                save_job,
                hasMore,
                visibleItems,
                setVisibleItems,
                currentPage,setCurrentPage
            }}
        >
            {children}
        </SearchJobContext.Provider>
    );
};
