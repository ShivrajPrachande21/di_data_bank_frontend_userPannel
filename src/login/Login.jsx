import React, { useState } from 'react';
import './login.css';
import backgroundImage from '../assets/images/AdminLoginPanelBackGround.png';
import { Button, Form, InputGroup, Row } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const hnadleNaviagte = () => {
        navigate('registration');
    };
    return (
        <>
            <div className="login-main">
                <div className="login-image">
                    <img src={backgroundImage} alt="" />
                </div>
                <div className="login-FormDiv">
                    <div className="login-top">
                        <div className="login-head"></div>
                    </div>
                    <div className="loginHead">
                        <p>Log in</p>
                    </div>
                    <div className="login-InputField">
                        <Form>
                            <Form.Label className="custom-lable">
                                Email
                            </Form.Label>
                            <Form.Control
                                className="custom-input"
                                type="email"
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
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder=" Enter Password"
                                        onChange={e =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                    <InputGroup.Text
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="custom-icon"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </InputGroup.Text>
                                </InputGroup>
                                {/*Display error*/}
                                <p
                                    style={{
                                        zIndex: '10',
                                        color: 'red',
                                        fontSize: '12px',
                                        marginLeft: '10px'
                                    }}
                                >
                                    {' '}
                                </p>
                            </Form.Group>
                            <Row>
                                <div className="login-check-custom">
                                    {' '}
                                    <div className="checkboxs">
                                        <Form.Check type="checkbox" />
                                        <span>Remember me</span>
                                    </div>
                                    <p>Forgot Password?</p>
                                </div>
                            </Row>
                            <Row>
                                <Button
                                    type="submit"
                                    className="mt-1 register no-hover-effect"
                                >
                                    log in
                                    {/* {isAuthenticated ? 'loading...' : 'Log in'} */}
                                </Button>
                                {/* <Button
                                    type="submit"
                                    className="mt-1 register no-hover-effect"
                                >
                                    log in
                                 
                                </Button> */}
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

export default Login;
