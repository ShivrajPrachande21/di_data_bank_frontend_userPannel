import React, { useEffect, useState } from 'react';
import blackCross from '../../assets/images/blackCross.png';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../../services/BaseUrl';
const PrivacyPolicy = () => {
    const navigate = useNavigate();
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
        if (!tersmsData?.privacy_image) return null;

        const fileUrl = tersmsData.privacy_image;
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
        fetchTerems();
    }, [locate]);
    return (
        <div>
            <div
                className="d-flex justify-content-between align-items-center  "
                style={{ background: '#3B96E1', padding: '0px 8px' }}
            >
                <p
                    style={{
                        marginTop: '12px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'white'
                    }}
                >
                    Privacy policy
                </p>
                <img
                    src={blackCross}
                    alt=""
                    width="20px"
                    onClick={() => navigate(-1)}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div className="terms-condition">{renderContent()}</div>
        </div>
    );
};

export default PrivacyPolicy;
