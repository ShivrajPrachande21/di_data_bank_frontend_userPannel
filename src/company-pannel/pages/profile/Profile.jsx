import React, { useEffect, useState } from 'react';

import arrow_back from '../../../assets/images/arrow_back.png';
import { Accordion, Col, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import CompanyOnboardManul from '../../../assets/images/CompanyOnboardManul.png';
import Verified from '../../../assets/images/Verified.png';

import './profile.css';
import { useNavigate } from 'react-router-dom';
import useProfileData from '../../../hooks/company_dashboard/useProfiledata';
import profileimg from '../../../assets/images/profileimg.png';
import EditCompanyProfile from './editProfile/EditCompanyProfile';
import EditprofileData from '../../../hooks/company_dashboard/EditprofileData';
import ProfileComplete from '../../../components/dynamicProgress/ProfileComplete';

const Profile = () => {
    const { profileData, loading, error } = useProfileData();
    const { hideForm, lgShow, setLgShow, smShow, setSmShow } =
        EditprofileData();

    console.log('lg', smShow);
    const handleClose = () => setLgShow(false);

    console.log('ProfileData', profileData);
    const navigate = useNavigate();
    const navigateProfile = () => {
        navigate(-1);
    };

    const navigate_Edit = () => {
        setLgShow(true);
    };
    useEffect(() => {
        if (hideForm) {
            navigate_Edit;
        }
    });
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
                            <img src="" alt="" width="20px" />
                        </Col>
                        <Col xs={10}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
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
                    <Row>
                        <Col>
                            <span
                                style={{
                                    marginRight: '20px',
                                    fontWeight: '500'
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
                                                ?.contact_email
                                        }
                                    </p>
                                    <p style={{ color: '#051F50' }}>
                                        {profileData?.updatedData?.contact_No}
                                    </p>
                                    <p style={{ color: '#051F50' }}>
                                        {profileData?.updatedData?.location}
                                    </p>
                                    <p style={{ color: '#051F50' }}>
                                        amazon.com
                                    </p>
                                    <p style={{ color: '#051F50' }}>
                                        {profileData?.updatedData?.company_size}
                                        + Employees
                                    </p>
                                    <p style={{ color: '#051F50' }}>
                                        {
                                            profileData?.updatedData
                                                ?.headQuater_add
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
                                    <p>Mobile No.:</p>
                                    <p>GSTIN:</p>
                                    <p style={{ marginTop: '30px' }}>PAN:</p>
                                </div>
                            </div>

                            <div className="cards">
                                <div className="tables">
                                    <p style={{ color: '#051F50' }}>
                                        {profileData?.updatedData?.email}
                                    </p>
                                    <p style={{ color: '#051F50' }}>
                                        {profileData?.mobile}
                                    </p>
                                    <p style={{ color: '#051F50' }}>
                                        {profileData?.updatedData?.GST}
                                    </p>
                                    <img
                                        src={
                                            profileData?.updatedData
                                                ?.GSTImageUrl
                                        }
                                        alt=""
                                        style={{ marginTop: '-20px' }}
                                    />
                                    <p style={{ color: '#051F50' }}>
                                        {profileData?.updatedData?.PAN}
                                    </p>
                                    <img
                                        src={
                                            profileData?.updatedData
                                                ?.PANImageUrl
                                        }
                                        alt=""
                                        style={{ marginTop: '-20px' }}
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
                            flexWrap: 'wrap'
                        }}
                    >
                        <div className="pCards">
                            <div className="profilecard">
                                <div className="profilimg">
                                    <img src={profileimg} alt="" width="40px" />
                                </div>
                                <div className="names">
                                    <span>Jack Scott</span>
                                    <img src={Verified} alt="" width="24px" />
                                </div>
                                <p>
                                    I recently interviewed at your IT company
                                    and wanted to share my positive experience.
                                    The interview process was well-organized,
                                    and the team was friendly and professional.
                                </p>
                            </div>
                        </div>
                        <div className="pCards">
                            <div className="profilecard">
                                <div className="profilimg">
                                    <img src={profileimg} alt="" width="40px" />
                                </div>
                                <div className="names">
                                    <span>Jack Scott</span>
                                    <img src={Verified} alt="" width="24px" />
                                </div>
                                <p>
                                    I recently interviewed at your IT company
                                    and wanted to share my positive experience.
                                    The interview process was well-organized,
                                    and the team was friendly and professional.
                                </p>
                            </div>
                        </div>
                        <div className="pCards">
                            <div className="profilecard">
                                <div className="profilimg">
                                    <img src={profileimg} alt="" width="40px" />
                                </div>
                                <div className="names">
                                    <span>Jack Scott</span>
                                    <img src={Verified} alt="" width="24px" />
                                </div>
                                <p>
                                    I recently interviewed at your IT company
                                    and wanted to share my positive experience.
                                    The interview process was well-organized,
                                    and the team was friendly and professional.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={lgShow}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
                className="custom-modal" // Apply the custom class here
            >
                <EditCompanyProfile />
            </Modal>
        </>
    );
};

export default Profile;
