import React from 'react';
import './footer.css';
import { Button, Image } from 'react-bootstrap';
import instagram from '../../assets/images/instagram.png';
import facebook from '../../assets/images/facebook.png';
import twiter from '../../assets/images/twiter.png';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <>
            <div className="footer-container">
                <div className="footer-child">
                    <div className="footer-left">
                        <Image src="" roundedCircle alt="Rounded" width="20%" />
                    </div>
                    <div className="footer-right">
                        <p>Socials:</p>
                        <div className="social-icon-div">
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={instagram} alt="Instagram" />
                            </a>

                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={facebook} alt="Facebook" />
                            </a>
                            <a
                                href="https://www.twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={twiter} alt="Twitter" />
                            </a>
                        </div>
                        <p style={{ marginTop: '10px' }}>Contact</p>
                        <ul>
                            <li>
                                <a href=" ">wdcjobportal@gmail.com</a>
                            </li>
                            <li>
                                <a href=" "> +202 465121211</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>
                        {' '}
                        <Link to="/privacy-policy">Privacy Policy</Link>
                    </p>
                    <p>
                        {' '}
                        <Link to="/terms-condition">Terms & Conditions</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Footer;
