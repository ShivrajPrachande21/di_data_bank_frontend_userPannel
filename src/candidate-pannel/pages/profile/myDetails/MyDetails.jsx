import React, { useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import Details from './../../searchJob/viewCompanyDetails/details/Details';
import EditProfile from '../../../../assets/images/EditProfile.png';
function MyDetails() {
    const [modalShow, setModalShow] = useState(null);
    const showModal = user_id => {
        setModalShow(prev => !prev);
    };
    return (
        <>
            <div className="myDetials">
                <p>Basic Details</p>
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
                                fontSize: '14px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Email:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '14px' }}>
                            shivrah@gmail.com
                        </td>
                        <td>
                            <img
                                className="edit-profile-btn"
                                src={EditProfile}
                                alt=""
                                width="20px"
                                onClick={showModal}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '14px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Mobile no:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '14px' }}>
                            98765435367
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '14px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            LinkedIn::
                        </td>
                        <td style={{ color: '#051F50', fontSize: '14px' }}>
                            https/
                        </td>
                    </tr>
                </table>
            </div>
            <div className="myDetials mt-3">
                <p>Personal Details</p>
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
                                fontSize: '14px',
                                width: '30%'
                            }}
                        >
                            Aadhaar Card No.::
                        </td>
                        <td style={{ color: '#051F50', fontSize: '14px' }}>
                            <div className="pdf-viewer">
                                <div className="pdf-name">PDF</div>
                                <div className="content-pdf">
                                    <p> Rahul Joshi Aadhaar.pdf</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <img
                                className="edit-profile-btn"
                                src={EditProfile}
                                alt=""
                                width="20px"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '14px',
                                width: '30%'
                            }}
                        >
                            PAN:
                        </td>
                        <td
                            style={{
                                color: '#051F50',
                                fontSize: '14px'
                            }}
                        >
                            <div className="pdf-viewer">
                                <div className="pdf-name">PDF</div>
                                <div className="content-pdf">
                                    <p> Rahul Joshi Aadhaar.pdf</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '14px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Gender::
                        </td>
                        <td style={{ color: '#051F50', fontSize: '14px' }}>
                            https/
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '14px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Age:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '14px' }}>
                            https/
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '14px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Marriage Status:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '14px' }}>
                            https/
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '14px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Members in family:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '14px' }}>
                            https/
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '14px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Father/Mother Name:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '14px' }}>
                            https/
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '14px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Son/Daughter:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '14px' }}>
                            https/
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '14px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Spouse Profession:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '14px' }}>
                            https/
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                color: '#AEAEAE',
                                fontSize: '14px',
                                width: '30%',
                                padding: '2px'
                            }}
                        >
                            Disabilities:
                        </td>
                        <td style={{ color: '#051F50', fontSize: '14px' }}>
                            https/
                        </td>
                    </tr>
                </table>
            </div>

            <Modal
                show={modalShow}
                onHide={showModal}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                className="custommodule"
            >
                <div
                    style={{
                        height: '50vh',

                        overflow: 'hidden',
                        position: 'relative',
                        borderRadius: '10px'
                    }}
                ></div>
            </Modal>
        </>
    );
}

export default MyDetails;
