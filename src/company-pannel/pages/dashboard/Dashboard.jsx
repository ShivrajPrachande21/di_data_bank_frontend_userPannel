import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './dashboard.css';
import carbon_send from '../../../assets/images/carbon_send.png';
import useDashboardData from '../../../hooks/company_dashboard/useDashboardData';

const Dashboard = () => {
    const { data, loading, error, VerifyJob, verfifyOffer, sethide, hide } =
        useDashboardData();
    const [PAN, setPAN] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    console.log('dashboard', data);

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

    useEffect(() => {
        setTimeout(() => {
            sethide(null);
        }, 10000);
    }, [hide]);
    return (
        <div style={{ color: 'black' }}>
            <Container fluid style={{ background: '', paddingLeft: '20px' }}>
                {/*First Row Card */}
                <div class="row">
                    <div class="col-4  d-flex align-items-center justify-content-center dashboard-card  first-row ">
                        <div className="col-2 dashboard-div ">
                            {/* <img src={building} width="40vw" alt="" /> */}
                        </div>
                        <div className="col-10 ">
                            <p className="h1 dashboard-p">Total Job Created</p>
                            <p className="h1 loading">
                                {' '}
                                {data?.jobCreatedCount || 'loading'}
                            </p>
                        </div>
                    </div>
                    {/*2 Row Card */}
                    <div
                        class="col-4 d-flex align-items-center justify-content-center  first-row  "
                        style={{
                            marginLeft: '6px',
                            padding: '15px 10px',
                            background: 'rgba(255, 255, 255, 1)',
                            borderRadius: '8px'
                        }}
                    >
                        <div className="col-2 " style={{ marginRight: '8px' }}>
                            {/* <img src={Cadidate} width="40vw" alt="" /> */}
                        </div>
                        <div className="col-10 ">
                            <p
                                className="h1"
                                style={{
                                    color: 'var(--text-color, #343434)',
                                    fontFamily: 'Poppins',
                                    fontSize: '0.8rem',

                                    fontWeight: '500'
                                }}
                            >
                                Total Applications Received
                            </p>
                            <p
                                className="h1"
                                style={{
                                    color: 'var(--Primary-color, #3B96E1)',
                                    fontWeight: ' 500;',
                                    fontSize: '1rem'
                                }}
                            >
                                {' '}
                                {data?.applicationRecieved || 'loading'}
                            </p>
                        </div>
                    </div>
                    {/*3 Row Card */}
                    <div
                        class="col-3 d-flex align-items-center justify-content-center first-row "
                        style={{
                            marginLeft: '6px',
                            background: 'rgba(255, 255, 255, 1)',
                            borderRadius: '8px'
                        }}
                    >
                        <div className="col-2 " style={{ marginRight: '8px' }}>
                            {/* <img src={JobCreatedIcon} width="40vw" alt="" /> */}
                        </div>
                        <div className="col-10 ">
                            <p
                                className="h1"
                                style={{
                                    color: 'var(--text-color, #343434)',
                                    fontFamily: 'Poppins',
                                    fontSize: '0.8rem',

                                    fontWeight: '500'
                                }}
                            >
                                Total Candidates Hired
                            </p>
                            <p
                                className="h1"
                                style={{
                                    color: 'var(--Primary-color, #3B96E1)',
                                    fontWeight: ' 500;',
                                    fontSize: '1rem'
                                }}
                            >
                                {data?.HiredCount}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-4  dashboard-card  first-row  ">
                        <div className="col-12  mt-2 dashboard-div d-flex">
                            <p className="myplan-p ">My Plan:</p>
                            <p className="myplan-btn">
                                {data?.subscriptionData[0].plane_name}
                            </p>
                        </div>

                        <div className="col-12">
                            <p className="Candidates">Candidates Searches</p>
                            <h3 className="Candidates-s">
                                {' '}
                                {
                                    data?.subscriptionData[0]
                                        ?.AdminSubscription[0]?.search_limit
                                }
                            </h3>
                        </div>
                        <div className="col-12">
                            <p className="Candidates">CV Views</p>
                            <h3 className="Candidates-s">
                                {
                                    data?.subscriptionData[0]
                                        .AdminSubscription[0]?.cv_view_limit
                                }{' '}
                                /{data?.subscriptionData[0].cv_view_limit}
                                <span style={{ marginLeft: '4px' }}>
                                    Remaining
                                </span>
                            </h3>
                        </div>
                        <div className="col-12">
                            <p className="Candidates">Ai Searches</p>
                            <h3 className="Candidates-s">Remaining</h3>
                        </div>
                        <div className="col-12">
                            <p className="Candidates-cv">
                                Multiple CV downloads
                            </p>
                            <h3 className="Candidates-s">
                                {data?.subscriptionData[0]?.download_cv_limit
                                    ? 'Unlimited'
                                    : ' ----'}
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
                                    : ' ----'}
                            </h3>
                        </div>
                        <div className="col-12">
                            <p className="Candidates-cv">Create Job</p>
                            <h3 className="Candidates-s">
                                {
                                    data?.subscriptionData[0]
                                        ?.AdminSubscription[0]?.job_posting
                                }{' '}
                                / {data?.subscriptionData[0]?.job_posting}
                            </h3>
                        </div>
                        <div className="col-12 ">
                            <p className="only">
                                Only for Premium/Enterprise - UPGRADE
                            </p>
                            <p className="ends-on">
                                {data?.subscriptionData[0]?.expiresAt}
                            </p>
                        </div>
                    </div>
                    {/*2 Row Card */}
                    <div
                        class="col-4 "
                        style={{
                            marginLeft: '6px',
                            padding: '15px 10px',
                            background: 'rgba(255, 255, 255, 1)',
                            borderRadius: '8px',
                            height: '170px'
                        }}
                    >
                        <div className="col-2 " style={{ marginRight: '8px' }}>
                            {/* <img src={Cadidate} width="40vw" alt="" /> */}
                        </div>
                        <div className="col-10 ">
                            <p
                                className="h1"
                                style={{
                                    color: 'var(--text-color, #343434)',
                                    fontFamily: 'Poppins',
                                    fontSize: '0.8rem',

                                    fontWeight: '500'
                                }}
                            >
                                Offer Verifier
                            </p>
                            <p
                                className="h1"
                                style={{
                                    color: '#AEAEAE',
                                    fontWeight: ' 100;',
                                    fontSize: '0.8rem',
                                    marginTop: '30px'
                                }}
                            >
                                Enter pan number
                            </p>
                            <div className="input-pan">
                                {' '}
                                <form onSubmit={handleVerifyJob}>
                                    <input
                                        type="text"
                                        placeholder="Ex: PGDHG4651G"
                                        name="PAN"
                                        value={PAN}
                                        onChange={handleChange}
                                    />
                                    <button
                                        style={{
                                            border: 'none',
                                            background: 'white'
                                        }}
                                    >
                                        {' '}
                                        <img src={carbon_send} alt="" />
                                    </button>
                                </form>
                            </div>
                            {hide && (
                                <div className="input-success">
                                    <p>{verfifyOffer}</p>
                                </div>
                            )}
                            <p className="pan-error">{errorMessage}</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Dashboard;
