import React, { useState } from 'react';
import { Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import background from '../assets/images/AdminLoginPanelBackGround.png';
import blackCross from '../assets/images/blackCross.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForgotPassword } from '../context/ForgotpasswordContext';
import { useNavigate } from 'react-router-dom';

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
        setcurrentStep,
        changePassword
    } = useForgotPassword();
    const navigate = useNavigate();

    const [userOTP, setUserOtp] = useState('');
    const [OTPeror, SetOTPerror] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const ValidateOTP = e => {
        e.preventDefault();
        if (OTP === userOTP) {
            setcurrentStep(3);
            console.log('hello');
        } else {
            SetOTPerror('Wrong otp');
        }
        setUserOtp('');
    };

    // Clear OTP Error On the Change
    const handleOtpChange = e => {
        setUserOtp(e.target.value);

        // Clear the OTP error message when the user starts typing
        if (OTPeror) {
            SetOTPerror('');
        }
    };
    const handleClickAddinput = () => {};
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
        navigate('/');
    };

    const handleReset = async e => {
        e.preventDefault();
        await changePassword(Resetdata);

        setRestdata({
            password: '',
            confirmpassword: ''
        });

        console.log('ResetData:', Resetdata);
    };

    const [Resetdata, setRestdata] = useState({
        password: '',
        confirmpassword: ''
    });
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
            console.log('Form data:', values);
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
                                    onClick={() => navigate('/')}
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
                                    onClick={handleClickAddinput}
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
                        height: '100vh',
                        background: 'rgba(81, 81, 81, 0.448)'
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
                                    <Form.Label style={{ fontSize: '1.25rem' }}>
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
                                    <p style={{ fontSize: '0.6rem' }}>
                                        Password must contain: Min 8 Characters,
                                        Max 15 Characters, 1 Lowercase, 1
                                        Uppercasse, 1 Number.
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label style={{ fontSize: '1.25rem' }}>
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
