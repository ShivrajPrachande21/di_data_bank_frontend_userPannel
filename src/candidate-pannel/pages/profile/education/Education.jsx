import React, { useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import EditProfile from '../../../../assets/images/EditProfile.png';
import addPlues from '../../../../assets/images/addPlues.png';
import DeleteIcon from '../../../../assets/images/delete.png';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { CandidateProfileContext } from '../../../../context/candidateContext/CandidateProfileContext';
import EditEducation from './editEducation/EditEducation';
import AddNewEducation from './addNewEducation/AddNewEducation';

function Education() {
    const {
        showEducation,
        handleShowEducation,
        showAddeducation,
        showAdd_new_Education
    } = useContext(CandidateProfileContext);
    return (
        <>
            <div className="education">
                <Row>
                    <Col
                        xs={5}
                        style={{
                            color: '#051F50',
                            fontWeight: '500',

                            fontSize: '0.9rem'
                        }}
                    >
                        Education Details
                    </Col>
                    <Col xs={1}>
                        <img
                            src={EditProfile}
                            alt=""
                            width="18px"
                            className="mx-1 "
                            style={{ cursor: 'pointer' }}
                            onClick={handleShowEducation}
                        />
                    </Col>
                    <Row>
                        <Col xs={7}>
                            <table>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            color: '#AEAEAE',
                                            fontSize: '0.8rem'
                                        }}
                                    >
                                        Highest level of education:
                                    </td>
                                    <td className="data">years</td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            color: '#AEAEAE',
                                            fontSize: '0.8rem',
                                            width: '56%'
                                        }}
                                    >
                                        Boards represented names:
                                    </td>
                                    <td className="data">CTC</td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            color: '#AEAEAE',
                                            fontSize: '0.8rem',
                                            width: '56%'
                                        }}
                                    >
                                        Book Published/Article::
                                    </td>
                                    <td className="data">
                                        {/* {
                                    CandidateProfile?.data?.work_details
                                        ?.aspiring_position
                                } */}
                                    </td>
                                </tr>

                                <tr>
                                    <td
                                        style={{
                                            color: '#AEAEAE',
                                            fontSize: '0.8rem',
                                            width: '56%'
                                        }}
                                    >
                                        Resume:
                                    </td>
                                    <td className="data"></td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                </Row>
                <div className="education-card">
                    <div className="eduction-degree-name">
                        <h4>MIT Kothrud</h4>{' '}
                        <img
                            src={addPlues}
                            alt=""
                            onClick={showAdd_new_Education}
                        />
                    </div>

                    <div className="eduction-details">
                        <p>Master’s In Design</p>
                        <ul>
                            <li>User Experience Design</li>
                        </ul>
                    </div>
                    <div className="eduction-time">
                        <p>Sept 2016</p> <span className="mx-2">-</span>{' '}
                        <p>Dec 2019</p>
                    </div>
                    <p className="grade">Grade:</p>
                    <p className="description">Description:</p>
                    <div className="eduction-pdf delete-eduction">
                        <div className="exp-pdf">
                            <div className="exp-pdf-name">PDF</div>
                            {/* <p>{result1 ? 'Resume.pdf' : result1}</p> */}
                        </div>
                        <img src={DeleteIcon} alt="" />
                    </div>
                </div>
            </div>
            {/* Highest Education  Model */}
            <Modal
                show={showEducation}
                onHide={handleShowEducation}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                className="custom-modal-size"
            >
                <Modal.Body>
                    <div
                        style={{
                            padding: '2px',

                            overflowY: 'auto',
                            position: 'relative',
                            borderRadius: '10px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <EditEducation />
                    </div>
                </Modal.Body>
            </Modal>
            {/* Add New Education  Model */}
            <Modal
                show={showAddeducation}
                onHide={showAdd_new_Education}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                className="custom-modal-size"
            >
                <Modal.Body>
                    <div
                        style={{
                            padding: '2px',

                            overflowY: 'auto',
                            position: 'relative',
                            borderRadius: '10px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <AddNewEducation />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Education;
