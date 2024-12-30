import React, { useContext, useEffect, useState } from 'react';
import { AppliedJobContext } from '../../../../context/candidateContext/AppliedJobContext';
import Verified from '../../../../assets/images/Verified.png';
import altprofile from '../../../../assets/images/altprofile.jpg';
import { Button, Image,Spinner } from 'react-bootstrap';
import { SearchJobContext } from '../../../../context/candidateContext/SearchJobContext';
import { useLocation, useNavigate } from 'react-router-dom';
import AppliedJobs from './../appliedJobs/AppliedJobs';
import { CandidateProfileContext } from '../../../../context/candidateContext/CandidateProfileContext';
import { toast } from 'react-toastify';
import ProfileCompletionModal from '../../ProfileAlert/ProfileCompletion';
import InfiniteScroll from 'react-infinite-scroll-component'
const SavedJobs = () => {
    const { applyTo_job } = useContext(SearchJobContext);
    const { fetchSavedJob, savedJobData,setsavedJobData,setCurrentPage,
        hasMore } = useContext(AppliedJobContext);
    const [showModal, setShowModal] = useState(false);
    const locate = useLocation();
    const navigate = useNavigate();
    const { CandidateProfile, fetchCandidateProfile } = useContext(
        CandidateProfileContext
    );
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

    const handleApply = async id => {
        if (CandidateProfile?.profileCompletionPercentage != 100) {
            setShowModal(true);
            return;
        }
        await applyTo_job(id);
        await fetchSavedJob();
    };
    useEffect(() => {
        if(savedJobData&&savedJobData.length==0){
            fetchSavedJob();
        }
        fetchCandidateProfile();
    }, []);

    const handleNavigate = async id => {
        navigate(`/candidate-dashboard/view-job-details/${id}`);
    };

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/login');
            } else {
                navigate('/candidate-dashboard/applied-job/saved-jobs');
            }
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        rendering();
    }, []);

    useEffect(()=>{
        return(()=>{
    setsavedJobData([])
    setCurrentPage(1)
      })
    },[])

    return (
        <>
         <InfiniteScroll
                                       dataLength={savedJobData&&savedJobData.length}
                                        next={fetchSavedJob}
                                        hasMore={hasMore} 
                                        loader={<div style={{textAlign:'center'}}>{savedJobData&&savedJobData.length>1?<Spinner size='sm' variant='primary' />:null}</div> } 
                                        endMessage={savedJobData&&savedJobData.length>1?<p>No more data to Load...</p>:null}
                                        height={540}
                                    >
            <div className="saved-jobs-card">
                {savedJobData && savedJobData.length > 0 ? (
                    savedJobData.map((item, index) => (
                        <div
                            className="card-job search"
                            onClick={() => handleNavigate(item?._id)}
                            key={index}
                        >
                            <div className="search-job-top">
                                <Image
                                    src={
                                        item?.profileUrl
                                            ? item?.profileUrl
                                            : altprofile
                                    }
                                    roundedCircle
                                    // alt={altprofile}
                                    width="40" // Set the desired width
                                    height="40" // Set the desired height
                                />
                                <h6>
                                    {item?.job_title}{' '}
                                    <p
                                        style={{
                                            color: '#3B96E1',

                                            fontSize: '0.8rem',
                                            width: '180px' /* Adjust this value to your desired width */,
                                            wordWrap: 'break-word'
                                        }}
                                    >
                                        {item?.company_details?.company_name ||
                                            ''}
                                    </p>
                                </h6>
                                <div className="green-thik">
                                    {item?.Green_Batch ? (
                                        <img
                                            src={Verified}
                                            alt=""
                                            height="20px"
                                        />
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <table
                                    style={{
                                        cursor: 'pointer',
                                        marginTop: '-4px'
                                    }}
                                >
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
                                                {item?.experience} Years
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
                                                Loction:
                                            </span>{' '}
                                        </td>
                                        <td>
                                            {' '}
                                            <span className="card-table-span">
                                                {item?.location}
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
                                                {item?.salary} LPA
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
                                                {item?.education}
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
                                                {formatDate(item?.createdDate)}{' '}
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
                                                {
                                                    item?.applied_candidates
                                                        ?.length
                                                }
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
                                            background: '#B4DDFF',
                                            color: '#3B96E1',
                                            width: '100%',
                                            border: 'none'
                                        }}
                                        onClick={() => handleApply(item?._id)}
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
            </InfiniteScroll>

            {showModal && (
                <ProfileCompletionModal
                    onClose={() => setShowModal(false)} // Close modal handler
                />
            )}
        </>
    );
};

export default SavedJobs;
