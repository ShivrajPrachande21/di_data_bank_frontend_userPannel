import React, { useEffect, useState } from 'react';
import './earlybuy.css';
import { jwtDecode } from 'jwt-decode';
import Rupees1 from '../../../../assets/images/Rupees1.png';
import rupeeblue from '../../../../assets/images/rupeeblue.png';
import CardCheck from '../../../../assets/images/CardCheck.png';
import bluetick from '../../../../assets/images/bluetick.png';
import { Button, Modal, Spinner } from 'react-bootstrap';

import axios from 'axios';
import BaseUrl from '../../../../services/BaseUrl';

import { useSubscription } from '../../../../context/SubscriptionContext';
import Loader from '../../loader/Loader';
import { useParams } from 'react-router-dom';
let early_buy = {};
const EarlyBuy = () => {
    const { EarlyBuy, paymentLoading } = useSubscription();
    const [EarlyBuyPaymentData, setEarlyBuyPaymentData] = useState();
    const [EarlyBuyID, setEarlyBuyID] = useState('');
    const [EarlyLoading, SetEarlyLoading] = useState(null);
    const [modalShowhide, setModalShow] = React.useState(false);

    const data1 = EarlyBuy?.CurrentSubscription?.plane_name;
    const { orderId, status } = useParams();

    const Early_initiatePayment = async sub_id => {
        console.log('topup_id', sub_id);
        SetEarlyLoading(true);
        setEarlyBuyID(sub_id);

        try {
            // Fetch token from localStorage and decode company ID
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const company_id = decodedToken?._id;

            // Log the sub_id and companyId for debugging

            const response = await axios.post(
                `${BaseUrl}company/early_plane/payment`,
                {
                    company_id,
                    sub_id
                }
            );
            if (response.status === 200) {
                early_buy = response?.data;
                setEarlyBuyPaymentData(response?.data);

                const paymentLink = response?.data?.paymentLink;
                if (paymentLink) {
                    window.open(paymentLink, '_blank');
                }
            }
            RunEarlyBuy_verify();
        } catch (error) {
            console.error('Error during payment initiation:', error);
        }
    };

    const fetch_EarlyBuy_success_status = async () => {
        try {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id;

            const response = await axios.post(
                `${BaseUrl}company/early_subscription/verify`,
                {
                    orderId: early_buy?.order_id,
                    sub_id: early_buy?.subscription_id,
                    company_id: companyId,
                    paymentMethod: 'cahfree'
                }
            );
            if (response?.status === 200 || response?.status === 201) {
                SetEarlyLoading(false);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error during verification:', error);
        }
    };

    function RunEarlyBuy_verify() {
        const toUpIntervelId = setInterval(() => {
            fetch_EarlyBuy_success_status();
        }, 1000); // Call every 1 second

        const ToptimeoutId = setTimeout(() => {
            clearInterval(toUpIntervelId);
        }, 1000 * 60 * 5);

        // Watch paymentLoading and clear intervals if it's false
        const checkPaymentLoading = setInterval(() => {
            if (paymentLoading === false) {
                clearInterval(toUpIntervelId); // Clear the interval for get_payment_success_status
                clearTimeout(ToptimeoutId); // Clear the 5-minute timeout
                clearInterval(checkPaymentLoading); // Clear this watcher interval
            }
        }, 500);
    }

    useEffect(() => {
        if (EarlyLoading == false) {
            SetEarlyLoading(true);
        }
    }, []);
    useEffect(() => {
        console.log('RenewData', EarlyBuy);
    }, []);
    return (
        <>
            {status && (
                <Modal
                    show={modalShowhide}
                    onHide={() => setModalShow(false)}
                    size="lg"
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
                        <p>Order ID:{orderId}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => setModalShow(prev => !prev)}
                            style={{ width: '100%', background: '#3B96E1' }}
                        >
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {EarlyLoading ? (
                // <Spinner animation="border" variant="primary" />
                <div className="loader-div">
                    <Loader />
                </div>
            ) : (
                ''
            )}
            <div className="plan">
                <p> Plans for Early Buy Plans</p>
                <hr />
                <div className="sub-cards">
                    {EarlyBuy?.getSubscriptionPlans?.map((item, index) => (
                        <>
                            <div className="showdate">
                                <div
                                    className="sub1"
                                    style={{
                                        background:
                                            data1 == item?.plane_name ? '' : ''
                                    }}
                                >
                                    <p>{item?.plane_name}</p>
                                    <h4
                                        className={
                                            data1 === item?.plane_name
                                                ? 'ruppee2'
                                                : 'ruppee'
                                        }
                                    >
                                        <img
                                            src={
                                                data1 === item?.plane_name
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
                                        <li>
                                            <img
                                                src={
                                                    data1 === item?.plane_name
                                                        ? bluetick
                                                        : CardCheck
                                                }
                                                alt=""
                                                width="14px"
                                            />
                                            Up to {item?.search_limit} Search
                                            results
                                        </li>
                                        <li>
                                            {' '}
                                            <img
                                                src={
                                                    data1 === item?.plane_name
                                                        ? bluetick
                                                        : CardCheck
                                                }
                                                alt=""
                                                width="14px"
                                            />
                                            All available candidates
                                        </li>
                                        <li>
                                            {' '}
                                            <img
                                                src={
                                                    data1 === item?.plane_name
                                                        ? bluetick
                                                        : CardCheck
                                                }
                                                alt=""
                                                width="14px"
                                            />
                                            {item?.user_access
                                                ? `${item?.user_access}`
                                                : ``}{' '}
                                            User access
                                        </li>
                                        <li>
                                            {' '}
                                            <img
                                                src={
                                                    data1 === item?.plane_name
                                                        ? bluetick
                                                        : CardCheck
                                                }
                                                alt=""
                                                width="14px"
                                            />
                                            {item?.cv_view_limit
                                                ? `${item?.cv_view_limit} CV views`
                                                : '"Unlimited"'}
                                        </li>
                                        {item?.download_cv_limit ? (
                                            <li>
                                                <img
                                                    src={
                                                        data1 ===
                                                        item?.plane_name
                                                            ? bluetick
                                                            : CardCheck
                                                    }
                                                    alt=""
                                                    width="14px"
                                                />
                                                Download Cv in bulk
                                            </li>
                                        ) : (
                                            ``
                                        )}
                                        {item?.download_email_limit ? (
                                            <li>
                                                <img
                                                    src={
                                                        data1 ===
                                                        item?.plane_name
                                                            ? bluetick
                                                            : CardCheck
                                                    }
                                                    alt=""
                                                    width="14px"
                                                />
                                                Download multiple emails
                                                together.
                                            </li>
                                        ) : (
                                            ``
                                        )}

                                        {item?.job_posting &&
                                        item?.job_posting !== 0 ? (
                                            <li>
                                                {' '}
                                                <img
                                                    src={
                                                        data1 ===
                                                        item?.plane_name
                                                            ? bluetick
                                                            : CardCheck
                                                    }
                                                    alt=""
                                                    width="14px"
                                                />
                                                {`${item?.job_posting} Job postings per month`}
                                            </li>
                                        ) : (
                                            ''
                                        )}

                                        <li>
                                            {' '}
                                            <img
                                                src={
                                                    data1 === item?.plane_name
                                                        ? bluetick
                                                        : CardCheck
                                                }
                                                alt=""
                                                width="14px"
                                            />
                                            5 AI Searches
                                        </li>
                                    </ul>

                                    {data1 == item?.plane_name ? (
                                        <Button
                                            className="buybtn"
                                            style={{
                                                background:
                                                    data1 === item?.plane_name
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
                                            disabled={data1}
                                            onClick={() => {
                                                Early_initiatePayment(
                                                    item?._id
                                                );
                                            }}
                                        >
                                            {data1 === item?.plane_name
                                                ? 'Already Using'
                                                : 'Buy Now'}
                                        </Button>
                                    )}
                                </div>
                                <div className="sub-date">
                                    <p className="">
                                        {' '}
                                        {data1 === item?.plane_name
                                            ? ` Plans Ends on: ${formatDate(
                                                  EarlyBuy
                                                      ?.CurrentSubscription[0]
                                                      ?.expiresAt
                                              )}`
                                            : ''}
                                    </p>
                                    <hr />
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};

export default EarlyBuy;
