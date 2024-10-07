import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
const socket = io('http://localhost:4000');
import './sidebar.css';
import bellgray from '../../assets/images/bellgray.png';
import logoutButton from '../../assets/images/logoutButton.png';
import iconamoon_arrowd from '../../assets/images/iconamoon_arrowd.png';
import dashboard from '../../assets/images/AdminPanelmenu iconblue.png';
import dashboardwhite from '../../assets/images/AdminPanelmenu icons.png';
import { Button, Col, Offcanvas, Row } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ProfileComplete from '../dynamicProgress/ProfileComplete';
import hirecandidate from '../../assets/images/hirecandidate.png';
import createJob from '../../assets/images/createJob.png';
import SubscriptionIcon from '../../assets/images/SubscriptionIcon.png';
import transactions from '../../assets/images/transactions.png';
import SupportIcon from '../../assets/images/SupportIcon.png';
import createjobblue from '../../assets/images/createjobblue.png';
import SearchJob from '../../assets/images/SearchJob.png';
import axios from 'axios';
import BaseUrl from '../../services/BaseUrl';
import CompanyNotification from '../../company-pannel/pages/company_Notification/CompanyNotification';
import { HireCandidateContext } from '../../context/HireCandidateContex';
import HireCandidateNotification from '../../company-pannel/pages/company_Notification/HireCandidateNotification';
const SideBar = () => {
    const { handleCloseHire, showHire, SetShowHire, show, setShow } =
        useContext(HireCandidateContext);
    const navigate = useNavigate();
    const [hidelogout, sethidelogout] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [candidateToken, setCandidateToken] = useState('');
    console.log('candidtetoke', candidateToken);

    const handleClose = () => setShow(prev => !prev);
    const handleShow = () => setShow(prev => !prev);

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

    // handle Logout Candidate
    const handle_logOut_candidate = async () => {
        // const email = localStorage.getItem('email');
        // console.log(email);

        navigate('/');
        // try {
        //     const response = await axios.post(`${BaseUrl}company/logout`, {
        //         email
        //     });
        //     if (response.status === 200) {
        //         localStorage.removeItem('Candidate_token');
        //         localStorage.removeItem('');
        //         navigate('/');
        //     }
        // } catch (error) {}
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
            link: 'subscription-plan/subscription'
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

    // Candidate oject to render based on login credentials
    const sidebarButtonsCanditas = [
        {
            id: 1,
            label: 'Search Jobs',
            icon: SearchJob,
            link: 'search-job'
        },
        {
            id: 2,
            label: 'Applied Jobs',
            icon: SearchJob,
            link: 'applied-job'
        },

        {
            id: 3,
            label: 'Subscription Plans',
            icon: SubscriptionIcon,
            link: 'subscription-candidate'
        },
        {
            id: 4,
            label: 'Transactions',
            icon: transactions,
            link: 'transaction-candidate'
        },
        {
            id: 5,
            label: 'Support',
            icon: SupportIcon,
            link: 'support-candidate'
        }

        // Add more buttons if needed
    ];
    const navigateProfile = () => {
        navigate('/profile-page');
    };

    //Notification count
    const [notifications, setNotifications] = useState([]);
    const [notiCount, SetCount] = useState(0);

    useEffect(() => {
        const render = localStorage.getItem('render');
        if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const company_id = decodedToken?._id;
            socket.connect();

            socket.emit('issuenotification', company_id);

            socket.on('notification', newNotification => {
                setNotifications(newNotification);
            });

            socket.emit('newCandidatenotification', company_id);

            socket.on('candidatenotification', newNotification => {
                SetCount(newNotification);
                ///setNotifications(newNotification);
            });

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });

            return () => {
                socket.off('notification');
                socket.disconnect();
            };
        } else {
            const token = localStorage.getItem('Candidate_token');
            const decodedToken = jwtDecode(token);
            const company_id = decodedToken?._id;
        }
    }, [show]);

    useEffect(() => {
        const render = localStorage.getItem('render');
        if (render == 'candidate') {
            const Candiatetoken = localStorage.getItem('Candidate_token');
            console.log('Candiatetoken', Candiatetoken);
            const decodedToken = jwtDecode(Candiatetoken);
            const company_id = decodedToken?._id;
            setCandidateToken(company_id);
        } else {
        }
    }, []);

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
                        <h1>{candidateToken ? 'Candidate' : 'Company'}</h1>
                        <div
                            style={{ position: 'relative', cursor: 'pointer' }}
                        >
                            <img
                                src={bellgray}
                                alt=""
                                width="20px"
                                onClick={handleShow}
                            />
                            {notifications.length + notiCount.length == 0 ? (
                                ''
                            ) : (
                                <div className="noti">
                                    <p>
                                        {' '}
                                        {notifications.length +
                                            notiCount.length}
                                    </p>
                                </div>
                            )}
                        </div>
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
                                    onClick={
                                        candidateToken
                                            ? handle_logOut_candidate
                                            : handle_logOut
                                    }
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
                            {candidateToken
                                ? sidebarButtonsCanditas.map(button => (
                                      <Link
                                          to={button.link}
                                          style={{
                                              textDecoration: 'none',
                                              color:
                                                  activeButton === button.id
                                                      ? 'white' // Active button text color
                                                      : hoveredButton ===
                                                        button.id
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
                                  ))
                                : sidebarButtons.map(button => (
                                      <Link
                                          to={button.link}
                                          style={{
                                              textDecoration: 'none',
                                              color:
                                                  activeButton === button.id
                                                      ? 'white' // Active button text color
                                                      : hoveredButton ===
                                                        button.id
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
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Notifications</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Company Notification  Component */}
                    <CompanyNotification handleClose={handleClose} />
                </Offcanvas.Body>
            </Offcanvas>

            {/* to view Hired Candidate Notification */}

            <Offcanvas show={showHire} onHide={handleCloseHire} placement="top">
                <Offcanvas.Body>
                    {/* Hire Candidate Notificaton  Component*/}
                    <HireCandidateNotification />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default SideBar;
