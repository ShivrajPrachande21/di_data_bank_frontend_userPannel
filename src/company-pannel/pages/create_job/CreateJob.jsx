import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import './create_job.css';
import whitepluse from '../../../assets/images/whiteplus.png';
import hamburger from '../../../assets/images/hamburger.png';
import { CreateJobContext } from '../../../context/CreateJobContext';
import CreateNewJob from './create_new_Job/CreateNewJob';
import Verified from '../../../assets/images/Verified.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../../../services/BaseUrl';
import Loader from '../loader/Loader';
let promoteJob = {};
const CreateJob = () => {
    const {
        job_status,
        delete_job_status,
        stop_restar_job,
        viewJobDesciptionData,
        viewJobDescription,
        lgShow,
        setLgShow,
        paymentLoading,
        fetch_job_status
    } = useContext(CreateJobContext);

    const naviagte = useNavigate();
    const location = useLocation();
    const { orderId } = useParams();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowhide, setModalShowhide] = React.useState(null);
    const [PromoteJobData, setPromoteJobData] = useState(null);
    const [Promote_job_paymentData, setPromote_job_paymentData] =
        useState(null);
    const [jobId, setJob_id] = useState('');
    const [PromoteLoading, SetPromoteLoading] = useState(null);

    const handleClose = () => setLgShow(preve => !preve);

    const handleToggleDropdown = index => {
        setIsDropdownOpen(prevState => (prevState === index ? null : index)); // Toggle dropdown
    };

    // Function to update the window width
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const formatDate = dateString => {
        const options = { day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
    };

    const handleNavigate = async job_id => {
        localStorage.setItem('job_id', job_id);
        await viewJobDescription(job_id);
        naviagte('/main/view-job-application/applications');
    };

    const handle_promote_job = async data => {
        setJob_id(data);
        try {
            const response = await axios.get(
                `${BaseUrl}company/get_promoted/details`
            );
            setPromoteJobData(response?.data);
        } catch (error) {}

        setModalShowhide(prev => !prev);
    };

    // Promote Job Payment Function
    const PromoteJOb_initiatePayment = async () => {
        SetPromoteLoading(true);

        try {
            console.log('data?', promoteJob);
            // Fetch token from localStorage and decode company ID
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const company_id = decodedToken?._id;

            // Log the sub_id and companyId for debugging

            const response = await axios.post(
                `${BaseUrl}company/promote_job/payment`,
                {
                    company_id,
                    jobId
                }
            );
            if (response.status == 200 || response?.status == 201) {
                promoteJob = response?.data;
                setPromote_job_paymentData(response?.data);

                const paymentLink = response?.data?.paymentLink;
                if (paymentLink) {
                    window.open(paymentLink, '_blank');
                }
            }
            Run_Promote_verify();
        } catch (error) {
            console.error('Error during payment initiation:', error);
        }
    };

    const fetch_topUp_success_status = async () => {
        console.log('promoteJob', promoteJob);
        try {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id;

            const response = await axios.post(
                `${BaseUrl}company/promote_job/verify`,
                {
                    orderId: promoteJob?.order_id,
                    jobId: promoteJob?.job_id,
                    company_id: companyId,
                    paymentMethod: promoteJob?.payment_methods || 'UPI'
                }
            );
            if (response?.status === 200 || response?.status === 201) {
                SetPromoteLoading(false);

                setTimeout(() => {
                    window.location.reload();
                }, 4000);
            }
        } catch (error) {
            console.error('Error during verification:', error);
        }
    };

    function Run_Promote_verify() {
        const toUpIntervelId = setInterval(() => {
            fetch_topUp_success_status();
        }, 1000); // Call every 1 second

        const ToptimeoutId = setTimeout(() => {
            clearInterval(toUpIntervelId);
        }, 1000 * 60 * 5);

        // Watch paymentLoading and clear intervals if it's false
        const checkPaymentLoading = setInterval(() => {
            if (PromoteLoading == false) {
                clearInterval(toUpIntervelId); // Clear the interval for get_payment_success_status
                clearTimeout(ToptimeoutId); // Clear the 5-minute timeout
                clearInterval(checkPaymentLoading); // Clear this watcher interval
            }
        }, 500);
    }
    useEffect(() => {
        if (paymentLoading == false) {
            setModalShow(true);
        }
    }, [paymentLoading]);

    // Add event listener on component mount and clean up on unmount
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await fetch_job_status();
        };

        fetchData();
    }, [location]);

    return (
        <>
            {PromoteLoading ? (
                <div className="loader-div">
                    <Loader />
                </div>
            ) : (
                ''
            )}
            <div className="create-job">
                {!paymentLoading && (
                    <Modal
                        show={modalShow}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Body>
                            <h4>Payment Successfully</h4>
                            <p>OrderId:{orderId}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setModalShow(prev => !prev)}>
                                Ok
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}

                <Row>
                    <Col xs={windowWidth < 768 ? 12 : 3}>
                        <Button
                            className="create-job-btn"
                            onClick={handleClose}
                        >
                            <img src={whitepluse} alt="" width="20px" />
                            Create a Job{' '}
                            <span>
                                (
                                {
                                    job_status?.SubscriptionStatus[0]
                                        ?.AdminSubscription[0]?.job_posting
                                }
                                /
                                {job_status?.SubscriptionStatus[0]?.job_posting}{' '}
                                remaining)
                            </span>
                        </Button>
                    </Col>
                    <Col xs={windowWidth < 768 ? 12 : 8} className="job-data">
                        <div className="job-created-data">
                            <p>{job_status?.dataWithJobCounts[0]?.jobCount}</p>
                            <p className="total-activ">Total Job Created</p>
                        </div>
                        <div className="job-created-data">
                            <p style={{ color: '#3B96E1' }}>
                                {
                                    job_status?.dataWithJobCounts[0]
                                        ?.activeJobCount
                                }
                            </p>
                            <p className="total-activ">Total Active Job</p>
                        </div>
                        <div
                            className="job-created-data "
                            style={{ marginLeft: '4px' }}
                        >
                            <p>
                                {
                                    job_status?.dataWithJobCounts[0]
                                        ?.application_recieved
                                }
                            </p>
                            <p className="total-activ">
                                Total Applications Received
                            </p>
                        </div>
                        <div
                            className="job-created-data"
                            style={{ marginLeft: '4px' }}
                        >
                            <p style={{ color: '#FF6F00' }}>
                                {
                                    job_status?.dataWithJobCounts[0]
                                        ?.candidate_pipeline
                                }
                            </p>
                            <p className="total-activ">
                                Total Candidates in Pipeline
                            </p>
                        </div>
                        <div
                            className="job-created-data"
                            style={{ border: 'none' }}
                        >
                            <p style={{ color: '#06C306' }}>
                                {
                                    job_status?.dataWithJobCounts[0]
                                        ?.candidate_hired
                                }
                            </p>
                            <p className="total-activ">
                                Total Candidates Hired
                            </p>
                        </div>
                    </Col>
                </Row>
                {/* card Sections */}
                <Row className="mt-4">
                    {job_status?.PostedJobList?.map((item, index) => (
                        <>
                            <Col
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={index}
                                className="mb-3"
                            >
                                <div className="card-job">
                                    <div className="job-head">
                                        <h6>{item?.job_title}</h6>

                                        <img
                                            src={hamburger}
                                            alt=""
                                            width="20px"
                                            style={{ cursor: 'pointer' }}
                                            onClick={e => {
                                                handleToggleDropdown(index);
                                                // Prevent navigation
                                            }}
                                        />
                                        {isDropdownOpen === index ? (
                                            <div className="dropdown">
                                                <p
                                                    onClick={() =>
                                                        stop_restar_job(
                                                            item?._id
                                                        )
                                                    }
                                                >
                                                    {!item?.status
                                                        ? 'restart'
                                                        : 'stop Applications'}
                                                </p>

                                                <p
                                                    onClick={() =>
                                                        delete_job_status(
                                                            item?._id
                                                        )
                                                    }
                                                >
                                                    Delete job post
                                                </p>
                                            </div>
                                        ) : null}
                                    </div>
                                    <p
                                        style={{
                                            marginTop: '-18px',
                                            color: item?.promote_job
                                                ? '#3B96E1'
                                                : 'white',
                                            fontSize: '0.8rem',

                                            marginTop: '0px'
                                        }}
                                    >
                                        {item?.promote_job ? (
                                            'Promoted'
                                        ) : (
                                            <button
                                                style={{
                                                    zIndex: '10',
                                                    borderRadius: '8px',
                                                    padding: '2px 8px'
                                                }}
                                                onClick={() =>
                                                    handle_promote_job(
                                                        item?._id
                                                    )
                                                }
                                            >
                                                promote job
                                            </button>
                                        )}
                                    </p>
                                    <div>
                                        <table
                                            onClick={() =>
                                                handleNavigate(item?._id)
                                            }
                                            style={{ cursor: 'pointer' }}
                                        >
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
                                                        Loction:
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
                                                        Poasted:
                                                    </span>{' '}
                                                </td>
                                                <td>
                                                    {' '}
                                                    <span className="card-table-span">
                                                        {formatDate(
                                                            item?.createdDate
                                                        )}{' '}
                                                        days ago
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                        <div
                                            className="div-bnt"
                                            onClick={handleNavigate}
                                        >
                                            <Button
                                                size="sm"
                                                style={{
                                                    background:
                                                        new Date(
                                                            item?.job_Expire_Date
                                                        ) <= new Date()
                                                            ? 'red'
                                                            : !item?.status
                                                            ? '#FFD8CE'
                                                            : item?.No_openings ===
                                                              0,
                                                    color:
                                                        new Date(
                                                            item?.job_Expire_Date
                                                        ) <= new Date()
                                                            ? 'white'
                                                            : !item?.status
                                                            ? 'red'
                                                            : item?.No_openings ===
                                                              0
                                                            ? '#B4FFCE'
                                                            : '',
                                                    border: 'none'
                                                }}
                                            >
                                                {new Date(
                                                    item?.job_Expire_Date
                                                ) <= new Date() // Convert job_Expire_Date to a Date object
                                                    ? ''
                                                    : item?.applied_candidates
                                                          .length}{' '}
                                                {new Date(
                                                    item?.job_Expire_Date
                                                ) <= new Date() // Convert job_Expire_Date to a Date object
                                                    ? 'Job Expired'
                                                    : !item?.status
                                                    ? 'Applications Stopped'
                                                    : item?.No_openings === 0
                                                    ? 'Hired'
                                                    : 'Applications'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </>
                    ))}
                </Row>
                <Modal
                    show={lgShow}
                    onHide={handleClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                    className="custom-modal" // Apply the custom class here
                >
                    <CreateNewJob />
                </Modal>
                <Modal
                    show={modalShowhide}
                    onHide={() => setModalShowhide(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    className="custom-modal-promote"
                >
                    <div className="promote-job">
                        <p>
                            Promote job{' '}
                            <span class="custom-color fw-bold custom-font-size">
                                {'₹' +
                                    (PromoteJobData == []
                                        ? PromoteJobData?.price
                                        : '99')}
                            </span>
                            {/* <img src={Verified} alt="" width="24px" /> */}
                        </p>
                        <div className="promote-btn-div">
                            <Button
                                size="sm"
                                onClick={PromoteJOb_initiatePayment}
                            >
                                PAY
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default CreateJob;
