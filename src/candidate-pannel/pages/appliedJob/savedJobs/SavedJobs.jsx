import React, { useContext, useEffect, useState } from 'react';
import { AppliedJobContext } from '../../../../context/candidateContext/AppliedJobContext';
import Verified from '../../../../assets/images/Verified.png';
import altprofile from '../../../../assets/images/altprofile.jpg';
import { Button, Image, Spinner } from 'react-bootstrap';
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

    const handleApply = async id => {
        try {
            if (CandidateProfile?.profileCompletionPercentage !== 100) {
                setShowModal(true);
                return;
            }
            if (name === 'profile') {
                await applyFromProfile(id);
            } else {
                await applyTo_job(id);
                await fetchSavedJob();
            }
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
            <div className="saved-jobs-card">
                {savedJobData && savedJobData.length > 0 ? (
                    savedJobData.map((item, index) => (
                        <div className="card-job search" key={index}>
                            <div className="search-job-top">
                                <Image
                                    src={item?.profileUrl || altprofile}
                                    roundedCircle
                                    width="40"
                                    height="40"
                                />
                                <h6>
                                    {item?.job_title}
                                    <p
                                        style={{
                                            color: '#3B96E1',
                                            fontSize: '0.8rem',
                                            wordWrap: 'break-word'
                                        }}
                                    >
                                        {item?.company_details?.company_name ||
                                            ''}
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
            {showModal && (
                <ProfileCompletionModal onClose={() => setShowModal(false)} />
            )}
        </>
    );
};

export default SavedJobs;
