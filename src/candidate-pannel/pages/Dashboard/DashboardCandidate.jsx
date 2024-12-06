import React, { useEffect, useState } from 'react';
import './dashboardC.css';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Spinner
} from 'react-bootstrap';
import createjobblue from '../../../assets/images/createjobblue.png';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import BaseUrl from '../../../services/BaseUrl';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
const DashboardCandidate = () => {
    const yearStartISO = moment().startOf('year').toISOString();
    const yearEndISO = moment().endOf('year').toISOString();
    const [DashboardData, setDashboardData] = useState(null);
    const [SelectedData, setSelectedData] = useState('All');
    const [apiResponse, setApiResponse] = useState(null);
    const locate = useLocation();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(yearStartISO);
    const [EndDate, setEndDate] = useState(yearEndISO);
    const [loading, setloading] = useState(false);

    const getDashboardData = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/dashboard/${userId}`
                );
                setDashboardData(response?.data);
            } catch (error) {}
        }
    };

    const getSelectedData = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            setloading(true);
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/dashboard/job/status/${userId}/${startDate}/${EndDate}`
                );
                setApiResponse(response?.data);
                if (response.status == 200 || response.status == 201) {
                    setloading(false);
                }
            } catch (error) {}
        }
    };
    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = date.getUTCDate();
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec'
        ];
        const month = monthNames[date.getUTCMonth()];
        const year = date.getUTCFullYear().toString().slice(-2);

        // Add suffix to day
        const daySuffix = day => {
            if (day > 3 && day < 21) return `${day}th`;
            switch (day % 10) {
                case 1:
                    return `${day}st`;
                case 2:
                    return `${day}nd`;
                case 3:
                    return `${day}rd`;
                default:
                    return `${day}th`;
            }
        };

        return `${daySuffix(day)} ${month} ${year}`;
    }

    const handlSelectChange = async e => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/dashboard/job/status/${userId}/${startDate}/${EndDate}`
                );
                setApiResponse(response?.data);
            } catch (error) {}
        }
    };

    const handleStartChange = e => {
        const date = new Date(e.target.value);
        const isoDate = date.toISOString();
        setStartDate(isoDate);
    };
    const handleEndChange = e => {
        const date = new Date(e.target.value);
        const isoDate = date.toISOString();
        setEndDate(isoDate);
        getSelectedData();
    };

    useEffect(() => {
        const fun = async () => {
            await getDashboardData();
            await getSelectedData();
        };
        fun();
    }, [locate]);

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/login');
            } else {
                navigate('/candidate-dashboard/dashboard');
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
            <div className="DashboardCandidate">
                <div style={{ width: '100%' }}>
                    <Row>
                        <Col md={4} style={{ marginRight: '-10px' }}>
                            <Card>
                                <div className="candidate-dashboard-subscription-card">
                                    <div className="my-plan-dashboard">
                                        <h2>My Plan :</h2>
                                        <span>
                                            {DashboardData?.existedPlane
                                                ?.plane_name || 0}
                                        </span>
                                    </div>
                                    <div className="ai-sub-cards-details">
                                        <p>Get Featured in Top {}Candidate </p>
                                        <h4
                                            style={{
                                                color: '#3B96E1',
                                                marginTop: '-10px',
                                                fontWeight: '600'
                                            }}
                                        >
                                            {DashboardData?.existedPlane
                                                ?.top_candidate || 0}
                                        </h4>
                                        <p>AI Job Recommendation </p>
                                        <h4
                                            style={{
                                                color: '#3B96E1',
                                                marginTop: '-10px',
                                                fontWeight: '600'
                                            }}
                                        >
                                            0
                                        </h4>
                                        <p>AI Search </p>
                                        <h4
                                            style={{
                                                color: '#3B96E1',
                                                marginTop: '-10px',
                                                fontWeight: '600'
                                            }}
                                        >
                                            0
                                        </h4>
                                    </div>
                                    <div className="expiry-date-sub">
                                        <p>
                                            Ends on :
                                            {formatDate(
                                                DashboardData?.existedPlane
                                                    ?.expiresAt || 0
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <div className="left-card-ai">
                                <div className="ai-cards-div">
                                    <div className="drop-down-list">
                                        <div className="custom-select-sub-date">
                                            <p>Start Date</p>

                                            <input
                                                type="date"
                                                onChange={handleStartChange}
                                            />
                                        </div>
                                        <div className="custom-select-sub-date">
                                            <p>End Date</p>

                                            <input
                                                type="date"
                                                onChange={handleEndChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="ai-cards-div">
                                    <p>Offere Accpected Count</p>{' '}
                                    <h4 style={{ color: '#008000' }}>
                                        {' '}
                                        {apiResponse?.offer_accepted_count || 0}
                                    </h4>
                                </div>
                                <div className="ai-cards-div">
                                    <p>Job Applied Count</p>
                                    <h4 style={{ color: '#3B96E1' }}>
                                        {apiResponse?.applied_candidates_count ||
                                            0}
                                    </h4>
                                </div>
                                <div className="ai-cards-div">
                                    <p>Offere Rejected Count</p>
                                    <h4 style={{ color: '#FF0000' }}>
                                        {' '}
                                        {apiResponse?.offer_rejected_count || 0}
                                    </h4>
                                </div>
                                <div className="ai-cards-div">
                                    <p>Shortlisted Count</p>
                                    <h4 style={{ color: '#3B96E1' }}>
                                        {' '}
                                        {apiResponse?.shortlisted_candidates_count ||
                                            0}
                                    </h4>
                                </div>
                                <div className="ai-cards-div">
                                    <p>Offere Processing Count</p>
                                    <h4 style={{ color: '#FF8C00' }}>
                                        {' '}
                                        {apiResponse?.offer_processing_count ||
                                            0}
                                    </h4>
                                </div>
                                <div className="ai-cards-div">
                                    <p>Profile View Count</p>
                                    <h4 style={{ color: '#3B96E1' }}>
                                        {' '}
                                        {apiResponse?.count || 0}
                                    </h4>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mt-3"></Row>
                </div>
            </div>
        </>
    );
};

export default DashboardCandidate;
