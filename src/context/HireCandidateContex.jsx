import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import BaseUrl from '../services/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
const socket = io('http://localhost:4000');

// Create the context
export const HireCandidateContext = createContext();

let id;
// Context Provider component
export const HireCandidateProvider = ({ children }) => {
    const [appliedcandidate, setappliedcandidate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [SearchLoading, setSearchLoading] = useState(null);

    const [email_loading, setEmail_loading] = useState(null);
    const [resume_loading, setResume_loading] = useState(null);

    const [candidate_detials, set_candidate_detials] = useState(null);

    // states for notification
    const [show, setShow] = useState(null);
    const [showHire, SetShowHire] = useState(null);
    const [candidateNoti, SetcandidateNoti] = useState(null);
    console.log('harshendra canidai notification', candidateNoti);
    const handleCloseHire = id => {
        const token = localStorage.getItem('companyToken');
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;
        socket.emit('viewnotification', companyId, id);
        socket.on('view', data => {
            SetcandidateNoti(data);
        });
        setShow(false);
        SetShowHire(prev => !prev);
    };
    console.log('showHire', showHire);

    // subsciption data
    const [Subscription_Data, setSubscription_Data] = useState({});
    // Function to fetch data
    const fetchCandidates = async () => {
        setLoading(true);
        const token = localStorage.getItem('companyToken');
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id; // Assuming the token contains an 'id' for the company

        if (!companyId) {
            throw new Error('Invalid token');
        }
        try {
            const response = await axios.get(
                `${BaseUrl}company/get_appliedcandidate/${companyId}`
            ); // Your API endpoint here
            setappliedcandidate(response?.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const get_subscription_details = async () => {
        const token = localStorage.getItem('companyToken');
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id; // Assuming the token contains an 'id' for the company

        if (!companyId) {
            throw new Error('Invalid token');
        }
        try {
            const response = await axios.get(
                `${BaseUrl}company/subscription_count_status/${companyId}`
            );

            setSubscription_Data(response?.data?.subscriptionData);
        } catch (error) {}
    };

    // Downlaod Emails
    const downloadSelectedEmails = async selectedCandidates => {
        // console.log('selectedCandidateIds in context:', selectedCandidateIds);
        if (selectedCandidates.length === 0) {
            toast.error('Please select at least one candidate.');
            return;
        }
        const token = localStorage.getItem('companyToken');
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id; // Assuming the token contains an 'id' for the company

        if (!companyId) {
            throw new Error('Invalid token');
        }

        try {
            // Ensure selectedCandidateIds is an array of simple values

            const response = await axios.post(
                `${BaseUrl}company/download_email/${companyId}`,
                { selectedCandidates },
                {
                    responseType: 'blob' // Important to get the file as a blob
                }
            );

            // Create URL and trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'selected_emails.csv'); // Filename for download
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading emails:', error);
        }
    };

    // Download Resumes
    const handleDownload_Resume = async selectedCandidates => {
        if (selectedCandidates.length === 0) {
            toast.error('Please select at least one candidate.');
            return;
        }
        setResume_loading(true);
        const token = localStorage.getItem('companyToken');
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id; // Assuming the token contains an 'id' for the company

        if (!companyId) {
            throw new Error('Invalid token');
        }
        try {
            const response = await axios.post(
                `${BaseUrl}company/download_resume/${companyId}`,
                { selectedCandidates },
                {
                    responseType: 'blob' // Important: this tells axios to expect a binary file
                }
            );
            if (response.status === 200) {
                setResume_loading(false);
            }

            // Create a URL and download the zip file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'selected_resumes.zip');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading resumes', error);
            alert('Failed to download resumes.');
        }
    };

    const get_Candidate_detials = async id => {
        id = id;
        const token = localStorage.getItem('companyToken');
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;
        try {
            const response = await axios.get(
                `${BaseUrl}company/get_candidatedetails/${id}/${companyId}`
            );

            set_candidate_detials(response?.data);
        } catch (error) {}
    };

    const Search_bye_keyWord = async seachBarData => {
        setSearchLoading(true);

        const token = localStorage.getItem('companyToken');
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;
        try {
            const response = await axios.post(
                `${BaseUrl}company/get_searchcandiate/${companyId}`,
                {
                    search: seachBarData.search,
                    experience: seachBarData.experience,
                    location: seachBarData.location
                }
            );
            if (response.status == 200) {
                setappliedcandidate(response?.data);
                get_subscription_details();
                setSearchLoading(false);
                // toast.success('jhgaj');
            }
        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
    };
    // Fetch candidates when the component mounts
    console.log('Status', Subscription_Data);

    useEffect(() => {
        fetchCandidates();
        get_subscription_details();
    }, []);

    console.log('id', id);
    return (
        <HireCandidateContext.Provider
            value={{
                resume_loading,
                appliedcandidate,
                loading,
                candidate_detials,
                error,
                fetchCandidates,
                Subscription_Data,
                downloadSelectedEmails,
                handleDownload_Resume,
                get_Candidate_detials,
                Search_bye_keyWord,
                SearchLoading,
                handleCloseHire,
                showHire,
                SetShowHire,
                candidateNoti,
                show,
                setShow
            }}
        >
            {children}
        </HireCandidateContext.Provider>
    );
};
