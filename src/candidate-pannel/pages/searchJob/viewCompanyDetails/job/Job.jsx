import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Image } from 'react-bootstrap';
import './jobs.css';
import BaseUrl from '../../../../../services/BaseUrl';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { SearchJobContext } from '../../../../../context/candidateContext/SearchJobContext';
import SavedJobs from './../../../appliedJob/savedJobs/SavedJobs';
import ProfileCompletionModal from '../../../ProfileAlert/ProfileCompletion';
const Job = () => {
    const { applyTo_job, save_job } = useContext(SearchJobContext);
    const { id } = useParams();
    const [jobs, setJobs] = useState(null);

    const getJobs = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;

            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/posted_jobs/company/${id}/${userId}`
                );

                setJobs(response?.data);
            } catch (error) {}
        }
    };

    const formatDate = dateString => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000); // convert ms to minutes

        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins} minutes ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hours ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} days ago`;
    };
    const [showModal, setShowModal] = useState(false);
    const handleApplyJob = async id => {
        await applyTo_job(id);
        await getJobs();
    };
    const handleSaveJob = async id => {
        await save_job(id);
        await getJobs();
    };

    useEffect(() => {
        getJobs();
    }, []);
    return (
        <div
            className="job-scrollbar"
            style={{
                padding: '4px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                overflowY: 'auto',
                height: '50vh'
            }}
        >
            {jobs?.map((item, index) => (
                <>
                    <div
                        className="card-job"
                        // onClick={() => handleNavigate()}
                        style={{
                            marginTop: '10px',
                            width: '260px',
                            height: '226px'
                        }}
                        key={index}
                    >
                        <div className="search-job-top">
                            <h6>{item?.job_title} </h6>
                            <div className="green-thik">
                                {/* <img src={Verified} alt="" height="20px" /> */}
                            </div>
                        </div>

                        <div style={{ marginTop: '-4px', padding: '4px' }}>
                            <table style={{ cursor: 'pointer' }}>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            paddingRight: '30px'
                                        }}
                                    >
                                        <span className="card-table-span">
                                            Experience:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {item?.experience} Years
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            paddingRight: '30px'
                                        }}
                                    >
                                        <span className="card-table-span">
                                            Location:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {item?.location}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            paddingRight: '30px'
                                        }}
                                    >
                                        <span className="card-table-span">
                                            Salary:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {item?.salary} LPA
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            paddingRight: '30px'
                                        }}
                                    >
                                        <span className="card-table-span">
                                            Qualification:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {item?.education}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            paddingRight: '30px'
                                        }}
                                    >
                                        <span className="card-table-span">
                                            Openings:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {item?.No_openings}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            paddingRight: '30px'
                                        }}
                                    >
                                        <span className="card-table-span">
                                            Posted:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {formatDate(item?.createdDate)}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                            <div
                                className="search-job-bnt mt-2"
                                // onClick={handleNavigate}
                            >
                                <Button
                                    size="sm"
                                    style={{
                                        background: 'white',
                                        color: '#3B96E1',
                                        border: '1px solid #3B96E1'
                                    }}
                                    onClick={() => handleSaveJob(item?._id)}
                                >
                                    Save
                                </Button>
                                <Button
                                    size="sm"
                                    style={{
                                        background: '#B4DDFF',
                                        color: '#3B96E1',

                                        border: 'none'
                                    }}
                                    onClick={() => handleApplyJob(item?._id)}
                                >
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            ))}
            {showModal && (
                <ProfileCompletionModal
                    onClose={() => setShowModal(false)} // Close modal handler
                />
            )}
        </div>
    );
};

export default Job;
