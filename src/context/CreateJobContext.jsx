import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import BaseUrl from '../services/BaseUrl';
import { toast } from 'react-toastify';

// Create the context
export const CreateJobContext = createContext();

// Create the provider component
export const CreateJobProvider = ({ children }) => {
    const [lgShow, setLgShow] = useState(null);
    const [job_status, setJob_status] = useState(null);
    const [viewJobDesciptionData, setviewJobDesciption] = useState(null);
    const [applicantData, setapplicantData] = useState(null);
    const [shortListData, setShortlistData] = useState(null);
    const [hiredCandidateData, sethiredCandidateData] = useState(null);
    const [loading, setloading] = useState(null);
    const [Finalise_true, setFinalise_true] = useState(null);
    const [job_offered, setjob_offered] = useState(null);
    const fetch_job_status = async () => {
        const token = localStorage.getItem('companyToken');

        // Decode the token to get the payload
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;
        try {
            const response = await axios.get(
                `${BaseUrl}company/job_status/${companyId}`
            );
            setJob_status(response?.data);
        } catch (error) {}
    };

    const stop_restar_job = async job_id => {
        try {
            const response = await axios.put(
                `${BaseUrl}company/job_Restart/${job_id}`
            );
            if (response.status === 200) {
                await fetch_job_status();
                toast.success(response?.data?.message);
            }
        } catch (error) {
            toast.error('Failed to Stop the Job');
        }
    };
    // Delete Job in Create Jon module
    const delete_job_status = async cmp_id => {
        try {
            const response = await axios.delete(
                `${BaseUrl}company/Job_post/${cmp_id}`
            );
            if (response.status === 200) {
                await fetch_job_status();
                toast.success('job Deleted Successfully');
            }
        } catch (error) {
            toast.error('Failed to Deleted ');
        }
    };

    const viewJobDescription = async job_id => {
        const jobid = localStorage.getItem('job_id');
        console.log('harshendra Id', jobid);

        try {
            const response = await axios.get(
                `${BaseUrl}company/view_job/${jobid}`
            );
            setviewJobDesciption(response?.data);
        } catch (error) {}
    };

    const fetch_Job_applicant = async () => {
        const jobid = localStorage.getItem('job_id');

        console.log('appp', jobid);

        try {
            const response = await axios.get(
                `${BaseUrl}company/listout_applicant/${jobid}`
            );
            setapplicantData(response?.data);
        } catch (error) {}
    };

    const shortlis_candidate = async user_id => {
        const jobid = localStorage.getItem('job_id');
        console.log('hagjagja', user_id, jobid);
        try {
            const response = await axios.put(
                `${BaseUrl}company/sortlist/candidate/${jobid}/${user_id}`
            );
            if (response?.status == 200) {
                await fetch_Job_applicant();
                toast.success('success');
            }
        } catch (error) {}
    };

    const fetch_shortlist = async () => {
        const jobid = localStorage.getItem('job_id');
        console.log('shivraj', jobid);

        try {
            const response = await axios.get(
                `${BaseUrl}company/listout_sortliste/applicent/${jobid}`
            );
            setShortlistData(response?.data);
        } catch (error) {}
    };

    const fetch_hire_candidate = async () => {
        const hired_id = localStorage.getItem('hired');
        const jobid = localStorage.getItem('job_id');

        try {
            const response = await axios.get(
                `${BaseUrl}company/get_user_detail/hire/${jobid}/${hired_id}`
            );
            sethiredCandidateData(response?.data[0]);
        } catch (error) {}
    };

    const handle_feedback = async (rating, feedback, user_id) => {
        console.log('data in contex', user_id);
        const jobid = localStorage.getItem('job_id');

        try {
            const response = await axios.put(
                `${BaseUrl}company/add_feedback/${jobid}/${user_id}`,
                {
                    rating,
                    feedback
                }
            );
            if (response.status == 200) {
                toast.success('success');
                fetch_shortlist();
                setloading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
    };

    const get_job_offered = async () => {
        const jobid = localStorage.getItem('job_id');
        const user_id = localStorage.getItem('getJobofferId');
        try {
            const response = await axios.get(
                `${BaseUrl}company/get_user_offer/${jobid}/${user_id}`
            );
            setjob_offered(response?.data[0]);
        } catch (error) {}
    };

    useEffect(() => {
        // Fetch all data when the component mounts
        const fetchData = async () => {
            await fetch_job_status(); // Fetch job status
            await viewJobDescription(); // Fetch job description
            await fetch_Job_applicant(); // Fetch job applicants
            await fetch_shortlist(); // Fetch shortlisted applicants
        };

        fetchData(); // Call the fetch function
    }, []);

    return (
        <CreateJobContext.Provider
            value={{
                job_status,
                setJob_status,
                delete_job_status,
                stop_restar_job,
                stop_restar_job,
                viewJobDesciptionData,
                viewJobDescription,
                applicantData,
                shortlis_candidate,
                shortListData,
                hiredCandidateData,
                handle_feedback,
                loading,
                // finalise_candidate,
                // reject_finalise_candidate,
                // Finalise_true,
                job_offered,
                fetch_shortlist,
                get_job_offered,
                lgShow,
                setLgShow,
                fetch_hire_candidate
            }}
        >
            {children}
        </CreateJobContext.Provider>
    );
};
