import React from 'react';
import { Col, Row, Image, Button } from 'react-bootstrap';
import ep_back from '../../../../assets/images/ep_back.png';
import avatar from '../../../../assets/images/avatar.png';
import './viewCompanyDesc.css';
const ViewCompanyDetails = () => {
    const rating = 3;
    return (
        <>
            <div style={{ height: '100vh' }}>
                <div
                    className="view-company-descriptio"
                    style={{
                        width: '90%',
                        margin: '0px auto',
                        background: 'white',
                        padding: '10px'
                    }}
                >
                    <img src={ep_back} alt="" width="20px" />
                    <div className="search-job-top company-desc">
                        <Image
                            src={avatar}
                            roundedCircle
                            alt="Profile"
                            width="70" // Set the desired width
                            height="70" // Set the desired height
                        />
                        <h6>
                            Amazon.com, Inc{' '}
                            <p
                                style={{
                                    color: '#AEAEAE',

                                    fontSize: '0.7rem',
                                    cursor: 'pointer',
                                    marginTop: '5px',
                                    marginBottom: '4px'
                                }}
                            >
                                Software Development
                            </p>
                            {[1, 2, 3, 4, 5].map(star => (
                                <span
                                    key={star}
                                    style={{
                                        cursor: 'pointer',
                                        color:
                                            star <= rating
                                                ? '#ffc107'
                                                : '#e4e5e9',
                                        fontSize: '1.5rem'
                                    }}
                                >
                                    ★
                                </span>
                            ))}
                        </h6>
                        {/* <div className="green-thik">
                            <img src={flag} alt="" height="20px" />
                        </div> */}
                    </div>
                    <p style={{ color: '#051F50' }}>Overview</p>
                    <div className="comapany-overview">
                        <p>
                            Amazon is guided by four principles: customer
                            obsession rather than competitor focus, passion for
                            invention, commitment to operational excellence, and
                            long-term thinking. We are driven by the excitement
                            of building technologies, inventing products, and
                            providing services that change lives. We embrace new
                            ways of doing things, make decisions quickly, and
                            are not afraid to fail. We have the scope and
                            capabilities of a large company, and the spirit and
                            heart of a small one. Together, Amazonians research
                            and develop new technologies from Amazon Web
                            Services to Alexa on behalf of our customers:
                            shoppers, sellers, content creators, and developers
                            around the world. Our mission is to be Earth's most
                            customer-centric company. Our actions, goals,
                            projects, programs, and inventions begin and end
                            with the customer top of mind. You'll also hear us
                            say that at Amazon, it's always "Day 1."​ What do we
                            mean? That our approach remains the same as it was
                            on Amazon's very first day - to make smart, fast
                            decisions, stay nimble, invent, and focus on
                            delighting our customers.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewCompanyDetails;
