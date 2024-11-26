import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
const socket = io('http://65.20.91.47:4000');
import './sidebar.css';
import WdcLogo from '../../assets/images/WdcLogo.jpg';
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
import CDE from '../../assets/images/CDE.png';
import axios from 'axios';
import BaseUrl from '../../services/BaseUrl';
import CompanyNotification from '../../company-pannel/pages/company_Notification/CompanyNotification';
import { HireCandidateContext } from '../../context/HireCandidateContex';
import HireCandidateNotification from '../../company-pannel/pages/company_Notification/HireCandidateNotification';
import GreenBatch from '../../company-pannel/pages/GreenBatch/GreenBatch';
import Verified from '../../assets/images/Verified.png';
import altprofile from '../../assets/images/altprofile.jpg';
import { useSubscription } from '../../context/SubscriptionContext';
import { CandidateProfileContext } from '../../context/candidateContext/CandidateProfileContext';
import { toast } from 'react-toastify';
const SideBar = () => {
    const {
        handleCloseHire,
        showHire,
        show,
        setShow,
        Identity,
        SetIdentity,
        profile,
        greenBatch,
        CompanyProfile,
        SetProfile
    } = useContext(HireCandidateContext);
    const { ShowGreen, SetGreenBatch } = useSubscription();
    const { CandidateProfile, fetchCandidateProfile } = useContext(
        CandidateProfileContext
    );
    const navigate = useNavigate();
    const [hidelogout, sethidelogout] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [candidateToken, setCandidateToken] = useState('');

    const handleClose = () => setShow(prev => !prev);
    const handleShow = () => setShow(prev => !prev);

    const toggleLogoout = () => {
        sethidelogout(prev => !prev);
    };
    const handleButtonClick = buttonId => {
        setActiveButton(buttonId);
    };
    const handle_logOut = async () => {
        const render = localStorage.getItem('render');

        if (render == 'company') {
            // const email = localStorage.getItem('email');
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const company_id = decodedToken?._id;
            try {
                const response = await axios.post(`${BaseUrl}company/logout`, {
                    company_id
                });
                if (response.status === 200) {
                    localStorage.removeItem('companyToken');
                    localStorage.removeItem('email');
                    navigate('/login');
                }
            } catch (error) {
                toast.error(`${error.response?.data?.error}`);
            }
        }
    };

    // handle Logout Candidate
    const handle_logOut_candidate = async () => {
        localStorage.removeItem('Candidate_token');
        localStorage.removeItem('render');
        navigate('/login');
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
            label: 'Credibility Establishment',
            icon: CDE,
            link: 'credibility-establishment'
        },
        {
            id: 5,
            label: 'Subscription Plans',
            icon: SubscriptionIcon,
            link: 'subscription-plan/subscription'
        },
        {
            id: 6,
            label: 'Transactions',
            icon: transactions,
            link: 'transaction'
        },
        {
            id: 7,
            label: 'Support',
            icon: SupportIcon,
            link: 'support'
        }
    ];

    // Candidate object to render based on login credentials
    const sidebarButtonsCanditas = [
        {
            id: 1,
            label: 'Dashboard',
            icon: dashboard,
            link: 'dashboard'
        },
        {
            id: 2,
            label: 'Search Jobs',
            icon: SearchJob,
            link: 'search-job'
        },
        {
            id: 3,
            label: 'Applied Jobs',
            icon: SearchJob,
            link: 'applied-job/applied-jobs'
        },

        {
            id: 4,
            label: 'Subscription Plans',
            icon: SubscriptionIcon,
            link: 'subscription-candidate'
        },
        {
            id: 5,
            label: 'Transactions',
            icon: transactions,
            link: 'transaction-candidate'
        },
        {
            id: 6,
            label: 'Support',
            icon: SupportIcon,
            link: 'support-candidate'
        }

        // Add more buttons if needed
    ];
    const navigateProfile = () => {
        if (candidateToken) {
            navigate('/profile-candidate/my-detials');
        } else {
            navigate('/profile-page');
        }
    };

    //Notification count
    const [notifications, setNotifications] = useState([]);
    const [notiCount, SetCount] = useState([]);
    const [profileview, SetProfileView] = useState([]);
    const [shortlist, SetShortlist] = useState([]);
    const [RenderVerify, SetRenderVerify] = useState('');

    async function CandidateProfiles(id) {
        try {
            const response = await axios.get(
                `${BaseUrl}candidate.profile/details/${id}`
            );
            if (response.status === 200) {
                SetIdentity(response?.data?.basic_details?.name);
                SetProfile(response?.data?.profile);
            }
        } catch (error) {}
    }

    // socket for notifactions
    useEffect(() => {
        const render = localStorage.getItem('render');
        if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const company_id = decodedToken?._id;
            CompanyProfile(company_id);
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

            if (!token) {
                return;
            } else {
                const decodedToken = jwtDecode(token);
                const candidate_id = decodedToken?._id;
                CandidateProfiles(candidate_id);
                socket.connect();

                socket.emit('CandidateIssuenotification', candidate_id);

                socket.on('CandidateNotification', newNotification => {
                    setNotifications(newNotification);
                });

                //Shortlist notification
                socket.emit('getshortlistnotification', candidate_id);
                socket.on('shortlistenotification', data => {
                    SetShortlist(data);
                });

                socket.emit('newCompannynotification', candidate_id);

                socket.on('companynotification', newNotification => {
                    SetCount(newNotification);
                    ///setNotifications(newNotification);
                });

                //profile View notification
                socket.emit('getcvviewnotification', candidate_id);
                socket.on('companyViewnotification', data => {
                    SetProfileView(data);
                });

                socket.on('disconnect', () => {
                    console.log('User disconnected');
                });

                return () => {
                    socket.off('notification');
                    socket.disconnect();
                };
            }
        }
    }, [show]);

    const bindUrlOrPath = url => {
        let cleanBaseUrl = BaseUrl?.replace(/\/api\b/, '');
        let temp = `${cleanBaseUrl?.replace(/\/$/, '')}/${url?.replace(
            /\\/g,
            '/'
        )}`;

        return temp.replace(/([^:]\/)\/+/g, '$1');
    };

    // uasEfect  to render Side Based on Token
    useEffect(() => {
        const render = localStorage.getItem('render');
        SetRenderVerify(render);
        if (render == 'candidate') {
            const Candiatetoken = localStorage.getItem('Candidate_token');

            const decodedToken = jwtDecode(Candiatetoken);
            const company_id = decodedToken?._id;
            setCandidateToken(company_id);
            fetchCandidateProfile();
        } else {
        }
    }, []);

    return (
        <>
            <div className="MainSidebar">
                <Row>
                    <Col>
                        <div className="Head">
                            <img src={WdcLogo} alt="" />
                        </div>
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
                            {notifications.length +
                                notiCount.length +
                                profileview.lengthv +
                                shortlist.length ==
                            0 ? (
                                ''
                            ) : (
                                <div className="noti">
                                    <p>
                                        {' '}
                                        {notifications.length +
                                            notiCount.length +
                                            profileview.length +
                                            shortlist.length}
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
                            borderRadius: '12px'
                        }}
                    >
                        <div className="Select">
                            <img
                                src={
                                    profile
                                        ? bindUrlOrPath(profile)
                                        : altprofile
                                }
                                class="rounded-circle"
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    marginLeft: '10px'
                                }}
                                alt="Avatar"
                            />

                            <span>
                                {Identity?.length > 10
                                    ? Identity.substring(0, 12) + '...'
                                    : Identity}
                            </span>

                            <img
                                src={iconamoon_arrowd}
                                alt=""
                                width="20px"
                                style={{
                                    marginLeft: '50px',
                                    cursor: 'pointer'
                                }}
                                onClick={toggleLogoout}
                            />
                        </div>
                        <Col xs={12}>
                            {hidelogout && (
                                <Col className="your-account">
                                    <p>Your account</p>
                                    <Row onClick={navigateProfile}>
                                        <Col xs={2} className="logout-img">
                                            <img
                                                src={
                                                    profile
                                                        ? bindUrlOrPath(profile)
                                                        : altprofile
                                                }
                                                class="rounded-circle"
                                                style={{
                                                    width: '20px',
                                                    height: '20px'
                                                }}
                                                alt="Avatar"
                                            />
                                        </Col>
                                        <Col xs={8}>
                                            <p
                                                style={{
                                                    fontSize: '0.7rem',
                                                    marginTop: '5px',
                                                    marginLeft: '-8px'
                                                }}
                                            >
                                                {Identity?.length > 10
                                                    ? Identity.substring(
                                                          0,
                                                          12
                                                      ) + '...'
                                                    : Identity}
                                            </p>
                                        </Col>
                                    </Row>
                                    <Col
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
                        {RenderVerify == 'company' ? (
                            greenBatch && greenBatch?.length == 0 ? (
                                <h1
                                    style={{ border: '1.32px solid #3B96E1' }}
                                    onClick={() => SetGreenBatch(true)}
                                >
                                    Get Verified Batch
                                    <img
                                        src={Verified}
                                        alt="Verified"
                                        width="19"
                                    />
                                </h1>
                            ) : (
                                <h1 style={{ border: '1.32px solid #3B96E1' }}>
                                    Profile verified
                                    <img
                                        src={Verified}
                                        alt="Verified"
                                        width="19"
                                    />
                                </h1>
                            )
                        ) : CandidateProfile?.profileCompletionPercentage ==
                          100 ? (
                            <h1 style={{ border: '1.32px solid #3B96E1' }}>
                                Profile verified
                                <img src={Verified} alt="Verified" width="19" />
                            </h1>
                        ) : null}
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
                                          key={button.id}
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

            <GreenBatch />

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
