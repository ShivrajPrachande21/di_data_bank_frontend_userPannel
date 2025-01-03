import React, { useEffect, useState } from 'react';

import './subscription_.css';
import Rupees1 from '../../../../assets/images/Rupees1.png';
import rupeeblue from '../../../../assets/images/rupeeblue.png';
import CardCheck from '../../../../assets/images/CardCheck.png';
import bluetick from '../../../../assets/images/bluetick.png';
import { Button, Spinner, Modal } from 'react-bootstrap';

import axios from 'axios';
import { differenceInDays, isAfter } from 'date-fns';
import BaseUrl from '../../../../services/BaseUrl';
import { useSubscription } from '../../../../context/SubscriptionContext';
import Loader from '../../loader/Loader';
import { useNavigate } from 'react-router-dom';
import useProfileData from '../../../../hooks/company_dashboard/useProfiledata';
import { toast } from 'react-toastify';

const Subscriptions = () => {
    const { profileData, fetchProfileData } = useProfileData();
    const {
        subscriptionData,
        loading,
        fetch_all_subscription,
        initiatePayment,
        paymentLoading,
        modalShow,
        SetmodalShow,
        SubId,
        SetSubId
    } = useSubscription();
    const navigate = useNavigate();
    const data1 = subscriptionData?.CurrentSubscription[0]?.plane_name;
    const data2 = subscriptionData?.getSubscriptionPlans[0]?.plane_name;
    const [progress, setProgress] = useState(0);

    const currentDate = new Date();
    const expiresAt = subscriptionData?.CurrentSubscription[0]?.expiresAt
        ? new Date(subscriptionData?.CurrentSubscription[0].expiresAt)
        : null;
    const daysUntilExpire = expiresAt
        ? differenceInDays(expiresAt, currentDate)
        : null;

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

    // Output: "20th Sept 24"

    useEffect(() => {
        fetch_all_subscription();
        fetchProfileData();
    }, []);

    useEffect(() => {
        if (profileData?.profileCompletionPercentage !== undefined) {
            setProgress(profileData.profileCompletionPercentage);
        }
    }, [profileData]);

    async function BuynowSubscription(id) {
        if (progress == 100) {
            try {
                let res = await initiatePayment(id);
            } catch (error) {
                toast.error(error?.response?.data?.error);
            }
        } else {
            toast.error(
                'Please complete your profile to purchase a subscription plan.'
            );
        }
    }

    return (
        <>
            {paymentLoading ? (
                // <Spinner animation="border" variant="primary" />
                <div className="loader-div">
                    <Loader />
                </div>
            ) : (
                ''
            )}

{modalShow && (
              <Modal
              show={modalShow}
              onHide={() => SetmodalShow(false)}
              size="sm" // Keep small size
              aria-labelledby="contained-modal-title-vcenter"
              centered
              className="compact-modal" // Custom class for additional styling
          >
              <Modal.Header closeButton style={{ padding: '0.5rem', borderBottom: 'none' }}>
                  <Modal.Title id="contained-modal-title-vcenter" className="text-center w-100">
                      <h6 className="text-success mb-0">🎉 Payment Successful!</h6>
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ padding: '0.5rem 1rem' }}>
                  <div className="text-center">
                      <p className="mb-1" style={{ fontSize: '0.8rem', color: '#6c757d' }}>Order ID:{SubId}</p>
                  </div>
              </Modal.Body>
              <Modal.Footer style={{ padding: '0.5rem', borderTop: 'none' }}>
                  <Button 
                    onClick={() => { SetmodalShow(false); SetSubId(''); }}
                      style={{ width: '100%', padding: '0.4rem 0', background: '#3B96E1', border: 'none', fontSize: '0.85rem' }}
                  >
                      OK
                  </Button>
              </Modal.Footer>
          </Modal>
            )}
            <div className="plan">
                <p> Plans for Hiring</p>
                <hr />
                <div className="sub-cards">
                    {subscriptionData?.getSubscriptionPlans?.map(
                        (item, index) => (
                            <>
                                <div className="showdate">
                                    <div
                                        className={
                                            subscriptionData
                                                ?.CurrentSubscription[0]
                                                ?.plane_name ==
                                                item?.plane_name ||
                                            subscriptionData
                                                ?.CurrentSubscription[1]
                                                ?.plane_name ===
                                                item?.plane_name
                                                ? 'sub2'
                                                : 'sub1'
                                        }
                                        style={{
                                            background:
                                                subscriptionData
                                                    ?.CurrentSubscription[0]
                                                    ?.plane_name ==
                                                    item?.plane_name ||
                                                subscriptionData
                                                    ?.CurrentSubscription[1]
                                                    ?.plane_name ==
                                                    item?.plane_name
                                                    ? ''
                                                    : ''
                                        }}
                                    >
                                        <p>{item?.plane_name}</p>
                                        <h4
                                            className={
                                                subscriptionData
                                                    ?.CurrentSubscription[0]
                                                    ?.plane_name ==
                                                    item?.plane_name ||
                                                subscriptionData
                                                    ?.CurrentSubscription[1]
                                                    ?.plane_name ==
                                                    item?.plane_name
                                                    ? 'ruppee2'
                                                    : 'ruppee'
                                            }
                                        >
                                            <img
                                                src={
                                                    subscriptionData
                                                        ?.CurrentSubscription[0]
                                                        ?.plane_name ==
                                                        item?.plane_name ||
                                                    subscriptionData
                                                        ?.CurrentSubscription[1]
                                                        ?.plane_name ==
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
                                            <li>
                                                <img
                                                    src={
                                                        subscriptionData
                                                            ?.CurrentSubscription[0]
                                                            ?.plane_name ==
                                                            item?.plane_name ||
                                                        subscriptionData
                                                            ?.CurrentSubscription[1]
                                                            ?.plane_name ==
                                                            item?.plane_name
                                                            ? bluetick
                                                            : CardCheck
                                                    }
                                                    alt=""
                                                    width="14px"
                                                />
                                                Up to {item?.search_limit}{' '}
                                                Search results
                                            </li>
                                            
                                            <li>
                                                {' '}
                                                <img
                                                    src={
                                                        subscriptionData
                                                            ?.CurrentSubscription[0]
                                                            ?.plane_name ==
                                                            item?.plane_name ||
                                                        subscriptionData
                                                            ?.CurrentSubscription[1]
                                                            ?.plane_name ==
                                                            item?.plane_name
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
                                                        subscriptionData
                                                            ?.CurrentSubscription[0]
                                                            ?.plane_name ==
                                                            item?.plane_name ||
                                                        subscriptionData
                                                            ?.CurrentSubscription[1]
                                                            ?.plane_name ==
                                                            item?.plane_name
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
                                                            subscriptionData
                                                                ?.CurrentSubscription[0]
                                                                ?.plane_name ==
                                                                item?.plane_name ||
                                                            subscriptionData
                                                                ?.CurrentSubscription[1]
                                                                ?.plane_name ==
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

                                            {item?.job_posting &&
                                            item?.job_posting !== 0 ? (
                                                <li>
                                                    {' '}
                                                    <img
                                                        src={
                                                            subscriptionData
                                                                ?.CurrentSubscription[0]
                                                                ?.plane_name ==
                                                                item?.plane_name ||
                                                            subscriptionData
                                                                ?.CurrentSubscription[1]
                                                                ?.plane_name ==
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
                                            {item?.ai_job_description ? (
                                                <li>
                                                    <img
                                                        src={
                                                            subscriptionData
                                                                ?.CurrentSubscription[0]
                                                                ?.plane_name ==
                                                                item?.plane_name ||
                                                            subscriptionData
                                                                ?.CurrentSubscription[1]
                                                                ?.plane_name ==
                                                                item?.plane_name
                                                                ? bluetick
                                                                : CardCheck
                                                        }
                                                        alt=""
                                                        width="14px"
                                                    />
                                                    {item?.ai_job_description}{' '}
                                                    Ai Job Description
                                                </li>
                                            ) : (
                                                ''
                                            )}
                                            {item?.ai_question ? (
                                                <li>
                                                    <img
                                                        src={
                                                            subscriptionData
                                                                ?.CurrentSubscription[0]
                                                                ?.plane_name ==
                                                                item?.plane_name ||
                                                            subscriptionData
                                                                ?.CurrentSubscription[1]
                                                                ?.plane_name ==
                                                                item?.plane_name
                                                                ? bluetick
                                                                : CardCheck
                                                        }
                                                        alt=""
                                                        width="14px"
                                                    />
                                                    {item?.ai_question} AI
                                                    generated questions
                                                </li>
                                            ) : (
                                                ''
                                            )}
                                            {item?.support ? (
                                                <li>
                                                    <img
                                                        src={
                                                            subscriptionData
                                                                ?.CurrentSubscription[0]
                                                                ?.plane_name ==
                                                                item?.plane_name ||
                                                            subscriptionData
                                                                ?.CurrentSubscription[1]
                                                                ?.plane_name ==
                                                                item?.plane_name
                                                                ? bluetick
                                                                : CardCheck
                                                        }
                                                        alt=""
                                                        width="14px"
                                                    />
                                                     Email support and chat support
                                                </li>
                                            ) : (
                                                ''
                                            )}

                                            {item?.download_email_limit ? (
                                                <li>
                                                    <img
                                                        src={
                                                            subscriptionData
                                                                ?.CurrentSubscription[0]
                                                                ?.plane_name ==
                                                                item?.plane_name ||
                                                            subscriptionData
                                                                ?.CurrentSubscription[1]
                                                                ?.plane_name ==
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
                                            {item?.Credibility_Search &&
                                        item?.Credibility_Search !== 0 ? (
                                            <li>
                                                {' '}
                                                <img
                                                     src={
                                                        subscriptionData
                                                            ?.CurrentSubscription[0]
                                                            ?.plane_name ==
                                                            item?.plane_name ||
                                                        subscriptionData
                                                            ?.CurrentSubscription[1]
                                                            ?.plane_name ==
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

                                        </ul>

                                        {subscriptionData
                                            ?.CurrentSubscription[0]
                                            ?.plane_name == item?.plane_name ||
                                        subscriptionData?.CurrentSubscription[1]
                                            ?.plane_name == item?.plane_name ? (
                                            <Button
                                                className="buybtn"
                                                style={{
                                                    background:
                                                        subscriptionData
                                                            ?.CurrentSubscription[0]
                                                            ?.plane_name ==
                                                            item?.plane_name ||
                                                        subscriptionData
                                                            ?.CurrentSubscription[1]
                                                            ?.plane_name ==
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
                                                    subscriptionData
                                                        ?.CurrentSubscription[0]
                                                        ?.plane_name
                                                }
                                                onClick={() => {
                                                    BuynowSubscription(
                                                        item?._id
                                                    );
                                                }}
                                            >
                                                {subscriptionData?.CurrentSubscription?.some(
                                                    sub =>
                                                        sub?.plane_name ===
                                                        item?.plane_name
                                                )
                                                    ? 'Already Using'
                                                    : 'Buy Now'}
                                            </Button>
                                        )}
                                    </div>
                                    <div className="sub-date">
                                        <p className="">
                                            {subscriptionData?.CurrentSubscription?.some(
                                                sub =>
                                                    sub?.plane_name ===
                                                    item?.plane_name
                                            )
                                                ? `Plan Ends on: ${formatDate(
                                                      subscriptionData?.CurrentSubscription.find(
                                                          sub =>
                                                              sub?.plane_name ===
                                                              item?.plane_name
                                                      )?.expiresAt
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

                <div className="early-renew">
                    {expiresAt &&
                    isAfter(expiresAt, currentDate) &&
                    daysUntilExpire <= 2 ? (
                        <Button
                            size="sm"
                            style={{ background: 'white', color: '#3B96E1' }}
                            onClick={() =>
                                navigate('/main/subscription-plan/renew')
                            }
                        >
                            Renew
                        </Button>
                    ) : subscriptionData?.CurrentSubscription.length != 2 &&
                      subscriptionData?.CurrentSubscription.length == 1 ? (
                        <Button
                            size="sm"
                            onClick={() =>
                                navigate('/main/subscription-plan/early-buy')
                            }
                        >
                            Early Buy
                        </Button>
                    ) : null}
                </div>
            </div>
            {/* <div className="plan">
                <p> Plans for Background Verfications</p>
                <hr />
                <div className="sub-cards">
                    <div className="sub1">
                        <p>Basic</p>
                        <h4 className="ruppee">
                            <img
                                src={Rupees1}
                                alt=""
                                width="15px"
                                style={{ marginRight: '4px' }}
                            />
                            1999<span>/mon</span>
                        </h4>
                        <ul>
                            <li>
                                <img src={CardCheck} alt="" width="14px" />
                                Up to 500 Search results
                            </li>
                            <li>
                                {' '}
                                <img src={CardCheck} alt="" width="14px" />
                                All available candidates
                            </li>
                            <li>
                                {' '}
                                <img src={CardCheck} alt="" width="14px" />
                                Only 1 User access
                            </li>
                            <li>
                                {' '}
                                <img src={CardCheck} alt="" width="14px" />
                                200 CV views
                            </li>
                            <li>
                                {' '}
                                <img src={CardCheck} alt="" width="14px" />5 AI
                                Searches
                            </li>
                        </ul>
                        <Button size="sm" className="buybtn">
                            Buy Now
                        </Button>
                    </div>
                </div>
                <div className="sub-date">
                    <p className="">Plans Ends on: 20th Sept 24</p>
                    <hr />
                </div>
                <div className="early-renew">
                    <Button
                        size="sm"
                        style={{ background: 'white', color: '#3B96E1' }}
                    >
                        Renew{' '}
                    </Button>
                    <Button size="sm">Early Buy </Button>
                </div>

                
               
            </div>  */}
        </>
    );
};

export default Subscriptions;
