import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import backgroundImage from '../../assets/images/AdminLoginPanelBackGround.png';
import './company_r.css';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../../context/RegistrationContex';
import axios from 'axios';
import BaseUrl from '../../services/BaseUrl';
import { toast } from 'react-toastify';
const CompanyRegistration = () => {
    const { OTP, sendOtp, verifyOtp, HideOTP, setHideOTP } = useRegistration();
    const [timeLeft, setTimeLeft] = useState(0);
    const [company_reg, setcompany_reg] = useState({
        email: '',
        password: '',
        company_name: '',

        setpassword: ''
    });

    const handleInputChange = e => {
        const { name, value } = e.target;

        setcompany_reg(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const register_company = async () => {
        try {
            const response = await axios.post(
                `${BaseUrl}company/reg`,
                company_reg
            );
            if (response.status == 200 || response.status == 201) {
                toast.success('companay registered Successfully !');
                setHideOTP(prev => !prev);
                navigate('/');
            }
        } catch (error) {
            toast.error('Failed to register the company');
        }
    };

    const retrieveFormData = () => {
        const data = sessionStorage.getItem('formData');
        if (data) {
            return JSON.parse(data);
        }

        return { email: '', password: '', setpassword: '' }; // Default empty values
    };

    const [formData, setFormData] = useState(retrieveFormData());

    console.log('form data in Company', formData);
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

    const handleFormSubmit = async e => {
        e.preventDefault();
        const otpCode = otp.join('');

        if (OTP == otpCode) {
            await register_company();
        } else {
            toast.error(
                'The OTP you entered did not match. Please check and try again.'
            );
        }
        // Handle OTP validation here (e.g., sending to an API)
    };

    const handle_otp = async () => {
        if (company_reg.company_name == '') {
            toast.error(' Please Enter Company Name');
        } else if (company_reg.email == '') {
            toast.error('Please Enter Mobile Number');
        } else {
            startTimer();
            await sendOtp(company_reg.email);
        }
    };

    // Timer

    useEffect(() => {
        if (timeLeft <= 0) {
            setTimeLeft(0);
            setHideOTP(false); // Toggle hideOTP when timeLeft reaches 0
            return;
        }
        const timer = setInterval(() => setTimeLeft(time => time - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const startTimer = () => setTimeLeft(120);

    useEffect(() => {
        retrieveFormData();
        setcompany_reg(prevData => ({
            ...prevData,
            email: formData.email || '',
            password: formData.password || '',
            setpassword: formData.setpassword
        }));
    }, []);

    console.log('foromData', company_reg);
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
                        <Form onSubmit={handleFormSubmit}>
                            <Row>
                                <Col>
                                    <Form.Label
                                        className="custom-lable"
                                        style={{ fontSize: '1rem' }}
                                    >
                                        Company name
                                    </Form.Label>
                                    <Form.Control
                                        className="custom-input"
                                        type="text"
                                        name="company_name"
                                        placeholder="Enter your email"
                                        required
                                        value={company_reg.company_name}
                                        onChange={handleInputChange}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    {' '}
                                    <Form.Label
                                        className="custom-lable"
                                        style={{ fontSize: '1rem' }}
                                    >
                                        Mobile No.
                                    </Form.Label>
                                    <Form.Control
                                        className="custom-input"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your mobile no"
                                        value={company_reg.email}
                                        onChange={handleInputChange}
                                        disabled
                                        required
                                    />
                                </Col>
                                <Col xs={3}>
                                    <Button
                                        variant="primary"
                                        className="send-otp"
                                        onClick={handle_otp}
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
                                {HideOTP && (
                                    <p className="Otp-timer">
                                        {String(
                                            Math.floor(timeLeft / 60)
                                        ).padStart(2, '0')}
                                        :
                                        {String(timeLeft % 60).padStart(2, '0')}
                                    </p>
                                )}
                                {HideOTP
                                    ? otp.map((digit, index) => (
                                          <Col key={index} xs={2}>
                                              <Form.Control
                                                  type="text"
                                                  maxLength="1"
                                                  value={digit}
                                                  onChange={e =>
                                                      handleChange(
                                                          e.target,
                                                          index
                                                      )
                                                  }
                                                  onKeyDown={e =>
                                                      handleKeyDown(e, index)
                                                  }
                                                  ref={el =>
                                                      (inputRefs.current[
                                                          index
                                                      ] = el)
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
                                      ))
                                    : ''}
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
                                    <button type="submit">Register</button>
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
