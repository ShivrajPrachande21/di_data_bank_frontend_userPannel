import React, { useEffect, useState } from 'react';

import './renew.css';
import Rupees1 from '../../../../assets/images/Rupees1.png';
import rupeeblue from '../../../../assets/images/rupeeblue.png';
import CardCheck from '../../../../assets/images/CardCheck.png';
import bluetick from '../../../../assets/images/bluetick.png';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

import axios from 'axios';
import BaseUrl from '../../../../services/BaseUrl';

import Loader from '../../loader/Loader';
import { useSubscription } from '../../../../context/SubscriptionContext';
let renew_buy = {};
const Renew = () => {
    const { RenewData} = useSubscription();
    const [EarlyBuyID, setEarlyBuyID] = useState('');
    const [RenewLoading, SetRenewLoading] = useState(null);
    const [modalShowhide, setModalShow] = React.useState(false);
    const [orderId,SetOrderId]=useState('')

    const data1 = RenewData?.CurrentSubscription?.plane_name;
    // const { orderId, status } = useParams();

    const Renew_initiatePayment = async subscription_id => {
        SetRenewLoading(true);
        setEarlyBuyID(subscription_id);

        try {
            // Fetch token from localStorage and decode company ID
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const company_id = decodedToken?._id;

            // Log the sub_id and companyId for debugging

            const response = await axios.post(
                `${BaseUrl}company/renewplane/payment`,
                {
                    company_id,
                    subscription_id
                }
            );
            if (response.status === 200) {
                const paymentLink = response?.data?.paymentLink;
                if (paymentLink) {
                    window.open(paymentLink, '_blank');
                }
            }
            RunRenew_verify(response?.data);
        } catch (error) {
            console.error('Error during payment initiation:', error);
        }
    };
   
let toUpIntervelId;
let ToptimeoutId;
    const fetch_Renew_success_status = async (data) => {
        try {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const companyId = decodedToken?._id;

            const response = await axios.post(
                `${BaseUrl}company/renewPlane/verify`,
                {
                    orderId: data?.order_id,
                    subscription_id: data?.subscription_id,
                    company_id: companyId,
                    paymentMethod:data?.payment_methods
                }
            );
            if (response?.status === 200 || response?.status === 201) {
                SetRenewLoading(false);
                clearInterval(toUpIntervelId); 
                clearTimeout(ToptimeoutId); 
                setModalShow(true);
                SetOrderId(response?.data?.orderId)
            }
        } catch (error) {
            console.error('Error during verification:', error);
        }
    };

    function RunRenew_verify(data) {
         toUpIntervelId = setInterval(() => {
            fetch_Renew_success_status(data);
        }, 1000); // Call every 1 second

        ToptimeoutId = setTimeout(() => {
            clearInterval(toUpIntervelId);
        }, 1000 * 60 * 5);

    }

    useEffect(() => {
        if (RenewLoading == false) {
            SetRenewLoading(true);
        }
    }, []);
    return (
        <>
            {modalShowhide && (
                <Modal
                    show={modalShowhide}
                    onHide={() => setModalShow(false)}
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
                        <p>Order ID:{orderId}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => setModalShow(false)}
                            style={{ width: '100%', background: '#3B96E1' }}
                        >
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {RenewLoading ? (
                // <Spinner animation="border" variant="primary" />
                <div className="loader-div">
                    <Loader />
                </div>
            ) : (
                ''
            )}
            <div className="plan">
                <p>Renew Buy Plans</p>
                <hr />
                <div className="sub-cards">
                    {RenewData?.getSubscriptionPlans?.map((item, index) => (
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
                                                Renew_initiatePayment(
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
                                                  RenewData
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
export default Renew;
