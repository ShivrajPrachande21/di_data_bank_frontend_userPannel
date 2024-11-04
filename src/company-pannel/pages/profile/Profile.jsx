import React, { useEffect, useState } from 'react';

import arrow_back from '../../../assets/images/arrow_back.png';
import { Accordion, Col, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BaseUrl from '../../../services/BaseUrl';

import CompanyOnboardManul from '../../../assets/images/CompanyOnboardManul.png';
import Verified from '../../../assets/images/Verified.png';
import altprofile from '../../../assets/images/altprofile.jpg';
import avatar from '../../../assets/images/avatar.png';
import './profile.css';
import { useLocation, useNavigate } from 'react-router-dom';
import useProfileData from '../../../hooks/company_dashboard/useProfiledata';
import profileimg from '../../../assets/images/profileimg.png';
import EditCompanyProfile from './editProfile/EditCompanyProfile';
import EditprofileData from '../../../hooks/company_dashboard/EditprofileData';
import ProfileComplete from '../../../components/dynamicProgress/ProfileComplete';

const Profile = () => {
    const { profileData, loading, error,fetchProfileData } = useProfileData();
    const { hideForm, lgShow, setLgShow } = EditprofileData();
    const rating = profileData?.updatedData?.Candidate_Feed_Back[0]?.rating;
   const location =useLocation()
    const handleClose = () => setLgShow(prev => !prev);

    const navigate = useNavigate();
    const navigateProfile = () => {
        navigate(-1);
    };

    useEffect(()=>{
        fetchProfileData()
    },[location])

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
    return (
        <>
            <div className="ReportedJob">
                {profileData?.updatedData?.status !== 'approve' &&
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
                ) : null}

                <div className="subReportedjob mt-2">
                    <Row>
                        <div className="topsection">
                            <div className="profile-percentage">
                                <p onClick={navigateProfile}>
                                    <img src={arrow_back} alt="" width="20px" />
                                </p>
                                <p className="pro">
                                    {' '}
                                    <ProfileComplete />
                                </p>
                            </div>

                            <div className="edit" onClick={navigate_Edit}>
                                <p>Edit</p>
                                <img src={CompanyOnboardManul} alt="" />
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
                                    src={
                                        profileData?.updatedData?.profileUrl ||
                                        altprofile
                                    }
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
                                        {profileData?.updatedData?.company_name}
                                    </h4>
                                    <h4
                                        style={{
                                            fontSize: '0.7rem',
                                            color: '#AEAEAE'
                                        }}
                                    >
                                        {profileData?.updatedData?.industry}
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
                                <div className="divice-loged-in">
                                    <p
                                        style={{
                                            color: '#3B96E1',
                                            fontSize: '0.8rem',
                                            fontWeight: '500'
                                        }}
                                    >
                                        Device Logged In :
                                        {
                                            profileData?.updatedData
                                                ?.Logged_In_count
                                        }
                                    </p>
                                </div>
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
                                Overview
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="Overview">
                            <p>{profileData?.updatedData?.overView}</p>
                        </Col>
                    </Row>
                </div>
                <div className="info">
                    <div className="public">
                        <p>Public Information</p>
                        <div className="cardsFlex">
                            <div className="cards">
                                <div className="tables">
                                    <p>Contact Email:</p>
                                    <p>Contact No.:</p>
                                    <p>Location:</p>
                                    <p>Website:</p>
                                    <p>Company Size:</p>
                                    <p>Headquarters Address:</p>
                                </div>
                            </div>

                            <div className="cards">
                                <div className="tables">
                                    <p style={{ color: '#051F50' }}>
                                        {
                                            profileData?.updatedData
                                                ?.contact_email?profileData?.updatedData
                                                ?.contact_email:'N/A'
                                        }
                                    </p>
                                    <p style={{ color: '#051F50' }}>
                                        {profileData?.updatedData?.contact_No?profileData?.updatedData?.contact_No:'N/A'}
                                    </p>
                                    <p style={{ color: '#051F50' }}>
                                        {profileData?.updatedData?.location?profileData?.updatedData?.location:'N/A'}
                                    </p>
                                    <p style={{ color: '#051F50' }}>
                                         {profileData?.updatedData?.website_url?profileData?.updatedData?.website_url:'N/A'}
                                    </p>
                                    <p style={{ color: '#051F50' }}>
                                        {profileData?.updatedData?.company_size?profileData?.updatedData?.company_size:'N/A'}
                                        + Employees
                                    </p>
                                    <p style={{ color: '#051F50' }}>
                                        {
                                            profileData?.updatedData
                                                ?.headQuater_add? profileData?.updatedData
                                                ?.headQuater_add:'N/A'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="private">
                        <p>Private Information</p>
                        <div className="cardsFlex">
                            <div className="cards">
                                <div className="tables">
                                    <p>Email:</p>
                                    <p style={{ width: '140px' }}>Mobile No:</p>
                                    <br></br>
                                    <p>GSTIN:</p>
                                    <br></br>
                                    <p style={{ marginTop: '30px' }}>PAN:</p>
                                </div>
                            </div>

                            <div className="cards">
                                <div className="tables">
                                    <p style={{ color: '#051F50' }}>
                                        {profileData?.updatedData?.email}
                                    </p>
                                    <p style={{ color: '#051F50' }}>
                                        {profileData?.updatedData?.mobile}
                                    </p>
                                    <br></br>
                                    {/* <p style={{ color: '#051F50' }}>
                                        {profileData?.updatedData?.GST}
                                    </p> */}
                                    <img
                                        src={
                                            profileData?.updatedData
                                                ?.GSTImageUrl
                                        }
                                        alt=""
                                        style={{
                                            marginTop: '-20px',
                                            width: '30%'
                                        }}
                                    />
                                    {/* <p style={{ color: '#051F50' }}>
                                        {profileData?.updatedData?.PAN}
                                    </p> */}
                                    <br></br>
                                    <br></br>
                                    <img
                                        src={
                                            profileData?.updatedData
                                                ?.PANImageUrl
                                        }
                                        alt=""
                                        style={{
                                            marginTop: '-20px',
                                            width: '30%'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reviews">
                    <div className="reviesP">
                        <p>Reviews</p>
                    </div>
                    <div
                        className="align"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexWrap: 'nowrap', // Prevent wrapping so it scrolls horizontally
                            overflowX: 'auto', // Enable horizontal scrolling
                            overflowY: 'hidden', // Prevent vertical scrolling (optional)
                            width: '100%'
                        }}
                    >
                        {profileData?.updatedData?.Candidate_Feed_Back?.map(
                            (item, index) => (
                                <div className="pCards" key={index}>
                                    <div className="profilecard">
                                        <div className="profilimg">
                                            <img
                                                src={bindUrlOrPath(
                                                    item?.candidate_id?.profile
                                                )}
                                                alt={profileimg}
                                                width="50px"
                                                height="50px"
                                                style={{
                                                    'border-radius': '50%'
                                                }}
                                            />
                                        </div>
                                        <div className="names">
                                            <span>
                                                {
                                                    item?.candidate_id
                                                        ?.basic_details?.name
                                                }
                                            </span>
                                            <img
                                                src={Verified}
                                                alt=""
                                                width="24px"
                                            />
                                        </div>
                                        <p>{item?.Feedback}</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            <Modal
                show={lgShow}
                onHide={() => setLgShow(prev => !prev)}
                aria-labelledby="example-modal-sizes-title-lg"
                className="custom-modal" // Apply the custom class here
            >
                <EditCompanyProfile setLgShow={setLgShow} />
            </Modal>
        </>
    );
};

export default Profile;
