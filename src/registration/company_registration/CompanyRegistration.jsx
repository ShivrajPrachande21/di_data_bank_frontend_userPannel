import React, { useState, useRef } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import backgroundImage from '../../assets/images/AdminLoginPanelBackGround.png';
import './company_r.css';
import { useNavigate } from 'react-router-dom';
const CompanyRegistration = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const hnadleNaviagte = () => {
        navigate('/registration');
    };
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        const value = element.value;
        if (/^[0-9]$/.test(value) || value === '') {
            let newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move focus to next input
            if (value !== '' && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const otpCode = otp.join('');
        console.log('Entered OTP:', otpCode);
        // Handle OTP validation here (e.g., sending to an API)
    };
    return (
        <>
            <div className="login-main">
                <div className="login-image">
                    <img src={backgroundImage} alt="" />
                </div>
                <div className="login-FormDiv">
                    <div className="loginHead">
                        <p>Registration</p>
                    </div>
                    <div className="login-InputField">
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Label className="custom-lable">
                                        Email
                                    </Form.Label>
                                    <Form.Control
                                        className="custom-input"
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    {' '}
                                    <Form.Label className="custom-lable">
                                        Mobile No.
                                    </Form.Label>
                                    <Form.Control
                                        className="custom-input"
                                        type="text"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </Col>
                                <Col xs={3}>
                                    <Button
                                        variant="primary"
                                        className="send-otp"
                                    >
                                        Get OTP
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="justify-content-center mt-2 mb-1">
                                <Col xs={12}>
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            fontSize: '0.76rem'
                                        }}
                                    >
                                        Enter the OTP sent to number
                                    </p>
                                </Col>
                                {otp.map((digit, index) => (
                                    <Col key={index} xs={2}>
                                        <Form.Control
                                            type="text"
                                            maxLength="1"
                                            value={digit}
                                            onChange={e =>
                                                handleChange(e.target, index)
                                            }
                                            onKeyDown={e =>
                                                handleKeyDown(e, index)
                                            }
                                            ref={el =>
                                                (inputRefs.current[index] = el)
                                            }
                                            className="text-center otp-input"
                                            style={{
                                                fontSize: '14px',
                                                padding: '8px 8px',
                                                textAlign: 'center',
                                                width: '3.4vw'
                                            }}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label className="custom-lable">
                                        Location
                                    </Form.Label>
                                    <Form.Control
                                        className="custom-input"
                                        type="text"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </Col>
                            </Row>

                            {/* <Button
                                type="submit"
                                variant="primary"
                                className="mt-3"
                            >
                                Submit OTP
                            </Button> */}
                            <Row className="mt-3">
                                <div className="btn-div">
                                    <button>Register</button>
                                </div>
                                <div className="btn-div-2">
                                    <button onClick={hnadleNaviagte}>
                                        back
                                    </button>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyRegistration;
