import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import BaseUrl from '../../../../services/BaseUrl';
import { Button, Row, Col, ProgressBar, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppliedJobContext } from '../../../../context/candidateContext/AppliedJobContext';
import harsh from '../../../../assets/images/harsh.pdf';
const ApplicationStatus = () => {
    const { id } = useParams();
    const { reject_Offered_letter } = useContext(AppliedJobContext);
    const [currentStep, setCurrentStep] = useState(null);
    //const [rating, setRating] = useState(0); // Set default rating to 5
    const navigate = useNavigate();

    const [applicationStatus, SetApplicationStatus] = useState(null);
    const [feedback, SetFeeBack] = useState('');
    const [rating, SetRating] = useState(null);
    const [applicationState, setApplicationState] = useState(null);

    const steps = 4; // Number of steps in the stepper
    const stepTexts = [
        ' Application Sent',
        ' Shortlisted',
        'Job Offered',
        ' Hired',
        'Rejected'
        // Add more steps as needed, make sure it matches the 'steps' variable
    ];

    const nextStep = () => {
        if (currentStep < steps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleRating = newRating => {
        SetRating(newRating);
    };

    // application status api
    const getApplicationData = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/application_status/flow/${id}/${userId}`
                );
                SetApplicationStatus(
                    response?.data?.jobs?.Shortlisted[0]?.feed_back_status
                );
                setApplicationState(response?.data);

                if (response?.data?.jobs?.Shortlisted.length == 0) {
                    setCurrentStep(1);
                } else if (
                    response?.data?.jobs?.Shortlisted[0]?.candidate_id ==
                        userId &&
                    response?.data?.jobs?.Shortlisted[0]?.shorted_status ==
                        false
                ) {
                    setCurrentStep(2);
                } else if (
                    response?.data?.jobs?.Shortlisted[0]?.shorted_status ==
                        true &&
                    response?.data?.jobs?.Shortlisted[0]?.short_Candidate
                        ?.offer_accepted_status == 'Processing'
                ) {
                    setCurrentStep(3);
                } else if (
                    response?.data?.jobs?.Shortlisted[0]?.short_Candidate
                        ?.offer_accepted_status == 'Accepted' ||
                    response?.data?.jobs?.Shortlisted[0]?.short_Candidate
                        ?.offer_accepted_status == 'Rejected'
                ) {
                    setCurrentStep(4);
                }
                console.log('Application data', response?.data);
            } catch (error) {}
        }
    };
    useEffect(() => {
        getApplicationData();
    }, []);

    const AddFeedaBack = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.put(
                    `${BaseUrl}candidate/applicent/feed_back/${id}/${userId}`,
                    {
                        rating,
                        feedback
                    }
                );
                if (response.status == 200 || 201) {
                    toast.success('Feedback added successfully');
                    await getApplicationData();
                }
            } catch (error) {
                toast.error('Some thing went wrong');
            }
        }
    };

    const formatDate = dateString => {
        const date = new Date(dateString);

        // Get the day of the month with the correct suffix (st, nd, rd, th)
        const day = date.getDate();
        const daySuffix = day => {
            if (day > 3 && day < 21) return 'th'; // covers 4th to 20th
            switch (day % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        };

        // Format month and year
        const month = date.toLocaleString('en-GB', { month: 'short' }); // e.g., 'Aug'
        const year = date.getFullYear();

        // Return the formatted string
        return ` ${day}${daySuffix(day)} ${month} ${year}`;
    };

    // Example usage:
    console.log(formatDate('2024-08-12')); // Output: Offer received on : 12th Aug 2024

    const [modalShow, setModalShow] = useState(null);
    const showModal = user_id => {
        setModalShow(prev => !prev);
    };

    // Download Imaeg
    const handleDownload = async fileUrl => {
        if (fileUrl) {
            try {
                // Fetch the image as a Blob
                const response = await fetch(fileUrl);
                const blob = await response.blob();

                // Create a temporary URL for the Blob object
                const url = window.URL.createObjectURL(blob);

                // Create an anchor element and trigger the download
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'offerletter.jpg'); // Set the file name

                // Append the link to the document and click it programmatically
                document.body.appendChild(link);
                link.click();

                // Clean up by revoking the object URL and removing the anchor
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error downloading the image:', error);
            }
        } else {
            console.log('No file URL provided.');
        }
    };

    const handleRejectOffer = async id => {
        reject_Offered_letter(id);
    };
    const isGoogleDriveLink = url => {
        return url && url.includes('drive.google.com');
    };
    // check whether the img or pdf
    const [isValidFile, setIsValidFile] = useState(null);

    // Function to check file type based on URL extension
    const checkFileType = url => {
        if (url == null) {
            return;
        } else {
            const extension = url.split('.').pop().toLowerCase(); // Get file extension and convert to lowercase

            // Check if the extension is jpg or pdf
            if (extension === 'jpg' || extension === 'jpeg') {
                setIsValidFile(true); // Set to true if it's jpg or pdf
            } else if (extension === 'pdf') {
                setIsValidFile(false); // Set to false otherwise
            }
        }
    };

    console.log('isValidFile', isValidFile);
    useEffect(() => {
        checkFileType(applicationState?.offerletterUrl);
    }, []);

    return (
        <div>
            <Modal
                show={modalShow}
                onHide={showModal}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                className="custommodule"
            >
                <div
                    style={{
                        height: '60vh',
                        width: '100%',

                        overflow: 'hidden',
                        position: 'relative',
                        borderRadius: '10px'
                    }}
                >
                    {isValidFile ? (
                        <img
                            src={applicationState?.offerletterUrl}
                            alt=""
                            style={{ width: '110%' }}
                        />
                    ) : (
                        <iframe
                            src={applicationState?.offerletterUrl}
                            // Ensure the src is set
                            frameBorder="0"
                            style={{
                                width: '89%',
                                height: '80vh',
                                zoom: '1',
                                margin: '0px 20px',
                                width: '100%'
                            }}
                            title="Resume"
                        ></iframe>
                    )}

                    <button
                        className="donwload-btn-job"
                        onClick={() =>
                            handleDownload(applicationState?.offerletterUrl)
                        }
                    >
                        download
                    </button>
                </div>
            </Modal>
            <div className="stepper-container">
                <Row className="mb-4">
                    {[...Array(steps)].map((_, index) => (
                        <Col key={index} className="text-center">
                            <div className="stepper-step">
                                <div
                                    className={`step-circle ${
                                        currentStep >= index + 1
                                            ? 'active-step'
                                            : ''
                                    }`}
                                    style={{
                                        background:
                                            index < currentStep - 1
                                                ? '#3B96E1'
                                                : currentStep === steps &&
                                                  index === steps - 1 &&
                                                  applicationState?.jobs
                                                      ?.Shortlisted[0]
                                                      ?.short_Candidate
                                                      ?.offer_accepted_status ==
                                                      'Rejected'
                                                ? '#3B96E1'
                                                : ''
                                    }}
                                ></div>

                                <div
                                    className="step-text"
                                    style={{
                                        fontSize: '0.7rem',
                                        color:
                                            index < currentStep - 1
                                                ? '#3B96E1'
                                                : currentStep === steps &&
                                                  index === steps - 1
                                                ? 'green'
                                                : '#3B96E1',
                                        fontWeight:
                                            currentStep === index + 1
                                                ? 'bold'
                                                : 'normal'
                                    }}
                                >
                                    {/* {stepTexts[index]} */}
                                    {index === steps - 1
                                        ? applicationState?.jobs?.Shortlisted[0]
                                              ?.short_Candidate
                                              ?.offer_accepted_status ===
                                          'Rejected'
                                            ? ' Rejected'
                                            : 'Hired'
                                        : stepTexts[index]}
                                </div>

                                {index < steps - 1 && (
                                    <div
                                        className={`step-line ${
                                            currentStep > index + 1
                                                ? 'active-line'
                                                : ''
                                        }`}
                                    ></div>
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>

                <div className="stepper-controls mt-4">
                    {/* <Button
                        variant="primary"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="primary"
                        className="ml-2"
                        onClick={nextStep}
                        disabled={currentStep === steps}
                    >
                        Next
                    </Button> */}
                    {!applicationStatus && currentStep == 2 && (
                        <div className="company-ratings">
                            <p>Please rate the Company !</p>
                            <div className="view-company-ratings mt-3">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span
                                        key={star}
                                        style={{
                                            cursor: 'pointer',
                                            color:
                                                star <= rating
                                                    ? '#ffc107'
                                                    : '#BFBFBF',
                                            fontSize: '2rem',
                                            marginTop: '-14px'
                                        }}
                                        onClick={() => handleRating(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <label htmlFor="">Feedback</label>
                            <br />
                            <textarea
                                required
                                type="text"
                                name="feedback"
                                value={feedback}
                                onChange={e => SetFeeBack(e.target.value)}
                                placeholder="Give a short feedback to the Candidate"
                                style={{ color: 'black' }}
                            />
                            <Button
                                onClick={AddFeedaBack}
                                style={{ width: '100%' }}
                            >
                                Submit
                            </Button>
                        </div>
                    )}
                    {currentStep == 3 && (
                        <div className="main-view-offered">
                            <div className="view-applied-offered-letter">
                                <img
                                    src={applicationState?.offerletterUrl}
                                    alt=""
                                />

                                <div className="view-pdf-btn">
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            setModalShow(prev => !prev)
                                        }
                                    >
                                        View
                                    </Button>
                                </div>
                            </div>
                            <div className="accept-offer-btn">
                                <Button
                                    style={{
                                        background: '#FFBEBE',
                                        color: 'red',
                                        border: 'none'
                                    }}
                                    size="sm"
                                    onClick={() => handleRejectOffer(id)}
                                >
                                    Reject
                                </Button>
                                <Button
                                    style={{
                                        background: '#B9FFB9',
                                        color: '#008000',
                                        border: 'none'
                                    }}
                                    size="sm"
                                >
                                    Accept
                                </Button>
                            </div>
                            <p
                                style={{
                                    color: '#AEAEAE',
                                    fontSize: '0.8rem',
                                    marginTop: '10px'
                                }}
                            >
                                Offer received on{' '}
                                {formatDate(
                                    applicationState?.jobs?.Shortlisted[0]
                                        ?.sortlisted_date
                                )}
                            </p>
                        </div>
                    )}
                    {currentStep == 4 && (
                        <div className="main-view-offered">
                            <div className="view-applied-offered-letter">
                                <img
                                    src={applicationState?.offerletterUrl}
                                    alt=""
                                />
                                <div className="view-pdf-btn">
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            setModalShow(prev => !prev)
                                        }
                                    >
                                        View
                                    </Button>
                                </div>
                            </div>
                            <div className="accept-offer-btn2">
                                <Button
                                    style={{
                                        width: '100%',
                                        background:
                                            applicationState?.jobs
                                                ?.Shortlisted[0]
                                                ?.short_Candidate
                                                ?.offer_accepted_status ==
                                            'Rejected'
                                                ? '#FFBEBE'
                                                : '#B9FFB9',
                                        color:
                                            applicationState?.jobs
                                                ?.Shortlisted[0]
                                                ?.short_Candidate
                                                ?.offer_accepted_status ==
                                            'Rejected'
                                                ? 'red'
                                                : '#008000',
                                        border: 'none'
                                    }}
                                    size="sm"
                                >
                                    {
                                        applicationState?.jobs?.Shortlisted[0]
                                            ?.short_Candidate
                                            ?.offer_accepted_status
                                    }
                                </Button>
                            </div>
                            <p
                                style={{
                                    color: '#AEAEAE',
                                    fontSize: '0.8rem',
                                    marginTop: '10px'
                                }}
                            >
                                Offer received on
                                {formatDate(
                                    applicationState?.jobs?.Shortlisted[0]
                                        ?.short_Candidate?.offer_date
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationStatus;
