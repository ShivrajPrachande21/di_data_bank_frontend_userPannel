import React, { useContext, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import {
    Col,
    Row,
    Image,
    Button,
    Modal,
    Tooltip,
    OverlayTrigger
} from 'react-bootstrap';


import { useNavigate, useParams } from 'react-router-dom';
import flag from '../../../../assets/images/flag.png';
import ep_back from '../../../../assets/images/ep_back.png';
import './viewJobdescription.css';
import Applications from './../../../../company-pannel/pages/create_job/viewJobApplication/applications/Applications';
import BaseUrl from '../../../../services/BaseUrl';
import axios from 'axios';
import { SearchJobContext } from '../../../../context/candidateContext/SearchJobContext';
import { CandidateProfileContext } from '../../../../context/candidateContext/CandidateProfileContext';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import ProfileCompletionModal from '../../ProfileAlert/ProfileCompletion';
const ViewJobDescription = () => {
    const { applyTo_job, save_job } = useContext(SearchJobContext);
    const { CandidateProfile, fetchCandidateProfile } = useContext(
        CandidateProfileContext
    );
    const { id } = useParams();
    const navigate = useNavigate();
    const [JobData, setJobdata] = useState();
    const [description, SetDescription] = useState('');
const [showConfirmation,setShowConfirmation]=useState(false)
const [applyId,SetApplyId]=useState(null);
 const [ApplyLink,SetApplyLink]=useState(null)

 const [showConfirmations,setShowConfirmations]=useState(false)
    const [saveId,SetSaveId]=useState(null)

    const handleReport = () => {};

    const getSingleJobDetails = async () => {
        try {
            const response = await axios.get(
                `${BaseUrl}candidate/getjobdetails/${id}`
            );

            setJobdata(response?.data);
        } catch (error) {}
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
    // Image Bind Method
    const bindUrlOrPath = url => {
        if (!url) {
            return;
        }
        let cleanBaseUrl = BaseUrl.replace(/\/api\b/, '');
        let temp = `${cleanBaseUrl.replace(/\/$/, '')}/${url.replace(
            /\\/g,
            '/'
        )}`;

        return temp.replace(/([^:]\/)\/+/g, '$1');
    };
    const sanitizedDescription = DOMPurify.sanitize(JobData?.description);
    const [showModal, setShowModal] = useState(false);
    
    const handleApplyJob = async() => {
        if (CandidateProfile?.profileCompletionPercentage != 100) {
            setShowModal(true);
            return;
        }
        if(ApplyLink){
            setShowConfirmation(false);
            window.open(ApplyLink, '_blank');
        }else{
            await applyTo_job(applyId);
        setShowConfirmation(false);
        navigate('/candidate-dashboard/search-job');
        }
    };

    // Save Jobs
    const handle_Save_jobs = async() => {
        setShowConfirmations(false)
        await save_job(saveId);
    };
    useEffect(() => {
        SetDescription(JobData?.description);
        fetchCandidateProfile();
    }, []);

    const renderSaveTooltip = props => (
        <Tooltip id="save-tooltip" {...props}>
            Save this job for later
        </Tooltip>
    );

    const renderApplyTooltip = props => (
        <Tooltip id="apply-tooltip" {...props}>
            Apply for this job
        </Tooltip>
    );
    const [userId, SetUserId] = useState(null);
    useEffect(() => {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            getSingleJobDetails();
            const token = localStorage.getItem('Candidate_token');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            SetUserId(userId);
        }
    }, [id]);

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/');
            } else {
                navigate(`/candidate-dashboard/view-job-details/${id}`);
            }
        } else {
            navigate('/');
        }
    }

    useEffect(() => {
        rendering();
    }, []);
    return (
        <>

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
            onClick={handle_Save_jobs}
        >
         Save
        </Button>
    </Modal.Footer>
</Modal>

            <img
                src={ep_back}
                alt=""
                style={{ height: '20px', cursor: 'pointer' }}
                onClick={() => navigate('/candidate-dashboard/search-job')}
            />
            <div className="view-job-description">
                <Row>
                    <Col>
                        <div className="search-job-top">
                            <Image
                                src={bindUrlOrPath(
                                    JobData?.company_id?.profile
                                )}
                                roundedCircle
                                alt="Profile"
                                width="40" // Set the desired width
                                height="40" // Set the desired height
                            />

                            <h6>
                                {JobData?.job_title}{' '}
                                <p
                                    style={{
                                        color: '#3B96E1',

                                        fontSize: '0.8rem',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() =>
                                        navigate(
                                            `/view-company-desc/${JobData?.company_id?._id}/details`
                                        )
                                    }
                                >
                                    {JobData?.company_id?.company_name}
                                </p>
                            </h6>
                            <div className="green-thik">
                                <img
                                    src={flag}
                                    alt=""
                                    height="20px"
                                    onClick={() => handleReport()}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="veiw-skills">
                            {JobData?.skills?.map((items, index) => (
                                <>
                                    <p>{items}</p>
                                </>
                            ))}
                        </div>
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
                                        {JobData?.experience} Years
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
                                        {JobData?.location}
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
                                        {JobData?.salary||'N/A'}
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
                                        Job type:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span">
                                        {JobData?.job_type||'N/A'}
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
                                        Work type:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span">
                                        {JobData?.work_type||'N/A'
                                        }
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
                                        {JobData?.education}
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
                                        {JobData?.No_openings}
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
                                        Applicants:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span">
                                        {JobData?.applied_candidates?.length}{' '}
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
                                        {formatDate(JobData?.createdDate)}
                                    </span>
                                </td>
                            </tr>
                        </table>
                        <div
                            className="search-job-bnt mt-2"
                            // onClick={handleNavigate}
                        >
                            {JobData?.applied_candidates.some(
                                candidate =>
                                    candidate.candidate_id.toString() == userId
                            ) ? (
                                <Button
                                    size="sm"
                                    style={{
                                        background: '#B4DDFF',
                                        color: '#3B96E1',
                                        width: '100%',
                                        border: 'none'
                                    }}
                                >
                                    Applied
                                </Button>
                            ) : (
                                JobData?.Save_id.some(
                                    candidate =>
                                        candidate.toString() == userId )?(
                                            <>
                                   
                                        <Button
                                            size="sm"
                                            style={{
                                                background: 'white',
                                                color: '#3B96E1',
                                                border: '1px solid #3B96E1'
                                            }}
                                        >
                                            Saved
                                        </Button>
                                  

                                    <OverlayTrigger
                                        placement="top"
                                        overlay={renderApplyTooltip}
                                    >
                                        <Button
                                            size="sm"
                                            style={{
                                                background: '#B4DDFF',
                                                color: '#3B96E1',
                                                border: 'none'
                                            }}
                                           onClick={()=>{setShowConfirmation(true),SetApplyId(id),SetApplyLink(JobData?.Job_Link)}}
                                        >
                                            Apply
                                        </Button>
                                    </OverlayTrigger>
                                </>
                                        ):(
                                            <>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={renderSaveTooltip}
                                            >
                                                <Button
                                                    size="sm"
                                                    style={{
                                                        background: 'white',
                                                        color: '#3B96E1',
                                                        border: '1px solid #3B96E1'
                                                    }}
                                                   
                                                    onClick={()=>{setShowConfirmations(true),SetSaveId(id)}}
                                                >
                                                    Save
                                                </Button>
                                            </OverlayTrigger>
        
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={renderApplyTooltip}
                                            >
                                                <Button
                                                    size="sm"
                                                    style={{
                                                        background: '#B4DDFF',
                                                        color: '#3B96E1',
                                                        border: 'none'
                                                    }}
                                                   onClick={()=>{setShowConfirmation(true),SetApplyId(id),SetApplyLink(JobData?.Job_Link)}}
                                                >
                                                    Apply
                                                </Button>
                                            </OverlayTrigger>
                                        </>
                                        )
                                
                            )}
                        </div>
                        <p
                            style={{
                                color: '#051F50',
                                fontWeight: '500',
                                marginTop: '8px'
                            }}
                        >
                            Job Description
                        </p>
                    </Col>
                </Row>
                <Row>
                    <div className="job-description-view">
                        <div
                            className="job-discription"
                            dangerouslySetInnerHTML={{
                                __html: sanitizedDescription
                            }}
                        />
                    </div>
                </Row>
            </div>
            {/* <Modal
                show={modalShow}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras
                        justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at
                        eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalShow(prev => !prev)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}
            {showModal && (
                <ProfileCompletionModal
                    onClose={() => setShowModal(false)} // Close modal handler
                />
            )}
        </>
    );
};

export default ViewJobDescription;
