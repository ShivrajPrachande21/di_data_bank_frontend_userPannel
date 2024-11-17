import React, { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { jwtDecode } from 'jwt-decode';
import { Button, Col, Row, Image, Form } from 'react-bootstrap';
import './searchjob.css';
import SearchIcon from '../../../assets/images/SearchIcon.png';
import whiteSeacrh from '../../../assets/images/whiteSeacrh.png';
import avatar from '../../../assets/images/avatar.png';
import Verified from '../../../assets/images/Verified.png';
import altprofile from '../../../assets/images/altprofile.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchJobContext } from '../../../context/candidateContext/SearchJobContext';
import BaseUrl from '../../../services/BaseUrl';
import axios from 'axios';
import { CandidateProfileContext } from '../../../context/candidateContext/CandidateProfileContext';
import { toast } from 'react-toastify';
const SearchJob = () => {
    const locate = useLocation();

    const {
        data,
        fetch_search_job,
        applyTo_job,
        save_job,
        hasMore,
        loadMoreJobs,
        setData,
        visibleItems,
        setVisibleItems
    } = useContext(SearchJobContext);
    const { CandidateProfile, fetchCandidateProfile } = useContext(
        CandidateProfileContext
    );

    const [SearchData, SetSearchData] = useState({
        search: '',
        experience: '',
        location: '',
        industry: '',
        salary: '',
        job_type: '',
        date_posted: ''
    });
    const [loading, Setloading] = useState(false);
    const [id, SetID] = useState(null);
    const handleInputChange = e => {
        const { name, value } = e.target;
        SetSearchData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // api for seacrch Data
    const handleSearch = async e => {
        e.preventDefault();
        Setloading(true);
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.post(
                    `${BaseUrl}candidate/job_search/${userId}`,
                    SearchData
                );
                if (response?.status == 200 || response?.status == 201) {
                    setData(response?.data);
                    setVisibleItems(response?.data);
                    Setloading(false);
                }
            } catch (error) {}
        }
    };

    const navigate = useNavigate();
    const handleNavigate = id => {
        navigate(`/candidate-dashboard/view-job-details/${id}`);
    };
    //
    const formatDate = dateString => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000); // convert ms to minutes
    
        if (diffMins < 1) return "just now";
        if (diffMins < 60) return `${diffMins} minutes ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hours ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} days ago`;
    };
    // Image Bind Method
    const bindUrlOrPath = url => {
        let cleanBaseUrl = BaseUrl.replace(/\/api\b/, '');
        let temp = `${cleanBaseUrl.replace(/\/$/, '')}/${url.replace(
            /\\/g,
            '/'
        )}`;

        return temp.replace(/([^:]\/)\/+/g, '$1');
    };

    // function for Apply job
    const ApplyTOJob = id => {
        if (CandidateProfile?.profileCompletionPercentage != 100) {
            toast.error('Please complete your profile before apply jobs.');
            return;
        }
        applyTo_job(id);
    };

    // function to Save Jobs
    const SavedJobs = id => {
        save_job(id);
    };

    useEffect(() => {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            fetch_search_job();
            fetchCandidateProfile();
            const token = localStorage.getItem('Candidate_token');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            SetID(userId);
        }
    }, [locate]);

    // Animation code

    // When the data changes, update the visibleItems state with delay
    useEffect(() => {
        if (data && data.length > 0) {
            data.forEach((item, index) => {
                setTimeout(() => {
                    setVisibleItems(data); // Add item with delay
                }, index * 300); // 300ms delay for sequential fade-in
            });
        }
    }, [locate]);

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/');
            } else {
                navigate('/candidate-dashboard/search-job');
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
            <div className="searchJob">
                <Form onSubmit={handleSearch}>
                    <Row
                        style={{
                            position: 'fixed',

                            zIndex: '10'
                        }}
                    >
                        <div className="Search-input-div">
                            <input
                                name="search"
                                value={SearchData.search}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Search Jobs (Search by Job title , Company name)"
                            />
                            <Button
                                type="submit"
                                size="sm"
                                className="search-btn"
                            >
                                <img
                                    src={whiteSeacrh}
                                    alt=""
                                    width="20px"
                                    style={{ cursor: 'pointer' }}
                                />
                            </Button>
                        </div>
                        <Row>
                            <Col className="d-flex">
                                <div class="search-select">
                                    <select
                                        name="experience"
                                        value={SearchData.experience}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Experience</option>
                                        <option value="1">0-1 Yrs</option>
                                        <option value="2"> 2 Yrs</option>
                                        <option value="3"> 3 Yrs</option>
                                        <option value="4"> 4 Yrs</option>
                                        <option value="5"> 5 Yrs</option>
                                        <option value="6"> 6 Yrs</option>
                                    </select>
                                </div>

                                <div class="search-select">
                                    <select
                                        name="salary"
                                        value={SearchData.salary}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Salary</option>
                                        <option value="0-3">0-3 LPA</option>
                                        <option value="3-6"> 3-6 LPA</option>
                                        <option value="6-10"> 6-10 LPA</option>
                                        <option value="10-15">10-15 LPA</option>
                                        <option value="15-25">
                                            15-25 LPA{' '}
                                        </option>
                                        <option value="25-50">25-50 LPA</option>
                                        <option value="50-75">50-75 LPA</option>
                                        <option value="75-100">
                                            75-100 LPA
                                        </option>
                                    </select>
                                </div>
                                <div class="search-select">
                                    <select
                                        name="job_type"
                                        value={SearchData.job_type}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Job type</option>
                                        <option value="Full-time">
                                            Full-time
                                        </option>
                                        <option value="Part-time">
                                            Part-time
                                        </option>
                                        <option value="Temporary">
                                            Temporary
                                        </option>
                                        <option value="Contract">
                                            Contract
                                        </option>
                                        <option value="Freelance">
                                            Freelance
                                        </option>
                                    </select>
                                </div>
                                <div class="search-select">
                                    <select
                                        name="date_posted"
                                        value={SearchData.date_posted}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Date posted</option>
                                        <option value="1">Last 1 day</option>
                                        <option value="3">Last 3 days</option>
                                        <option value="7">Last 7 days</option>
                                        <option value="15">Last 15 days</option>
                                        <option value="30">Last 30 days</option>
                                    </select>
                                </div>
                                <div className="search-inductiers">
                                    <input
                                        name="industry"
                                        value={SearchIcon.industry}
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="Industry(Software)"
                                    />
                                </div>
                                <div className="search-inductiers">
                                    <input
                                        name="location"
                                        value={SearchData.location}
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="Location:(pune)"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Row>
                </Form>

                <Row style={{ marginTop: '88px' }}>
                    <p className="searchresult">Search Result:{data?.length}</p>
                    <div className="search-job-card-div">
                        {loading ? (
                            'loading...'
                        ) : visibleItems.length == 0 ? (
                            <div className="no-jobs-container">
                                <span>No matching jobs found.</span>
                            </div>
                        ) : (
                            visibleItems?.map((item, index) => (
                                <div className="card-job search">
                                    <div
                                        className="search-job-top"
                                        onClick={() =>
                                            handleNavigate(item?._id)
                                        }
                                    >
                                        <Image
                                            src={
                                                item?.company_details?.profile
                                                    ? bindUrlOrPath(
                                                          item?.company_details
                                                              ?.profile
                                                      )
                                                    : altprofile
                                            }
                                            roundedCircle
                                            alt={altprofile}
                                            width="40" // Set the desired width
                                            height="40" // Set the desired height
                                        />
                                        <h6>
                                            {item?.job_title}{' '}
                                            <p
                                                style={{
                                                    color: '#3B96E1',

                                                    fontSize: '0.76rem'
                                                }}
                                            >
                                                {
                                                    item?.company_details
                                                        ?.company_name
                                                }
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
                                            style={{ cursor: 'pointer' }}
                                            onClick={() =>
                                                handleNavigate(item?._id)
                                            }
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
                                                        {formatDate(
                                                            item?.createdDate
                                                        )}{' '}
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
                                                            item
                                                                ?.applied_candidates
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
                                            {item.applied_candidates.some(
                                                candidate =>
                                                    candidate.candidate_id.toString() ===
                                                    id
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
                                                <>
                                                    <Button
                                                        size="sm"
                                                        style={{
                                                            background: 'white',
                                                            color: '#3B96E1',
                                                            border: '1px solid #3B96E1'
                                                        }}
                                                        onClick={() =>
                                                            SavedJobs(item?._id)
                                                        }
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        style={{
                                                            background:
                                                                '#B4DDFF',
                                                            color: '#3B96E1',

                                                            border: 'none'
                                                        }}
                                                        onClick={() =>
                                                            ApplyTOJob(
                                                                item?._id
                                                            )
                                                        }
                                                    >
                                                        Apply
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Row>
            </div>
        </>
    );
};

export default SearchJob;
