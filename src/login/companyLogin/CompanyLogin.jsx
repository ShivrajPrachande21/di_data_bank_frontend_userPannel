import React, { useState, useRef, useEffect } from 'react';
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    InputGroup,
    Spinner
} from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import backgroundImage from '../../assets/images/AdminLoginPanelBackGround.png';
import backgroundImage from '../../assets/images/BoarSearchBgImg.jpg'
import WdcLogo from '../../assets/images/Withoutbg.png';
import './companyLogin.css';
import { useNavigate } from 'react-router-dom';
import BaseUrl from '../../services/BaseUrl';
import axios from 'axios';
import { toast } from 'react-toastify';

const CompanyLogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [responseOtp, setresponseOtp] = useState('');
    const [DisplayOtp_input, setDisplayOtp_input] = useState(false);
    const [emailError, setEmailError] = useState('');
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

    const handleInputChange = e => {
        const { name, value } = e.target;
        if (name === 'email') {
            if (value.trim() === '') {
                setEmailError('');
            } else {
                const emailRegex = /^[a-z][^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(value)) {
                    setEmailError('Please enter a valid email address.');
                } else {
                    setEmailError('');
                }
            }
        }
        setCompanydata(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async logiData => {
        localStorage.setItem('email', logiData.email);
        setLoading(true);
        try {
            // Replace with your login endpoint
            const response = await axios.post(`${BaseUrl}company/login`, {
                email: logiData.email, // Sending email directly
                password: logiData.password
            });

            // Simulate successful response
            if (response.status === 200) {
                const company_otp = 10;
                const Candidate_token = response?.data?.CandidateToken;
                // set Candidate token to local storage

                if (company_otp && !Candidate_token) {
                    setDisplayOtp_input(true);

                    setresponseOtp(company_otp);
                    toast.success(response?.data?.message);
                } else if (Candidate_token) {
                    localStorage.setItem('Candidate_token', Candidate_token);
                    localStorage.setItem('render', 'candidate');
                    navigate('/candidate-dashboard/search-job');
                    toast.success(response?.data?.message);
                }

                clearStates();
                // Navigate to dashboard or any other page
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error;
            toast.error(errorMessage);
            setLoading(false);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (emailError || CompanyLogindata.email.trim() === '') {
            setEmailError('Please enter valid Email.');
            return;
        }
        const otpCode = otp.join('');
        console.log('Entered OTP:', otpCode);

        await handleLogin(CompanyLogindata);
        if (rememberMe) {
            // Handle the "Remember Me" functionality
            // localStorage.setItem('email', registration.email);
            localStorage.setItem('password', registration.password);
        } else {
            // Clear the stored email and password
            // localStorage.removeItem('email');
            localStorage.removeItem('password');
        }
        // Handle OTP validation here (e.g., sending to an API)
    };

    const handle_Verify_otp = async e => {
        e.preventDefault();
        try {
            // Replace with actual OTP verification logic

            // API call to verify OTP
            const response = await axios.post(`${BaseUrl}company/login_otp`, {
                email: CompanyLogindata.email,
                OTP: CompanyLogindata.otp
            });
            const Company_token = response?.data?.companyToken;
            localStorage.setItem('companyToken', Company_token);
            localStorage.setItem('render', 'company');
            if (response.status === 200) {
                // Navigate on success
                toast.success('Login successful!');
                navigate('/main/dashboard');
                clearStates();
            } else {
                toast.error('Unexpected response from server.');
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
    // forgot password
    const naigateForgetpassword = () => {
        navigate('/forgot-password');
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

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (token) {
                navigate('/candidate-dashboard/search-job');
            }
        } else if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            if (token) {
                navigate('/main/dashboard');
            }
        }
    }

    async function ResendOTP() {
        try {
            const response = await axios.post(`${BaseUrl}/company/resend/otp`, {
                email: CompanyLogindata.email
            });
            if (response.status == 200 || response.status == 201) {
                toast.success(response?.data?.message);
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    useEffect(() => {
        rendering();
    }, []);

    return (
        <>
            <div className="login-main">
                <div className="login-image">
                    <img src={backgroundImage} alt="" />
                </div>
                <div className="login-FormDiv">
                      <div className="top">
                                            
                                                                    <div className="Head">
                                                                        <img src={WdcLogo} alt="" style={{width:'40%',marginBottom:'10px'}} />
                                                                    </div>
                                                                </div>
                    <div className="loginHead">
                        <p>Log in</p>
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
                                <p className="email-error">{emailError}</p>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    {' '}
                                    <Form.Label className="custom-lable">
                                        Password
                                    </Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            className="custom-input"
                                            name="password"
                                            value={CompanyLogindata.password}
                                            onChange={handleInputChange}
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Enter Password"
                                            required
                                        />
                                        <InputGroup.Text
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )}
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Row>
                            {DisplayOtp_input && (
                                <Row className="justify-content-center mt-2 mb-4">
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
                                                    handleChange(
                                                        e.target,
                                                        index
                                                    )
                                                }
                                                onKeyDown={e =>
                                                    handleKeyDown(e, index)
                                                }
                                                ref={el =>
                                                    (inputRefs.current[index] =
                                                        el)
                                                }
                                                className="text-center otp-input"
                                            />
                                        </Col>
                                    ))}
                                    <Col xs={12}>
                                        <span
                                            style={{
                                                color: '#3b96e1',
                                                fontSize: '0.8rem',
                                                float: 'right',
                                                cursor: 'pointer',
                                                paddingTop: '5px'
                                            }}
                                            onClick={ResendOTP}
                                        >
                                            Resend
                                        </span>
                                    </Col>
                                </Row>
                            )}
                            {DisplayOtp_input ? (
                                ''
                            ) : (
                                <Row className="mt-2">
                                    <div className="login-check-custom">
                                        {' '}
                                        <div className="checkboxs">
                                            <Form.Check
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={e =>
                                                    setRememberMe(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <span>Remember me</span>
                                        </div>
                                        <p
                                            style={{
                                                marginTop: '10px',
                                                cursor: 'pointer'
                                            }}
                                            onClick={naigateForgetpassword}
                                        >
                                            Forgot Password?
                                        </p>
                                    </div>
                                </Row>
                            )}

                            <Row className="mt-1">
                                {DisplayOtp_input ? (
                                    <div className="btn-div">
                                        <button onClick={handle_Verify_otp}>
                                            Verify Otp
                                        </button>
                                    </div>
                                ) : (
                                    <div className="btn-div">
                                        <button type="submit">
                                            {' '}
                                            {loading ? (
                                                <Spinner
                                                    animation="border"
                                                    size="sm"
                                                />
                                            ) : (
                                                'Log in'
                                            )}
                                        </button>
                                    </div>
                                )}
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
