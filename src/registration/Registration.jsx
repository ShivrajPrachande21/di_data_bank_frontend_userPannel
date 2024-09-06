import React, { useState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './registration.css';
import backgroundImage from '../assets/images/AdminLoginPanelBackGround.png';
import {
    Form,
    Button,
    InputGroup,
    Spinner,
    Alert,
    Row,
    Col
} from 'react-bootstrap';

import './registration.css';
import { useNavigate } from 'react-router-dom';
const Registration = () => {
    const navigate = useNavigate();
    const [registration, setregistration] = useState({
        email: '',
        password: '',
        setPassword: '',
        role: ''
    });

    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const handleforgetpassword = () => {};

    const hnadleNaviagte = () => {
        navigate('/');
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setregistration(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (registration.role === 'company') {
            navigate('/company-registration');
        } else {
            navigate('');
        }
        console.log('data', registration);
    };
    return (
        <>
            <div className="main">
                <div className="image">
                    <img src={backgroundImage} alt="" />
                </div>
                <div className="FormDiv">
                    <div className="top">
                        <div className="head"></div>
                    </div>
                    <div className="loginHead">
                        <p>Registration</p>
                    </div>
                    <div className="InputField">
                        <Form onSubmit={handleSubmit} className="mt-4">
                            <Form.Label className="custom-lable">
                                Select
                            </Form.Label>
                            <Form.Select
                                aria-label="Select an Option"
                                name="role"
                                className="custom-select"
                                value={registration.role}
                                onChange={handleInputChange}
                            >
                                <option value="">Select</option>
                                <option value="company">company</option>
                                <option value="candidate">candidate</option>
                            </Form.Select>
                            <Form.Label className="custom-lable">
                                Email address
                            </Form.Label>
                            <Form.Control
                                className="custom-input"
                                name="email"
                                type="email"
                                value={registration.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                required
                            />

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="custom-lable">
                                    Password
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        className="custom-input"
                                        name="password"
                                        value={registration.password}
                                        onChange={handleInputChange}
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder=" Enter Password"
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
                                {/*Display error*/}
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="custom-lable">
                                    Set Password
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        className="custom-input"
                                        name="setPassword"
                                        value={registration.setPassword}
                                        onChange={handleInputChange}
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder=" Enter Password"
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
                                {/*Display error*/}
                                <p className="display-error"> </p>
                            </Form.Group>

                            <Row>
                                <div className="check-custom">
                                    {' '}
                                    <Form.Check type="checkbox" />
                                    <span>Accept</span>
                                    <p>Terms & Conditions</p>
                                </div>
                            </Row>
                            <Row className="px-2 ">
                                <Button
                                    type="submit"
                                    className="mt-1 register no-hover-effect"
                                >
                                    Register
                                    {/* {isAuthenticated ? 'loading...' : 'Log in'} */}
                                </Button>
                            </Row>
                            <Row>
                                <div className="already">
                                    <p>
                                        Already have an account?{' '}
                                        <span onClick={hnadleNaviagte}>
                                            Log in
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

export default Registration;
