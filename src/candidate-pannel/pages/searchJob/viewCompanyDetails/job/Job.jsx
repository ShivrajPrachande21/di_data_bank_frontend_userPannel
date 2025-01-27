import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Image,Modal } from 'react-bootstrap';
import './jobs.css';
import BaseUrl from '../../../../../services/BaseUrl';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { SearchJobContext } from '../../../../../context/candidateContext/SearchJobContext';
import SavedJobs from './../../../appliedJob/savedJobs/SavedJobs';
import ProfileCompletionModal from '../../../ProfileAlert/ProfileCompletion';
const Job = () => {
    const { applyTo_job, save_job } = useContext(SearchJobContext);
    const { id } = useParams();
    const [jobs, setJobs] = useState(null);

    const getJobs = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;

            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/posted_jobs/company/${id}/${userId}`
                );

                setJobs(response?.data);
            } catch (error) {}
        }
    };

    const formatDate = dateString => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000); // convert ms to minutes

        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins} minutes ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hours ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} days ago`;
    };
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation,setShowConfirmation]=useState(false);
    const [applyId,SetApplyId]=useState(null);
    const [ApplyLink,SetApplyLink]=useState(null)

     const [showConfirmations,setShowConfirmations]=useState(false)
        const [saveId,SetSaveId]=useState(null)
    
   
    const handleApplyJob = async() => {
        if(ApplyLink){
            setShowConfirmation(false);
            window.open(ApplyLink, '_blank');
        }else{
            await applyTo_job(applyId);
        setShowConfirmation(false);
        await getJobs();
        }
    };
    const handleSaveJob = async () => {
        await save_job(saveId);
        setShowConfirmations(false)
        await getJobs();
    };

    useEffect(() => {
        getJobs();
    }, []);
    return (
        <div
            className="job-scrollbar"
            style={{
                padding: '4px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                overflowY: 'auto',
                height: '50vh'
            }}
        >

<Modal
    show={showConfirmation}
    onHide={() => setShowConfirmation(false)}
    style={{
        maxWidth: '400px', // Adjust the width to your preference
        margin: 'auto', // Center the modal horizontally
        display: 'flex', // Ensure the modal is treated as a flex container
        justifyContent: 'center', // Horizontally center the modal
        alignItems: 'center', // Vertically center the modal
        position: 'absolute', // Position the modal in a specific place
        top: '50%', // Center vertically
        left: '50%', // Center horizontally
        transform: 'translate(-50%, -50%)', // Adjust the final position
    }}
    centered
>
    <Modal.Header>
        <button
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{
                cursor: 'pointer',
                backgroundColor: 'transparent', // Ensure no background
                border: 'none', // Ensure no border
                color: 'skyblue',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'deepskyblue')} // Hover effect
            onMouseLeave={(e) => (e.target.style.color = 'skyblue')}
            onClick={() => setShowConfirmation(false)}
        ></button>
    </Modal.Header>
    <Modal.Body>Are you sure you want to apply this job?</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
        </Button>
        <Button
            style={{
                background: '#B4DDFF',
                color: '#3B96E1',
            }}
            onClick={handleApplyJob}
        >
         Apply
        </Button>
    </Modal.Footer>
</Modal>


<Modal
    show={showConfirmations}
    onHide={() => setShowConfirmations(false)}
    style={{
        maxWidth: '400px', 
        margin: 'auto',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
    }}
    centered
>
    <Modal.Header>
        <button
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{
                cursor: 'pointer',
                backgroundColor: 'transparent', // Ensure no background
                border: 'none', // Ensure no border
                color: 'skyblue',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'deepskyblue')} // Hover effect
            onMouseLeave={(e) => (e.target.style.color = 'skyblue')}
            onClick={() => setShowConfirmations(false)}
        ></button>
    </Modal.Header>
    <Modal.Body>Are you sure you want to save this job?</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowConfirmations(false)}>
            Cancel
        </Button>
        <Button
            style={{
                background: '#B4DDFF',
                color: '#3B96E1',
            }}
            onClick={handleSaveJob}
        >
         Save
        </Button>
    </Modal.Footer>
</Modal>

            {jobs?.map((item, index) => (
                <>
                    <div
                        className="card-job"
                        // onClick={() => handleNavigate()}
                        style={{
                            marginTop: '10px',
                            width: '260px',
                            height: '226px'
                        }}
                        key={index}
                    >
                        <div className="search-job-top">
                            <h6>
                            {item?.job_title.length > 20
                                                ? `${item.job_title.substring(
                                                      0,
                                                      20
                                                  )}...`
                                                : item?.job_title}

                            </h6>
                            <div className="green-thik">
                                {/* <img src={Verified} alt="" height="20px" /> */}
                            </div>
                        </div>

                        <div style={{ marginTop: '-4px', padding: '4px' }}>
                            <table style={{ cursor: 'pointer' }}>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            paddingRight: '30px'
                                        }}
                                    >
                                        <span className="card-table-span">
                                            Experience:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {item?.experience &&
                                              item?.experience.length > 13
                                                    ? `${item?.experience.substring(
                                                          0,
                                                          13
                                                      )}...`
                                                    :item?.experience}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            paddingRight: '30px'
                                        }}
                                    >
                                        <span className="card-table-span">
                                            Location:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {item?.location &&
                                              item?.location.length > 13
                                                    ? `${item?.location.substring(
                                                          0,
                                                          13
                                                      )}...`
                                                    :item?.location}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            paddingRight: '30px'
                                        }}
                                    >
                                        <span className="card-table-span">
                                            Salary:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {item?.salary &&
                                              item?.salary.length > 13
                                                    ? `${item?.salary.substring(
                                                          0,
                                                          13
                                                      )}...`
                                                    :item?.salary}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            paddingRight: '30px'
                                        }}
                                    >
                                        <span className="card-table-span">
                                            Qualification:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {item?.education &&
                                              item?.education.length > 13
                                                    ? `${item?.education.substring(
                                                          0,
                                                          13
                                                      )}...`
                                                    :item?.education}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            paddingRight: '30px'
                                        }}
                                    >
                                        <span className="card-table-span">
                                            Openings:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {item?.No_openings}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            paddingRight: '30px'
                                        }}
                                    >
                                        <span className="card-table-span">
                                            Posted:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {formatDate(item?.createdDate)}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                            <div
                                className="search-job-bnt mt-2"
                                // onClick={handleNavigate}
                            >
                                <Button
                                    size="sm"
                                    style={{
                                        background: 'white',
                                        color: '#3B96E1',
                                        border: '1px solid #3B96E1'
                                    }}
                                    onClick={()=>{setShowConfirmations(true),SetSaveId(item?._id)}}
                                >
                                    Save
                                </Button>
                                <Button
                                    size="sm"
                                    style={{
                                        background: '#B4DDFF',
                                        color: '#3B96E1',

                                        border: 'none'
                                    }}
                                    onClick={()=>{setShowConfirmation(true),SetApplyId(item?._id),SetApplyLink(item?.Job_Link)}}
                                >
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            ))}
            {showModal && (
                <ProfileCompletionModal
                    onClose={() => setShowModal(false)} // Close modal handler
                />
            )}
        </div>
    );
};

export default Job;
