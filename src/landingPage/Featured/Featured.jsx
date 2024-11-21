import React from 'react';
import './featured.css';
import { Button, Image } from 'react-bootstrap';
import Featured_left from '../../assets/images/Featured_left.png';
import listIcon from '../../assets/images/listIcon.png';
import featured_right from '../../assets/images/featured_right.png';
function Featured() {
    return (
        <>
            <div className="featured-container">
                <div className="featured-h1">
                    <h2>AI-Powered Search</h2>
                    <p>AI-Powered Search to Match Jobs with Talent</p>
                </div>
                <div className="featred-main">
                    <div className="featured-left">
                        <div className="featured-left-contents">
                            <h4>FOR CANDIDATE</h4>
                            <ul>
                                <li>
                                    <img src={listIcon} alt="" />
                                    Tailored Job Recommendations
                                </li>
                                <li>
                                    {' '}
                                    <img src={listIcon} alt="" />
                                    Discover Relevant Roles
                                </li>
                                <li>
                                    {' '}
                                    <img src={listIcon} alt="" />
                                    Save Time
                                </li>
                                <li>
                                    {' '}
                                    <img src={listIcon} alt="" />
                                    Stay Updated
                                </li>
                            </ul>
                        </div>
                        <div className="featured-left-image">
                            <Image
                                src={Featured_left}
                                rounded
                                alt="Rounded"
                                width="100%"
                            />
                        </div>
                    </div>
                    <div className="featured-left">
                        <div className="featured-left-contents">
                            <h4>FOR COMPANIES</h4>
                            <ul>
                                <li>
                                    <img src={listIcon} alt="" />
                                    Find Top Talent Quickly
                                </li>
                                <li>
                                    {' '}
                                    <img src={listIcon} alt="" />
                                    Enhanced Candidate Filtering
                                </li>
                                <li>
                                    {' '}
                                    <img src={listIcon} alt="" />
                                    Reduce Hiring Time
                                </li>

                                <li>
                                    {' '}
                                    <img src={listIcon} alt="" />
                                    Continuous Improvement
                                </li>
                            </ul>
                        </div>
                        <div className="featured-left-image">
                            <Image
                                src={featured_right}
                                rounded
                                alt="Rounded"
                                width="100%"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Featured;
