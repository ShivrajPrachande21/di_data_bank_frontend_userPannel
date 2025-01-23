import React, { useContext, useEffect, useState } from 'react';
import { AppliedJobContext } from '../../../../context/candidateContext/AppliedJobContext';
import Verified from '../../../../assets/images/Verified.png';
import altprofile from '../../../../assets/images/altprofile.jpg';
import oui_cross from '../../../../assets/images/oui_cross.png';
import { Button, Image, Spinner ,Modal} from 'react-bootstrap';
import { SearchJobContext } from '../../../../context/candidateContext/SearchJobContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AppliedJobs from './../appliedJobs/AppliedJobs';
import { CandidateProfileContext } from '../../../../context/candidateContext/CandidateProfileContext';
import { toast } from 'react-toastify';
import ProfileCompletionModal from '../../ProfileAlert/ProfileCompletion';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import BaseUrl from '../../../../services/BaseUrl';
import { Helmet } from 'react-helmet';

const SavedJobs = () => {
    const { applyTo_job } = useContext(SearchJobContext);
    const { name } = useParams();
    const {
        fetchSavedJob,
        applyFromProfile,
        savedJobData,
        setsavedJobData,
        setCurrentPage,
        hasMore
    } = useContext(AppliedJobContext);

    const { CandidateProfile, fetchCandidateProfile } = useContext(
        CandidateProfileContext
    );

    const [showModal, setShowModal] = useState(false);
    const [deleteId,SetDeleteId]=useState(null)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showApplyConfirmation,setApplyShowConfirmation]=useState(false)

    const navigate = useNavigate();

    const formatDate = dateString => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins} minutes ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hours ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} days ago`;
    };

    const handleApply = async () => {
        try {
            if (CandidateProfile?.profileCompletionPercentage !== 100) {
                setShowModal(true);
                return;
            }
            if (name === 'profile') {
                await applyFromProfile(deleteId);
            } else {
                await applyTo_job(deleteId);
                await fetchSavedJob();
            }
            setApplyShowConfirmation(false)
        } catch (error) {
            console.error('Error applying to job:', error);
        }
    };

    const handleNavigate = id => {
        navigate(`/candidate-dashboard/view-job-details/${id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchSavedJob();
                await fetchCandidateProfile();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [name]); // Refetch when 'name' changes

    const handleDelete =async () => {
        setShowConfirmation(false);
  const token = localStorage.getItem('Candidate_token');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
        try{
            const response = await axios.put(
                `${BaseUrl}/candidate/remove/saved_job/${userId}/${deleteId}`
            );
            if(response.status==200|| response.status==201){
                toast.success('The job has been removed successfully.');
                await fetchSavedJob();
            }
        }catch(error){
          toast.error(error.data.error)
        }
    };

    return (
        <>
            <Helmet>
                <title>Saved jobs</title>
                <meta
                    name="description"
                    content="Find your dream job on our platform."
                />
                <meta
                    name="keywords"
                    content="jobs, career, search jobs, employment"
                />
            </Helmet>

            <Modal
    show={showConfirmation}
    onHide={() => setShowConfirmation(false)}
    style={{
        maxWidth: '400px', // Adjust the width to your preference
        margin: 'auto', // Center the modal horizontally
        display: 'flex', // Ensure the modal is treated as a flex container
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
                backgroundColor: 'transparent',
                border: 'none',
                color: 'skyblue',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'deepskyblue')}
            onMouseLeave={(e) => (e.target.style.color = 'skyblue')}
            onClick={() => setShowConfirmation(false)}
        ></button>
    </Modal.Header>
    <Modal.Body>Are you sure you want to remove this job?</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
        </Button>
        <Button
            style={{
                background: '#B4DDFF',
                color: '#3B96E1',
            }}
            onClick={handleDelete}
        >
            Remove
        </Button>
    </Modal.Footer>
</Modal>



<Modal
    show={showApplyConfirmation}
    onHide={() => setApplyShowConfirmation(false)}
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
            onClick={() => setApplyShowConfirmation(false)}
        ></button>
    </Modal.Header>
    <Modal.Body>Are you sure you want to apply this job?</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setApplyShowConfirmation(false)}>
            Cancel
        </Button>
        <Button
            style={{
                background: '#B4DDFF',
                color: '#3B96E1',
            }}
            onClick={handleApply}
        >
         Apply
        </Button>
    </Modal.Footer>
