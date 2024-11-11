import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { toast } from 'react-toastify';
import BaseUrl from '../../services/BaseUrl';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const CandidateProfileContext = createContext();
let exp_id = '';

export const CandidateProfileProvider = ({ children }) => {
    const [CandidateProfile, setCandidateProfile] = useState(null);
    const [Edit_ExpData, setEdit_ExpData] = useState(null);
    const [modalShow, setModalShow] = useState(null);
    const [modalShowEdit, setmodalShowEdit] = useState(null);
    const [personalModal, setPersonalModal] = useState(null);
    const [ExpModle, setExpModel] = useState(null);
    const [showWork, setShowWork] = useState(null);
    const [showEducation, setShowEducation] = useState(null);
    const [showAddeducation, setshowAddeducation] = useState(null);
    const [editExp, setEditExp] = useState(null);

    const [expData, setExpData] = useState({
        End_posistion: false,
        companyName: '',
        current_workingStatus: false,
        designation: '',
        location: '',
        location_type: '',
        negotiation_day: '',
        notice_period: '',
        reporting_structure: '',
        start_date: '',
        employee_type: '',
        end_date: '',
        CTC: ''
    });

    const showEditExp = async id => {
        exp_id = id;
        setEditExp(prev => !prev);
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/profile/get_single/exp/${userId}/${exp_id}`
                );
                setEdit_ExpData(response?.data);
                const fetchedData = response?.data;

                // Update the state with the fetched data and ensure fields are set properly
                setExpData({
                    ...editExp, // Use the fetched data directly
                    End_posistion: fetchedData?.End_posistion,
                    companyName: fetchedData?.companyName,
                    current_workingStatus:
                        fetchedData?.current_workingStatus || false,
                    designation: fetchedData?.designation,
                    location: fetchedData?.location,
                    location_type: fetchedData?.location,
                    negotiation_day: fetchedData?.negotiation_day,
                    notice_period: fetchedData?.notice_period,
                    reporting_structure: fetchedData?.reporting_structure,
                    start_date: fetchedData?.start_date,
                    employee_type: fetchedData?.employee_type,
                    end_date: fetchedData?.end_date,
                    CTC: fetchedData?.CTC
                });
            } catch (error) {}
        }
    };
    const Submit_edit_experience = async () => {
        console.log('exppDat', expData);
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.put(
                    `${BaseUrl}/candidate/profile/edit_exp/${userId}/${exp_id}`,
                    expData
                );
                if (response?.status == 200 || response?.status == 201) {
                    toast.success('Experience Edited ');
                    await fetchCandidateProfile();
                    showEditExp();
                }
            } catch (error) {
                toast.error(` ${error.response.data.error}`);
            }
        }
    };
    const showAdd_new_Education = () => {
        setshowAddeducation(prev => !prev);
    };
    const handleShowEducation = () => {
        setShowEducation(prev => !prev);
    };
    const handleShowWork = () => {
        setShowWork(prev => !prev);
    };
    const showExperiencelModal = () => {
        setExpModel(prev => !prev);
    };
    const showPersonalModal = () => {
        setPersonalModal(prev => !prev);
    };

    const showModal = user_id => {
        setModalShow(prev => !prev);
    };

    const showEditModle = user_id => {
        setmodalShowEdit(prev => !prev);
    };

    const fetchCandidateProfile = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const id = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/profile/${id}`
                );
                setCandidateProfile(response?.data);
            } catch (error) {}
        }
    };

    const [myDetails, setmyDetails] = useState(null);
    const fetchCandidateMydetails = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const id = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/profile/get_basic/${id}`
                );
                setmyDetails(response?.data);
            } catch (error) {}
        }
    };

    const EditPersonalDetails = async data => {
        const token = localStorage.getItem('Candidate_token');
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken?._id;
        try {
            const response = await axios.put(
                `${BaseUrl}candidate/profile/edit_personal/${user_id}`,

                data
            );
            if (response?.status == 200 || response?.status == 201) {
                toast.success('Personal details edited successfully');
                showPersonalModal();
                await fetchCandidateProfile();
            }
        } catch (error) {
            toast.error(`${error.response.data.error}`);
        }
    };

    return (
        <CandidateProfileContext.Provider
            value={{
                showWork,
                handleShowWork,
                setEdit_ExpData,
                Edit_ExpData,
                CandidateProfile,
                fetchCandidateProfile,
                modalShow,
                showModal,
                myDetails,
                fetchCandidateMydetails,
                modalShowEdit,
                showEditModle,
                setmodalShowEdit,
                showPersonalModal,
                personalModal,
                ExpModle,
                setExpModel,
                showExperiencelModal,
                editExp,
                showEditExp,
                expData,
                setExpData,
                Submit_edit_experience,
                editExp,
                showEducation,
                handleShowEducation,
                showAddeducation,
                showAdd_new_Education,
                EditPersonalDetails
            }}
        >
            {children}
        </CandidateProfileContext.Provider>
    );
};
