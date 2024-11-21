import React, { useEffect, useState } from 'react';
import './terms.css';
import blackCross from '../../assets/images/blackCross.png';
import { Row, Button, InputGroup } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from './../../services/BaseUrl';

const TermsAndCondition = () => {
    const navigate = useNavigate();
    const handleBack = path => {
        if (path == 'registration') {
            // navigate('/registration');
            navigate(-1);
        } else {
            navigate('/privacy-policy');
        }
    };
    const [isVisible, setIsVisible] = useState(false);

    const locate = useLocation();
    const [tersmsData, setFetchedTerms] = useState(null);

    const fetchTerems = async () => {
        try {
            const response = await axios.get(
                `${BaseUrl}company/get/terms_privacy`
            );
            setFetchedTerms(response?.data);
        } catch (error) {}
    };

    const renderContent = () => {
        if (!tersmsData?.TermsImage) return null;

        const fileUrl = tersmsData.TermsImage;
        const fileExtension = fileUrl.split('.').pop().toLowerCase();

        if (fileExtension === 'pdf') {
            return (
                <iframe
                    src={fileUrl}
                    frameBorder="0"
                    width="100%"
                    height="600px"
                ></iframe>
            );
        } else if (fileExtension === 'doc' || fileExtension === 'docx') {
            const googleDocViewerUrl = `https://docs.google.com/gview?url=${fileUrl}&embedded=true`;
            return (
                <iframe
                    src={googleDocViewerUrl}
                    frameBorder="0"
                    width="100%"
                    height="600px"
                ></iframe>
            );
        } else if (
            fileExtension === 'jpg' ||
            fileExtension === 'jpeg' ||
            fileExtension === 'png'
        ) {
            return <img src={fileUrl} alt="Terms Content" width="100%" />;
        } else {
            return <p>File format not supported for inline viewing.</p>;
        }
    };
    useEffect(() => {
        // Trigger the slide-up effect after the component mounts
        setIsVisible(true);
        fetchTerems();
    }, [locate]);
    return (
        <div className={`slide-up ${isVisible ? 'active' : ''}`}>
            <div
                className="d-flex justify-content-between align-items-center  "
                style={{
                    background: '#3B96E1',
                    padding: '0px 8px'
                }}
            >
                <p
                    style={{
                        marginTop: '12px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'white'
                    }}
                >
                    Terms , Conditions & Privacy policy
                </p>
                <img
                    src={blackCross}
                    alt=""
                    width="20px"
                    onClick={() => handleBack('registration')}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div className="btns-div d-flex  justify-content-end p-2 ">
                <Button onClick={() => handleBack('privacy-policy')}>
                    Privacy Policy
                </Button>
                <Button onClick={() => handleBack('registration')}>Back</Button>
            </div>
            <div className="terms-condition">{renderContent()}</div>
        </div>
    );
};

export default TermsAndCondition;
