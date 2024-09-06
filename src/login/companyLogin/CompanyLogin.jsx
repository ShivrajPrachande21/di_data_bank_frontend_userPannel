import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import backgroundImage from '../../assets/images/AdminLoginPanelBackGround.png';

import { useNavigate } from 'react-router-dom';

const CompanyLogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [CompanyLogindata, setCompanydata] = useState({
        email: '',
        password: '',
        otp: ''
    });
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
    console.log('otp', otp);

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const otpCode = otp.join('');
        console.log('Entered OTP:', otpCode);
        if (rememberMe) {
            // Handle the "Remember Me" functionality
            localStorage.setItem('email', registration.email);
            localStorage.setItem('password', registration.password);
        } else {
            // Clear the stored email and password
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }
        // Handle OTP validation here (e.g., sending to an API)
    };
    const handleInputChange = e => {
        const { name, value } = e.target;
        setCompanydata(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const OTP = otp.join('');
        console.log('OTP as string:', OTP);
        // Update OTP in CompanyLogindata state
        setCompanydata(prevData => ({
            ...prevData,
            otp: OTP
        }));
    }, [otp]);
    console.log('COmpany Login data', CompanyLogindata);
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
                                        name="email"
                                        type="email"
                                        value={CompanyLogindata.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    {' '}
                                    <Form.Label className="custom-lable">
                                        Password
                                    </Form.Label>
                                    <Form.Control
                                        className="custom-input"
                                        type="text"
                                        name="password"
                                        value={CompanyLogindata.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row className="justify-content-center mt-2 mb-2">
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
                                <div className="login-check-custom">
                                    {' '}
                                    <div className="checkboxs">
                                        <Form.Check
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={e =>
                                                setRememberMe(e.target.checked)
                                            }
                                        />
                                        <span>Remember me</span>
                                    </div>
                                    <p>Forgot Password?</p>
                                </div>
                            </Row>
                            {/* <Button
                                type="submit"
                                variant="primary"
                                className="mt-3"
                            >
                                Submit OTP
                            </Button> */}
                            <Row className="mt-1">
                                <div className="btn-div">
                                    <button>Log in</button>
                                </div>
                            </Row>
                            <Row>
                                <div className="login-already">
                                    <p>
                                        Already have an account?{' '}
                                        <span onClick={hnadleNaviagte}>
                                            Sign up
                                        </span>
                                    </p>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyLogin;
