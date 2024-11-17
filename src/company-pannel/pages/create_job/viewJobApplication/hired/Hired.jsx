import React, { useContext, useEffect, useState } from 'react';
import arrow_back from '../../../../../assets/images/arrow_back.png';
import avatar from '../../../../../assets/images/avatar.png';
import harsh from '../../../../../assets/images/harsh.pdf';
import { Modal, Row } from 'react-bootstrap';
import './hired.css';
import { CreateJobContext } from '../../../../../context/CreateJobContext';
const Hired = () => {
    const { hiredCandidateData, fetch_hire_candidate } =
        useContext(CreateJobContext);
    const handle_download = () => {};

    const formatDate = dateString => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
    };

    const [modalShow, setModalShow] = useState(null);
    const [currentResume, setCurrentResume] = useState('');
    const getEmbedLink = link => {
        let fileId;

        // Check if the link contains '/d/'
        if (link.includes('/d/')) {
            fileId = link.split('/d/')[1].split('/')[0];
        }
        // Check if the link contains 'id=' (another common format)
        else if (link.includes('id=')) {
            fileId = link.split('id=')[1].split('&')[0];
        } else {
            // Handle invalid or unrecognized link formats
            console.error('Invalid Google Drive link');
            return link;
        }

        return `https://drive.google.com/file/d/${fileId}/preview`;
    };

    const showModal = user_id => {
        setModalShow(prev => !prev);
    };
    const hanlde_resume_view = resume => {
        setCurrentResume(resume);
        showModal();
    };
    const [modalShow1, setModalShow1] = useState(null);
    const showModal1 = user_id => {
        setModalShow1(prev => !prev);
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

    // check whether the img or pdf
    const [isValidFile, setIsValidFile] = useState(null);

    // Function to check file type based on URL extension
    const checkFileType = url => {
        if (url == null) {
        } else {
            const extension = url.split('.').pop().toLowerCase();

            // Check if the extension is jpg or pdf
            if (extension === 'jpg' || extension === 'jpeg') {
                setIsValidFile(true);
            } else if (extension === 'pdf') {
                setIsValidFile(false);
            }
        }
    };

    useEffect(() => {
        checkFileType(hiredCandidateData?.offerletterUrl);
        fetch_hire_candidate();
    }, []);

    const isGoogleDriveLink = url => {
        return url && url.includes('drive.google.com');
    };
    return (
        <>
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
                        margin: '0px auto',
                        overflow: 'hidden'
                    }}
                >
                    <div>
                        <div>
                            {currentResume ? (
                                <>
                                    <iframe
                                        src={
                                            currentResume
                                                ? isGoogleDriveLink(
                                                      currentResume
                                                  )
                                                    ? getEmbedLink(
                                                          currentResume
                                                      )
                                                    : currentResume
                                                : null
                                        }
                                        // Ensure the src is set
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
                                    <button
                                        className="donwload-btn-job"
                                        onClick={() =>
                                            handleDownload(
                                                hiredCandidateData?.resumeUrl
                                            )
                                        }
                                    >
                                        download
                                    </button>
                                </>
                            ) : (
                                <p>No resume available</p>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="job-offered mt-2">
                <p className="hiredon">
                    Hired on {formatDate(hiredCandidateData?.createdDate)}
                </p>
                <div className="header-view" style={{ marginTop: '-10px' }}>
                    <Row>
                        <div>
                            <div
                                className="top-head"
                                style={{
                                    marginLeft: '-20px',
                                    marginBottom: '-10px'
                                }}
                            >
                                <div className="cmp-img">
                                    <img
                                        src={
                                            hiredCandidateData?.profileUrl ||
                                            alternet
                                        }
                                        alt=""
                                        style={{width:"100%", height:"100%"}}
                                    />{' '}
                                </div>
                                <div className="view-top-content mx-2">
                                    <h3>
                                        {
                                            hiredCandidateData?.basicdetails[0]
                                                ?.name
                                        }
                                    </h3>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </Row>

                    <Row>
                        <div className="hired-offered-table">
                            <table>
                                <tr>
                                    <td style={{ paddingRight: '30px' }}>
                                        <span className="card-table-span">
                                            Experience:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {hiredCandidateData?.experience}{' '}
                                            Years
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingRight: '30px' }}>
                                        <span className="card-table-span">
                                           
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {/* {hiredCandidateData?.location} */}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <td style={{ paddingRight: '30px' }}>
                                        <span className="card-table-span">
                                            Skills:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {hiredCandidateData?.workdetails?.skill.map(
                                                (item, index) => (
                                                    <>{item}, </>
                                                )
                                            )}{' '}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingRight: '30px' }}>
                                        <span className="card-table-span">
                                            Qualification:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {hiredCandidateData?.education}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <td style={{ paddingRight: '30px' }}>
                                        <span className="card-table-span">
                                            Email:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {
                                                hiredCandidateData
                                                    ?.basicdetails[0]?.email
                                            }
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingRight: '30px' }}>
                                        <span className="card-table-span">
                                            resume:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span
                                            className="hired-table-resmue"
                                            onClick={() =>
                                                hanlde_resume_view(
                                                    hiredCandidateData?.resumeUrl
                                                )
                                            }
                                        >
                                            view
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </Row>
                </div>
                <Row>
                    <div className="job-offered-accpeted mt-2">
                        <div className="job-righttop">
                            {isValidFile ? (
                                <img
                                    src={hiredCandidateData?.offerletterUrl}
                                    alt=""
                                    style={{width:'100%',height:'100%'}}
                                />
                            ) : (
                                <img
                                src={hiredCandidateData?.offerletterUrl}
                                alt=""
                               style={{width:'100%',height:'100%'}}
                            />
                               
                            )}

                            <div className="job-right">
                                <button onClick={showModal1}>View</button>
                            </div>
                        </div>{' '}
                        <div className="job-left">
                            <button>
                                {
                                    hiredCandidateData?.Shortlisted
                                        ?.short_Candidate?.offer_accepted_status
                                }
                            </button>
                        </div>
                    </div>
                </Row>
            </div>
            <Modal
                show={modalShow1}
                onHide={showModal1}
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
                            src={hiredCandidateData?.offerletterUrl}
                            alt=""
                            style={{ width: '100%',height:'100%' }}
                        />
                    ) : (
                        <img
                        src={hiredCandidateData?.offerletterUrl}
                        alt=""
                        style={{ width: '100%',height:"100%" }}
                    />
                       
                    )}

                    <button
                        className="donwload-btn-job"
                        onClick={() =>
                            handleDownload(hiredCandidateData?.offerletterUrl)
                        }
                    >
                        download
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Hired;
