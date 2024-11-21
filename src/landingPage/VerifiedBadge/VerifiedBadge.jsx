import React from 'react';
import './aiPowered.css';
import VerifiedBadgeimge from '../../assets/images/VerifiedBadgeimge.png';
import Verified from '../../assets/images/Verified.png';
import { OverlayTrigger } from 'react-bootstrap';
const VerifiedBadge = () => {
    return (
        <>
            <div className="verified-badge-container">
                <div className="verified-badge-child">
                    <div className="verified-badge-h1">
                        <h1>Verified Badge & Credibility</h1>
                        <p>Build Credibility with Verified Badges</p>
                    </div>
                    <div className="verified-contents-div">
                        <div className="verified-left-image">
                            <img src={VerifiedBadgeimge} alt="" />
                        </div>
                        <div className="verified-right">
                            <div className="verifired-right-card">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <div
                                            style={{
                                                position: 'absolute',
                                                backgroundColor: '#DAFFDA',
                                                padding: '2px 10px',
                                                color: '#008000',
                                                borderRadius: 3,
                                                border: '1px solid #008000'
                                            }}
                                        >
                                            Verified
                                        </div>
                                    }
                                >
                                    <img src={Verified} alt="" />
                                </OverlayTrigger>
                                <div className="verified-card-content">
                                    <h4> Get Verified:</h4>
                                    <p>
                                        Stand out and build trust by earning a
                                        verified badge for both candidates and
                                        companies.
                                    </p>
                                </div>
                            </div>
                            <div className="verifired-right-card">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <div
                                            style={{
                                                position: 'absolute',
                                                backgroundColor: '#DAFFDA',
                                                padding: '2px 10px',
                                                color: '#008000',
                                                borderRadius: 3,
                                                border: '1px solid #008000'
                                            }}
                                        >
                                            Verified
                                        </div>
                                    }
                                >
                                    <img src={Verified} alt="" />
                                </OverlayTrigger>
                                <div className="verified-card-content">
                                    <h4> Establish Credibility:</h4>
                                    <p>
                                        Showcase your reliability through
                                        ratings and feedback from previous
                                        employers or hires.
                                    </p>
                                </div>
                            </div>
                            <div className="verifired-right-card">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <div
                                            style={{
                                                position: 'absolute',
                                                backgroundColor: '#DAFFDA',
                                                padding: '2px 10px',
                                                color: '#008000',
                                                borderRadius: 3,
                                                border: '1px solid #008000'
                                            }}
                                        >
                                            Verified
                                        </div>
                                    }
                                >
                                    <img src={Verified} alt="" />
                                </OverlayTrigger>

                                <div className="verified-card-content">
                                    <h4> Attract Attention:</h4>
                                    <p>
                                        Verified profiles gain more visibility,
                                        helping candidates land better jobs and
                                        companies attract top talent.
                                    </p>
                                </div>
                            </div>
                            <div className="verifired-right-card">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <div
                                            style={{
                                                position: 'absolute',
                                                backgroundColor: '#DAFFDA',
                                                padding: '2px 10px',
                                                color: '#008000',
                                                borderRadius: 3,
                                                border: '1px solid #008000'
                                            }}
                                        >
                                            Verified
                                        </div>
                                    }
                                >
                                    <img src={Verified} alt="" />
                                </OverlayTrigger>
                                <div className="verified-card-content">
                                    <h4> Boost Confidence:</h4>
                                    <p>
                                        Ensure transparency and trustworthiness
                                        in the hiring process with verified
                                        credentials for all parties involved.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifiedBadge;
