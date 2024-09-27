import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import View from '../../../../../assets/images/View.png';
import { CreateJobContext } from '../../../../../context/CreateJobContext';
import './shortlist.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BaseUrl from '../../../../../services/BaseUrl';
import axios from 'axios';
const ShortListed = () => {
    const {
        shortListData,
        handle_feedback,
        loading,
        // finalise_candidate,
        // reject_finalise_candidate,
        // Finalise_true
        fetch_shortlist,
        fetch_hire_candidate
    } = useContext(CreateJobContext);

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        fetch_shortlist();
    }, [location]);

    console.log('shortListData', shortListData);
    const [modalShow, setModalShow] = useState(null);
    const [currentResume, setCurrentResume] = useState('');
    const [user_id, setuser_id] = useState('');
    const [Finalise_userId, setFinalise_userId] = useState('');

    const finalise_candidate = async user_id => {
        console.log('user_id finalise', user_id);
        const jobid = localStorage.getItem('job_id');
        localStorage.setItem('getJobofferId', user_id);
        try {
            const response = await axios.put(
                `${BaseUrl}company/hired_applicent/${jobid}/${user_id}`
            );
            if (response.status == 200) {
                navigate('/main/view-job-application/job-offred');
            }
        } catch (error) {}
    };
    const reject_finalise_candidate = async user_id => {
        console.log('user_id finalise', user_id);
        const jobid = localStorage.getItem('job_id');
        try {
            const response = await axios.put(
                `${BaseUrl}company/reject_applicent/${jobid}/${user_id}`
            );

            if (response.status == 200) {
                // setFinalise_true(true);
                await fetch_shortlist();
                toast.error('candidate rejected');
            }
        } catch (error) {}
    };

    const handleClose = () => {
        setModalShow(prev => !prev);
        setCurrentResume('');
    };
    const handleShow = resume => {
        setCurrentResume(resume);
        setModalShow(true);
    };
    const formatDate = dateString => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
    };

    const getEmbedLink = link => {
        const fileId = link.split('/d/')[1].split('/')[0]; // Extract file ID
        return `https://drive.google.com/file/d/${fileId}/preview`; // Create preview link
    };

    const [rating, setRating] = useState(0); // Set default rating to 5
    const [comment, setComment] = useState(''); // State to hold input field data
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalfinalise, setisModalfinalise] = useState(false);

    // Function to handle star selection
    const handleRating = newRating => {
        setRating(newRating);
    };
    const showModal = user_id => {
        setuser_id(user_id);
        setModalVisible(prev => !prev);
    };
    const handle_finalise = async user_id => {
        setFinalise_userId(user_id);

        setisModalfinalise(prev => !prev);
    };

    const handle_finalise_candidate = data => {
        if (data === 'yes') {
            finalise_candidate(Finalise_userId);
            setisModalfinalise(prev => !prev);
        } else if (data === 'no') {
            reject_finalise_candidate(Finalise_userId);
            setisModalfinalise(prev => !prev);
        }
    };

    const naviagte_hired = user_id => {
        console.log('user_id hka', user_id);
        localStorage.setItem('hired', user_id);
        fetch_hire_candidate(user_id);
        navigate('/main/view-job-application/hired');
    };
    // Function to handle comment input
    const handleCommentChange = e => {
        setComment(e.target.value);
    };

    const confirmAction = async (rating, feedback) => {
        await handle_feedback(rating, feedback, user_id);
        if (loading) {
            showModal();
        }
    };

    // useEffect(() => {
    //     if (Finalise_true) {
    //         navigate('/main/view-job-application/job-offred');
    //     }
    // }, []);
    return (
        <>
            <Modal
                show={isModalVisible}
                onHide={showModal}
                centered
                className="custom-comment"
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    Are you sure you want to proceed with this action?
                    {/* Star Rating System */}
                    <div className="star-rating mt-3">
                        {[1, 2, 3, 4, 5].map(star => (
                            <span
                                key={star}
                                style={{
                                    cursor: 'pointer',
                                    color:
                                        star <= rating ? '#ffc107' : '#e4e5e9',
                                    fontSize: '1.5rem'
                                }}
                                onClick={() => handleRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    {/* Input field for additional comments */}
                    <Form.Group className="mt-3">
                        <Form.Label>Feedback</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your comments here..."
                            value={comment}
                            onChange={handleCommentChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn-addcomment"
                        onClick={() => confirmAction(rating, comment)} // Pass rating and comment to confirm action
                    >
                        Confirm
                    </button>
                </Modal.Footer>
            </Modal>

            <div
                className="shortlisted mt-2"
                style={{
                    background: 'white',
                    padding: '10px',
                    marginLeft: '12px',
                    borderRadius: '8px'
                }}
            >
                <Table bordered>
                    <thead>
                        <tr style={{ borderTop: 'none' }}>
                            <th
                                style={{
                                    fontSize: '0.7rem',
                                    borderLeft: 'none'
                                }}
                                className="p-1"
                                scope="col"
                            >
                                Sr no
                            </th>
                            <th
                                className="p-1"
                                scope="col"
                                style={{ fontSize: '0.7rem' }}
                            >
                                Candidates name
                            </th>
                            <th
                                className="p-1"
                                scope="col"
                                style={{ fontSize: '0.7rem' }}
                            >
                                Email
                            </th>
                            <th
                                className="p-1"
                                scope="col"
                                style={{ fontSize: '0.7rem' }}
                            >
                                Mobile No.
                            </th>
                            <th
                                className="p-1"
                                scope="col"
                                style={{ fontSize: '0.7rem' }}
                            >
                                Resume/CV
                            </th>
                            <th
                                className="p-1"
                                scope="col"
                                style={{ fontSize: '0.7rem' }}
                            >
                                Date
                            </th>
                            <th
                                className="p-1"
                                scope="col"
                                style={{ fontSize: '0.7rem' }}
                            >
                                Mark Interviewed Candidate
                            </th>
                            <th
                                className="p-1"
                                scope="col"
                                style={{ fontSize: '0.7rem' }}
                            >
                                Hire
                            </th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: '0.7rem' }}>
                        {shortListData?.map((item, index) => (
                            <>
                                <tr>
                                    <td style={{ borderLeft: 'none' }}>
                                        {index + 1}
                                    </td>
                                    <td>{item?.BasicDetails?.name}</td>
                                    <td>{item?.BasicDetails?.email}</td>
                                    <td>{item?.BasicDetails?.mobile}</td>
                                    <td
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        resume.pdf
                                        <img
                                            src={View}
                                            alt=""
                                            height="20px"
                                            onClick={() =>
                                                handleShow(
                                                    item?.WorkDetails?.resume
                                                )
                                            } // Pass the correct resume link
                                        />
                                    </td>
                                    <td>
                                        {formatDate(
                                            item?.Shortlisted?.sortlisted_date
                                        )}
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <Button
                                            disabled={
                                                item?.Shortlisted
                                                    ?.interviewed_status
                                            }
                                            size="sm"
                                            style={{
                                                background: '#3B96E1',
                                                color: 'white',
                                                border: 'none',
                                                width: '100%'
                                            }}
                                            onClick={() =>
                                                showModal(
                                                    item?.CandidateDetails?._id
                                                )
                                            }
                                        >
                                            {console.log(
                                                'testing a[pus',
                                                item?.Shortlisted
                                                    ?.interviewed_status
                                            )}
                                            Interviewed
                                        </Button>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        {item?.Shortlisted?.short_Candidate ? (
                                            <Button
                                                size="sm"
                                                style={{
                                                    background: '#3B96E1',
                                                    color: 'white',
                                                    border: 'none',
                                                    width: '100%'
                                                }}
                                                onClick={() =>
                                                    naviagte_hired(
                                                        item?.CandidateDetails
                                                            ?._id
                                                    )
                                                }
                                            >
                                                Finalise
                                            </Button>
                                        ) : (
                                            <Button
                                                size="sm"
                                                style={{
                                                    background: '#3B96E1',
                                                    color: 'white',
                                                    border: 'none',
                                                    width: '100%'
                                                }}
                                                onClick={() =>
                                                    handle_finalise(
                                                        item?.CandidateDetails
                                                            ?._id
                                                    )
                                                }
                                            >
                                                Finalise
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Modal
                show={modalShow}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                className="custommodule"
            >
                <div
                    style={{
                        height: '60vh',
                        width: '100%',
                        margin: '0px auto',
                        overflow: 'hidden'
                    }}
                >
                    <div>
                        <div>
                            {currentResume ? (
                                <iframe
                                    src={getEmbedLink(currentResume)} // Ensure the src is set
                                    frameBorder="0"
                                    style={{
                                        width: '89%',
                                        height: '80vh',
                                        zoom: '1',
                                        margin: '0px 20px' // Prevent zoom feature
                                        // pointerEvents: 'none' // Disable interactions if needed
                                    }}
                                    title="Resume"
                                ></iframe>
                            ) : (
                                <p>No resume available</p>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Finalise Candidate */}

            <Modal show={isModalfinalise} onHide={handle_finalise} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure ?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => handle_finalise_candidate('no')}
                    >
                        No
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handle_finalise_candidate('yes')}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ShortListed;
