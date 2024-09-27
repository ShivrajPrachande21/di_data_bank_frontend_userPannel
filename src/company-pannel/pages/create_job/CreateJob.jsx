import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import './create_job.css';
import whitepluse from '../../../assets/images/whiteplus.png';
import hamburger from '../../../assets/images/hamburger.png';
import { CreateJobContext } from '../../../context/CreateJobContext';
import CreateNewJob from './create_new_Job/CreateNewJob';
import { useNavigate } from 'react-router-dom';
const CreateJob = () => {
    const {
        job_status,
        delete_job_status,
        stop_restar_job,
        viewJobDesciptionData,
        viewJobDescription,
        lgShow,
        setLgShow
    } = useContext(CreateJobContext);
    console.log('ssss', job_status);

    const naviagte = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleClose = () => setLgShow(preve => !preve);

    const handleToggleDropdown = index => {
        setIsDropdownOpen(prevState => (prevState === index ? null : index)); // Toggle dropdown
    };

    // Function to update the window width
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const formatDate = dateString => {
        const options = { day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
    };

    const handleNavigate = async job_id => {
        localStorage.setItem('job_id', job_id);
        await viewJobDescription(job_id);
        naviagte('/main/view-job-application/application');
    };

    // Add event listener on component mount and clean up on unmount
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="create-job">
            <Row>
                <Col xs={windowWidth < 768 ? 12 : 3}>
                    <Button className="create-job-btn" onClick={handleClose}>
                        <img src={whitepluse} alt="" width="20px" />
                        Create a Job <span>(1/2 remaining)</span>
                    </Button>
                </Col>
                <Col xs={windowWidth < 768 ? 12 : 8} className="job-data">
                    <div className="job-created-data">
                        <p>{job_status?.dataWithJobCounts[0]?.jobCount}</p>
                        <p className="total-activ">Total Job Created</p>
                    </div>
                    <div className="job-created-data">
                        <p style={{ color: '#3B96E1' }}>
                            {job_status?.dataWithJobCounts[0]?.activeJobCount}
                        </p>
                        <p className="total-activ">Total Active Job</p>
                    </div>
                    <div
                        className="job-created-data "
                        style={{ marginLeft: '4px' }}
                    >
                        <p>
                            {
                                job_status?.dataWithJobCounts[0]
                                    ?.application_recieved
                            }
                        </p>
                        <p className="total-activ">
                            Total Applications Received
                        </p>
                    </div>
                    <div
                        className="job-created-data"
                        style={{ marginLeft: '4px' }}
                    >
                        <p style={{ color: '#FF6F00' }}>
                            {
                                job_status?.dataWithJobCounts[0]
                                    ?.candidate_pipeline
                            }
                        </p>
                        <p className="total-activ">
                            Total Candidates in Pipeline
                        </p>
                    </div>
                    <div
                        className="job-created-data"
                        style={{ border: 'none' }}
                    >
                        <p style={{ color: '#06C306' }}>
                            {job_status?.dataWithJobCounts[0]?.candidate_hired}
                        </p>
                        <p className="total-activ">Total Candidates Hired</p>
                    </div>
                </Col>
            </Row>
            {/* card Sections */}
            <Row className="mt-4">
                {job_status?.PostedJobList?.map((item, index) => (
                    <>
                        <Col
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={index}
                            className="mb-3"
                        >
                            <div className="card-job">
                                <div className="job-head">
                                    <p>Graphic Designer</p>

                                    <img
                                        src={hamburger}
                                        alt=""
                                        width="20px"
                                        onClick={e => {
                                            handleToggleDropdown(index);
                                            // Prevent navigation
                                        }}
                                    />
                                    {isDropdownOpen === index ? (
                                        <div className="dropdown">
                                            <p
                                                onClick={() =>
                                                    stop_restar_job(item?._id)
                                                }
                                            >
                                                {item?.status
                                                    ? 'restart'
                                                    : 'stop Applications'}
                                            </p>

                                            <p
                                                onClick={() =>
                                                    delete_job_status(item?._id)
                                                }
                                            >
                                                Delete job post
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                                <p
                                    style={{
                                        marginTop: '-18px',
                                        color: '#3B96E1',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    Amazon
                                </p>
                                <div>
                                    <table
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
                                                style={{ paddingRight: '30px' }}
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
                                                style={{ paddingRight: '30px' }}
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
                                                style={{ paddingRight: '30px' }}
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
                                                style={{ paddingRight: '30px' }}
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
                                                style={{ paddingRight: '30px' }}
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
                                    </table>
                                    <div
                                        className="div-bnt"
                                        onClick={handleNavigate}
                                    >
                                        <Button
                                            size="sm"
                                            style={{
                                                background: item?.status
                                                    ? '#FFD8CE'
                                                    : item?.No_openings === 0,
                                                color: item?.status
                                                    ? 'red'
                                                    : item?.No_openings === 0
                                                    ? '#B4FFCE'
                                                    : '',
                                                border: 'none'
                                            }}
                                        >
                                            {item?.applied_candidates.length}{' '}
                                            {item?.status
                                                ? 'Applications Stopped'
                                                : item?.No_openings === 0
                                                ? 'hired'
                                                : 'Applications'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </>
                ))}
            </Row>
            <Modal
                show={lgShow}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
                className="custom-modal" // Apply the custom class here
            >
                <CreateNewJob />
            </Modal>
        </div>
    );
};

export default CreateJob;
