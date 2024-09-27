import { useState, useEffect } from 'react';
import axios from 'axios';
import BaseUrl from './../../services/BaseUrl';
import { jwtDecode } from 'jwt-decode';

const useDashboardData = url => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [verfifyOffer, setverfifyOffer] = useState();
    const [hide, sethide] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('companyToken');

            // Decode the token to get the payload
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id; // Assuming the token contains an 'id' for the company
            console.log('token', decodedToken);
            if (!companyId) {
                throw new Error('Invalid token');
            }
            try {
                const response = await axios.get(
                    `${BaseUrl}/company/dashboard_status/${companyId}`
                );
                setData(response.data);
            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [url]);

    const VerifyJob = async PAN => {
        const token = localStorage.getItem('companyToken');

        // Decode the token to get the payload
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id; // Assuming the token contains an 'id' for the company

        if (!companyId) {
            throw new Error('Invalid token');
        }
        try {
            console.log('Pan verify', PAN);
            const response = await axios.get(
                `${BaseUrl}company/offer_verifier/${companyId}/${PAN}`
            );
            if (response.status === 200) {
                setverfifyOffer(response?.data?.message);
                sethide(true);
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, VerifyJob, verfifyOffer, sethide, hide };
};

export default useDashboardData;
