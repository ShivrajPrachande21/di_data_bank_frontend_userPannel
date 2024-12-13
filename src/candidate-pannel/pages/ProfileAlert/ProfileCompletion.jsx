import React, { useEffect, useState } from 'react';
import { Modal, Button, ProgressBar } from 'react-bootstrap';
import './profilecomplete.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import BaseUrl from '../../../services/BaseUrl';
import { useNavigate } from 'react-router-dom';

const ProfileCompletionModal = ({ onClose, setShowModal }) => {
    const navigate = useNavigate();
    const [profileCompletion, SetProfileCompletion] = useState({
        basicDetails: 0,
        personalDetails: 0,
        workDetails: 0,
        educationDetails: 0
    });

    const sections = [
        { name: 'Basic Details', progress: profileCompletion.basicDetails },
        {
            name: 'Personal Details',
            progress: profileCompletion.personalDetails
        },
        { name: 'Work Details', progress: profileCompletion.workDetails },
        {
            name: 'Education Details',
            progress: profileCompletion.educationDetails
        }
    ];

    const totalCompletion = Math.round(
        (sections.reduce((sum, section) => sum + section.progress, 0) /
            (sections.length * 100)) *
            100
    );

    // application status api
    const getApplicationData = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}/candidate/profile/percentage/${userId}`
                );
                SetProfileCompletion(response?.data);
            } catch (error) {}
        }
    };

    const handleClose = () => {
        navigate('/profile-candidate/my - detials');
        setShowModal(false);
    };
    useEffect(() => {
        getApplicationData();
    }, []);

    return (
        <Modal
            show={true}
            onHide={onClose}
            //   show={show}
            //   onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            animation={true}
            dialogClassName="custom-modal"
        >
            <Modal.Body>
                <div className="text-center">
                    <h4>Your Profile Completion</h4>
                    <div
                        style={{
                            width: '150px',
                            height: '150px',
                            margin: '20px auto',
                            position: 'relative'
                        }}
                    >
                        <svg
                            width="150"
                            height="150"
                            viewBox="0 0 36 36"
                            className="circular-chart blue"
                        >
                            <path
                                className="circle-bg"
                                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#e6e6e6"
                                strokeWidth="2"
                            />
                            <path
                                className="circle"
                                strokeDasharray={`${totalCompletion}, 100`}
                                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#4caf50"
                                strokeWidth="2.5"
                            />
                            <text
                                x="18"
                                y="20.35"
                                className="percentage"
                                fill="#4caf50"
                                fontSize="8"
                                textAnchor="middle"
                            >
                                {totalCompletion}%
                            </text>
                        </svg>
                    </div>

                    <ul className="list-unstyled">
                        {sections.map((section, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                <strong style={{ fontSize: '0.8rem' }}>
                                    {section.name}
                                </strong>
                                <ProgressBar
                                    now={section.progress}
                                    label={`${section.progress}%`}
                                    animated
                                />
                            </li>
                        ))}
                    </ul>
                    <Button
                        variant="success"
                        style={{ fontSize: '0.8rem' }}
                        onClick={handleClose}
                    >
                        Complete Your Profile
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileCompletionModal;
