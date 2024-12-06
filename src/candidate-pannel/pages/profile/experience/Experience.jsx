import React, { useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './experience.css';
import { Button, Col, Modal, Row, Table } from 'react-bootstrap';
import addPlues from '../../../../assets/images/addPlues.png';
import DeleteIcon from '../../../../assets/images/delete.png';
import EditProfile from '../../../../assets/images/EditProfile.png';
import Delete from '../../../../assets/images/delete.png';
import { CandidateProfileContext } from './../../../../context/candidateContext/CandidateProfileContext';
import BaseUrl from '../../../../services/BaseUrl';

import { toast } from 'react-toastify';
import EditExperience from './editExperience/EditExperience';
import EditExperiencePrev from './editExperinceprev/EditExperiencePrev';
import EditWorkDetails from './editWorkDetails/EditWorkDetails';
import { useNavigate } from 'react-router-dom';
import AddNewProject from './addNewproject/AddNewProject';
import oui_cross from '../../../../assets/images/TableEditIcon.png';
import EditProject from './editProject/EditProject';

const Experience = () => {
    const {
        CandidateProfile,
        fetchCandidateProfile,
        ExpModle,
        editExp,
        showExperiencelModal,
        showEditExp,
        showWork,
        handleShowWork,
        showProjectModel,
        setShowProjectModel,
        handleShowProject,
        showEDitProject,
        setShowEditProject,
        getSingleProject,
        UpdateProjectData,
        handleDelete
    } = useContext(CandidateProfileContext);
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

    // calculate start and end date

    const calculateExperience = (starts, ends) => {
        const start = new Date(starts);
        const end = ends ? new Date(ends) : new Date();

        console.log('startdate', start);

        let yearsDifference = end.getFullYear() - start.getFullYear();
        let monthsDifference = end.getMonth() - start.getMonth();
        let daysDifference = end.getDate() - start.getDate();

        if (daysDifference < 0) {
            monthsDifference -= 1;
            daysDifference += new Date(
                end.getFullYear(),
                end.getMonth(),
                0
            ).getDate(); // Get days in previous month
        }

        if (monthsDifference < 0) {
            yearsDifference -= 1;
            monthsDifference += 12;
        }

        return ` ${yearsDifference} year , ${monthsDifference} month`;
    };

    // Delete Experience
    const delete_experience = async work_id => {
        const token = localStorage.getItem('Candidate_token');

        const decodedToken = jwtDecode(token);
        const user_id = decodedToken?._id;

        try {
            const response = await axios.delete(
                `${BaseUrl}candidate/profile/delete_work/${work_id}/${user_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response?.status == 200 || response?.status == 201) {
                toast.success('Experience Deleted ');
                await fetchCandidateProfile();
            }
        } catch (error) {
            toast.error(`${error.response.data.error}`);
        }
    };

    const checkDriveLinkOrExtractFileName = url => {
        // Regular expression to match Google Drive URLs
        if (url == null) {
            return;
        }
        const driveLinkPattern =
            /^(https?:\/\/)?(www\.)?(drive\.google\.com|docs\.google\.com)/;

        // Check if it's a Google Drive link
        if (driveLinkPattern.test(url)) {
            return true; // It's a Google Drive link
        } else {
            // Extract the file name from the path if it's not a Google Drive link
            const fileName = url.split(/[\\/]/).pop(); // Handles both / and \ separators
            return fileName;
        }
    };

    const result1 = checkDriveLinkOrExtractFileName(
        CandidateProfile?.data?.work_details?.resume
    );

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/login');
            } else {
                navigate('/profile-candidate/experience');
            }
        } else {
            navigate('/login');
        }
    }

    const handleShowEditProject = async project_id => {
        await getSingleProject(project_id);

        setShowEditProject(prev => !prev);
    };

    const handleDeteleProject = async project_id => {
        await handleDelete(project_id);
    };

    useEffect(() => {
        rendering();
    }, []);

    return (
        <>
            <div className="experience p-2">
                <Row className="mt-2">
                    <Row>
                        <Col
                            xs={12}
                            sm={6}
                            md={6}
                            lg={6}
                            className="mt-2"
                            style={{
                                border: '1px solid #E3E3E3',
                                borderRadius: '6px'
                            }}
                        >
                            <Row style={{ padding: '3px' }}>
                                <Col
                                    xs={10}
                                    sm={11}
                                    md={11}
                                    lg={11}
                                    style={{
                                        color: '#051F50',
                                        fontWeight: '500',
                                        marginTop: '6px'
                                    }}
                                >
                                    Experiences
                                </Col>
                                <Col xs={1} onClick={showExperiencelModal}>
                                    <img
                                        src={addPlues}
                                        alt=""
                                        width="18px"
                                        className="mx-1"
                                        style={{
                                            marginTop: '8px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Col>
                            </Row>
                            {CandidateProfile?.data?.work_details?.Experience?.map(
                                (items, index) => (
                                    <>
                                        <div className="add-experence-card">
                                            <Row>
                                                <Col
                                                    xs={10}
                                                    sm={11}
                                                    md={11}
                                                    lg={11}
                                                >
                                                    <h4>
                                                        {items?.designation}{' '}
                                                    </h4>
                                                </Col>
                                                <Col xs={1}>
                                                    <img
                                                        src={EditProfile}
                                                        alt=""
                                                        width="18px"
                                                        style={{
                                                            marginLeft: '4px',
                                                            marginTop: '4px',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() =>
                                                            showEditExp(
                                                                CandidateProfile
                                                                    ?.data
                                                                    ?.work_details
                                                                    ?.Experience[0]
                                                                    ?._id
                                                            )
                                                        }
                                                    />
                                                </Col>
                                            </Row>

                                            <h6>
                                                {items?.companyName}{' '}
                                                <span>
                                                    {' '}
                                                    <ul>
                                                        <li>
                                                            {
                                                                items?.reporting_structure
                                                            }
                                                        </li>
                                                    </ul>
                                                </span>
                                            </h6>
                                            <p className="exp-add">
                                                {items?.location} ,
                                                <span>
                                                    {items?.location_type}
                                                </span>{' '}
                                                {/* <span>On-site</span> */}
                                            </p>
                                            <p className="exp-add">
                                                {formatDate(items?.start_date)}{' '}
                                                <span className="mx-1">
                                                    -
                                                    {items?.current_workingStatus
                                                        ? '   Present'
                                                        : formatDate(
                                                              items?.end_date
                                                          )}
                                                </span>{' '}
                                                <span className="mx-1">
                                                    <li>
                                                        {calculateExperience(
                                                            items?.start_date,
                                                            items?.end_date
                                                        )}
                                                    </li>
                                                </span>
                                            </p>
                                            <p className="exp-add">
                                                {' '}
                                                Notice Period:{' '}
                                                {items?.notice_period} Days ;
                                                (Negotiable{' '}
                                                {items?.negotiation_day} Days)
                                            </p>
                                            {/* <p className="reviling">Reliving Letter</p> */}

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'end',
                                                    justifyContent: 'flex-end',
                                                    marginTop: '-42px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <img
                                                    src={DeleteIcon}
                                                    alt=""
                                                    width="20px"
                                                    onClick={() =>
                                                        delete_experience(
                                                            items?._id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                )
                            )}
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <div className="work-detials">
                                <Row style={{ padding: '14px' }}>
                                    <Col
                                        xs={11}
                                        style={{
                                            color: '#051F50',
                                            fontWeight: '500',
                                            marginTop: '6px',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        Work Details
                                    </Col>
                                    <Col xs={1}>
                                        <img
                                            src={EditProfile}
                                            alt=""
                                            width="18px"
                                            className="mx-1"
                                            style={{
                                                marginTop: '8px',
                                                cursor: 'pointer'
                                            }}
                                            onClick={handleShowWork}
                                        />
                                    </Col>
                                    <table style={{ marginLeft: '10px' }}>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{
                                                    color: '#AEAEAE',
                                                    fontSize: '0.8rem',
                                                    width: '50%'
                                                }}
                                            >
                                                Total Experience:
                                            </td>
                                            <td className="data">
                                                {CandidateProfile?.data
                                                    ?.work_details
                                                    ?.work_experience ||
                                                    'N/A'}{' '}
                                                years
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{
                                                    color: '#AEAEAE',
                                                    fontSize: '0.8rem',
                                                    width: '50%'
                                                }}
                                            >
                                                Current CTC:
                                            </td>
                                            <td className="data">
                                                {CandidateProfile?.data
                                                    ?.work_details
                                                    ?.current_ctc || 'N/A'}{' '}
                                                CTC
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{
                                                    color: '#AEAEAE',
                                                    fontSize: '0.8rem',
                                                    width: '50%'
                                                }}
                                            >
                                                Aspiring Position/Role:
                                            </td>
                                            <td className="data">
                                                {CandidateProfile?.data
                                                    ?.work_details
                                                    ?.aspiring_position ||
                                                    'N/A'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{
                                                    color: '#AEAEAE',
                                                    fontSize: '0.8rem',
                                                    width: '50%'
                                                }}
                                            >
                                                Skills:
                                            </td>
                                            <td className="data">
                                                {CandidateProfile?.data?.work_details?.skill?.map(
                                                    (items, index) => (
                                                        <React.Fragment
                                                            key={index}
                                                        >
                                                            {items}
                                                            {index <
                                                                CandidateProfile
                                                                    ?.data
                                                                    ?.work_details
                                                                    ?.skill
                                                                    ?.length -
                                                                    1 && ', '}
                                                        </React.Fragment>
                                                    )
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{
                                                    color: '#AEAEAE',
                                                    fontSize: '0.8rem',
                                                    width: '50%'
                                                }}
                                            >
                                                Resume:
                                            </td>
                                            <td className="data">
                                                <div className="exp-pdf">
                                                    <div className="exp-pdf-name">
                                                        PDF
                                                    </div>
                                                    <p>
                                                        {result1
                                                            ? 'Resume.pdf'
                                                            : result1}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{
                                                    color: '#AEAEAE',
                                                    fontSize: '0.8rem',
                                                    width: '50%'
                                                }}
                                            >
                                                Career highlights details:
                                            </td>
                                            <td className="data">
                                                {CandidateProfile?.data
                                                    ?.work_details
                                                    ?.career_highlight || 'N/A'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{
                                                    color: '#AEAEAE',
                                                    fontSize: '0.8rem',
                                                    width: '50%'
                                                }}
                                            >
                                                Awards & Recognition:
                                            </td>
                                            <td className="data">
                                                {CandidateProfile?.data
                                                    ?.work_details
                                                    ?.recognation || 'N/A'}
                                            </td>
                                        </tr>
                                    </table>
                                </Row>
                            </div>
                            <div className="projects">
                                <Row style={{ padding: '14px' }}>
                                    <Col
                                        xs={11}
                                        style={{
                                            color: '#051F50',
                                            fontWeight: '500',
                                            marginTop: '6px',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        Projects Details
                                    </Col>
                                    <Col xs={1}>
                                        <img
                                            // src={EditProfile}
                                            src={addPlues}
                                            alt=""
                                            width="18px"
                                            className="mx-1"
                                            style={{
                                                marginTop: '8px',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() =>
                                                setShowProjectModel(
                                                    prev => !prev
                                                )
                                            }
                                        />
                                    </Col>
                                    {CandidateProfile?.data?.work_details?.Projects?.map(
                                        (item, index) => (
                                            <>
                                                <table
                                                    style={{
                                                        marginLeft: '10px',
                                                        marginTop: '16px'
                                                    }}
                                                >
                                                    <tr>
                                                        <th></th>
                                                        <th>
                                                            <img
                                                                src={oui_cross}
                                                                alt=""
                                                                style={{
                                                                    float: 'right',
                                                                    width: '20px',
                                                                    cursor: 'pointer',
                                                                    marginTop:
                                                                        '-10px'
                                                                }}
                                                                onClick={() =>
                                                                    handleShowEditProject(
                                                                        item?._id
                                                                    )
                                                                }
                                                            />
                                                        </th>
                                                    </tr>

                                                    <tr>
                                                        <td
                                                            style={{
                                                                color: '#AEAEAE',
                                                                fontSize:
                                                                    '0.8rem',
                                                                width: '50%'
                                                            }}
                                                        >
                                                            Project Title:
                                                        </td>
                                                        <td className="data">
                                                            {
                                                                item?.project_title
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style={{
                                                                color: '#AEAEAE',
                                                                fontSize:
                                                                    '0.8rem',
                                                                width: '50%'
                                                            }}
                                                        >
                                                            Project Duration:
                                                        </td>
                                                        <td className="data">
                                                            {' '}
                                                            {
                                                                item?.Project_duration
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style={{
                                                                color: '#AEAEAE',
                                                                fontSize:
                                                                    '0.8rem',
                                                                width: '50%'
                                                            }}
                                                        >
                                                            Project Url:
                                                        </td>
                                                        <td className="data">
                                                            {' '}
                                                            <a
                                                                href={
                                                                    item?.project_url
                                                                }
                                                            >
                                                                {item?.project_url ||
                                                                    'N/A'}
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style={{
                                                                color: '#AEAEAE',
                                                                fontSize:
                                                                    '0.8rem',
                                                                width: '50%'
                                                            }}
                                                        >
                                                            Project Status:
                                                        </td>
                                                        <td className="data">
                                                            {' '}
                                                            {
                                                                item?.Project_status
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style={{
                                                                color: '#AEAEAE',
                                                                fontSize:
                                                                    '0.8rem',
                                                                width: '50%'
                                                            }}
                                                        >
                                                            Role:
                                                        </td>
                                                        <td className="data">
                                                            {' '}
                                                            {item?.role}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style={{
                                                                color: '#AEAEAE',
                                                                fontSize:
                                                                    '0.8rem',
                                                                width: '50%'
                                                            }}
                                                        >
                                                            Skills Used:
                                                        </td>
                                                        <td className="data">
                                                            {' '}
                                                            {item?.skills_used}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style={{
                                                                color: '#AEAEAE',
                                                                fontSize:
                                                                    '0.8rem',
                                                                width: '50%'
                                                            }}
                                                        >
                                                            Project Site:
                                                        </td>
                                                        <td className="data">
                                                            {' '}
                                                            {item?.project_site}
                                                        </td>
                                                    </tr>
                                                    <tr className="mt-2">
                                                        <td
                                                            style={{
                                                                color: '#AEAEAE',
                                                                fontSize:
                                                                    '0.8rem',
                                                                width: '50%'
                                                            }}
                                                        >
                                                            Project-Details:
                                                        </td>
                                                        <td className="data mt-2">
                                                            {' '}
                                                            <div
                                                                style={{
                                                                    width: '200px',
                                                                    wordWrap:
                                                                        'break-word', // Ensures long words break inside the div

                                                                    overflow:
                                                                        'hidden' // Hides any overflowing content
                                                                }}
                                                            >
                                                                <p
                                                                    style={{
                                                                        textAlign:
                                                                            'justify',
                                                                        fontSize:
                                                                            '0.7rem'
                                                                    }}
                                                                >
                                                                    {
                                                                        item?.project_details
                                                                    }
                                                                </p>
                                                            </div>
                                                            <img
                                                                src={Delete}
                                                                alt=""
                                                                style={{
                                                                    float: 'right',
                                                                    width: '20px',
                                                                    cursor: 'pointer',
                                                                    marginTop:
                                                                        '-10px'
                                                                }}
                                                                onClick={() =>
                                                                    handleDeteleProject(
                                                                        item?._id
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                </table>
                                                <hr />
                                            </>
                                        )
                                    )}
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </div>
            {/* Work Details  Model */}
            <Modal
                show={showWork}
                onHide={handleShowWork}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                className="custom-modal-size"
            >
                <Modal.Body>
                    <div
                        style={{
                            padding: '5px',

                            overflowY: 'auto',
                            position: 'relative',
                            borderRadius: '10px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <EditWorkDetails />
                    </div>
                </Modal.Body>
            </Modal>
            {/* EDit Personal Module */}
            <Modal
                show={editExp}
                onHide={showEditExp}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                className="custom-modal-size"
            >
                <Modal.Body>
                    <div
                        style={{
                            padding: '2px',
                            overflow: 'hidden',
                            overflowY: 'auto',
                            position: 'relative',
                            borderRadius: '10px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <EditExperiencePrev />
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={ExpModle}
                onHide={showExperiencelModal}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                className="custom-modal-size"
            >
                <Modal.Body>
                    <div
                        style={{
                            padding: '5px',
                            overflow: 'hidden',
                            overflowY: 'auto',
                            position: 'relative',
                            borderRadius: '10px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <EditExperience />
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={showProjectModel}
                onHide={handleShowProject}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                className="custom-modal-size"
            >
                <Modal.Body>
                    <div
                        style={{
                            padding: '5px',
                            overflow: 'hidden',
                            overflowY: 'auto',
                            position: 'relative',
                            borderRadius: '10px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <AddNewProject />
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={showEDitProject}
                onHide={handleShowEditProject}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                className="custom-modal-size"
            >
                <Modal.Body>
                    <div
                        style={{
                            padding: '5px',
                            overflow: 'hidden',
                            overflowY: 'auto',
                            position: 'relative',
                            borderRadius: '10px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <EditProject />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Experience;
