import React, { useContext, useEffect, useState } from 'react';
import { Row, Button, Col, Form } from 'react-bootstrap';
import './appliedjob.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppliedJobContext } from '../../../context/candidateContext/AppliedJobContext';
import { Helmet } from 'react-helmet';
const AppliedJob = () => {
    const {
        fetch_applied_job,
        setCurrentPage,
        seletedValue,
        setSelectedValue
    } = useContext(AppliedJobContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = data => {
        console.log('${id}', data);
        let id = 1;
        if (data === 'applied-jobs') {
            navigate('applied-jobs');
        }
        // } else if (data === `saved-jobs/${id}`) {
        //     navigate(`saved-jobs/${id}`);
        // }
    };
    function navigateSave(id) {
        let applied = 'applied';
        navigate(`saved-jobs/${applied}`);
    }

    const handleSelectchange = async e => {
        navigate('/candidate-dashboard/applied-job/applied-jobs');
        const { value } = e.target;

        setSelectedValue(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        fetch_applied_job(seletedValue);
    }, [seletedValue]);

    // Function to determine button style based on the path
    const getButtonStyle = path => {
        if (location.pathname.includes(path)) {
            return {
                background: '#B4DDFF',
                color: '#051F50',
                border: 'none',
                width: '200px',

                border: '0.5px solid #5baaff',
                width: '200px'
            };
        } else {
            return {
                background: 'white',
                color: '#AEAEAE',
                border: 'none',
                width: '200px'
            };
        }
    };
    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/login');
            } else {
                navigate('/candidate-dashboard/applied-job/applied-jobs');
            }
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        return () => {
            setSelectedValue('All');
        };
    }, []);
    return (
        <div className="applied-job">
            <Helmet>
                <title>Applied Jobs</title>
                <meta
                    name="description"
                    content="Find your dream job on our platform."
                />
                <meta
                    name="keywords"
                    content="jobs, career, search jobs, employment"
                />
            </Helmet>
            <Row>
                <Col>
                    <div className="applied-btns">
                        <Button
                            size="sm"
                            style={{ background: 'none', border: 'none' }}
                            onClick={() => handleNavigate('applied-jobs')}
                        >
                            <Form.Select
                                style={{
                                    border: '0.5px solid #5baaff',
                                    width: '200px',
                                    fontSize: '0.8rem'
                                }}
                                aria-label="Default select example"
                                onChange={e => handleSelectchange(e)}
                            >
                                <option value="All">All</option>

                                <option value="ApplicationSend">
                                    Application Send
                                </option>
                                <option value="ApplicationShortlist">
                                    Application Shortlist
                                </option>
                                <option value="JobOfferReject">
                                    JobOffer Reject
                                </option>
                                <option value="Hired">Hired</option>
                            </Form.Select>
                        </Button>

                        <Button
                            size="sm"
                            // style={{ width: '200px', background: '#5baaff' }}
                            style={getButtonStyle('saved-jobs')}
                            onClick={() => navigateSave(1)}
                        >
                            Saved Jobs{' '}
                        </Button>
                    </div>
                </Col>
            </Row>
            <Outlet />
        </div>
    );
};

export default AppliedJob;
