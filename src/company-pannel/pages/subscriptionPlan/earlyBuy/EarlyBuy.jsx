import React, { useEffect, useState } from 'react';
import './earlybuy.css';
import { jwtDecode } from 'jwt-decode';
import Rupees1 from '../../../../assets/images/Rupees1.png';
import rupeeblue from '../../../../assets/images/rupeeblue.png';
import CardCheck from '../../../../assets/images/CardCheck.png';
import bluetick from '../../../../assets/images/bluetick.png';
import arrow_back from '../../../../assets/images/arrow_back.png';
import { Button, Modal, Spinner } from 'react-bootstrap';

import axios from 'axios';
import BaseUrl from '../../../../services/BaseUrl';

import { useSubscription } from '../../../../context/SubscriptionContext';
import Loader from '../../loader/Loader';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const EarlyBuy = () => {
    const { EarlyBuy } = useSubscription();
    const [EarlyBuyPaymentData, setEarlyBuyPaymentData] = useState();
    const [EarlyBuyID, setEarlyBuyID] = useState('');
    const [EarlyLoading, SetEarlyLoading] = useState(null);
    const [modalShowhide, setModalShow] = React.useState(false);
    const [orderID, SetOrderID] = useState('');
    const [SuccessModal, SetSuccessModal] = useState(false);

    const data1 = EarlyBuy?.CurrentSubscription?.plane_name;

    const Early_initiatePayment = async sub_id => {
        setEarlyBuyID(sub_id);

        try {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const company_id = decodedToken?._id;

            const response = await axios.post(
                `${BaseUrl}company/early_plane/payment`,
                {
                    company_id,
                    sub_id
                }
            );
            if (response.status === 200) {
                SetEarlyLoading(true);
                setEarlyBuyPaymentData(response?.data);
                RunEarlyBuy_verify(response?.data);
                const paymentLink = response?.data?.paymentLink;
                if (paymentLink) {
                    window.open(paymentLink, '_blank');
                }
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
    let toUpIntervelId;
    let ToptimeoutId;
    const fetch_EarlyBuy_success_status = async data => {
        try {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id;

            const response = await axios.post(
                `${BaseUrl}company/early_subscription/verify`,
                {
                    orderId: data?.order_id,
                    sub_id: data?.sub_id,
                    company_id: companyId,
                    paymentMethod: data?.payment_methods
                }
            );
            if (response?.status === 200 || response?.status === 201) {
                SetEarlyLoading(false);
                clearInterval(toUpIntervelId);
                clearTimeout(ToptimeoutId);
                SetOrderID(response?.data?.orderId);
                SetSuccessModal(true);
            }
        } catch (error) {
            console.error('Error during verification:', error);
        }
    };

    function RunEarlyBuy_verify(data) {
        toUpIntervelId = setInterval(() => {
            fetch_EarlyBuy_success_status(data);
        }, 1000); // Call every 1 second

        ToptimeoutId = setTimeout(() => {
            clearInterval(toUpIntervelId);
        }, 1000 * 60 * 5);
    }

    useEffect(() => {
        if (EarlyLoading == false) {
            SetEarlyLoading(true);
        }
    }, []);
    return (
        <>
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
                            onClick={() => SetSuccessModal(false)}
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
            <img src={arrow_back} alt="" width={24} />
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

                                        {item?.Credibility_Search &&
                                        item?.Credibility_Search !== 0 ? (
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
                                                {`${item?.Credibility_Search} Creadibility search`}
                                            </li>
                                        ) : (
                                            ''
                                        )}
                                         {
                                        item?.support? (
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
                                                {`Email support and chat support`}
                                            </li>
                                        ) : (
                                            ''
                                        )}
                                        {item?.ai_question &&
                                        item?.ai_question !== 0? (
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
                                             {`Up to ${item?.ai_question} AI questions per job post`}

                                            </li>
                                        ) : (
                                            ''
                                        )}
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
