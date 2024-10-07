import React, { useEffect, useState } from 'react';

import './subscription_.css';
import Rupees1 from '../../../../assets/images/Rupees1.png';
import rupeeblue from '../../../../assets/images/rupeeblue.png';
import CardCheck from '../../../../assets/images/CardCheck.png';
import bluetick from '../../../../assets/images/bluetick.png';
import { Button, Spinner } from 'react-bootstrap';

import axios from 'axios';
import BaseUrl from '../../../../services/BaseUrl';
import { useSubscription } from '../../../../context/SubscriptionContext';
import Loader from '../../loader/Loader';
import { useNavigate } from 'react-router-dom';

const Subscriptions = () => {
    const {
        subscriptionData,
        loading,
        fetch_all_subscription,
        initiatePayment,
        paymentLoading
    } = useSubscription();
    const navigate = useNavigate();
    const data1 = subscriptionData?.CurrentSubscription[0]?.plane_name;
    const data2 = subscriptionData?.getSubscriptionPlans[0]?.plane_name;
    console.log('dada', subscriptionData);
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
    }, []);

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
                                            data1 === item?.plane_name
                                                ? 'sub2'
                                                : 'sub1'
                                        }
                                        style={{
                                            background:
                                                data1 == item?.plane_name
                                                    ? ''
                                                    : ''
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
                                                        data1 ===
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
                                                        data1 ===
                                                        item?.plane_name
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
                                                        data1 ===
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
                                                        data1 ===
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
                                                        data1 ===
                                                        item?.plane_name
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
                                                        data1 ===
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
                                                disabled={data1}
                                                onClick={() => {
                                                    initiatePayment(item?._id);
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
                                                      subscriptionData
                                                          ?.CurrentSubscription[0]
                                                          ?.expiresAt
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
                    {data1 ? (
                        <Button
                            size="sm"
                            onClick={() =>
                                navigate('/main/subscription-plan/early-buy')
                            }
                        >
                            Early Buy{' '}
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            style={{ background: 'white', color: '#3B96E1' }}
                            onClick={() =>
                                navigate('/main/subscription-plan/renew')
                            }
                        >
                            Renew{' '}
                        </Button>
                    )}
                </div>
            </div>
            <div className="plan">
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
            </div>
        </>
    );
};

export default Subscriptions;
