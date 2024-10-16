import React, { useEffect, useState, useContext } from 'react';

import './subscription_.css';
import Rupees1 from '../../../assets/images/Rupees1.png';
import rupeeblue from '../../../assets/images/rupeeblue.png';
import CardCheck from '../../../assets/images/CardCheck.png';
import bluetick from '../../../assets/images/bluetick.png';
import { Button, Spinner } from 'react-bootstrap';

import axios from 'axios';
//import BaseUrl from '../../../../services/BaseUrl';
import { useNavigate } from 'react-router-dom';
import { SubscriptionContext } from '../../../context/candidateContext/SubscriptionsContext';

const CandidateSubscription = () => {
    const {
        SubscriptinData,
        fetch_Subscrtipion,
        fetch_CurrentSubscrtipion,
        currentSubscription
    } = useContext(SubscriptionContext);

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
    }, []);

    return (
        <>
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
        </>
    );
};

export default CandidateSubscription;
