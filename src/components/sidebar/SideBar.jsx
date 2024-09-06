import React, { useState } from 'react';
import './sidebar.css';
import bellgray from '../../assets/images/bellgray.png';
import logoutButton from '../../assets/images/logoutButton.png';
import iconamoon_arrowd from '../../assets/images/iconamoon_arrowd.png';
import dashboard from '../../assets/images/AdminPanelmenu iconblue.png';
import dashboardwhite from '../../assets/images/AdminPanelmenu icons.png';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const SideBar = () => {
    const [hidelogout, sethidelogout] = useState(null);

    const toggleLogoout = () => {
        sethidelogout(prev => !prev);
    };
    const sidebarButtons = [
        {
            id: 1,
            label: 'Dashboard',
            icon: dashboardwhite,
            link: '/dashboard'
        },
        {
            id: 2,
            label: 'Dashboard',
            icon: dashboardwhite,
            link: '/dashboard'
        }
        // Add more buttons if needed
    ];

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
                <Row>
                    <Col
                        xs={12}
                        // onClick={handleTogale}
                        style={{
                            background: 'rgba(242, 242, 242, 1)',
                            borderRadius: '12px',
                            width: '90%',
                            marginLeft: '16px'
                        }}
                    >
                        <div className="Select">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                class="rounded-circle"
                                style={{
                                    width: '20px'
                                }}
                                alt="Avatar"
                            />

                            <p>Rajesh Kumar</p>

                            <img
                                src={iconamoon_arrowd}
                                alt=""
                                width="20px"
                                style={{ marginLeft: '40px' }}
                                onClick={toggleLogoout}
                            />
                        </div>
                        {hidelogout && (
                            <Row>
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
                                        <Col xs={2}>
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
                                    <Row
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingBottom: '10px'
                                        }}
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
                                    </Row>
                                </Col>
                            </Row>
                        )}
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
                        className="User-pannel-percentage"
                    >
                        <h1 style={{ border: '1.3px solid #3B96E1' }}>
                            Profile Complete <span> 60%</span>
                        </h1>
                    </Col>
                </Row>
                <div className="sidebar-btns mt-1">
                    <div className="sidebar-btns mt-1">
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {sidebarButtons.map(button => (
                                <li
                                    key={button.id}

                                    // onMouseOver={e => {
                                    //     e.currentTarget.style.backgroundColor =
                                    //         '#fff'; // Change to any hover color
                                    // }}
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
                                    <Link
                                        to={button.link}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white'
                                        }}
                                    >
                                        {button.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
