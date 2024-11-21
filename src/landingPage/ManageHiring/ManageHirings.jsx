import React from 'react';
import './manageHiring.css';
const ManageHirings = () => {
    return (
        <>
            <div className="manage-hiring-conatiner">
                <div className="manage-hiring-child">
                    <div className="manage-hiring-left">
                        <h1>Manage Hiring Effortlessly!</h1>
                        <p>
                            From Candidate management to job offers, streamline
                            every step of your hiring process.
                        </p>
                    </div>
                    <div className="manage-hiring-right">
                        <div className="manage-right-cards">
                            <h4>Manage Candiates:</h4>
                            <p>
                                Track, evaluate, and organize all applicants
                                from a single dashboard.
                            </p>
                        </div>
                        <div className="manage-right-cards">
                            <h4>Offer Jobs:</h4>
                            <p>
                                Easily send job offers to shortlisted candidates
                                and communicate with them in real time.
                            </p>
                        </div>
                        <div className="manage-right-cards">
                            <h4>Send Offer Letters:</h4>
                            <p>
                                Generate and send personalized offer letters
                                directly from the platform.
                            </p>
                        </div>
                        <div className="manage-right-cards">
                            <h4>Onboard New Hires:</h4>
                            <p>
                                Facilitate a smooth transition with integrated
                                onboarding tools.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageHirings;
