import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import './testimonials.css';
import Verified from '../../assets/images/Verified.png';
import q2qwzuzm from '../../assets/images/q2qwzuzm.png';
import { testimonialsData } from '../../constant/testimonials';
function Testimonials() {
    const [testimonials, setTestimonialData] = useState(testimonialsData);
    return (
        <>
            <div className="testimonials">
                <div className="testimonials-child">
                    <div className="restimonials-h1">
                        <h1>Testimonials</h1>
                        <p>From Company & Candidates</p>
                    </div>

                    <div
                        className="testimonials-card-div align"
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'start',
                            flexWrap: 'nowrap',
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            width: '100%'
                        }}
                    >
                        {testimonials &&
                            testimonials.map((items, index) => (
                                <div
                                    style={{
                                        display: 'flex',
                                        padding: '30px '
                                    }}
                                >
                                    <div className="testimonials-cards">
                                        <div className="crads-profile">
                                            <p>
                                                <Image
                                                    src={
                                                        items.image
                                                            ? items?.image
                                                            : q2qwzuzm
                                                    }
                                                    roundedCircle
                                                    alt="Rounded"
                                                    width="20%"
                                                />
                                            </p>
                                        </div>

                                        <div className="test-card-heading">
                                            <h6>{items?.name}</h6>
                                            <img src={Verified} alt="" />
                                        </div>
                                        <p>{items?.text}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Testimonials;
