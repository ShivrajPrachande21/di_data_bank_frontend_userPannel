import React from 'react';
import { Button, Image } from 'react-bootstrap';
import './testimonials.css';
import Verified from '../../assets/images/Verified.png';
import q2qwzuzm from '../../assets/images/q2qwzuzm.png';
function Testimonials() {
    return (
        <>
            <div className="testimonials">
                <div className="testimonials-child">
                    <div className="restimonials-h1">
                        <h1>Testimonials</h1>
                        <p>From Company & Candidates</p>
                    </div>

                    <div className="testimonials-card-div">
                        <div className="testimonials-cards">
                            <div className="crads-profile">
                                <p>
                                    <Image
                                        src={q2qwzuzm}
                                        roundedCircle
                                        alt="Rounded"
                                        width="20%"
                                    />
                                </p>
                            </div>

                            <div className="test-card-heading">
                                <h6>Microdoft</h6>
                                <img src={Verified} alt="" />
                            </div>
                            <p>
                                We were highly impressed with the remarkable
                                qualities that John Smith exhibited throughout
                                the interview process. John's exceptional
                                technical expertise, leadership skills, and
                                innovative
                            </p>
                        </div>
                        <div className="testimonials-cards">
                            <div className="crads-profile">
                                <p>
                                    <Image
                                        src={q2qwzuzm}
                                        roundedCircle
                                        alt="Rounded"
                                        width="20%"
                                    />
                                </p>
                            </div>

                            <div className="test-card-heading">
                                <h6>Microdoft</h6>
                                <img src={Verified} alt="" />
                            </div>
                            <p>
                                We were highly impressed with the remarkable
                                qualities that John Smith exhibited throughout
                                the interview process. John's exceptional
                                technical expertise, leadership skills, and
                                innovative
                            </p>
                        </div>
                        <div className="testimonials-cards">
                            <div className="crads-profile">
                                <p>
                                    <Image
                                        src={q2qwzuzm}
                                        roundedCircle
                                        alt="Rounded"
                                        width="20%"
                                    />
                                </p>
                            </div>

                            <div className="test-card-heading">
                                <h6>Microdoft</h6>
                                <img src={Verified} alt="" />
                            </div>
                            <p>
                                We were highly impressed with the remarkable
                                qualities that John Smith exhibited throughout
                                the interview process. John's exceptional
                                technical expertise, leadership skills, and
                                innovative
                            </p>
                        </div>
                        <div className="testimonials-cards">
                            <div className="crads-profile">
                                <p>
                                    <Image
                                        src={q2qwzuzm}
                                        roundedCircle
                                        alt="Rounded"
                                        width="20%"
                                    />
                                </p>
                            </div>

                            <div className="test-card-heading">
                                <h6>Microdoft</h6>
                                <img src={Verified} alt="" />
                            </div>
                            <p>
                                We were highly impressed with the remarkable
                                qualities that John Smith exhibited throughout
                                the interview process. John's exceptional
                                technical expertise, leadership skills, and
                                innovative
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Testimonials;
