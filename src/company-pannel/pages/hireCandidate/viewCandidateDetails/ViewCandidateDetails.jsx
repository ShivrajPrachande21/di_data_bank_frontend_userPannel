import React, { useContext, useEffect, useState } from 'react';
import './viewCandidate_details.css';
import arrow_back from '../../../../assets/images/arrow_back.png';
import altprofile from '../../../../assets/images/altprofile.jpg';
import { Button, Col, Row } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { HireCandidateContext } from '../../../../context/HireCandidateContex';
import BaseUrl from '../../../../services/BaseUrl';
const ViewCandidateDetails = () => {
    const { get_Candidate_detials, candidate_detials } =
        useContext(HireCandidateContext);

    const { id } = useParams();

    const [modalShow, setModalShow] = useState(false);
    const [certificateImage, setCertificateImage] = useState('');
    const [certificateModalShow, setCertificateModalShow] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const handleCertificateOpen = image => {
        setCertificateImage(image);
        setCertificateModalShow(true);
    };
    const handleCertificateClose = () => setCertificateModalShow(false);
    const navigate = useNavigate();
    const navigateProfile = () => {
        navigate(-2);
    };
    const handleClose = () => setModalShow(false);
    const googleDrivePDFLink = candidate_detials?.workDetails?.resume;

    // Function to extract the file ID from the Google Drive link
    const getFileIdFromLink = link => {
        if (!link) return null;
        const match = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
    };

    // Check if it's a Google Drive link
    const isGoogleDriveLink =
        googleDrivePDFLink && googleDrivePDFLink.includes('drive.google.com');

    // If it's a Google Drive link, extract the file ID and generate the download and preview links
    const fileId = isGoogleDriveLink
        ? getFileIdFromLink(googleDrivePDFLink)
        : null;
    const downloadLink = fileId
        ? `https://drive.google.com/uc?export=download&id=${fileId}`
        : googleDrivePDFLink; // Keep the original link if not a Google Drive link

    // If it's a Google Drive link, generate the preview link, otherwise, use the original link
    const modifiedLink = isGoogleDriveLink
        ? googleDrivePDFLink.replace('/view?usp=sharing', '/preview')
        : googleDrivePDFLink;

    // Handle the download
    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = downloadLink;
        a.download = fileId ? `resume-${fileId}.pdf` : 'resume.pdf'; // Customize filename based on whether it's a Google Drive link
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const bindUrlOrPath = url => {
        let cleanBaseUrl = BaseUrl.replace(/\/api\b/, '');
        let temp = `${cleanBaseUrl.replace(/\/$/, '')}/${url.replace(
            /\\/g,
            '/'
        )}`;

        return temp.replace(/([^:]\/)\/+/g, '$1');
    };
    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            if (!token) {
                navigate('/login');
            } else {
                navigate(`/main/view-candidate-details/${id}`);
            }
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        if (!dataFetched) {
        rendering();
        //get_Candidate_detials(id);
        setDataFetched(true);
        }
    }, [dataFetched]);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate); 
        const day = date.getDate().toString().padStart(2, '0'); 
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`; 
      };
    return (
        <>
            <div className="viewCandidate-main">
                <Modal
                    show={modalShow}
                    onHide={handleClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                    className="custom-view-resume" // Apply the custom class here
                    centered
                >
                    <div className="download">
                        <div className="download-resume">
                            <iframe
                                src={modifiedLink}
                                width="100%"
                                height="100%"
                                allowFullScreen
                            ></iframe>
                            <div className="btn-download-resume">
                                <Button
                                    size="sm"
                                    style={{ width: '200px' }}
                                    onClick={handleDownload}
                                >
                                    download
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
                {/* Certificate Modal */}
                <Modal
                    show={certificateModalShow}
                    onHide={handleCertificateClose}
                    aria-labelledby="certificate-modal-title"
                    centered
                    className="custom-view-certificate"
                >
                    <div className="download-ceriti">
                        <div className="download-certificate">
                            <iframe
                                src={certificateImage}
                                width="100%"
                                height="100%"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </Modal>
                <div className="viewCandidate">
                    <Row>
                        <div className="topsection-veiw">
                            <p onClick={navigateProfile}>
                                <img src={arrow_back} alt="" width="20px" />
                            </p>
                        </div>
                    </Row>
                    <Row style={{ marginTop: '-8px' }}>
                        <Col xs={3} md={1}>
                            <div className="view-images">
                                <img
                                    src={
                                        candidate_detials?.profile
                                            ? candidate_detials?.profile
                                            : altprofile
                                    }
                                    style={{ width: '100%', height: '100%' }}
                                    alt=""
                                />
                            </div>
                        </Col>
                        <Col xs={9} md={10}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '10px'
                                }}
                            >
                                <div className="profilediv">
                                    <h4
                                        style={{
                                            fontSize: '1rem',
                                            color: '#3B96E1'
                                        }}
                                    >
                                        {candidate_detials?.basicDetails
                                            ?.name || 'N/A'}
                                    </h4>
                                    <h4
                                        style={{
                                            fontSize: '0.7rem',
                                            color: 'black'
                                        }}
                                    >
                                        {candidate_detials?.workDetails
                                            ?.designation || 'N/A'}
                                    </h4>
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
                                Summary{' '}
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="Overview">
                            <p style={{ color: 'black'}}>{candidate_detials?.summary}</p>
                        </Col>
                    </Row>
                    <Row>
                        <div className="info-view">
                            <div className="public-info">
                                <p className="basic-details">Basic Details</p>
                                <div className="cardsFlex">
                                    <div className="cards">
                                        <div className="tables">
                                            <p style={{ color: '#051F50' }}>Email:</p>
                                            <p style={{ color: '#051F50' }}>Contact Email:</p>
                                            <p style={{ color: '#051F50' }}>Mobile No.:</p>
                                            <p style={{ color: '#051F50' }}>LinkedIn:</p>
                                        </div>
                                    </div>

                                    <div className="cards">
                                        <div className="tables">
                                            <p style={{ color: '#051F50' }}>
                                                {candidate_detials?.basicDetails
                                                    ?.email || 'N/A'}
                                            </p>
                                            <p style={{ color: '#051F50' }}>
                                                {candidate_detials?.basicDetails
                                                    ?.contact_email || 'N/A'}
                                            </p>
                                            <p style={{ color: '#051F50' }}>
                                                {' '}
                                                {candidate_detials?.basicDetails
                                                    ?.mobile || 'N/A'}
                                            </p>
                                            <p style={{ color: '#051F50' }}>
                                                {' '}
                                                {candidate_detials?.basicDetails
                                                    ?.linkedIn || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                   
                                </div>
                                <hr style={{width:"90%"}}/>
                                <p className="basic-details">Work Detials</p>
                                <div className="cardsFlex">
                                    <div className="cards">
                                        <div className="tables">
                                            <p style={{ color: '#051F50' }}>Designation:</p>
                                            {/* <p>Company name:</p> */}
                                            <p style={{ color: '#051F50' }}> Aspiring Position/Role:</p>
                                            <p style={{ color: '#051F50' }}>Expected CTC:</p>

                                            <p style={{ color: '#051F50' }}>Total Experience:</p>

                                            <p style={{ color: '#051F50' }}>Career highlights details:</p>
                                            <p style={{ color: '#051F50' }}>Recognition</p>
                                            <p style={{ color: '#051F50' }}>Skills:</p>
                                        </div>
                                    </div>

                                    <div className="cards" >
                                        <div className="tables">
                                            <p style={{ color: '#051F50' }}>
                                                {candidate_detials?.workDetails
                                                    ?.designation || 'N/A'}
                                            </p>
                                            <p style={{ color: '#051F50' }}>
                                                {' '}
                                                {candidate_detials?.workDetails
                                                    ?.aspiring_position ||
                                                    'N/A'}
                                            </p>
                                            <p style={{ color: '#051F50' }}>
                                                {
                                                    candidate_detials
                                                        ?.workDetails
                                                        ?.current_ctc ||'N/A'
                                                }
                                            </p>

                                            <p style={{ color: '#051F50' }}>
                                                {
                                                    candidate_detials
                                                        ?.workDetails
                                                        ?.work_experience||'N/A'
                                                }
                                            </p>
                                            <p style={{ color: '#051F50' }}>
                                                {candidate_detials?.workDetails
                                                    ?.career_highlight || 'N/A'}
                                            </p>
                                            <p style={{ color: '#051F50' }}>
                                                {candidate_detials?.workDetails
                                                    ?.recognation || 'N/A'}
                                            </p>
                                            <p style={{ color: '#051F50',width:'250px'}}>
                                                {candidate_detials?.workDetails?.skill?.map(
                                                    (item, index) => (
                                                        <span key={index}>
                                                            {item}
                                                            {index !==
                                                                candidate_detials
                                                                    .workDetails
                                                                    .skill
                                                                    .length -
                                                                    1 && ', '}
                                                        </span>
                                                    )
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{width:"90%"}}/>
                                {/* Experience */}
                                <p className="basic-details">Experience</p>
                                {candidate_detials?.workDetails?.Experience.map(
                                    (item, iddex) => (
                                        <>
                                            <div
                                                className="cardsFlex"
                                                key={iddex}
                                            >
                                                <div className="cards">
                                                    <div className="tables">
                                                        <p style={{ color: '#051F50' }}>Designation:</p>
                                                        {/* <p>Company name:</p> */}
                                                        <p style={{ color: '#051F50' }}>Company name:</p>
                                                        <p style={{ color: '#051F50' }}>Salary:</p>

                                                        <p style={{ color: '#051F50' }}>Location:</p>

                                                        <p style={{ color: '#051F50' }}>Start_date:</p>
                                                        <p style={{ color: '#051F50' }}>End-date</p>
                                                        <p style={{ color: '#051F50' }}>
                                                            Reporting_structure:
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="cards">
                                                    <div className="tables">
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {item?.designation ||
                                                                'N/A'}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {item?.companyName ||
                                                                'N/A'}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {item?.CTC || 'N/A'}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {item?.location ||
                                                                'N/A'}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {formatDate(item?.start_date) ||
                                                                'N/A'}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {item?.current_workingStatus
                                                                ? 'Currently Working'
                                                                :formatDate(item?.end_date) ||
                                                                  'N/A'}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {item?.reporting_structure ||
                                                                'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr style={{width:'90%'}} />
                                        </>
                                    )
                                )}
                            </div>

                            <div className="personal-info">
                                <p className="basic-details">
                                    Personal Details
                                </p>
                                <div className="cardsFlex">
                                    <div className="cards">
                                        <div className="tables">
                                            <p style={{ color: '#051F50' }}>Gender:</p>
                                            <p style={{ color: '#051F50' }}>Age:</p>
                                            <p style={{ color: '#051F50' }}>Marriage Status:</p>
                                            <p style={{ color: '#051F50' }}>Members in family:</p>
                                            <p style={{ color: '#051F50' }}>Father/Mother Name:</p>
                                            <p style={{ color: '#051F50' }}>Son/Daughter:</p>
                                        </div>
                                    </div>

                                    <div className="cards">
                                        <div className="tables">
                                            <p style={{ color: '#051F50' }}>
                                                {candidate_detials
                                                    ?.personalDetails?.gender ||
                                                    'N/A'}
                                            </p>
                                            <p style={{ color: '#051F50' }}>
                                                {' '}
                                                {candidate_detials
                                                    ?.personalDetails?.age ||
                                                    'N/A'}
                                            </p>
                                            <p style={{ color: '#051F50' }}>
                                                {' '}
                                                {candidate_detials
                                                    ?.personalDetails
                                                    ?.marriag_status || 'N/A'}
                                            </p>
                                            <p style={{ color: '#051F50' }}>
                                                {' '}
                                                {candidate_detials
                                                    ?.personalDetails
                                                    ?.family_member || 'N/A'}
                                            </p>
                                            <p style={{ color: '#051F50' }}>
                                                {' '}
                                                {candidate_detials
                                                    ?.personalDetails
                                                    ?.father_name || 'N/A'}
                                            </p>
                                            <p style={{ color: '#051F50' }}>
                                                {' '}
                                                {candidate_detials
                                                    ?.personalDetails
                                                    ?.son_name || 'N/A'}
                                            </p>
                                           
                                        </div>
                                    </div>
                                </div>
                                <hr style={{width:"90%"}}/>
                                <p className="basic-details">
                                    Education Details
                                </p>
                                <div className="cardsFlex">
                                    <div className="cards">
                                        <div className="tables">
                                            <p style={{ color: '#051F50'  }}>Highest level of education:</p>
                                            <p style={{ color: '#051F50', marginTop:'31px' }}>Boards represented name:</p>
                                            <p style={{ color: '#051F50',marginTop:'31px' }}>Book Published/Article:</p>
                                            <p style={{ color: '#051F50',marginTop:'31px' }}>Resume:</p>
                                            {candidate_detials?.educationDetails?.certificates?.map(
                                                    (item, index) => (
                                                        <>
                                                          <p style={{ marginTop: '50px',color:'#051F50' }}>
                                                {item?.Certificate}:
                                            </p>
                                                        </>
                                                    )
                                                )}
                                            
                                        </div>
                                    </div>

                                    <div className="cards">
                                        <div className="tables">
                                            <p style={{ color: '#051F50' }}>
                                                {
                                                    candidate_detials
                                                        ?.educationDetails
                                                        ?.highest_education ||'N/A'
                                                }
                                            </p>
                                            <p style={{ color: '#051F50' }}>
                                                {
                                                    candidate_detials
                                                        ?.educationDetails
                                                        ?.board_represent ||'N/A'
                                                }
                                            </p>
                                            <p style={{ color: '#051F50'}}>
                                                {
                                                    candidate_detials
                                                        ?.educationDetails
                                                        ?.articles ||'N/A'
                                                }
                                            </p>
                                            
                                            <p style={{ marginTop: '80px' }}>
                                                <div className="pdf-view">
                                                    <div
                                                        className="pdf"
                                                        onClick={() =>
                                                            setModalShow(true)
                                                        }
                                                    >
                                                        PDF
                                                    </div>
                                                    <div className="pdf-text">
                                                   {candidate_detials
                                                        ?.workDetails
                                                        ?.current_ctc?candidate_detials?.basicDetails
                                                    ?.name :'N/A'}
                                                    </div>
                                                </div>
                                            </p>
                                            <p className="mt-4">
                                                {candidate_detials?.educationDetails?.certificates?.map(
                                                    (item, index) => (
                                                        <>
                                                            <div
                                                                className="pdf-view"
                                                                key={index}
                                                                onClick={() =>
                                                                    handleCertificateOpen(
                                                                        item?.image
                                                                    )
                                                                }
                                                            >
                                                                <div className="pdf">
                                                                    PDF
                                                                </div>
                                                                <div className="pdf-text">
                                                                    {
                                                                        item?.Certificate
                                                                    }
                                                                
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{width:"90%"}}/>
                                <p className="basic-details">
                                Education
                                </p>
                                {candidate_detials?.educationDetails?.Education.map(
                                    (item, iddex) => (
                                        <>
                                            <div
                                                className="cardsFlex"
                                                key={iddex}
                                            >
                                                <div className="cards">
                                                    <div className="tables">
                                                        <p style={{ color: '#051F50' }}>College/School :</p>
                                                        {/* <p>Company name:</p> */}
                                                        <p style={{ color: '#051F50' }}>Degree:</p>
                                                        <p style={{ color: '#051F50' }}>Field of study:</p>

                                                        <p style={{ color: '#051F50' }}>Start date:</p>

                                                        <p style={{ color: '#051F50' }}>End date:</p>
                                                        <p style={{ color: '#051F50' }}>Grade </p>
                                                        <p style={{ color: '#051F50' }}>
                                                        Description:
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="cards" style={{width:'450px'}}>
                                                    <div className="tables">
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {item?.school ||
                                                                'N/A'}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {item?.degree||
                                                                'N/A'}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {item?.Field_study || 'N/A'}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {formatDate(item?. start_date) ||
                                                                'N/A'}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {formatDate(item?.end_date) ||
                                                                'N/A'}
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {item?.grade
                                                                ||'N/A'
                                                               }
                                                        </p>
                                                        <p
                                                            style={{
                                                                color: '#051F50'
                                                            }}
                                                        >
                                                            {item?.description ||
                                                                'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    )
                                )}
                            </div>
                        </div>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default ViewCandidateDetails;
