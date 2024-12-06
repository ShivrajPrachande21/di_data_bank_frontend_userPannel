import axios from 'axios';
import { createContext, useState } from 'react';
import BaseUrl from '../services/BaseUrl';
import { set } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
export const AccessManagementContext = createContext();

export const AccessProvider = ({ children }) => {
    const [accessData, setAccessData] = useState(null);
    const [showModule, setShowModule] = useState(null);
    const [showEditModule, setEditModule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sideBarData, setSideBarData] = useState({
        dashboard: true,
        hire_candidate: false,
        create_job: false,
        creadibility: false,
        subscription: false,
        transaction: false,
        support: false,

        access_management: false,
        email: ''
    });
    const [formData, setFormData] = useState({
        dashboard: true,
        hire_candidate: false,
        create_job: false,
        creadibility: false,
        subscription: false,
        transaction: false,
        support: false,

        access_management: false,
        email: ''
    });
    const getAllSubAdmin = async () => {
        setLoading(true);
        const token = localStorage.getItem('companyToken');

        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const cmpId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}company/get/subadmin/${cmpId}`
                );
                setAccessData(response?.data);
                if (response?.status == 200 || response?.status == 201) {
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.log('Error while Fetching data', error);
            }
        }
    };

    const AddNewHR = async data => {
        const token = localStorage.getItem('companyToken');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const cmpId = decodedToken?._id;
            try {
                const response = await axios.post(
                    `${BaseUrl}company/add_hr/${cmpId}`,

                    data
                );
                if (response.status == 200 || response?.status == 201) {
                    toast.success('New HR Added Successfully ');
                    await getAllSubAdmin();
                    setShowModule(prev => !prev);
                }
            } catch (error) {
                const customError = error?.response?.data?.error;
                toast.error(customError);
            }
        }
    };
    const DeleteUser = async email => {
        const token = localStorage.getItem('companyToken');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const cmpId = decodedToken?._id;
            try {
                const response = await axios.delete(
                    `${BaseUrl}/company/delete_hr/${cmpId}/${email}`
                );
                if (response.status == 200 || response?.status == 201) {
                    await getAllSubAdmin();
                    toast.success('User Deleted Successfully');
                }
            } catch (error) {
                const customError = error?.response?.data?.error;
                toast.error(customError);
            }
        }
    };
    const getSingleData = async () => {
        const token = localStorage.getItem('companyToken');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const cmpId = decodedToken?._id;
            const email = decodedToken?.email;
            try {
                const response = await axios.get(
                    `${BaseUrl}company/get/single_access/${cmpId}/${email}`
                );
                const fethedData = response?.data;
                if (response?.status == 200 || response?.status == 201) {
                    // setSideBarData(response?.data);
                    setSideBarData({
                        ...sideBarData,
                        email: fethedData?.email,

                        create_job: fethedData?.create_job,
                        hire_candidate: fethedData?.hire_candidate,
                        creadibility: fethedData?.creadibility,
                        subscription: fethedData?.subscription,
                        transaction: fethedData?.transaction,
                        support: fethedData?.support,
                        access_management: fethedData?.access_management
                    });
                }
            } catch (error) {}
        }
    };
    const getSingleDatatoEdit = async email => {
        const token = localStorage.getItem('companyToken');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const cmpId = decodedToken?._id;

            try {
                const response = await axios.get(
                    `${BaseUrl}company/get/single_access/${cmpId}/${email}`
                );
                const fethedData = response?.data;
                if (response?.status == 200 || response?.status == 201) {
                    setFormData({
                        ...formData,
                        email: fethedData?.email,

                        create_job: fethedData?.create_job,
                        hire_candidate: fethedData?.hire_candidate,
                        creadibility: fethedData?.creadibility,
                        subscription: fethedData?.subscription,
                        transaction: fethedData?.transaction,
                        support: fethedData?.support,
                        access_management: fethedData?.access_management
                    });
                }
            } catch (error) {}
        }
    };
    const EditUser = async email => {
        const token = localStorage.getItem('companyToken');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const cmpId = decodedToken?._id;
            try {
                const response = await axios.put(
                    `${BaseUrl}company/edit_hr/responsibility/${cmpId}/${formData?.email}`,
                    formData
                );
                if (response?.status == 200 || response?.status == 201) {
                    await getAllSubAdmin();
                    toast.success('Updated Successfully');
                    setEditModule(false);
                }
            } catch (error) {
                const customError = error?.response?.data?.error;
                toast.error(customError);
            }
        }
    };
    return (
        <AccessManagementContext.Provider
            value={{
                getAllSubAdmin,
                accessData,
                AddNewHR,
                showModule,
                setShowModule,
                loading,
                setLoading,
                showEditModule,
                setEditModule,
                DeleteUser,
                getSingleData,
                formData,
                setFormData,
                EditUser,
                getSingleDatatoEdit,
                sideBarData
            }}
        >
            {children}
        </AccessManagementContext.Provider>
    );
};
