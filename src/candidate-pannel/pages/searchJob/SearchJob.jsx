import React from 'react';
import { Button, Col, Row, Image } from 'react-bootstrap';
import './searchjob.css';
import SearchIcon from '../../../assets/images/SearchIcon.png';
import avatar from '../../../assets/images/avatar.png';
import Verified from '../../../assets/images/Verified.png';
import { useNavigate } from 'react-router-dom';
const SearchJob = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/candidate-dashboard/view-job-details');
    };
    return (
        <>
            <div className="searchJob">
                <Row>
                    <Col
                        style={{
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: ' 0px 0px 1px #3B96E1'
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search Jobs (Search by Job profile, Company, Experience, Location, Skills, Qualification)"
                        />
                        <img src={SearchIcon} alt="" width="20px" />
                    </Col>
                </Row>
                <Row className="mt-2">
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
                <Row className="mt-2">
                    <div className="search-job-card-div">
                        <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
                            <div
                                className="card-job search"
                                onClick={() => handleNavigate()}
                            >
                                <div className="search-job-top">
                                    <Image
                                        src={avatar}
                                        roundedCircle
                                        alt="Profile"
                                        width="40" // Set the desired width
                                        height="40" // Set the desired height
                                    />
                                    <h6>
                                        UI UX Designer{' '}
                                        <p
                                            style={{
                                                color: '#3B96E1',

                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            Amazon
                                        </p>
                                    </h6>
                                    <div className="green-thik">
                                        <img
                                            src={Verified}
                                            alt=""
                                            height="20px"
                                        />
                                    </div>
                                </div>

                                <div>
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
                                                    Years
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
                                                <span className="card-table-span"></span>
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
                                                    LPA
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
                                                <span className="card-table-span"></span>
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
                                                    days ago
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
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </div>
                </Row>
            </div>
        </>
    );
};

export default SearchJob;