</Modal>


            <div className="saved-jobs-card">
                {savedJobData && savedJobData.length > 0 ? (
                    savedJobData.map((item, index) => (
                        <div className="card-job search" key={index}>
                             <img
                src={oui_cross}
                alt=""
                style={{ float: 'right', width: '20px', cursor: 'pointer', marginTop: '-5px', marginRight: '-5px' }}
                onClick={() => {
                    setShowConfirmation(true);
                    SetDeleteId(item._id);
                }}
            />
                            <div className="search-job-top">
                                <Image
                                    src={item?.profileUrl || altprofile}
                                    roundedCircle
                                    width="40"
                                    height="40"
                                />
                                <h6>
                                    {item?.job_title.length > 20
                                                ? `${item.job_title.substring(
                                                      0,
                                                      20
                                                  )}...`
                                                : item?.job_title}
                                    <p
                                        style={{
                                            color: '#3B96E1',
                                            fontSize: '0.8rem',
                                            wordWrap: 'break-word'
                                        }}
                                    >
                                      
                                            {item?.company_details?.company_name .length > 20
                                                ? `${item?.company_details?.company_name .substring(
                                                      0,
                                                      20
                                                  )}...`
                                                : item?.job_title}
                                    </p>
                                </h6>
                                {item?.Green_Batch && (
                                    <div className="green-thik">
                                        <img
                                            src={Verified}
                                            alt="Verified"
                                            height="20px"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <table
                                    style={{
                                        cursor: 'pointer',
                                        marginTop: '-4px'
                                    }}
                                    onClick={() => handleNavigate(item?._id)}
                                >
                                    <tbody>
                                        <tr>
                                            <td
                                                style={{ paddingRight: '30px' }}
                                            >
                                                <span className="card-table-span">
                                                    Experience:
                                                </span>
                                            </td>
                                            <td>
                                                <span className="card-table-span">
                                                    {item?.experience} Years
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{ paddingRight: '30px' }}
                                            >
                                                <span className="card-table-span">
                                                    Location:
                                                </span>
                                            </td>
                                            <td>
                                                <span className="card-table-span">
                                                    {item?.location}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{ paddingRight: '30px' }}
                                            >
                                                <span className="card-table-span">
                                                    Salary:
                                                </span>
                                            </td>
                                            <td>
                                                <span className="card-table-span">
                                                    {item?.salary} LPA
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{ paddingRight: '30px' }}
                                            >
                                                <span className="card-table-span">
                                                    Qualification:
                                                </span>
                                            </td>
                                            <td>
                                                <span className="card-table-span">
                                                    {item?.education?.length >
                                                    15
                                                        ? `${item.education.slice(
                                                              0,
                                                              15
                                                          )}...`
                                                        : item?.education}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{ paddingRight: '30px' }}
                                            >
                                                <span className="card-table-span">
                                                    Posted:
                                                </span>
                                            </td>
                                            <td>
                                                <span className="card-table-span">
                                                    {formatDate(
                                                        item?.createdDate
                                                    )}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{ paddingRight: '30px' }}
                                            >
                                                <span className="card-table-span">
                                                    Applicants:
                                                </span>
                                            </td>
                                            <td>
                                                <span className="card-table-span">
                                                    {
                                                        item?.applied_candidates
                                                            ?.length
                                                    }
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="search-job-bnt mt-2">
                                    <Button
                                        size="sm"
                                        style={{
                                            background: '#B4DDFF',
                                            color: '#3B96E1',
                                            width: '100%',
                                            border: 'none'
                                        }}
                                        onClick={()=>{setApplyShowConfirmation(true), SetDeleteId(item._id);}}
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-jobs-container">
                        <span>No jobs have been saved.</span>
                    </div>
                )}
            </div>
            {showModal && (
                <ProfileCompletionModal onClose={() => setShowModal(false)} />
            )}
        </>
    );
};

export default SavedJobs;
