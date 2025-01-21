import React, { useEffect, useState, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './subscription_.css';
import Rupees1 from '../../../assets/images/Rupees1.png';
import rupeeblue from '../../../assets/images/rupeeblue.png';
import CardCheck from '../../../assets/images/CardCheck.png';
import bluetick from '../../../assets/images/bluetick.png';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SubscriptionContext } from '../../../context/candidateContext/SubscriptionsContext';
import BaseUrl from '../../../services/BaseUrl';
import Loader from '../../../company-pannel/pages/loader/Loader';
import { CandidateProfileContext } from '../../../context/candidateContext/CandidateProfileContext';
import { toast } from 'react-toastify';
import ProfileCompletionModal from '../ProfileAlert/ProfileCompletion';
import { Helmet } from 'react-helmet';

const CandidateSubscription = () => {
    const {
        SubscriptinData,
        fetch_Subscrtipion,
        fetch_CurrentSubscrtipion,
        currentSubscription
    } = useContext(SubscriptionContext);
    const { CandidateProfile, fetchCandidateProfile } = useContext(
        CandidateProfileContext
    );

    const navigate = useNavigate();

    const formatDate = dateString => {
        const date = new Date(dateString);

        // Define day suffixes
        const day = date.getDate();
        const daySuffix = day => {
            if (day > 3 && day < 21) return 'th'; // 4th - 20th
            switch (day % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        };

        // Get the month name
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
        const month = monthNames[date.getMonth()];

        // Get the last two digits of the year
        const year = date.getFullYear().toString().slice(-2);

        // Return formatted date like "20th Sept 24"
        return `${day}${daySuffix(day)} ${month} ${year}`;
    };

    useEffect(() => {
        fetch_Subscrtipion();
        fetch_CurrentSubscrtipion();
        fetchCandidateProfile();
    }, []);
    const [locading, SetEarlyLoading] = useState(false);
    const [orderID, SetOrderID] = useState('');
    const [SuccessModal, SetSuccessModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const initiatePayment = async sub_id => {
        if (CandidateProfile?.profileCompletionPercentage != 100) {
            setShowModal(true);
            return;
        }
        SetEarlyLoading(true);
        try {
            const token = localStorage.getItem('Candidate_token');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;

            const response = await axios.post(`${BaseUrl}candidate/payment`, {
                userId: userId,
                subId: sub_id
            });
            if (response.status === 200 || response.status === 201) {
                const paymentLink = response?.data?.payment_link;
                if (paymentLink) {
                    window.open(paymentLink, '_blank');
                }
            }
            RunEarlyBuy_verify(response?.data);
        } catch (error) {
            console.error('Error during payment initiation:', error);
        }
    };
    let toUpIntervelId;
    let ToptimeoutId;
    const fetch_EarlyBuy_success_status = async data => {
        try {
            const token = localStorage.getItem('Candidate_token');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;

            const response = await axios.post(`${BaseUrl}candidate/verify`, {
                orderId: data?.order_id,
                subscriptionId: data?.subscription_id,
                userId: userId,
                paymentMethod: data?.payment_methods
            });
            if (response?.status === 200 || response?.status === 201) {
                SetEarlyLoading(false);
                clearInterval(toUpIntervelId);
                clearTimeout(ToptimeoutId);
                SetOrderID(response?.data?.orderId);
                SetSuccessModal(true);
                await fetch_Subscrtipion();
                await fetch_CurrentSubscrtipion();
            }
        } catch (error) {
            console.error('Error during verification:', error);
        }
    };

    function RunEarlyBuy_verify(data) {
        toUpIntervelId = setInterval(() => {
            fetch_EarlyBuy_success_status(data);
        }, 1000);

        ToptimeoutId = setTimeout(() => {
            clearInterval(toUpIntervelId);
        }, 1000 * 60 * 5);
    }

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/login');
            } else {
                navigate('/candidate-dashboard/subscription-candidate');
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
            <Helmet>
                <title>Subscription</title>
                <meta
                    name="description"
                    content="Find your dream job on our platform."
                />
                <meta
                    name="keywords"
                    content="jobs, career, search jobs, employment"
                />
            </Helmet>
            {SuccessModal && (
                <Modal
                    show={SuccessModal}
                    onHide={() => SetSuccessModal(false)}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter ">
                            <h4 className="text-success">
                                {' '}
                                Payment Sucessfull !
                            </h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Order ID:{orderID}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => SetSuccessModal(prev => !prev)}
                            style={{ width: '100%', background: '#3B96E1' }}
                        >
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            {locading ? (
                <div className="loader-div">
                    <Loader />
                </div>
            ) : (
                ''
            )}
            <div className="plan">
                <p>Subscription plans</p>
                <hr />

                <div className="sub-cards">
                    {SubscriptinData?.getSubscriptionPlans &&
                        SubscriptinData?.getSubscriptionPlans?.map(
                            (item, index) => (
                                <>
                                    <div className="showdate">
                                        <div
                                            className={
                                                currentSubscription?.plane_name ==
                                                item?.plane_name
                                                    ? 'sub2'
                                                    : 'sub1'
                                            }
                                            style={{
                                                background:
                                                    currentSubscription?.plane_name ==
                                                    item?.plane_name
                                                        ? ''
                                                        : ''
                                            }}
                                        >
                                            <p>{item?.plane_name}</p>
                                            <h4
                                                className={
                                                    currentSubscription?.plane_name ==
                                                    item?.plane_name
                                                        ? 'ruppee2'
                                                        : 'ruppee'
                                                }
                                            >
                                                <img
                                                    src={
                                                        currentSubscription?.plane_name ==
                                                        item?.plane_name
                                                            ? rupeeblue
                                                            : Rupees1
                                                    }
                                                    alt=""
                                                    width="15px"
                                                    style={{
                                                        marginRight: '4px'
                                                    }}
                                                />
                                                {item?.price}
                                                <span>/mon</span>
                                            </h4>
                                            <ul>
                                                {item?.job_recommandation ? (
                                                    <li>
                                                        <img
                                                            src={
                                                                currentSubscription?.plane_name ==
                                                                item?.plane_name
                                                                    ? bluetick
                                                                    : CardCheck
                                                            }
                                                            alt=""
                                                            width="14px"
                                                        />
                                                        Job Recommendations
                                                    </li>
                                                ) : (
                                                    ''
                                                )}
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img
                                                        src={
                                                            currentSubscription?.plane_name ==
                                                            item?.plane_name
                                                                ? bluetick
                                                                : CardCheck
                                                        }
                                                        alt=""
                                                        width="14px"
                                                    />
                                                    Get Featured in Top{' '}
                                                    {item?.top_candidate}{' '}
                                                    Candidate
                                                </li>
                                            </ul>
                                            <ul>
                                                {item?.resume_write ? (
                                                    <li>
                                                        <img
                                                            src={
                                                                currentSubscription?.plane_name ==
                                                                item?.plane_name
                                                                    ? bluetick
                                                                    : CardCheck
                                                            }
                                                            alt=""
                                                            width="14px"
                                                        />
                                                        {item?.resume_write}{' '}
                                                        &nbsp; AI Resume Writing
                                                    </li>
                                                ) : (
                                                    ''
                                                )}
                                            </ul>
                                            {item?.customer_support ? (
                                                <ul>
                                                    <li>
                                                        <img
                                                            src={
                                                                currentSubscription?.plane_name ==
                                                                item?.plane_name
                                                                    ? bluetick
                                                                    : CardCheck
                                                            }
                                                            alt=""
                                                            width="14px"
                                                        />
                                                        Email support and chat
                                                        support
                                                    </li>
                                                </ul>
                                            ) : (
                                                ''
                                            )}
                                            <ul>
                                                {item?.interview_question ? (
                                                    <li>
                                                        <img
                                                            src={
                                                                currentSubscription?.plane_name ==
                                                                item?.plane_name
                                                                    ? bluetick
                                                                    : CardCheck
                                                            }
                                                            alt=""
                                                            width="14px"
                                                        />
                                                        {
                                                            item?.interview_question
                                                        }
                                                        &nbsp; AI Generated
                                                        Interview Question
                                                    </li>
                                                ) : (
                                                    ''
                                                )}
                                            </ul>
                                            {currentSubscription?.plane_name ==
                                            item?.plane_name ? (
                                                <Button
                                                    className="buybtn"
                                                    style={{
                                                        background:
                                                            currentSubscription?.plane_name ==
                                                            item?.plane_name
                                                                ? '#3B96E1'
                                                                : ''
                                                    }}
                                                >
                                                    Already Using
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    className="buybtn"
                                                    disabled={
                                                        currentSubscription
                                                    }
                                                    onClick={() => {
                                                        initiatePayment(
                                                            item?._id
                                                        );
                                                    }}
                                                >
                                                    {currentSubscription?.plane_name ==
                                                    item?.plane_name
                                                        ? 'Already Using'
                                                        : 'Buy Now'}
                                                </Button>
                                            )}
                                        </div>
                                        <div className="sub-date">
                                            <p className="">
                                                {' '}
                                                {currentSubscription?.plane_name ==
                                                item?.plane_name
                                                    ? ` Plans Ends on: ${formatDate(
                                                          currentSubscription?.expiresAt
                                                      )}`
                                                    : ''}
                                            </p>
                                            <hr />
                                        </div>
                                    </div>
                                </>
                            )
                        )}
                </div>
            </div>
            {showModal && (
                <ProfileCompletionModal
                    onClose={() => setShowModal(false)} // Close modal handler
                />
            )}
        </>
    );
};

export default CandidateSubscription;
