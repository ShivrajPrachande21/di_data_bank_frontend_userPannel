import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Modal, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import Details from './../../searchJob/viewCompanyDetails/details/Details';
import EditProfile from '../../../../assets/images/EditProfile.png';
import EditBasicDetails from './basicDetailsForm/EditBasicDetails';
import BaseUrl from '../../../../services/BaseUrl';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { CandidateProfileContext } from '../../../../context/candidateContext/CandidateProfileContext';
import EditPersonalForm from './editPersonal/EditPersonalForm';
import './mydetials.css';
function MyDetails() {
    const {
        modalShow,
        showModal,
        myDetails,
        fetchCandidateMydetails,

        CandidateProfile,
        fetchCandidateProfile,
        showPersonalModal,
        personalModal
    } = useContext(CandidateProfileContext);
    const locate = useLocation();

    // Toottip
    const EditBasic = props => (
        <Tooltip id="save-tooltip" {...props}>
            Edit Basic Details
        </Tooltip>
    );

    const EditPersonal = props => (
        <Tooltip id="save-tooltip" {...props}>
            Edit Personal Details
        </Tooltip>
    );

    useEffect(() => {
        const fun = async () => {
            await fetchCandidateMydetails();

            await fetchCandidateProfile();
        };
        fun();
    }, [locate]);
    return (
        <>
            <div className="myDetials">
                <p style={{ fontSize: '14px' }}>Basic Details</p>
                <table>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Name:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.basic_details?.name ||
                                'N/A'}
                        </td>
                        <td>
                            <OverlayTrigger placement="top" overlay={EditBasic}>
                                <img
                                    className="edit-profile-btn"
                                    src={EditProfile}
                                    alt=""
                                    width="20px"
                                    onClick={showModal}
                                />
                            </OverlayTrigger>
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Email:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.basic_details?.email ||
                                'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Contact Email Address:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.basic_details
                                ?.contact_email || 'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Mobile no:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.basic_details?.mobile ||
                                'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            LinkedIn:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.basic_details?.linkedIn ||
                                'N/A'}
                        </td>
                    </tr>
                    {CandidateProfile?.data?.basic_details?.other_profile?.map(
                        (item, index) => (
                            <>
                                <tr key={index}>
                                    <td
                                        style={{
                                            color: '#AEAEAE',
                                            fontSize: '12px',
                                            width: '30%',
                                            padding: '2px'
                                        }}
                                    >
                                        {item?.profile_name || 'N/A'}:
                                    </td>
                                    <td
                                        style={{
                                            color: '#051F50',
                                            fontSize: '12px'
                                        }}
                                    >
                                        {item?.link || 'N/A'}
                                    </td>
                                </tr>
                            </>
                        )
                    )}
                </table>
            </div>
            <div className="myDetials mt-3">
                <p style={{ fontSize: '14px' }}>Personal Details</p>
                <table>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%'
                            }}
                        >
                            Aadhaar Card No.:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.personal_details
                                ?.aadhar_number || 'N/A'}
                        </td>
                        <td>
                            <OverlayTrigger
                                placement="top"
                                overlay={EditPersonal}
                            >
                                <img
                                    src={EditProfile}
                                    alt=""
                                    height="20px"
                                    style={{
                                        marginLeft: '-100px',
                                        marginTop: '-50px'
                                    }}
                                    onClick={showPersonalModal}
                                />
                            </OverlayTrigger>
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%'
                            }}
                        >
                            PAN:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.personal_details?.PAN ||
                                'N/A'}
                        </td>{' '}
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Gender:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.personal_details?.gender ||
                                'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Age:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.personal_details?.age ||
                                'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Marriage Status:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.personal_details
                                ?.marriag_status || 'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Members in family:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.personal_details
                                ?.family_member || 'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Father/Mother Name:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.personal_details
                                ?.father_name || 'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Son/Daughter:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.personal_details
                                ?.son_name || 'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Spouse Profession:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.personal_details
                                ?.spouse_profession || 'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '12px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Disabilities:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '12px' }}>
                            {CandidateProfile?.data?.personal_details
                                ?.disbility_name
                                ? CandidateProfile?.data?.personal_details
                                      ?.disbility_name
                                : 'N/A'}
                        </td>
                    </tr>
                </table>
            </div>
            <Modal
                show={modalShow}
                onHide={showModal}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            >
                <div
                    style={{
                        height: '70vh',
                        padding: '20px',
                        overflow: 'hidden',
                        overflowY: 'auto',
                        position: 'relative',
                        borderRadius: '10px',
                        scrollbarWidth: 'none' /* For Firefox */,
                        msOverflowStyle: 'none'
                        // scrollbarColor: '#888 #f1f1f1'
                    }}
                >
                    <EditBasicDetails />
                </div>
            </Modal>
            {/* EDit Personal Module */}
            <Modal
                show={personalModal}
                onHide={showPersonalModal}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                className="custom-modal-size"
            >
                <Modal.Body>
                    <div
                        style={{
                            padding: '4px',

                            overflowY: 'auto',
                            position: 'relative',
                            borderRadius: '10px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <EditPersonalForm />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MyDetails;
