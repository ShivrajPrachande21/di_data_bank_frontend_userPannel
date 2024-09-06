import React, { useEffect, useState } from 'react';

import arrow_back from '../../../assets/images/arrow_back.png';
import { Accordion, Col, Row, Table } from 'react-bootstrap';

import './profile.css';
const Profile = () => {
    return (
        <>
            <div className="ReportedJob">
                <div className="subReportedjob">
                    <Row>
                        <div className="topsection">
                            <p>
                                {' '}
                                <img src={arrow_back} alt="" width="20px" />
                            </p>
                            <div className="edit">
                                <p>Edit</p>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <img src="" alt="" width="20px" />
                        </Col>
                        <Col xs={10}>
                            <div>
                                <h4 style={{ fontSize: '1rem' }}>jhgjy</h4>
                                <h4 style={{ fontSize: '0.8rem' }}>hgjhgjh</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="Skills">
                            <p>User Experience designer</p>
                            <p>Amazon</p>
                        </div>
                    </Row>
                    <div className="personalDetails">
                        <div className="cards">
                            <div className="tables">
                                <p>Experience:</p>
                                <p>Location:</p>
                                <p>Salary:</p>
                                <p>Qualification:</p>
                                <p>Posted:</p>
                            </div>
                            <div className="tables">
                                <p>hello</p>
                                <p>hello</p>
                                <p>hello</p>
                                <p>hello</p>
                                <p>hello</p>
                            </div>
                        </div>
                    </div>
                    <div className="subReportedjob_1">
                        <div className="dropdown">
                            <span
                                style={{
                                    marginRight: '20px',
                                    fontWeight: '500'
                                }}
                            >
                                Job Description
                            </span>
                            <p className="mt-4">hello</p>
                        </div>
                        <div className="responsibilities">
                            <p>Responsibilities:</p>
                            <ul>
                                <li>
                                    Design user interfaces for websites and
                                    mobile applications.
                                </li>
                                <li>
                                    Create wireframes, prototypes, and mockups.
                                </li>
                                <li>
                                    Conduct user research and usability testing.
                                </li>
                                <li>
                                    Collaborate with developers to implement
                                    UI/UX designs
                                </li>
                                <li>
                                    Ensure designs are consistent with brand
                                    guidelines
                                </li>
                                <li>
                                    Continuously improve designs based on user
                                    feedback and data
                                </li>
                            </ul>
                        </div>
                        <div className="responsibilities">
                            <p>Requirements:</p>
                            <ul>
                                <li>
                                    Design user interfaces for websites and
                                    mobile applications.
                                </li>
                                <li>
                                    Create wireframes, prototypes, and mockups.
                                </li>
                                <li>
                                    Conduct user research and usability testing.
                                </li>
                                <li>
                                    Collaborate with developers to implement
                                    UI/UX designs
                                </li>
                                <li>
                                    Ensure designs are consistent with brand
                                    guidelines
                                </li>
                                <li>
                                    Continuously improve designs based on user
                                    feedback and data
                                </li>
                            </ul>
                        </div>
                        <div className="responsibilities">
                            <p>Perks and Benefits:</p>
                            <ul>
                                <li>
                                    Design user interfaces for websites and
                                    mobile applications.
                                </li>
                                <li>
                                    Create wireframes, prototypes, and mockups.
                                </li>
                                <li>
                                    Conduct user research and usability testing.
                                </li>
                                <li>
                                    Collaborate with developers to implement
                                    UI/UX designs
                                </li>
                                <li>
                                    Ensure designs are consistent with brand
                                    guidelines
                                </li>
                                <li>
                                    Continuously improve designs based on user
                                    feedback and data
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
