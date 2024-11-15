import React, { useEffect, useState } from 'react';
import './subscription.css';
import { Button, Row } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';

const SubscriptionPlan = () => {
    const [activeButton, setActiveButton] = useState('subscription');
    const naviagte = useNavigate();

    const handle_navigate = data => {
        setActiveButton(data);
        naviagte(data);
    };

    // Inline styles for active and inactive buttons
    const activeStyle = {
        backgroundColor: '#B4DDFF', // Change this to your desired active color
        color: '#3B96E1' // Optional: Change text color
    };

    const inactiveStyle = {
        backgroundColor: 'transparent', // Original background color
        color: 'black' // Original text color
    };

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            if (!token) {
                naviagte('/');
            } else {
                naviagte('main/subscription-plan/subscription');
            }
        } else {
            naviagte('/');
        }
    }

    useEffect(() => {
        rendering();
    }, []);
    return (
        <div className="sub-scription">
            <Row>
                <div className="top-btns">
                    <div className="btn-center">
                        <Button
                            size="sm"
                            className="subtns"
                            style={
                                activeButton === 'subscription'
                                    ? activeStyle
                                    : inactiveStyle
                            }
                            onClick={() => handle_navigate('subscription')}
                        >
                            Subscription Plans
                        </Button>
                        <Button
                            size="sm"
                            className="subtns"
                            style={
                                activeButton === 'top-ups'
                                    ? activeStyle
                                    : inactiveStyle
                            }
                            onClick={() => handle_navigate('top-ups')}
                        >
                            Top-Up
                        </Button>
                    </div>
                </div>
            </Row>
            <Outlet />
        </div>
    );
};

export default SubscriptionPlan;
