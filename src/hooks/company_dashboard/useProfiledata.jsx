import { useState, useEffect } from 'react';
import axios from 'axios';
import BaseUrl from '../../services/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';

// Adjust the path based on your project structure

const useProfileData = userId => {
    const locate = useLocation();
    const [profileData, setProfileData] = useState(null); // Profile data state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('companyToken');

            // Decode the token to get the payload
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id; // Assuming the token contains an 'id' for the company
            console.log('token', decodedToken);
            if (!companyId) {
                throw new Error('Invalid token');
            }
            try {
                // Fetch the profile data from API
                const response = await axios.get(
                    `${BaseUrl}company/profile/${companyId}`
                );
                setProfileData(response.data); // Store data in state
            } catch (err) {
                setError(err.message || 'Failed to fetch profile data');
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchProfileData();
    }, [locate]); // Re-run the effect if userId changes

    // Return data, loading, and error for consumption in components
    return { profileData, loading, error };
};

export default useProfileData;
