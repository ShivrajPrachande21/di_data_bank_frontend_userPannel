import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './registration.css';
import backgroundImage from '../assets/images/AdminLoginPanelBackGround.png';
import { Form, Button, InputGroup, Row, Col, Alert } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import useRegistration from './useRegistration';

const Registration = () => {
    const navigate = useNavigate();
    const {
        formData,
        errors,
        successMessage,

        errorMessage,
        isSubmitting,
        validate,
        handleChange,
        handleSubmit,
        handle_candidate_registration
    } = useRegistration();

    const [showPassword, setShowPassword] = useState(false);

    const handleFormSubmit = async e => {
        e.preventDefault();
        validate();
        if (validate()) {
            return; // Stop the submission if the validation fails
        } else {
            if (formData.role == 'company') {
                await handleSubmit(e);
            } else {
                // Navigate based on your requirements
                await handle_candidate_registration(e);
            }
        }
    };

    const handleforgetpassword = () => {
        // Handle forgot password logic
    };

    const handleNavigate = () => {
        navigate('/');
    };

    return (
        <>
            <div className="main">
                <div className="image">
                    <img src={backgroundImage} alt="Background" />
                </div>
                <div className="FormDiv">
                    <div className="top">
                        <div className="head"></div>
                    </div>
                    <div className="loginHead">
                        <p>Registration</p>
                    </div>
                    <div className="InputField">
                        <Form onSubmit={handleFormSubmit} className="mt-4">
                            <Form.Label className="custom-lable">
                                Select
                            </Form.Label>
                            <Form.Select
                                aria-label="Select an Option"
                                name="role"
                                className="custom-select"
                                value={formData.role}
                                onChange={handleChange} // Use handleChange from the custom hook
                                required
                            >
                                <option value="">Select</option>
                                <option value="company">Company</option>
                                <option value="candidate">Candidate</option>
                            </Form.Select>

                            <Form.Label className="custom-lable">
                                Email address
                            </Form.Label>
                            <Form.Control
                                className="custom-input"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange} // Use handleChange from the hook
                                placeholder="Enter your email"
                                required
                            />
                            {errors.email && (
                                <p className="display-error">{errors.email}</p>
                            )}

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="custom-lable">
                                    Password
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        className="custom-input"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        type={
                                            showPassword ? 'text' : 'password'
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
                                {errors.password && (
                                    <p className="display-error">
                                        {errors.password}
                                    </p>
                                )}
                            </Form.Group>

                            <Form.Group controlId="formBasicConfirmPassword">
                                <Form.Label className="custom-lable">
                                    Confirm Password
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        className="custom-input"
                                        name="setpassword"
                                        value={formData.setpassword}
                                        onChange={handleChange}
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="Confirm Password"
                                        required
                                    />
                                    <InputGroup.Text
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </InputGroup.Text>
                                </InputGroup>
                                {errors.setpassword && (
                                    <p className="display-error">
                                        {errors.setpassword}
                                    </p>
                                )}
                            </Form.Group>

                            <Row>
                                <div className="check-custom">
                                    <Form.Check type="checkbox" />
                                    <span>Accept</span>
                                    <p>Terms & Conditions</p>
                                </div>
                            </Row>

                            <Row className="px-2">
                                <Button
                                    type="submit"
                                    className="mt-1 register no-hover-effect"
                                    disabled={isSubmitting} // Disable button while submitting
                                >
                                    {isSubmitting
                                        ? 'Registering...'
                                        : 'Register'}
                                </Button>
                            </Row>

                            {errorMessage && (
                                <Alert variant="danger">{errorMessage}</Alert>
                            )}
                            {successMessage && (
                                <Alert variant="success">
                                    {successMessage}
                                </Alert>
                            )}

                            <Row>
                                <div className="already">
                                    <p>
                                        Already have an account?{' '}
                                        <span onClick={handleNavigate}>
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
