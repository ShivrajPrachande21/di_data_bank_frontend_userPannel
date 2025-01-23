import React, { useContext, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import arrowdown from '../../../assets/images/arrowdown.png';
import DOMPurify from 'dompurify';
import { jwtDecode } from 'jwt-decode';
import {
    Button,
    Col,
    Row,
    Image,
    Form,
    Spinner,
    Modal,
    Accordion,
    Pagination
} from 'react-bootstrap';
import './searchjob.css';
import SearchIcon from '../../../assets/images/SearchIcon.png';
import whiteSeacrh from '../../../assets/images/whiteSeacrh.png';
import avatar from '../../../assets/images/avatar.png';
import Verified from '../../../assets/images/Verified.png';
import altprofile from '../../../assets/images/altprofile.jpg';
import oui_cross from '../../../assets/images/oui_cross.png';
import { useFetcher, useLocation, useNavigate } from 'react-router-dom';
import { SearchJobContext } from '../../../context/candidateContext/SearchJobContext';
import BaseUrl from '../../../services/BaseUrl';
import axios from 'axios';
import { CandidateProfileContext } from '../../../context/candidateContext/CandidateProfileContext';
import { toast } from 'react-toastify';
import ProfileCompletionModal from '../ProfileAlert/ProfileCompletion';
import iconamoon_arrowd from '../../../assets/images/iconamoon_arrowd.png';
import { Helmet } from 'react-helmet';

const SearchJob = () => {
    const {
        fetch_search_job,
        applyTo_job,
        save_job,
        visibleItems,
        setVisibleItems,
        setCurrentPage,
        hasMore,
        selectValue,
        getSingleJobDetails,
        JobData,
        setJobdata,
        handleSelect,
        handlePageChange,
        currentPage,
        itemsPerPage,
        totalPage,
        SetTotalPage,
        initialFetch,
        setInitailFrtch,
        years
    } = useContext(SearchJobContext);
    const { CandidateProfile, fetchCandidateProfile } = useContext(
        CandidateProfileContext
    );
    const [hideDesc, setHideDesc] = useState(false);
    const [hoveredCardId, setHoveredCardId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [applyId, SetApplyId] = useState(null);

    const [showConfirmations, setShowConfirmations] = useState(false);
    const [saveId, SetSaveId] = useState(null);

    const activeCardRef = useRef(null);
    const [SearchData, SetSearchData] = useState({
        search: '',
        experience: '',
        location: '',
        industry: '',
        salary: '',
        job_type: '',
        date_posted: ''
    });
    const [showModal, setShowModal] = useState(false);
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
                    `${BaseUrl}candidate/job_search/${userId}/${currentPage}/${selectValue}`,
                    SearchData
                );
                if (response?.status == 200 || response?.status == 201) {
                    let data = response?.data?.unappliedJobs;
                    let page = response?.data?.totalPages;
                    setInitailFrtch('searchdata');
                    SetTotalPage(page);
                    setVisibleItems(data);
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

        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins} minutes ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hours ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} days ago`;
    };
    // Image Bind Method
    const bindUrlOrPath = url => {
        let cleanBaseUrl = BaseUrl.replace(/\/api\b/, '');
        let temp = `${cleanBaseUrl.replace(/\/$/, '')}/${
            url && url.replace(/\\/g, '/')
        }`;

        return temp.replace(/([^:]\/)\/+/g, '$1');
    };

    // function for Apply job
    const ApplyTOJob = async () => {
        if (CandidateProfile?.profileCompletionPercentage != 100) {
            setShowModal(true);
            return;
        }
        setShowConfirmation(false);
        await applyTo_job(applyId);
    };

    // function to Save Jobs
    const SavedJobs = () => {
        setShowConfirmations(false);
        save_job(saveId);
    };

    const sanitizedDescription = DOMPurify.sanitize(JobData?.description);
    useEffect(() => {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            if (visibleItems.length == 0) {
                fetch_search_job();
            }
            rendering();
            fetchCandidateProfile();
            const token = localStorage.getItem('Candidate_token');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            SetID(userId);
        }
    }, []);

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/login');
            } else {
                navigate('/candidate-dashboard/search-job');
            }
        } else {
            navigate('/login');
        }
    }

    const handleMouseEnter = async id => {
        setHoveredCardId(id);
        await getSingleJobDetails(id);
        setModalVisible(true);
    };

    const handleMouseLeave = () => {
        setModalVisible(false);
        setHoveredCardId(null);
    };
    useEffect(() => {
        return () => {
            setVisibleItems([]);
            setCurrentPage(1);
            SetTotalPage(0);
        };
    }, []);

    const isTransactionDataArray = Array.isArray(visibleItems);
    const validTransactionData = isTransactionDataArray
        ? visibleItems
        : visibleItems;

    useEffect(() => {
        fetchCandidateProfile();
    }, []);

    useEffect(() => {
        if (initialFetch == 'searchdata') {
            handleSearch();
        } else {
            fetch_search_job();
        }
    }, [currentPage, selectValue]);

    return (
        <>
            <Helmet>
                <title>Search Job</title>
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
                    justifyContent: 'center', // Horizontally center the modal
                    alignItems: 'center', // Vertically center the modal
                    position: 'absolute', // Position the modal in a specific place
                    top: '50%', // Center vertically
                    left: '50%', // Center horizontally
                    transform: 'translate(-50%, -50%)' // Adjust the final position
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
                            color: 'skyblue'
                        }}
                        onMouseEnter={e =>
                            (e.target.style.color = 'deepskyblue')
                        } // Hover effect
                        onMouseLeave={e => (e.target.style.color = 'skyblue')}
                        onClick={() => setShowConfirmation(false)}
                    ></button>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to apply this job?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowConfirmation(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{
                            background: '#B4DDFF',
                            color: '#3B96E1'
                        }}
                        onClick={ApplyTOJob}
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
                    transform: 'translate(-50%, -50%)'
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
                            color: 'skyblue'
                        }}
                        onMouseEnter={e =>
                            (e.target.style.color = 'deepskyblue')
                        } // Hover effect
                        onMouseLeave={e => (e.target.style.color = 'skyblue')}
                        onClick={() => setShowConfirmations(false)}
                    ></button>
                </Modal.Header>
                <Modal.Body>Are you sure you want to save this job?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowConfirmations(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{
                            background: '#B4DDFF',
                            color: '#3B96E1'
                        }}
                        onClick={SavedJobs}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
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
                            <Col
                                className="d-flex"
                                style={{ marginTop: '50px' }}
                            >
                                <div class="search-select">
                                    <select
                                        name="experience"
                                        value={SearchData.experience}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Experience</option>

                                        {years.map((item, index) => (
                                            <option
                                                key={index}
                                                value={item.year}
                                            >
                                                {item.text}
                                            </option>
                                        ))}
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

                <Row style={{ marginTop: '92px' }}>
                    <p className="searchresult">Result:{visibleItems.length}</p>

                    <div className="search-job-card-div">
                        {loading ? (
                            'loading...'
                        ) : visibleItems.length == 0 ? (
                            <div className="no-jobs-container">
                                <span>No matching jobs found.</span>
                            </div>
                        ) : (
                            visibleItems?.map((item, index) => (
                                <div className="card-job search" key={index}>
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
                                            width="40"
                                            height="40"
                                            onMouseEnter={() =>
                                                handleMouseEnter(item._id)
                                            }
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

                                                    fontSize: '0.76rem'
                                                }}
                                            >
                                                {item?.company_details
                                                    ?.company_name.length > 23
                                                    ? `${item?.company_details?.company_name.substring(
                                                          0,
                                                          23
                                                      )}...`
                                                    : item?.company_details
                                                          ?.company_name}
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
                                    {item?.promote_job ? (
                                        <p
                                            style={{
                                                color: item?.promote_job
                                                    ? '#3B96E1'
                                                    : 'white',
                                                fontSize: '0.8rem',
                                                marginBottom: '-5px',
                                                marginTop: '-18px'
                                            }}
                                        >
                                            Promoted
                                        </p>
                                    ) : null}
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
                                                        {item?.experience}
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
                                                        item?.location.length >
                                                            10
                                                            ? `${item.location.substring(
                                                                  0,
                                                                  12
                                                              )}...`
                                                            : item?.location}
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
                                                        {item?.education &&
                                                        item?.education.length >
                                                            10
                                                            ? `${item.education.substring(
                                                                  0,
                                                                  12
                                                              )}...`
                                                            : item?.education}
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
                                                        onClick={() => {
                                                            setShowConfirmations(
                                                                true
                                                            ),
                                                                SetSaveId(
                                                                    item?._id
                                                                );
                                                        }}
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
                                                        onClick={() => {
                                                            SetApplyId(
                                                                item?._id
                                                            );
                                                            setShowConfirmation(
                                                                true
                                                            );
                                                        }}
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
                <Row
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingRight: '20px'
                    }}
                >
                    <Col
                        xs={4}
                        md={8}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}
                    >
                        {/* Pagination controls */}
                        <span
                            style={{
                                fontSize: '0.8rem',
                                marginRight: '20px',
                                fontWeight: '600'
                            }}
                        >
                            Result per page
                        </span>
                        <Col xs={8} md={2}>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={handleSelect}
                                value={selectValue}
                                style={{
                                    fontSize: '0.7rem',
                                    background: '#3B96E1',
                                    color: 'white',
                                    fontWeight: '600',
                                    width: '60px',
                                    height: '36px',
                                    backgroundImage: `url(${arrowdown})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.5rem center',
                                    appearance: 'none',
                                    backgroundSize: '20px',
                                    padding: '10px 10px'
                                }}
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                            </select>
                        </Col>
                        <Col
                            xs={12}
                            md={2}
                            className="d-none d-md-block"
                            style={{
                                fontSize: '0.8rem',
                                fontWeight: '600'
                            }}
                        >
                            {currentPage}-{itemsPerPage} out of {totalPage}
                        </Col>
                        <Col
                            xs={4}
                            md={2}
                            style={{
                                marginTop: '20px',
                                marginRight: '-160px'
                            }}
                        >
                            <Pagination className="custom-pagination">
                                <Pagination.First
                                    onClick={() => handlePageChange(1)}
                                    disabled={currentPage === 1}
                                />
                                <Pagination.Prev
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                />
                                <Pagination.Item active>
                                    <p
                                        style={{
                                            fontSize: '0.8rem',
                                            marginBottom: '0px',
                                            marginTop: '4px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {currentPage}
                                    </p>
                                </Pagination.Item>
                                <Pagination.Next
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={currentPage == totalPage}
                                />
                                <Pagination.Last
                                    onClick={() => handlePageChange(totalPage)}
                                    disabled={currentPage == totalPage}
                                />
                            </Pagination>
                        </Col>
                    </Col>
                </Row>
            </div>
            {showModal && (
                <ProfileCompletionModal
                    onClose={() => setShowModal(false)} // Close modal handler
                    setShowModal={setShowModal}
                />
            )}
            <Modal
                show={modalVisible}
                onHide={() => setModalVisible(false)}
                centered
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className="p-4"
                    style={{
                        overflow: 'hidden'
                    }}
                >
                    <Row>
                        <Col>
                            <div className="search-job-top">
                                <Image
                                    // src={
                                    //     JobData?.company_details?.profile
                                    //         ? bindUrlOrPath(
                                    //               JobData?.company_details
                                    //                   ?.profile
                                    //           )
                                    //         : altprofile
                                    // }
                                    src={bindUrlOrPath(
                                        JobData?.company_id?.profile
                                    )}
                                    roundedCircle
                                    alt="Profile"
                                    width="40"
                                    height="40"
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
                                    {/* <img
                                        src={oui_cross}
                                        alt=""
                                        height="20px"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setModalVisible(false)} */}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {JobData?.promote_job ? (
                            <p
                                style={{
                                    color: JobData?.promote_job
                                        ? '#3B96E1'
                                        : 'white',
                                    fontSize: '0.8rem',
                                    marginBottom: '-5px',
                                    marginTop: '-18px'
                                }}
                            >
                                Promoted
                            </p>
                        ) : null}
                    </Row>
                    <Row>
                        <Col md={8}>
                            <div className="veiw-skills ">
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
                                            {JobData?.salary}LPA
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
                                            {
                                                JobData?.applied_candidates
                                                    ?.length
                                            }{' '}
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
                        </Col>
                    </Row>

                    <div
                        className="Description"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            width: '180px',
                            height: '40px',
                            cursor: 'pointer',
                            padding: '10px'
                        }}
                        onClick={() => setHideDesc(prev => !prev)}
                    >
                        <h3 className="mt-2">Job Description</h3>
                        <span>
                            <img src={iconamoon_arrowd} height={20} alt="" />
                        </span>
                    </div>

                    {hideDesc ? (
                        <div className="job-description-view mt-2">
                            <div
                                className="job-discription"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizedDescription
                                }}
                            />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </Modal>
        </>
    );
};

export default SearchJob;
