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
import BaseUrl from '../../../../services/BaseUrl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Education() {
    const {
        CandidateProfile,
        showEducation,
        handleShowEducation,
        showAddeducation,
        showAdd_new_Education,
        fetchCandidateProfile
    } = useContext(CandidateProfileContext);

    const { highest_education, board_represent, articles, certificates } =
        CandidateProfile?.data?.education_details || {};
    const navigate = useNavigate();
    const formatDate = dateString => {
        const date = new Date(dateString);

        // Get the day of the month with the correct suffix (st, nd, rd, th)
        const day = date.getDate();
        const daySuffix = day => {
            if (day > 3 && day < 21) return 'th'; // covers 4th to 20th
            switch (day % 10) {
                case 1:
                    return '';
                case 2:
                    return '';
                case 3:
                    return '';
                default:
                    return '';
            }
        };

        // Format month and year
        const month = date.toLocaleString('en-GB', { month: 'short' }); // e.g., 'Aug'
        const year = date.getFullYear();

        // Return the formatted string
        return ` ${day}${daySuffix(day)} ${month} ${year}`;
    };

    const handle_delete_Eduction = async education_id => {
        const token = localStorage.getItem('Candidate_token');

        if (!token) {
            return; // Exit if no token found
        }

        const decodedToken = jwtDecode(token);
        const user_id = decodedToken?._id;
        try {
            const response = await axios.delete(
                `${BaseUrl}candidate/profile/delete_education/${user_id}/${education_id}`
            );
            if (response?.status == 200 || response?.status == 201) {
                toast.success('Education Deleted');
                await fetchCandidateProfile();
            }
        } catch (error) {
            toast.error('Failed to Delete Education');
        }
    };

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/login');
            } else {
                navigate('/profile-candidate/education');
            }
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        rendering();
    }, []);
    return (
        <>
            <div className="education">
                <Row>
                    <Col
                        xs={10}
                        md={5}
                        style={{
                            color: '#051F50',
                            fontWeight: '500',

                            fontSize: '0.9rem'
                        }}
                    >
                        Education Details
                    </Col>
                    <Col xs={2} md={1}>
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
                                    <td className="data">
                                        {highest_education || 'N/A'}
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
                                        Boards represented names:
                                    </td>
                                    <td className="data">
                                        {board_represent || 'N/A'}
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
                                        Book Published/Article:
                                    </td>
                                    <td className="data ">
                                        {articles || 'N/A'}
                                    </td>
                                </tr>
                                {certificates &&
                                    certificates.map((item, index) => (
                                        <tr>
                                            <td
                                                style={{
                                                    color: '#AEAEAE',
                                                    fontSize: '0.8rem',
                                                    width: '56%'
                                                }}
                                            >
                                                {item?.Certificate || 'N/A'}:
                                            </td>
                                            <td className="data">
                                                <div className="exp-pdf">
                                                    <div className="exp-pdf-name">
                                                        PDF
                                                    </div>
                                                    <p>
                                                        {item?.image
                                                            ? item.image.slice(
                                                                  -10
                                                              )
                                                            : 'No Image Selected'}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </table>
                        </Col>
                    </Row>
                </Row>
                <Row>
                    <div className="add-new-edu">
                        <img
                            src={addPlues}
                            alt=""
                            onClick={showAdd_new_Education}
                        />
                    </div>
                    <div className="education-details-card">
                        {CandidateProfile?.data?.education_details?.Education?.map(
                            (item, index) => (
                                <>
                                    <div className="education-card" key={index}>
                                        <div className="eduction-degree-name">
                                            <h4>{item?.school}</h4>{' '}
                                        </div>

                                        <div className="eduction-details">
                                            <p>{item?.degree}</p>
                                            <ul>
                                                <li>{item?.Field_study}</li>
                                            </ul>
                                        </div>
                                        <div className="eduction-time">
                                            <p>
                                                {formatDate(item?.start_date)}
                                            </p>{' '}
                                            <span className="mx-2">-</span>{' '}
                                            <p>{formatDate(item?.end_date)}</p>
                                        </div>
                                        <p className="grade">
                                            Grade:&nbsp;{item?.grade}
                                        </p>
                                        <p className="description">
                                            Description:&nbsp;
                                            {item?.description}
                                        </p>
                                        <div className="eduction-pdf delete-eduction">
                                            <div></div>
                                            {/* <div className="exp-pdf"> */}
                                            {/* <div className="exp-pdf-name">
                                                    PDF
                                                </div> */}

                                            {/* </div> */}
                                            <img
                                                src={DeleteIcon}
                                                alt=""
                                                onClick={() =>
                                                    handle_delete_Eduction(
                                                        item?._id
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </>
                            )
                        )}
                    </div>
                </Row>
            </div>
            {/* Highest Education  Model */}
            <Modal
                show={showEducation}
               // onHide={handleShowEducation}
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
               // onHide={showAdd_new_Education}
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
