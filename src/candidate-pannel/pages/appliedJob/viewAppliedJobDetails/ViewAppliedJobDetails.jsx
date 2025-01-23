import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { jwtDecode } from 'jwt-decode';
import ep_back from '../../../../assets/images/ep_back.png';
import avatar from '../../../../assets/images/avatar.png';
import { Col, Image, Row } from 'react-bootstrap';
import iconamoon_arrowd from '../../../../assets/images/iconamoon_arrowd.png';
import ApplicationStatus from './ApplicationStatus';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../../../../services/BaseUrl';
const ViewAppliedJobDetails = () => {
    const id = localStorage.getItem('job_id');
    //const { id } = useParams();
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);

    const [appliedJob, setAppliedJOb] = useState(null);
    const handleSelectClick = () => {
        setIsClicked(!isClicked);
    };

    const sanitizedDescription = DOMPurify.sanitize(
        appliedJob?.jobDescription?.description
    );

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

    const fetchAppliedDetails = async () => {
        try {
            const response = await axios.get(
                `${BaseUrl}candidate/job_details/flow/${id}`
            );
            setAppliedJOb(response?.data);
        } catch (error) {}
    };

    // // application status api
    // const getApplicationData = async () => {
    //     const token = localStorage.getItem('Candidate_token');
    //     if (!token) {
    //         return;
    //     } else {
    //         const decodedToken = jwtDecode(token);
    //         const userId = decodedToken?._id;
    //         try {
    //             const response = await axios.get(
    //                 `${BaseUrl}candidate/application_status/flow/${id}/${userId}`
    //             );
    //             console.log('Application data', response?.data);
    //         } catch (error) {}
    //     }
    // };
    useEffect(() => {
        fetchAppliedDetails();
        // getApplicationData();
    }, []);

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/login');
            } else {
                navigate(
                    '/candidate-dashboard/viewAppliedJobDetails/6708f19552123b3e11a17214'
                );
            }
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        rendering();
    }, []);
    return (
        <>
            <div className="ViewAppliedJobDetails">
                {/* Veiw job decription top section */}
                <div className="view-top">
                    <Col className="d-flex align-items-center applied-desc">
                        <img
                            src={ep_back}
                            alt=""
                            style={{ height: '20px', cursor: 'pointer' }}
                            onClick={() =>
                                navigate(
                                    '/candidate-dashboard/applied-job/applied-jobs'
                                )
                            }
                        />

                        <Image
                            src={appliedJob?.profileUrl}
                            roundedCircle
                            alt="Profile"
                            width="40" // Set the desired width
                            height="40" // Set the desired height
                        />
                        <h6>
                            {appliedJob?.jobDescription?.job_title}
                            <p>{appliedJob?.jobDescription?.industry}</p>
                        </h6>
                    </Col>
                    <Row>
                        <div className="applied-skilss">
                            {appliedJob?.jobDescription?.skills.map(
                                (item, index) => (
                                 
                                      <p style={{fontSize:'0.8rem'}} key={index}>{item}</p>
                                 
                                )
                            )}
                        </div>
                    </Row>

                    <div className="view-applied-details">
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
                                        {appliedJob?.jobDescription?.experience}{' '}
                                        Years
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
                                        {appliedJob?.jobDescription?.location}
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
                                        Job type:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span">
                                        {appliedJob?.jobDescription
                                                ?.job_type}
                                    </span>
                                </td>
                            </tr>
                        </table>
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
                                        Salary:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span">
                                        {appliedJob?.jobDescription?.salary}
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
                                        {appliedJob?.jobDescription?.education}
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
                                        Work  type:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span">
                                        {
                                            appliedJob?.jobDescription
                                                ?.work_type
                                        }
                                    </span>
                                </td>
                            </tr>
                        </table>
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
                                        Posted:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span">
                                        {formatDate(
                                            appliedJob?.jobDescription
                                                ?.createdDate
                                        )}
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
                                        {
                                            appliedJob?.jobDescription
                                                ?.No_openings
                                        }
                                    </span>
                                </td>
                            </tr>
                                        
                        </table>
                    </div>

                   
                    <p className="view-top-p" onClick={handleSelectClick}>
                        Job Description
                        <img src={iconamoon_arrowd} alt="" width="20px" />
                    </p>
                    {isClicked && (
                        <div
                            style={{ marginLeft: '14px' }}
                            className="view-job-description"
                        >
                            <div
                                className="job-discription"
                                style={{ fontSize: '0.7rem' }}
                                dangerouslySetInnerHTML={{
                                    __html: sanitizedDescription
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className="application-status">
                    <p>Application status:</p>
                    <ApplicationStatus />
                </div>
            </div>
        </>
    );
};

export default ViewAppliedJobDetails;
