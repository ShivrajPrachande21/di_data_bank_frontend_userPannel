import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { toast } from 'react-toastify';
import BaseUrl from '../../services/BaseUrl';
export const SearchJobContext = createContext();

export const SearchJobProvider = ({ children }) => {
    const [hasMore, setHasMore] = useState(true);
    const [visibleItems, setVisibleItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [JobData, setJobdata] = useState();
    const [totalPage, SetTotalPage] = useState(0);

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectValue, setselectValue] = useState(itemsPerPage);

    const handleSelect = e => {
        const value = parseInt(e.target.value, 10);
        setselectValue(value);
        setItemsPerPage(value);
        setCurrentPage(1); 
    };

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };
    const fetch_search_job = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/getunappliedjob/${userId}/${currentPage}/${itemsPerPage}`
                );
                let data = response?.data?.data;
                let page = response?.data?.totalPages;
                SetTotalPage(page);
                setVisibleItems(data);
            } catch (err) {
                // setHasMore(false);
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
                if (response.status == 200 || response?.status == 201) {
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
    const getSingleJobDetails = async id => {
        try {
            const response = await axios.get(
                `${BaseUrl}candidate/getjobdetails/${id}`
            );

            setJobdata(response?.data);
        } catch (error) {}
    };
    return (
        <SearchJobContext.Provider
            value={{
                selectValue,
                JobData,
                setJobdata,
                fetch_search_job,
                applyTo_job,
                save_job,
                hasMore,
                visibleItems,
                setVisibleItems,
                currentPage,
                setCurrentPage,
                getSingleJobDetails,
                handleSelect,
                handlePageChange,
                totalPage,
                SetTotalPage
            }}
        >
            {children}
        </SearchJobContext.Provider>
    );
};
