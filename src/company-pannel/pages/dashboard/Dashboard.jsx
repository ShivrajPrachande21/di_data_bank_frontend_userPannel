import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import './dashboard.css';
import carbon_send from '../../../assets/images/carbon_send.png';
import useDashboardData from '../../../hooks/company_dashboard/useDashboardData';
import CandidateHiredIcon from '../../../assets/images/CandidateHiredIcon.png';
import CandidateOnboardedIcon from '../../../assets/images/CandidateOnboardedIcon.png';
import building from '../../../assets/images/building.png';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../../../services/BaseUrl';
import moment from 'moment';
const Dashboard = () => {
    const { data, loading, error, VerifyJob, verfifyOffer, sethide, hide } =
        useDashboardData();
    const yearStartISO = moment().startOf('year').toISOString();
    const yearEndISO = moment().endOf('year').toISOString();
    const navigate = useNavigate();
    const loacate = useLocation();
    const [PAN, setPAN] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [SelectedData, setSelectedData] = useState('All');
    const [dasboardData, setDashboardData] = useState(null);
    const [startDate, setStartDate] = useState(yearStartISO);
    const [EndDate, setEndDate] = useState(yearEndISO);

    const handleVerifyJob = e => {
        e.preventDefault();
        VerifyJob(PAN);
    };

    const validatePAN = pan => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return panRegex.test(pan);
    };

    // onChange handler for the input field
    const handleChange = e => {
        const value = e.target.value.toUpperCase(); // Convert input to uppercase
        setPAN(value);

        // Validate the PAN and update validation status and error message
        if (value === '') {
            setErrorMessage(''); // Clear error message if input is empty
        } else if (validatePAN(value)) {
            setErrorMessage(''); // PAN is valid, no error message
        } else {
            setErrorMessage('PAN number format is invalid.'); // Set error message
        }
    };

    const getSelectedData = async () => {
        const token = localStorage.getItem('companyToken');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}company/subscription/count/${userId}/${SelectedData}`
                );
                setDashboardData(response?.data);
            } catch (error) {}
        }
    };
    const handlSelectChange = async e => {
        const selectedText = e.target.value;
        setSelectedData(selectedText);
        const token = localStorage.getItem('companyToken');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}company/subscription/count/${userId}/${selectedText}`
                );
                setDashboardData(response?.data);
            } catch (error) {}
        }
    };

    // const getSelectedData = async () => {
    //     const token = localStorage.getItem('Candidate_token');
    //     if (!token) {
    //         return;
    //     } else {
    //         setloading(true);
    //         const decodedToken = jwtDecode(token);
    //         const userId = decodedToken?._id;
    //         try {
    //             const response = await axios.get(
    //                 `${BaseUrl}candidate/dashboard/job/status/${userId}/${startDate}/${EndDate}`
    //             );
    //             setApiResponse(response?.data);
    //             if (response.status == 200 || response.status == 201) {
    //                 setloading(false);
    //             }
    //         } catch (error) {}
    //     }
    // };

    const handleStartChange = e => {
        const date = new Date(e.target.value);
        const isoDate = date.toISOString();
        setStartDate(isoDate);
        console.log('startDate', startDate);
    };
    const handleEndChange = e => {
        const date = new Date(e.target.value);
        const isoDate = date.toISOString();
        setEndDate(isoDate);
        //  getSelectedData();
    };
    useEffect(() => {
        setTimeout(() => {
            sethide(null);
        }, 10000);
    }, [hide]);

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            if (!token) {
                navigate('/login');
            } else {
                navigate('/main/dashboard');
            }
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        const fun = async () => {
            await getSelectedData();
        };
        fun();
        rendering();
    }, []);

    return (
        <div style={{ padding: '10px' }}>
            <>
                {/*First Row Card */}
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <div className="c-dsahboard-top-cards">
                        <img src={building} alt="" />
                        <div className="c-card-content">
                            <h3>Total Job Created</h3>
                            <p>{dasboardData?.data?.totalJobs || 0}</p>
                        </div>
                        <div className="custom-select-company">
                            <div className="custom-select-sub-date">
                                <p> Date</p>

                                <input
                                    type="date"
                                    onChange={handleStartChange}
                                />
                            </div>

                            {/* <Form.Select
                                    aria-label="Default select example"
                                    size="sm"
                                    className="selecte"
                                    onChange={e => handlSelectChange(e)}
                                >
                                    <option>select</option>
                                    <option value="All">All</option>
                                    <option value="Today">Today</option>
                                    <option value="Thisweek">This Week</option>
                                    <option value="Thismonth">This Month</option>
                                    <option value="Thisyear">This Year</option>
                                </Form.Select> */}
                        </div>
                    </div>

                    <div className="c-dsahboard-top-cards">
                        <img src={CandidateOnboardedIcon} alt="" />
                        <div className="c-card-content">
                            <h3>Total Applications Received</h3>
                            <p>
                                {dasboardData?.count[0]
                                    ?.totalAppliedCandidates || 0}
                            </p>
                        </div>
                    </div>

                    <div className="c-dsahboard-top-cards">
                        <img src={CandidateHiredIcon} alt="" />
                        <div className="c-card-content">
                            <h3>Total Candidates Hired</h3>
                            <p>
                                {dasboardData?.count[0]?.totalHiredCandidates ||
                                    0}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 mx-1 ">
                    <div class="col-5  dashboard-card  first-row  ">
                        <div className="col-12  mt-2 dashboard-div d-flex">
                            <p className="myplan-p ">My Plan:</p>
                            <p className="myplan-btn">
                                {data?.subscriptionData[0].plane_name || 'N/A'}
                            </p>
                            {data?.subscriptionData[1]?.plane_name?
                            (
                                <p className="myplan-btn">
                                {data?.subscriptionData[1]?.plane_name}
                            </p>
                            ):null
                            }
                        </div>

                        <div className="col-12">
                            <p className="Candidates">Candidates Searches</p>
                            <h3 className="Candidates-s">
                                {' '}
                                {data?.subscriptionData[0]?.AdminSubscription[0]
                                    ?.search_limit +(data?.subscriptionData[1]&& data?.subscriptionData[1]?.AdminSubscription[0]
                                        ?.search_limit||0)}
                                     {data?.subscriptionData[0].search_limit ==
                                'Unlimited'
                                    ? null
                                    : `/${
                                          data?.subscriptionData[0]
                                              .search_limit+(data?.subscriptionData[1]&& data?.subscriptionData[1]
                                                ?.search_limit||0)
                                      }`}
                               
                            </h3>
                        </div>
                        <div className="col-12">
                            <p className="Candidates">CV Views</p>
                            <h3 className="Candidates-s">
                                {data?.subscriptionData[0].AdminSubscription[0]
                                    ?.cv_view_limit+(data?.subscriptionData[1]&&data?.subscriptionData[1].AdminSubscription[0]
                                        ?.cv_view_limit||0)}{' '}
                                {data?.subscriptionData[0].cv_view_limit ==
                                'Unlimited'
                                    ? null
                                    : `/${
                                          data?.subscriptionData[0]
                                              .cv_view_limit+(data?.subscriptionData[1]&&data?.subscriptionData[1]
                                                ?.cv_view_limit||0)
                                      }`}
                               
                            </h3>
                        </div>
                        <div className="col-12">
                            <p className="Candidates">Ai Searches</p>
                            <h3 className="Candidates-s">0</h3>
                        </div>
                        <div className="col-12">
                            <p className="Candidates-cv">
                                Multiple CV downloads
                            </p>
                            <h3 className="Candidates-s">
                                {data?.subscriptionData[0]?.download_cv_limit
                                    ? 'Unlimited'
                                    :'N/A'}
                            </h3>
                        </div>
                        <div className="col-12">
                            <p className="Candidates-cv">
                                Multiple Emails downloads
                            </p>
                            {}
                            <h3 className="Candidates-s">
                                {' '}
                                {data?.subscriptionData[0]?.download_email_limit
                                    ? 'Unlimited'
                                    :'N/A'}
                            </h3>
                        </div>
                        <div className="col-12">
                            <p className="Candidates-cv">Create Job</p>
                            <h3 className="Candidates-s">
                                {
                                    data?.subscriptionData[0]
                                        ?.AdminSubscription[0]?.job_posting+(data?.subscriptionData[1]&& data?.subscriptionData[1]
                                            ?.AdminSubscription[0]?.job_posting||0)
                                }{' '}
                                / {data?.subscriptionData[0]?.job_posting+(data?.subscriptionData[1]&&data?.subscriptionData[1]?.job_posting||0)}
                            </h3>
                        </div>
                        <div className="col-12 ">
                            <p className="only">
                                {/* Only for Premium/Enterprise - UPGRADE */}
                            </p>
                            <p className="ends-on">
                                {data?.subscriptionData[0]?.expiresAt}
                            </p>
                        </div>
                    </div>
                    {/*2 Row Card */}

                    <div className="col-12 col-md-7">
                        <div className="company-dashboard-card">
                            <div className="companydashboaord-child-card">
                                <h3>Total Shortlisted Candidate</h3>
                                <p>
                                    {' '}
                                    {dasboardData?.count[0]
                                        ?.totalShortlistedCandidates || 0}
                                </p>
                            </div>
                            <div className="companydashboaord-child-card">
                                <h3>Total Offer Letters</h3>
                                <p>
                                    {' '}
                                    {dasboardData?.count[0]
                                        ?.totalOfferLetters || 0}
                                </p>
                            </div>
                            <div className="companydashboaord-child-card">
                                <h3>Total CV View Count</h3>
                                <p>
                                    {' '}
                                    {dasboardData?.cv_view_count?.totalViewCV ||
                                        0}
                                </p>
                            </div>
                            <div className="companydashboaord-child-card">
                                <h3>Total CV Download Count</h3>
                                <p>
                                    {dasboardData?.cv_view_count
                                        ?.totalDownloadCount || 0}
                                </p>
                            </div>
                            <div className="companydashboaord-child-card">
                                <h3>Total Promoted Jobs</h3>
                                <p>
                                    {' '}
                                    {dasboardData?.data?.totalPromotedJobs || 0}
                                </p>
                            </div>
                            <div className="companydashboaord-child-card">
                                <h3>Total Unpromoted Jobs</h3>
                                <p>
                                    {dasboardData?.data?.totalUnpromotedJobs ||
                                        0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default Dashboard;
