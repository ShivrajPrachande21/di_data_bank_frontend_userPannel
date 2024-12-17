import React, { useState, useEffect, useContext } from 'react';
import './greenbatch.css';
import Verified from '../../../assets/images/Verified.png';
import { useSubscription } from '../../../context/SubscriptionContext';
import axios from 'axios';
import BaseUrl from '../../../services/BaseUrl';
import Loader from '../loader/Loader';
import oui_cross from '../../../assets/images/oui_cross.png';
import { jwtDecode } from 'jwt-decode';
import { HireCandidateContext } from '../../../context/HireCandidateContex';
import { Button, Spinner, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GreenBatch = () => {
    const { CompanyProfile } = useContext(HireCandidateContext);
    const { ShowGreen, SetGreenBatch } = useSubscription();
    const [Data, setData] = useState(null);
    const [paymentLoading, SetpaymentLoading] = useState(false);
    const [status, Setstate] = useState(false);
    const [orderId, SetOrderID] = useState('');
    const naviagte = useNavigate();
    const handle_promote_job = async () => {
        try {
            const response = await axios.get(
                `${BaseUrl}company/get/green_batch`
            );
            setData(response?.data[0]);
        } catch (error) {
            console.error('Error fetching green batch data:', error);
        }
    };

    useEffect(() => {
        handle_promote_job();
    }, []);

    const GreenBatchVerify = async green_id => {
        SetpaymentLoading(true);
        let early_buy = null;

        try {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token); // Updated usage here
            const company_id = decodedToken?._id;

            const response = await axios.post(
                `${BaseUrl}company/green_tick/payment`,
                { company_id, green_id }
            );

            if (response?.status === 200) {
                early_buy = response.data;
                const paymentLink = response.data?.paymentLink;

                if (paymentLink) {
                    window.open(paymentLink, '_blank');
                    RunEarlyBuy_verify(early_buy);
                } else {
                    console.error('No payment link found.');
                    SetpaymentLoading(false);
                }
            }
        } catch (error) {
            console.error('Error during payment initiation:', error);
            SetpaymentLoading(false);
        }
    };

    let toUpIntervelId;
    let ToptimeoutId;

    const fetch_EarlyBuy_success_status = async data => {
        try {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token); // Updated usage here
            const companyId = decodedToken?._id;

            const response = await axios.post(
                `${BaseUrl}company/green_tick/verify`,
                {
                    green_id: data?.green_id,
                    orderId: data?.order_id,
                    company_id: companyId,
                    paymentMethod: data?.payment_methods
                }
            );

            if (response?.status === 200 || response?.status === 201) {
                SetpaymentLoading(false);
                clearInterval(toUpIntervelId);
                clearTimeout(ToptimeoutId);
                SetGreenBatch(false);
                Setstate(true);
                SetOrderID(response?.data?.orderId);
                CompanyProfile(companyId);
            }
        } catch (error) {
            console.error('Error during verification:', error);
        }
    };

    const RunEarlyBuy_verify = data => {
        toUpIntervelId = setInterval(() => {
            fetch_EarlyBuy_success_status(data);
        }, 1000);

        ToptimeoutId = setTimeout(() => {
            clearInterval(toUpIntervelId);
        }, 1000 * 60 * 5);
    };

    function CloseFun() {
        SetGreenBatch(false);
    }

    return (
        <>
            {paymentLoading && (
                <div className="loader-div">
                    <Loader />
                </div>
            )}
            <Modal
                show={ShowGreen}
                onHide={CloseFun}
                aria-labelledby="example-modal-sizes-title-lg"
                className="custom-modal-promote"
            >
                <h1>
                    <img
                        src={oui_cross}
                        alt=""
                        width={20}
                        style={{ textAlign: 'end', paddingRight: '10px' }}
                        onClick={CloseFun}
                    />
                </h1>
                <div className="promote-job">
                    <p>
                        Get Verified badge now{' '}
                        <img src={Verified} alt="Verified" width="19" />
                    </p>
                    <div className="promote-btn-div">
                        <Button
                            size="sm"
                            onClick={() => GreenBatchVerify(Data?._id)}
                        >
                            PAY {'₹' + Data?.price}
                        </Button>
                        <br />
                        <span
                            className="custom-color fw-bold custom-font-size valid-for-text mt-2"
                            style={{ fontWeight: 'lighter' }}
                        >
                            Valid for {Data?.month} months
                        </span>
                    </div>
                </div>
            </Modal>
            {status && (
                <Modal
                    show={status}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="compact-modal"
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
                            </h6>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '0.5rem 1rem' }}>
                        <div className="text-center">
                            <p>Order ID:{orderId}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer
                        style={{ padding: '0.5rem', borderTop: 'none' }}
                    >
                        <Button
                            onClick={() => Setstate(prev => !prev)}
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
        </>
    );
};

export default GreenBatch;
