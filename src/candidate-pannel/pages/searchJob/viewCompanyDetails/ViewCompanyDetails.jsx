import React, { useEffect, useState } from 'react';
import { Col, Row, Image, Button } from 'react-bootstrap';
import ep_back from '../../../../assets/images/ep_back.png';
import avatar from '../../../../assets/images/avatar.png';
import './viewCompanyDesc.css';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../../../../services/BaseUrl';

const ViewCompanyDetails = () => {
    const { id } = useParams();
    const [companyDetails, setcompanyDetails] = useState(null);

    const rating = companyDetails?.averageRating;
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = data => {
        if (data === 'details') {
            navigate('details');
        } else if (data === 'jobs') {
            navigate('jobs');
        } else {
            navigate('reviews');
        }
    };

    // Function to determine button style based on the path
    const getButtonStyle = path => {
        if (location.pathname.includes(path)) {
            return {
                background: '#3B96E1',
                color: 'white',
                border: '1px solid #3B96E1'
            };
        } else {
            return {
                background: '#B4DDFF',
                color: '#3B96E1',
                border: 'none'
            };
        }
    };

    const getCompanyDetails = async () => {
        const companyId = id;
        console.log('companyId', companyId);
        try {
            const response = await axios.get(
                `${BaseUrl}candidate/company_details/${companyId}`
            );

            setcompanyDetails(response?.data);
        } catch (error) {}
    };
    const bindUrlOrPath = url => {
        let cleanBaseUrl = BaseUrl.replace(/\/api\b/, '');
        let temp = `${cleanBaseUrl.replace(/\/$/, '')}/${url.replace(
            /\\/g,
            '/'
        )}`;

        return temp.replace(/([^:]\/)\/+/g, '$1');
    };
    useEffect(() => {
        getCompanyDetails();
    }, []);
    return (
        <>
            <div style={{ height: '100vh', overflow: 'hidden' }}>
                <div
                    className="view-company-descriptio"
                    style={{
                        width: '90%',
                        margin: '0px auto',
                        background: 'white',
                        padding: '10px'
                    }}
                >
                    <img
                        src={ep_back}
                        alt=""
                        width="20px"
                        onClick={() =>
                            navigate(`/candidate-dashboard/search-job`)
                        }
                    />
                    <div className="search-job-top company-desc">
                        <Image
                            src={bindUrlOrPath(
                                companyDetails?.updatedData['0']?.profile ||
                                    'img'
                            )}
                            roundedCircle
                            alt="Profile"
                            width="70"
                            height="70"
                        />
                        <h6>
                            {companyDetails?.updatedData['0'].company_name}

                            <p
                                style={{
                                    color: '#AEAEAE',
                                    fontSize: '0.7rem',
                                    cursor: 'pointer',
                                    marginTop: '5px',
                                    marginBottom: '4px'
                                }}
                            >
                                {companyDetails?.updatedData['0'].industry}{' '}
                            </p>
                            {[1, 2, 3, 4, 5].map(star => (
                                <span
                                    key={star}
                                    style={{
                                        cursor: 'pointer',
                                        color:
                                            star <= rating
                                                ? '#ffc107'
                                                : '#e4e5e9',
                                        fontSize: '1.5rem'
                                    }}
                                >
                                    ★
                                </span>
                            ))}
                        </h6>
                    </div>
                    <p style={{ color: '#051F50' }}>Overview</p>
                    <div className="comapany-overview">
                        <p>{companyDetails?.updatedData['0']?.overView}</p>
                    </div>
                    <div className="company-bnt mt-2">
                        <Button
                            size="sm"
                            style={getButtonStyle('details')}
                            onClick={() => handleNavigate('details')}
                        >
                            Details
                        </Button>
                        <Button
                            size="sm"
                            style={getButtonStyle('jobs')}
                            onClick={() => handleNavigate('jobs')}
                        >
                            Jobs
                        </Button>
                        <Button
                            size="sm"
                            style={getButtonStyle('reviews')}
                            onClick={() => handleNavigate('reviews')}
                        >
                            Reviews
                        </Button>
                    </div>
                    <Outlet />
                </div>
            </div>
        </>
    );
};
export default ViewCompanyDetails;
