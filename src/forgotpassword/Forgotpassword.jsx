import React, { useState } from 'react';
import { Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import background from '../assets/images/BoarSearchBgImg.jpg';
import blackCross from '../assets/images/blackCross.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForgotPassword } from '../context/ForgotpasswordContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import BaseUrl from '../services/BaseUrl';

const Forgotpassword = () => {
    const {
        OTP,
        email,
        setEmail,
        loading,
        error,
        successMessage,
        handleForgotPassword,
        currentStep,
        setcurrentStep
    } = useForgotPassword();
    const navigate = useNavigate();

    const [userOTP, setUserOtp] = useState('');
    const [OTPeror, SetOTPerror] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [Resetdata, setRestdata] = useState({
        password: '',
        confirmpassword: ''
    });

    const ValidateOTP = async e => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${BaseUrl}company/forget/verify`,
                {
                    email,
                    OTP: userOTP
                }
            );
            if (response.status == 200 || response.status == 201) {
                setcurrentStep(3);
            }
            setUserOtp('');
        } catch (error) {
            SetOTPerror(error.response.data.error);
        }
    };

    // Clear OTP Error On the Change
    const handleOtpChange = e => {
        setUserOtp(e.target.value);

        // Clear the OTP error message when the user starts typing
        if (OTPeror) {
            SetOTPerror('');
        }
    };
    const naviagteBack = () => {
        setcurrentStep(1);
        setEmail('');
        setRestdata({
            password: '',
            confirmpassword: ''
        });
        navigate('/login');
    };
    // Yup validation schema
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .matches(
                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                'Email must be in lowercase'
            )
            .required('Email is required')
    });

    const navigate_back = () => {
        setcurrentStep(1);
        setEmail('');
        setRestdata({
            password: '',
            confirmpassword: ''
        });
        navigate('/login');
    };

    const changePassword = async data => {
        try {
            const response = await axios.post(`${BaseUrl}company/newpassword`, {
                email,
                password: data?.password,
                confirmpassword: data?.confirmpassword
            });
            if (response.status == 200 || response.status == 201) {
                toast.success('password changed successfully!');
                setcurrentStep(0);
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.error);
        }
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8}$/;

    const handleReset = async e => {
        e.preventDefault();

        if (!Resetdata.password || !Resetdata.confirmpassword) {
            toast.error('Both password fields are required.');
            return;
        }

        // if (!passwordRegex.test(Resetdata.password)) {
        //     toast.error(
        //         'Password must be 8-15 characters, including 1 uppercase, 1 lowercase, and 1 number.'
        //     );
        //     return;
        // }

        if (Resetdata.password !== Resetdata.confirmpassword) {
            toast.error('Passwords do not match.');
            return;
        }

        // Proceed to change password if all validations pass
        await changePassword(Resetdata);

        setRestdata({
            password: '',
            confirmpassword: ''
        });
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setRestdata(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    // Formik hook for handling form and validation
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema,
        onSubmit: async e => {
            e.preventDefault();

            await handleForgotPassword(email); // Pass the email from form values
            setcurrentStep(2); // Move to the next step after the email is processed
        }
    });
    const handle_forgotPassword = async e => {
        e.preventDefault();
        await handleForgotPassword(email);
    };
    const handle_change_password = async e => {
        e.preventDefault();
    };

    const handleNavigate = () => {
        setEmail('');
        navigate('/login');
    };

    return (
        <>
            {currentStep === 1 && (
                <div
                    className="center"
                    style={{
                        position: 'absolute',
                        backgroundImage: `linear-gradient(rgba(81, 81, 81, 0.448), rgba(81, 81, 81, 0.448)), url(${background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100vh',
                        zIndex: 1
                    }}
                >
                    <div
                        className="main"
                        style={{
                            position: 'absolute',
                            width: '35vw',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            height: 'auto',
                            background: '#FFF',
                            padding: '16px 30px',
                            borderRadius: '8px',
                            zIndex: 10
                        }}
                    >
                        <Form onSubmit={handle_forgotPassword}>
                            <Row>
                                <Col xs={11}>
                                    <p
                                        style={{
                                            color: '#3B96E1',
                                            fontWeight: '600',
                                            fontSize: '1.2rem'
                                        }}
                                    >
                                        Forgot Password <br />
                                    </p>
                                    <p
                                        style={{
                                            fontSize: '0.8rem',
                                            marginTop: '-10px',
                                            color: '#333333'
                                        }}
                                    >
                                        Enter the email address associated with
                                        your account and we’ll send you a Code
                                        to Reset your Password.
                                    </p>
                                </Col>
                                <Col
                                    onClick={() => handleNavigate()}
                                    xs={1}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        src={blackCross}
                                        alt=""
                                        style={{
                                            width: '24px',
                                            marginTop: '6px'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                   
                                      <Form.Label className="custom-lable">
                                      Email
                                                                    </Form.Label>
                                    <Form.Control
                                        className="custom-placeholder"
                                        placeholder="E.g. john@example.com"
                                        aria-describedby="inputGroup-sizing-sm"
                                        required
                                        style={{
                                            background: '#F8F8F8'
                                        }}
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.email}
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Button
                                    type="submit"
                                    style={{
                                        padding: '2px 40px',
                                        fontSize: '0.8rem',
                                        background: '#3B96E1',
                                        padding: '6px',
                                        borderRadius: '2px'
                                    }}
                                >
                                    Get code
                                </Button>
                            </Row>
                        </Form>
                    </div>
                </div>
            )}

            {currentStep === 2 && (
                <div
                    className="center"
                    style={{
                        position: 'absolute',
                        backgroundImage: `linear-gradient(rgba(81, 81, 81, 0.448), rgba(81, 81, 81, 0.448)), url(${background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100vh'
                    }}
                >
                    <div
                        className="main"
                        // ref={mainRef}
                        style={{
                            position: 'absolute',
                            width: '35vw',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            height: 'auto',

                            background: '#FFF',
                            padding: '16px 30px',
                            borderRadius: '8px',
                            zIndex: '10'
                        }}
                    >
                        <Form onSubmit={ValidateOTP}>
                            <Row>
                                <Col xs={11}>
                                    <p
                                        style={{
                                            color: '#3B96E1',
                                            fontWeight: '600',
                                            fontSize: '1.2rem'
                                        }}
                                    >
                                        Reset Password <br />
                                    </p>
                                </Col>
                                <Col
                                    onClick={naviagteBack}
                                    xs={1}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        src={blackCross}
                                        alt=""
                                        style={{
                                            width: '24px',
                                            marginTop: '6px'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label style={{ fontSize: '1.25rem' }}>
                                        Code
                                    </Form.Label>
                                    <Form.Control
                                        className="custom-placeholder"
                                        placeholder="E.g. 232323"
                                        aria-describedby="inputGroup-sizing-sm"
                                        required
                                        style={{
                                            background: '#F8F8F8'
                                        }}
                                        type="text"
                                        name="OTP"
                                        value={userOTP}
                                        onChange={handleOtpChange}
                                    />
                                    <p
                                        style={{
                                            color: 'red',
                                            fontSize: '0.8rem',
                                            marginTop: '10px'
                                        }}
                                    >
                                        {OTPeror}
                                    </p>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Button
                                    type="submit"
                                    style={{
                                        padding: '2px 40px',
                                        fontSize: '0.8rem',
                                        background: '#3B96E1',
                                        padding: '6px',
                                        borderRadius: '2px'
                                    }}
                                >
                                    verify
                                </Button>
                            </Row>
                        </Form>
                    </div>
                </div>
            )}

            {currentStep === 3 && (
                <div
                    className="center"
                    style={{
                        position: 'absolute',
                        backgroundImage: `linear-gradient(rgba(81, 81, 81, 0.448), rgba(81, 81, 81, 0.448)), url(${background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100vh'
                    }}
                >
                    <div
                        className="main"
                        // ref={mainRef}
                        style={{
                            position: 'absolute',
                            width: '38vw',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            height: 'auto',

                            background: '#FFF',
                            padding: '16px 30px',
                            borderRadius: '8px',
                            zIndex: '10'
                        }}
                    >
                        <Form onSubmit={handleReset}>
                            <Row>
                                <Col xs={11}>
                                    <p
                                        style={{
                                            color: '#3B96E1',
                                            fontWeight: '600',
                                            fontSize: '1.5rem'
                                        }}
                                    >
                                        Reset Password <br />
                                    </p>
                                    <p>Create new password</p>
                                </Col>
                                <Col
                                    onClick={navigate_back}
                                    xs={1}
                                    style={{ cursor: 'pointer' }}
                                >
                                    X
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                   
                                    <Form.Label className="custom-lable">
                                    Set Password
                                                                    </Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder=" Enter Password"
                                            required
                                            value={Resetdata.password}
                                            onChange={handleInputChange}
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
                                    {/* <p style={{ fontSize: '0.6rem' }}>
                                        Password must contain: Min 8 Characters,
                                        Max 15 Characters, 1 Lowercase, 1
                                        Uppercasse, 1 Number.
                                    </p> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                  
                                    <Form.Label className="custom-lable">
                                     Confirm Password
                                                                    </Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name="confirmpassword"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder=" Enter Password"
                                            value={Resetdata.confirmpassword}
                                            onChange={handleInputChange}
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
                            <Row className="mt-1">
                                <Col>
                                    <Form.Group
                                        controlId="formBasicCheckbox"
                                        className="mt-1"
                                    >
                                        <Form.Check
                                            type="checkbox"
                                            label="Remember Me"
                                            checked={rememberMe}
                                            onChange={e =>
                                                setRememberMe(e.target.checked)
                                            }
                                            style={{
                                                color: 'rgba(59, 150, 225, 1)'
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Button
                                    type="submit"
                                    style={{
                                        padding: '2px 40px',
                                        fontSize: '0.8rem',
                                        background: '#3B96E1',
                                        padding: '6px',
                                        borderRadius: '2px'
                                    }}
                                >
                                    Continue
                                </Button>
                            </Row>
                        </Form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Forgotpassword;
