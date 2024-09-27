import { useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../services/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

// Custom hook to handle form submission
const EditprofileData = url => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [hideForm, setHideForm] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const [smShow, setSmShow] = useState(false);

    const submitForm = async (formFields, gstImage, panImage, profileImage) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const formData = new FormData();

            // Append form fields to FormData
            Object.keys(formFields).forEach(key => {
                formData.append(key, formFields[key]);
            });

            // Append the image if present
            if (gstImage) {
                formData.append('gstImage', gstImage);
            }
            if (panImage) {
                formData.append('panImage', panImage);
            }
            if (profileImage) {
                formData.append('profile', profileImage);
            }
            // Make the POST request with Axios
            const token = localStorage.getItem('companyToken');

            // Decode the token to get the payload
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id; // Assuming the token contains an 'id' for the company
            console.log('token', decodedToken);
            if (!companyId) {
                throw new Error('Invalid token');
            }
            const response = await axios.put(
                `${BaseUrl}company/edit/profile/${companyId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.status === 200) {
                toast.success('Profile edited successfully');
                setHideForm(true);
                setSmShow(false);
                setSuccess(response.data);
                setLgShow(false);
            }

            // Handle success

            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            toast.error(error?.response?.data?.error);
            setError(error);
            console.error('Error submitting the form:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        submitForm,
        loading,
        error,
        success,
        hideForm,
        lgShow,
        setLgShow,
        smShow,
        setSmShow
    };
};

export default EditprofileData;
