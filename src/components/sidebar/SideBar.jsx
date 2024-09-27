import React, { useState } from 'react';
import './sidebar.css';
import bellgray from '../../assets/images/bellgray.png';
import logoutButton from '../../assets/images/logoutButton.png';
import iconamoon_arrowd from '../../assets/images/iconamoon_arrowd.png';
import dashboard from '../../assets/images/AdminPanelmenu iconblue.png';
import dashboardwhite from '../../assets/images/AdminPanelmenu icons.png';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ProfileComplete from '../dynamicProgress/ProfileComplete';
import hirecandidate from '../../assets/images/hirecandidate.png';
import createJob from '../../assets/images/createJob.png';
import SubscriptionIcon from '../../assets/images/SubscriptionIcon.png';
import transactions from '../../assets/images/transactions.png';
import SupportIcon from '../../assets/images/SupportIcon.png';
import createjobblue from '../../assets/images/createjobblue.png';
import axios from 'axios';
import BaseUrl from '../../services/BaseUrl';
const SideBar = () => {
    const navigate = useNavigate();
    const [hidelogout, sethidelogout] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);

    const toggleLogoout = () => {
        sethidelogout(prev => !prev);
    };
    // Function to handle setting the active button
    const handleButtonClick = buttonId => {
        setActiveButton(buttonId);
    };
    const handle_logOut = async () => {
        const email = localStorage.getItem('email');
        console.log(email);
        try {
            const response = await axios.post(`${BaseUrl}company/logout`, {
                email
            });
            if (response.status === 200) {
                localStorage.removeItem('companyToken');
                localStorage.removeItem('email');
                navigate('/');
            }
        } catch (error) {}
    };

    const sidebarButtons = [
        {
            id: 1,
            label: 'Dashboard',
            icon: dashboard,
            link: '/main/dashboard'
        },
        {
            id: 2,
            label: 'Hire Candidate',
            icon: hirecandidate,
            link: 'hire-candidate'
        },
        {
            id: 3,
            label: 'Create Job',
            icon: createjobblue,
            link: 'create-job'
        },
        {
            id: 4,
            label: 'Subscription Plans',
            icon: SubscriptionIcon,
            link: 'subscription-plan'
        },
        {
            id: 5,
            label: 'Transactions',
            icon: transactions,
            link: 'transaction'
        },
        {
            id: 6,
            label: 'Support',
            icon: SupportIcon,
            link: 'support'
        }

        // Add more buttons if needed
    ];
    const navigateProfile = () => {
        navigate('/profile-page');
    };
    return (
        <>
            <div className="MainSidebar">
                <Row>
                    <Col>
                        <div className="Head"></div>
                    </Col>
                </Row>
                <Row>
                    <Col
                        xs={12}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                        className="User-pannel"
                    >
                        <h1>Super Panel</h1>
                        <img src={bellgray} alt="" width="20px" />
                    </Col>
                </Row>
                {/* Logout section */}
                <Row className="mt-1">
                    <Col
                        xs={12}
                        // onClick={handleTogale}
                        style={{
                            background: 'white',
                            borderRadius: '12px',
                            width: '90%'
                        }}
                    >
                        <div className="Select">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                class="rounded-circle"
                                style={{
                                    width: '20px',
                                    marginLeft: '10px'
                                }}
                                alt="Avatar"
                                onClick={navigateProfile}
                            />

                            <p>Rajesh Kumar</p>

                            <img
                                src={iconamoon_arrowd}
                                alt=""
                                width="20px"
                                style={{ marginLeft: '60px' }}
                                onClick={toggleLogoout}
                            />
                        </div>
                    </Col>
                    <Col xs={12}>
                        {hidelogout && (
                            <Col xs={12}>
                                <p
                                    style={{
                                        margin: '8px',
                                        fontSize: '1vw'
                                    }}
                                >
                                    Your account
                                </p>
                                <Row>
                                    <Col xs={2} className="logout-img">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                            class="rounded-circle"
                                            style={{
                                                width: '20px'
                                            }}
                                            alt="Avatar"
                                        />
                                    </Col>
                                    <Col xs={8}>
                                        <h4 style={{ fontSize: '0.7rem' }}>
                                            Rajesh Kumar
                                        </h4>
                                        <div className="account">
                                            <p
                                                style={{
                                                    fontSize: '0.4rem'
                                                }}
                                            >
                                                {' '}
                                                Account ID:
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: '0.4rem'
                                                }}
                                            >
                                                (898556652622333)
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Col
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingBottom: '10px'
                                    }}
                                    onClick={handle_logOut}
                                >
                                    <button
                                        className="logout-btn"
                                        // onClick={handleLogout}
                                    >
                                        <img
                                            src={logoutButton}
                                            class="rounded-circle"
                                            style={{
                                                width: '16px',
                                                marginRight: '10px'
                                            }}
                                            alt="Avatar"
                                        />
                                        Logout
                                    </button>
                                </Col>
                            </Col>
                        )}
                    </Col>
                </Row>

                {/* Buttons */}
                <Row>
                    <Col
                        xs={12}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                        className="User-pannel-percentage"
                    >
                        <h1 style={{ border: '1.32px solid #3B96E1' }}>
                            Get Verified Batch
                        </h1>
                    </Col>
                </Row>
                <div className="sidebar-btns mt-1">
                    <div className="sidebar-btns mt-1">
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0
                            }}
                        >
                            {sidebarButtons.map(button => (
                                <Link
                                    to={button.link}
                                    style={{
                                        textDecoration: 'none',
                                        color:
                                            activeButton === button.id
                                                ? 'white' // Active button text color
                                                : hoveredButton === button.id
                                                ? '#051F50' // Hovered button text color
                                                : '#3b96e1'
                                    }}
                                >
                                    <li
                                        key={button.id}
                                        // onMouseOver={e => {
                                        //     e.currentTarget.style.backgroundColor =
                                        //         '#fff'; // Change to any hover color
                                        // }}
                                        onClick={() =>
                                            handleButtonClick(button.id)
                                        }
                                        onMouseOver={() =>
                                            setHoveredButton(button.id)
                                        } // Set hovered button
                                        onMouseOut={() =>
                                            setHoveredButton(null)
                                        }
                                        style={{
                                            background:
                                                activeButton === button.id
                                                    ? '#3b96e1' // Active button background
                                                    : hoveredButton ===
                                                      button.id
                                                    ? '#f0f0f0' // Hover background
                                                    : 'white', // Default background
                                            color:
                                                activeButton === button.id
                                                    ? 'white' // Active button text color
                                                    : hoveredButton ===
                                                      button.id
                                                    ? '#051F50' // Hovered button text color
                                                    : '#3b96e1',
                                            transition:
                                                'background-color 0.3s, color 0.3s'
                                        }}
                                    >
                                        <img
                                            src={button.icon}
                                            alt=""
                                            width="18px"
                                            style={{
                                                marginRight: '16px',
                                                marginLeft: '10px',
                                                marginTop: '-4px'
                                            }}
                                        />

                                        {button.label}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
