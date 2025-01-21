import React from 'react';
import './footer.css';
import { Button, Image } from 'react-bootstrap';
import instagram from '../../assets/images/instagram.png';
import facebook from '../../assets/images/facebook.png';
import twiter from '../../assets/images/twiter.png';
import WdcLogo from '../../assets/images/whiteLogo.png';
import devicon_linkedin from '../../assets/images/devicon_linkedin.png';
import circum_linkedin from '../../assets/images/circum_linkedin.png';
import facebookfooter from '../../assets/images/facebookfooter.png';
import mdi_instagram from '../../assets/images/mdi_instagram.png';

import { Link } from 'react-router-dom';
function Footer() {
    return (
        <>
            <div className="footer-container">
                <div className="footer-child">
                    <div className="footer-left">
                        <Image
                            src={WdcLogo}
                            rounded
                            alt="Rounded"
                            width="20%"
                        />
                    </div>
                    <div className="footer-right">
                        {/* <p>Socials:</p>
                        <div className="social-icon-div">
                            <a
                                href="https://www.linkedin.com/showcase/105695325/admin/dashboard/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={devicon_linkedin} alt="Twitter" />
                            </a>
                            <a
                                href="https://www.instagram.com/boardsearch.ai/profilecard/?igsh=MWQ5dGo0ZGM4dGl2eA=="
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={instagram} alt="Instagram" />
                            </a>

                            <a
                                href="https://www.facebook.com/profile.php?id=61569318327675"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={facebook} alt="Facebook" />
                            </a>
                        </div> */}
                        <p style={{ marginTop: '10px' }}>Contact</p>
                        <ul>
                            <li>
                                <a href=" mailto:priyanka.bagda@directors-institute.com">
                                    {' '}
                                    priyanka.bagda@directors-institute.com
                                </a>
                            </li>
                            <li>
                                <a href=" tel:+7039000797"> +7039000797</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="copyright">
                        <p>
                            <Link to="/terms-condition">
                                &#169; 2025 - Copyright
                            </Link>
                        </p>
                    </div>
                    <div className="fotter-images">
                        <a
                            href="https://www.linkedin.com/showcase/105695325/admin/dashboard/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={circum_linkedin} alt="" width={34} />
                        </a>

                        <a
                            href="https://www.instagram.com/boardsearch.ai/profilecard/?igsh=MWQ5dGo0ZGM4dGl2eA=="
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={mdi_instagram} alt="" width={34} />
                        </a>
                        <a
                            href="https://www.facebook.com/profile.php?id=61569318327675"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={facebookfooter} alt="" height={32} />
                        </a>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <p>
                            {' '}
                            <Link to="/privacy-policy">Privacy Policy</Link>
                        </p>
                        <p>
                            {' '}
                            <Link to="/terms-condition">
                                Terms & Conditions
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
