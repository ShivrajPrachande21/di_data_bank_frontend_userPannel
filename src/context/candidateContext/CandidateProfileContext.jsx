import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { toast } from 'react-toastify';
import BaseUrl from '../../services/BaseUrl';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const CandidateProfileContext = createContext();
let exp_id = '';
let project = '';

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
    const [showProjectModel, setShowProjectModel] = useState(null);
    const [showEDitProject, setShowEditProject] = useState(null);
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
    const [projectData, setProjectData] = useState({
        project_title: '',
        Project_status: '',
        Project_duration: '',
        project_details: '',
        project_site: '',
        role: '',
        skills_used: '',
        project_url: '',
        year: '',
        month: '',
        _id: ''
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
    const handleShowProject = () => {
        setShowProjectModel(prev => !prev);
    };

    const handleShowEditProject = () => {
        setShowEditProject(prev => !prev);
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

    const getProjectData = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const id = decodedToken?._id;
            try {
                const response = await axios.get(`${BaseUrl}`);
            } catch (error) {}
        }
    };
    const [numbers, setNumbers] = useState([]);

    const extractNumbers = text => {
        let extracted = [];
        let currentNumber = '';

        for (let char of text) {
            if (!isNaN(char) && char !== ' ') {
                // Check if the character is a number
                currentNumber += char; // Build the current number
            } else if (currentNumber) {
                extracted.push(Number(currentNumber)); // Push the number when a non-numeric character is encountered
                currentNumber = ''; // Reset the current number
            }
        }

        // Push the last number if any
        if (currentNumber) {
            extracted.push(Number(currentNumber));
        }
        setNumbers(extracted);

        return extracted;
    };

    const getSingleProject = async project_id => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/profile/get_single/project/${user_id}/${project_id}`
                );
                const fetchedData = response?.data;
                const data = extractNumbers(fetchedData?.Project_duration);

                let year = data[0]; // Assign 0 if not found
                let month = data[1]; // Assign 0 if not found

                if (response.status == 200 || response.status == 201) {
                    setProjectData({
                        ...projectData,
                        project_title: fetchedData?.project_title,
                        Project_status: fetchedData?.Project_status,
                        Project_duration: fetchedData?.Project_duration,
                        project_details: fetchedData?.project_details,
                        project_site: fetchedData?.project_site,
                        role: fetchedData?.role,
                        skills_used: fetchedData?.skills_used,
                        project_url: fetchedData?.project_url,
                        year: year,
                        month: month,
                        _id: project_id
                    });
                }
            } catch (error) {
                console.log('ERRoR', error);
            }
        }
    };

    const UpdateProjectData = async project_id => {
        const Project_duration = {
            ...projectData,
            Project_duration: `${projectData.year} year , ${projectData.month} month `
        };

        // Create a new object with the data you want to send

        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken?._id;
            try {
                const response = await axios.put(
                    `${BaseUrl}candidate/profile/edit_project/${user_id}/${projectData?._id}`,
                    Project_duration,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
                            'Content-Type': 'application/json' // Set content type
                        }
                    }
                );
                if (response.status == 200 || response.status == 201) {
                    toast.success('Project Data Updated Successfully');
                    await fetchCandidateProfile();
                    handleShowEditProject();
                }
            } catch (error) {}
        }
    };
    const handleDelete = async project_id => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken?._id;
            try {
                const response = await axios.delete(
                    `${BaseUrl}candidate/profile/delete_projects/${project_id}/${user_id}`
                );
                if (response.status == 200 || response.status == 201) {
                    toast.success('Project Data Deleted Successfully');
                    await fetchCandidateProfile();
                }
            } catch (error) {
                toast.error('Failed to Delete Data');
            }
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
                EditPersonalDetails,
                showProjectModel,
                setShowProjectModel,
                handleShowProject,
                showEDitProject,
                setShowEditProject,
                handleShowEditProject,
                getSingleProject,
                projectData,
                setProjectData,
                UpdateProjectData,
                handleDelete
            }}
        >
            {children}
        </CandidateProfileContext.Provider>
    );
};
