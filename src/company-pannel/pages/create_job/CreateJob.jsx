import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import './create_job.css';
import whitepluse from '../../../assets/images/whiteplus.png';
import hamburger from '../../../assets/images/hamburger.png';
import { CreateJobContext } from '../../../context/CreateJobContext';
import CreateNewJob from './create_new_Job/CreateNewJob';
import Verified from '../../../assets/images/Verified.png';
import altprofile from '../../../assets/images/altprofile.jpg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../../../services/BaseUrl';
import Loader from '../loader/Loader';
import { toast } from 'react-toastify';
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
    //const { orderId } = useParams();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowhide, setModalShowhide] = React.useState(null);
    const [PromoteJobData, setPromoteJobData] = useState(null);
    const [modalShows, SetmodalShow] = useState(false);
    const [orderId, SetOrderId] = useState('');
    const [jobId, setJob_id] = useState('');
    const [PromoteLoading, SetPromoteLoading] = useState(null);

    const handleClose = () => {
        const jobPosting0 = job_status?.SubscriptionStatus[0]?.job_posting || 0;
        const jobPosting1 = job_status?.SubscriptionStatus[1]?.job_posting || 0;

        if (jobPosting0 + jobPosting1 === 0) {
            if (!job_status?.SubscriptionStatus[0]) {
                toast.error('Please buy a subscription plan');
            } else {
                toast.error('Please upgrade your subscription plan');
            }
            return;
        }

        setLgShow(prev => !prev);
    };

    const handleToggleDropdown = index => {
        setIsDropdownOpen(prevState => (prevState === index ? null : index)); // Toggle dropdown
    };

    // Function to update the window width
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
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
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const company_id = decodedToken?._id;
            const response = await axios.post(
                `${BaseUrl}company/promote_job/payment`,
                {
                    company_id,
                    jobId
                }
            );
            if (response.status == 200 || response?.status == 201) {
                promoteJob = response?.data;
                const paymentLink = response?.data?.paymentLink;
                if (paymentLink) {
                    window.open(paymentLink, '_blank');
                }
            }
            Run_Promote_verify(promoteJob);
        } catch (error) {
            console.error('Error during payment initiation:', error);
        }
    };
    let toUpIntervelId;
    let ToptimeoutId;
    const fetch_topUp_success_status = async data => {
        try {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id;

            const response = await axios.post(
                `${BaseUrl}company/promote_job/verify`,
                {
                    orderId: data?.order_id,
                    jobId: data?.jobId,
                    company_id: companyId,
                    paymentMethod: data?.payment_methods || 'UPI'
                }
            );
            if (response?.status === 200 || response?.status === 201) {
                SetPromoteLoading(false);
                SetOrderId(response.data?.orderId);
                clearInterval(toUpIntervelId);
                clearTimeout(ToptimeoutId);
                fetch_job_status();
                setModalShowhide(false);
                SetmodalShow(true);
            }
        } catch (error) {
            console.error('Error during verification:', error);
        }
    };

    function Run_Promote_verify(data) {
        toUpIntervelId = setInterval(() => {
            fetch_topUp_success_status(data);
        }, 1000);

        ToptimeoutId = setTimeout(() => {
            clearInterval(toUpIntervelId);
        }, 1000 * 60 * 5);
    }

    useEffect(() => {
        if (paymentLoading == false) {
            setModalShow(true);
        }
    }, [paymentLoading]);

    // Add event listener on component mount and clean up on unmount
    useEffect(() => {
        window.addEventListener('resize', handleResize);
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

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            if (!token) {
                naviagte('/login');
            } else {
                naviagte('/main/create-job');
            }
        } else {
            naviagte('/login');
        }
    }

    const formatDateExp = isoDate => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        rendering();
    }, []);

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
                            size="sm"
                        >
                            <img src={whitepluse} alt="" width="20px" />
                            Create a Job{' '}
                            <span>
                                (
                                {(job_status?.SubscriptionStatus[0]
                                    ?.AdminSubscription[0]?.job_posting || 0) +
                                    (job_status?.SubscriptionStatus[1]
                                        ?.AdminSubscription[0]?.job_posting ||
                                        0)}
                                /
                                {(job_status?.SubscriptionStatus[0]
                                    ?.job_posting || 0) +
                                    (job_status?.SubscriptionStatus[1]
                                        ?.job_posting || 0)}{' '}
                                remaining)
                            </span>
                        </Button>
                    </Col>
                    <Col xs={windowWidth < 768 ? 12 : 8} className="job-data">
                        <div className="job-created-data">
                            <p>
                                {job_status?.dataWithJobCounts[0]?.jobCount ||
                                    0}
                            </p>
                            <p className="total-activ"> Job Created</p>
                        </div>
                        <div className="job-created-data">
                            <p style={{ color: '#3B96E1' }}>
                                {job_status?.dataWithJobCounts[0]
                                    ?.activeJobCount || 0}
                            </p>
                            <p className="total-activ"> Active Job</p>
                        </div>
                        <div
                            className="job-created-data "
                            style={{ marginLeft: '4px' }}
                        >
                            <p>
                                {job_status?.dataWithJobCounts[0]
                                    ?.application_recieved || 0}
                            </p>
                            <p className="total-activ">Applications Received</p>
                        </div>
                        <div
                            className="job-created-data"
                            style={{ marginLeft: '4px' }}
                        >
                            <p style={{ color: '#FF6F00' }}>
                                {job_status?.dataWithJobCounts[0]
                                    ?.candidate_pipeline || 0}
                            </p>
                            <p className="total-activ">
                                Candidates in Pipeline
                            </p>
                        </div>
                        <div
                            className="job-created-data"
                            style={{ border: 'none' }}
                        >
                            <p style={{ color: '#06C306' }}>
                                {job_status?.dataWithJobCounts[0]
                                    ?.candidate_hired || 0}
                            </p>
                            <p className="total-activ">Candidates Hired</p>
                        </div>
                    </Col>
                </Row>
                {/* card Sections */}
                <Row className="mt-4">
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px'
                        }}
                    >
                        {job_status?.PostedJobList &&
                        job_status?.PostedJobList.length > 0 ? (
                            job_status?.PostedJobList.map((item, index) => (
                                <>
                                    <div className="card-job">
                                        <div className="job-head">
                                            <h6>
                                                {item?.job_title &&
                                                item?.job_title.length > 18
                                                    ? `${item.job_title.substring(
                                                          0,
                                                          18
                                                      )}...`
                                                    : item?.job_title}
                                            </h6>
                                            {item?.Green_Batch ? (
                                                <img
                                                    src={Verified}
                                                    alt="Verified"
                                                    width="19"
                                                    style={{
                                                        marginTop: '-7px',
                                                        marginLeft: '-10px'
                                                    }}
                                                />
                                            ) : null}
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
                                                            : 'Stop Applications'}
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
                                                    Promote job
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
                                                            {item?.experience}{' '}
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
                                                            {item?.location
                                                                .length > 12
                                                                ? `${item.location.substring(
                                                                      0,
                                                                      12
                                                                  )}
                                                            ...`
                                                                : item?.location}
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
                                                            Posted Date:
                                                        </span>{' '}
                                                    </td>
                                                    <td>
                                                        {' '}
                                                        <span className="card-table-span">
                                                            {formatDate(
                                                                item?.createdDate
                                                            )}{' '}
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
                                                            Expiry Date:
                                                        </span>{' '}
                                                    </td>
                                                    <td>
                                                        {' '}
                                                        <span className="card-table-span">
                                                            {formatDateExp(
                                                                item?.job_Expire_Date
                                                            )}
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
                                                        : item
                                                              ?.applied_candidates
                                                              .length}{' '}
                                                    {new Date(
                                                        item?.job_Expire_Date
                                                    ) <= new Date() // Convert job_Expire_Date to a Date object
                                                        ? 'Job Expired'
                                                        : !item?.status
                                                        ? 'Applications Stopped'
                                                        : item?.No_openings ===
                                                          0
                                                        ? 'Hired'
                                                        : 'Applications'}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        ) : (
                            <div className="no-jobs-container">
                                <span>You haven't created any jobs yet.</span>
                            </div>
                        )}
                    </div>
                </Row>

                {modalShows && (
                    <Modal
                        show={modalShows}
                        size="sm" // Keep small size
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        className="compact-modal" // Custom class for additional styling
                    >
                        <Modal.Header
                            closeButton
                            style={{ padding: '0.5rem', borderBottom: 'none' }}
                        >
                            <Modal.Title
                                id="contained-modal-title-vcenter"
                                className="text-center w-100"
                            >
                                <h6 className="text-success mb-0">
                                    🎉 Payment Successful!
                                </h6>{' '}
                                {/* Smaller header */}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '0.5rem 1rem' }}>
                            <div className="text-center">
                                <p
                                    className="mb-1"
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#6c757d'
                                    }}
                                >
                                    Order ID:{orderId}
                                </p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer
                            style={{ padding: '0.5rem', borderTop: 'none' }}
                        >
                            <Button
                                onClick={() => SetmodalShow(false)}
                                style={{
                                    width: '100%',
                                    padding: '0.4rem 0',
                                    background: '#3B96E1',
                                    border: 'none',
                                    fontSize: '0.85rem'
                                }}
                            >
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
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
                                {'₹' + PromoteJobData?.price}
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
