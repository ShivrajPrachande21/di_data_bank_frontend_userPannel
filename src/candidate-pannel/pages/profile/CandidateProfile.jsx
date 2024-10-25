import React, { useContext, useEffect, useState } from 'react';

import arrow_back from '../../../assets/images/arrow_back.png';
import {
    Accordion,
    Col,
    Row,
    Table,
    Image,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
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
import { CandidateProfileContext } from '../../../context/candidateContext/CandidateProfileContext';
import ProfileEdit from './myDetails/profileEdit/ProfileEdit';

const CandidateProfile = () => {
    const {
        CandidateProfile,
        fetchCandidateProfile,
        modalShowEdit,
        showEditModle
    } = useContext(CandidateProfileContext);
    const locate = useLocation();
    const rating = CandidateProfile?.averageRating;

    const handleClose = () => setLgShow(prev => !prev);

    const navigate = useNavigate();
    const navigateProfile = () => {
        navigate('/candidate-dashboard/search-job');
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

    // Toottip
    const renderSaveTooltip = props => (
        <Tooltip id="save-tooltip" {...props}>
            Edit Profile
        </Tooltip>
    );
    useEffect(() => {
        const fetch = async () => {
            await fetchCandidateProfile();
        };
        fetch();
    }, [locate]);

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

                            <div className="edit pro">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderSaveTooltip}
                                >
                                    <img
                                        src={EditProfile}
                                        alt=""
                                        height="20px"
                                        onClick={showEditModle}
                                    />
                                </OverlayTrigger>
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
                                <Image
                                    src={CandidateProfile?.profileUrl}
                                    alt=""
                                    width="70px"
                                    height="60px"
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
                                        {
                                            CandidateProfile?.data
                                                ?.basic_details?.name
                                        }
                                    </h4>
                                    <p
                                        style={{
                                            fontSize: '0.7rem',
                                            color: '#AEAEAE',
                                            marginTop: '-8px'
                                        }}
                                    >
                                        {
                                            CandidateProfile?.data?.work_details
                                                ?.aspiring_position
                                        }
                                    </p>
                                    <div
                                        className="star-rating "
                                        style={{
                                            marginTop: '-22px',
                                            marginLeft: '-3.3px'
                                        }}
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
                                                    fontSize: '1.3rem'
                                                }}
                                                // onClick={() =>
                                                //     handleRating(star)
                                                // }
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
                            <p> {CandidateProfile?.data?.summary}</p>
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
                show={modalShowEdit}
                onHide={showEditModle}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            >
                <Modal.Body
                    style={{
                        height: '390px'
                    }}
                >
                    <div
                        style={{
                            padding: '20px',
                            overflow: 'hidden',
                            overflowY: 'auto',
                            position: 'relative',
                            borderRadius: '10px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <ProfileEdit />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CandidateProfile;
