import React, { useContext, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Col, Row, Image } from 'react-bootstrap';
import './searchjob.css';
import SearchIcon from '../../../assets/images/SearchIcon.png';
import avatar from '../../../assets/images/avatar.png';
import Verified from '../../../assets/images/Verified.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchJobContext } from '../../../context/candidateContext/SearchJobContext';
import BaseUrl from '../../../services/BaseUrl';
import axios from 'axios';
const SearchJob = () => {
    const locate = useLocation();
    const {
        data,
        fetch_search_job,
        applyTo_job,
        save_job,
        hasMore,
        loadMoreJobs
    } = useContext(SearchJobContext);
    // console.log('data', data);

    const navigate = useNavigate();
    const handleNavigate = id => {
        navigate(`/candidate-dashboard/view-job-details/${id}`);
    };
    //
    const formatDate = dateString => {
        const options = { day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
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
        applyTo_job(id);
    };

    // function to Save Jobs
    const SavedJobs = id => {
        save_job(id);
    };

    useEffect(() => {
        fetch_search_job();
    }, [locate]);
    return (
        <>
            <div className="searchJob">
                <Col
                    xs={9}
                    style={{
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: ' 0px 0px 1px #3B96E1',
                        position: 'fixed',
                        width: '78%',
                        zIndex: '10'
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search Jobs (Search by Job profile, Company, Experience, Location, Skills, Qualification)"
                    />
                    <img
                        src={SearchIcon}
                        alt=""
                        width="20px"
                        style={{ cursor: 'pointer' }}
                    />
                </Col>

                <Row>
                    <Col className="d-flex">
                        <div class="search-select">
                            <select>
                                <option value="">Location</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                        </div>
                        <div class="search-select">
                            <select>
                                <option value="">Experience</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                        </div>
                        <div class="search-select">
                            <select>
                                <option value="">Industry</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                        </div>

                        <div class="search-select">
                            <select>
                                <option value="">Salary</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                        </div>
                        <div class="search-select">
                            <select>
                                <option value="">Job type</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                        </div>
                        <div class="search-select">
                            <select>
                                <option value="">Date posted</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                        </div>
                    </Col>
                </Row>
                <p className="searchresult">Search Result:{data?.length}</p>
                <Row>
                    <div className="search-job-card-div">
                        {data?.map((item, index) => (
                            <div className="card-job search">
                                <div
                                    className="search-job-top"
                                    onClick={() => handleNavigate(item?._id)}
                                >
                                    <Image
                                        src={bindUrlOrPath(
                                            item?.company_details?.profile
                                        )}
                                        roundedCircle
                                        alt="Profile"
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
                                        {item?.company_details?.verified_batch
                                            .length > 0 ? (
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
                                                    Poasted:
                                                </span>{' '}
                                            </td>
                                            <td>
                                                {' '}
                                                <span className="card-table-span">
                                                    {formatDate(
                                                        item?.createdDate
                                                    )}{' '}
                                                    days ago
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
                                                background: 'white',
                                                color: '#3B96E1',
                                                border: '1px solid #3B96E1'
                                            }}
                                            onClick={() => SavedJobs(item?._id)}
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
                                            onClick={() =>
                                                ApplyTOJob(item?._id)
                                            }
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Row>
            </div>
        </>
    );
};

export default SearchJob;
