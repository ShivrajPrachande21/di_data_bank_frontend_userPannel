import React, { useContext, useEffect, useState } from 'react';
import arrow_back from '../../../../../assets/images/arrow_back.png';
import avatar from '../../../../../assets/images/avatar.png';
import { Modal, Row } from 'react-bootstrap';
import './hired.css';
import { CreateJobContext } from '../../../../../context/CreateJobContext';
const Hired = () => {
    const { hiredCandidateData, fetch_hire_candidate } =
        useContext(CreateJobContext);

    console.log('hred', hiredCandidateData);
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
    useEffect(() => {
        fetch_hire_candidate();
    }, []);
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
                                <iframe
                                    src={
                                        currentResume
                                            ? getEmbedLink(currentResume)
                                            : currentResume
                                    } // Ensure the src is set
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
                                        // src={
                                        //     viewJobDesciptionData?.profileUrl ||
                                        //     alternet
                                        // }
                                        alt=""
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
                                            Current Company::
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
                            <img
                                src={hiredCandidateData?.offerletterUrl}
                                alt=""
                                style={{ width: '100%' }}
                            />
                            <div className="job-right">
                                <button onClick={handle_download}>View</button>
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
        </>
    );
};

export default Hired;
