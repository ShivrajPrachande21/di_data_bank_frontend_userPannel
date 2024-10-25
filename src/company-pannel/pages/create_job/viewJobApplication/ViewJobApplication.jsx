import React, { useContext, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import './viewAppliction.css';
import { Button, Col, Row } from 'react-bootstrap';
import arrow_back from '../../../../assets/images/arrow_back.png';
import Chevrondown from '../../../../assets/images/Chevrondown.png';
import alternet from '../../../../assets/images/alternet.jpg';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { CreateJobContext } from '../../../../context/CreateJobContext';
const ViewJobApplication = () => {
    const navigate = useNavigate();
    const { viewJobDesciptionData } = useContext(CreateJobContext);

    const [toogle, settoggle] = useState(null);
    const [description, SetDescription] = useState('');

    const sanitizedDescription = DOMPurify.sanitize(description);
    const formatDate = dateString => {
        const options = { day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
    };

    const location = useLocation();

    const handleNavigate = data => {
        if (data === 'applications') {
            navigate('applications');
        } else if (data === 'longlist') {
            navigate('longlist');
        } else if (data === 'job-offred') {
            navigate('job-offred');
        } else if (data === 'hired') {
            navigate('hired');
        } else {
            navigate('shortlisted');
        }
    };

    // Function to determine button style based on the path
    const getButtonStyle = path => {
        if (location.pathname.includes(path)) {
            return {
                background: '#3B96E1',
                color: 'white',
                border: '1px solid #3B96E1'
            };
        } else {
            return {
                background: 'white',
                color: '#AEAEAE',
                border: 'none'
            };
        }
    };
    useEffect(() => {
        SetDescription(viewJobDesciptionData?.description);
    }, []);
    return (
        <>
            <div className="view-application">
                <Row>
                    {' '}
                    <div className="header-view">
                        <Row>
                            <div>
                                <div className="top-head">
                                    <p
                                        onClick={() =>
                                            navigate('/main/create-job')
                                        }
                                    >
                                        <img
                                            src={arrow_back}
                                            alt=""
                                            width="20px"
                                        />
                                    </p>
                                    <div className="cmp-img">
                                        <img
                                            src={
                                                viewJobDesciptionData?.profileUrl ||
                                                alternet
                                            }
                                            alt=""
                                            style={{
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        />{' '}
                                    </div>
                                    <div className="view-top-content">
                                        <h3>
                                            {viewJobDesciptionData?.job_title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="view-list mt-2">
                                {viewJobDesciptionData?.skills?.map(
                                    (item, index) => (
                                        <ul key={index}>
                                            <li>{item}</li>
                                        </ul>
                                    )
                                )}
                            </div>
                        </Row>
                        <Row>
                            <div className="view-tables">
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
                                                {
                                                    viewJobDesciptionData?.experience
                                                }{' '}
                                                Years
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ paddingRight: '30px' }}>
                                            <span className="card-table-span">
                                                Loction:
                                            </span>{' '}
                                        </td>
                                        <td>
                                            {' '}
                                            <span className="card-table-span">
                                                {
                                                    viewJobDesciptionData?.location
                                                }
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                                <table>
                                    <tr>
                                        <td style={{ paddingRight: '30px' }}>
                                            <span className="card-table-span">
                                                Salary:
                                            </span>{' '}
                                        </td>
                                        <td>
                                            {' '}
                                            <span className="card-table-span">
                                                {
                                                    viewJobDesciptionData?.experience
                                                }
                                                {viewJobDesciptionData?.salary}{' '}
                                                LPA
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
                                                {
                                                    viewJobDesciptionData?.education
                                                }
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                                <table>
                                    <tr>
                                        <td style={{ paddingRight: '30px' }}>
                                            <span className="card-table-span">
                                                Posted:
                                            </span>{' '}
                                        </td>
                                        <td>
                                            {' '}
                                            <span className="card-table-span">
                                                {
                                                    viewJobDesciptionData?.createdDate
                                                }{' '}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ paddingRight: '30px' }}>
                                            <span className="card-table-span">
                                                Openings:
                                            </span>{' '}
                                        </td>
                                        <td>
                                            {' '}
                                            <span className="card-table-span">
                                                {
                                                    viewJobDesciptionData?.No_openings
                                                }
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </Row>
                        <Row>
                            <div className="view-dropdown">
                                <h3>Job Description</h3>
                                <img
                                    src={Chevrondown}
                                    alt=""
                                    height="20px"
                                    onClick={() => settoggle(prev => !prev)}
                                />
                            </div>
                            {/* Description section */}
                            {toogle && (
                                <div
                                    className="job-discription"
                                    dangerouslySetInnerHTML={{
                                        __html: sanitizedDescription
                                    }}
                                />
                            )}
                        </Row>
                    </div>
                </Row>
                <Row className="mt-2">
                    <div className="view-btn">
                        <ul>
                            <li>
                                <Button
                                    size="sm"
                                    style={getButtonStyle('applications')}
                                    onClick={() =>
                                        handleNavigate('applications')
                                    }
                                >
                                    Applications
                                </Button>
                            </li>
                            <li>
                                <Button
                                    size="sm"
                                    style={getButtonStyle('longlist')}
                                    onClick={() =>
                                        handleNavigate('longlist')
                                    }
                                >
                                    Longlist
                                </Button>
                            </li>
                            <li>
                                {' '}
                                <Button
                                    size="sm"
                                    style={getButtonStyle('shortlisted')}
                                    onClick={() =>
                                        handleNavigate('shortlisted')
                                    }
                                >
                                    shortlisted
                                </Button>
                            </li>
                            <li>
                                {' '}
                                <Button
                                    size="sm"
                                    // onClick={() => navigate('job-offred')}
                                    style={getButtonStyle('job-offred')}
                                    onClick={() => handleNavigate('job-offred')}
                                >
                                    Job Offered
                                </Button>
                            </li>
                            <li>
                                {' '}
                                <Button
                                    size="sm"
                                    style={getButtonStyle('hired')}
                                    onClick={() => handleNavigate('hired')}
                                >
                                    Hired
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <Outlet />
                </Row>
            </div>
        </>
    );
};

export default ViewJobApplication;
