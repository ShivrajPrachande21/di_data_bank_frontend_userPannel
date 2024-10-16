import React, { useEffect, useState } from 'react';

import arrow_back from '../../../assets/images/arrow_back.png';
import { Accordion, Col, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BaseUrl from '../../../services/BaseUrl';
import './candiateprofile.css';
import CompanyOnboardManul from '../../../assets/images/CompanyOnboardManul.png';
import Verified from '../../../assets/images/Verified.png';
import avatar from '../../../assets/images/avatar.png';
import EditProfile from '../../../assets/images/EditProfile.png';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import useProfileData from '../../../hooks/company_dashboard/useProfiledata';
import profileimg from '../../../assets/images/profileimg.png';

const CandidateProfile = () => {
    // const { profileData, loading, error } = useProfileData();
    // const { hideForm, lgShow, setLgShow } = EditprofileData();
    // const rating = profileData?.updatedData?.Candidate_Feed_Back[0]?.rating;
    const rating = 6;
    const handleClose = () => setLgShow(prev => !prev);

    const navigate = useNavigate();
    const navigateProfile = () => {
        navigate(-1);
    };

    const navigate_Edit = () => {
        setLgShow(prev => !prev);
    };

    const bindUrlOrPath = url => {
        let cleanBaseUrl = BaseUrl.replace(/\/api\b/, '');
        let temp = `${cleanBaseUrl.replace(/\/$/, '')}/${url.replace(
            /\\/g,
            '/'
        )}`;

        return temp.replace(/([^:]\/)\/+/g, '$1');
    };

    const [companyDetails, setcompanyDetails] = useState(null);

    const location = useLocation();

    const handleNavigate = data => {
        if (data === 'my-detials') {
            navigate('my-detials');
        } else if (data === 'experience') {
            navigate('experience');
        } else if (data == 'education') {
            navigate('education');
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
                background: '#F5F5F5',
                color: '#051F50',
                border: 'none'
            };
        }
    };

    return (
        <>
            <div className="ReportedJob candidate-profile">
                {/* {profileData?.updatedData?.status !== 'approve' &&
                profileData?.updatedData?.status ? (
                    <div className="rejection">
                        <p className="status">
                            Verification Status :{' '}
                            {profileData?.updatedData?.status}
                        </p>
                        <p
                            style={{
                                color: 'red',
                                fontWeight: '400',
                                fontSize: '0.8rem',
                                marginTop: '-12px',
                                marginBottom: '-1px'
                            }}
                        >
                            {profileData?.updatedData?.status === 'processing'
                                ? 'Your status is being processed. The admin will update the status after verification.'
                                : profileData?.updatedData?.message ||
                                  'loading'}
                        </p>
                    </div>
                ) : null} */}

                <div className="subReportedjob ">
                    <Row>
                        <div className="topsection">
                            <div className="profile-percentage">
                                <p onClick={navigateProfile}>
                                    <img src={arrow_back} alt="" width="20px" />
                                </p>
                                <p className="pro">
                                    {' '}
                                    {/* <ProfileComplete /> */}
                                </p>
                            </div>

                            <div className="edit pro" onClick={navigate_Edit}>
                                <img src={EditProfile} alt="" height="20px" />
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <div
                                className="div-img"
                                style={{
                                    width: '40%',
                                    background: '#AEAEAE',
                                    overflow: 'hidden',
                                    borderRadius: '50px',
                                    marginTop: '-6px',
                                    height: '60px'
                                }}
                            >
                                <img
                                    // src={
                                    //     // profileData?.updatedData?.profileUrl ||
                                    //     // ''
                                    // }
                                    alt=""
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                        </Col>
                        <Col xs={10}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginLeft: '-90px'
                                }}
                            >
                                <div className="profilediv">
                                    <h4
                                        style={{
                                            fontSize: '1rem',
                                            color: '#3B96E1'
                                        }}
                                    >
                                        {/* {profileData?.updatedData?.company_name} */}
                                    </h4>
                                    <h4
                                        style={{
                                            fontSize: '0.7rem',
                                            color: '#AEAEAE'
                                        }}
                                    >
                                        {/* {profileData?.updatedData?.industry} */}
                                    </h4>
                                    <div
                                        className="star-rating "
                                        style={{ marginTop: '-10px' }}
                                    >
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
                                                onClick={() =>
                                                    handleRating(star)
                                                }
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="divice-loged-in"></div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <span
                                style={{
                                    marginRight: '20px',
                                    fontWeight: '400'
                                }}
                            >
                                Summary
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="Overview">
                            <p>gdjhjhd jhgd jhGAD Kgadg gDG </p>
                            {/* {profileData?.updatedData?.overView} */}
                        </Col>
                    </Row>
                    <Row>
                        <div className="candidate-profile-btns">
                            <Button
                                size="sm"
                                style={getButtonStyle('my-detials')}
                                onClick={() => handleNavigate('my-detials')}
                            >
                                My Detials
                            </Button>
                            <Button
                                size="sm"
                                style={getButtonStyle('experience')}
                                onClick={() => handleNavigate('experience')}
                            >
                                Experience
                            </Button>
                            <Button
                                size="sm"
                                style={getButtonStyle('education')}
                                onClick={() => handleNavigate('education')}
                            >
                                Education{' '}
                            </Button>
                            <Button
                                size="sm"
                                style={getButtonStyle('reviews')}
                                onClick={() => handleNavigate('reviews')}
                            >
                                Reviews
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <div className="viewOutlet">
                            <Outlet />
                        </div>
                    </Row>
                </div>
            </div>
            <Modal
                // show={lgShow}
                onHide={() => setLgShow(prev => !prev)}
                aria-labelledby="example-modal-sizes-title-lg"
                className="custom-modal" // Apply the custom class here
            >
                {/* <EditCompanyProfile setLgShow={setLgShow} /> */}
            </Modal>
        </>
    );
};

export default CandidateProfile;
