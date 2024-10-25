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
import './viewJobdescription.css';
import Applications from './../../../../company-pannel/pages/create_job/viewJobApplication/applications/Applications';
import BaseUrl from '../../../../services/BaseUrl';
import axios from 'axios';
import { SearchJobContext } from '../../../../context/candidateContext/SearchJobContext';
const ViewJobDescription = () => {
    const { applyTo_job, save_job } = useContext(SearchJobContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [modalShow, setModalShow] = React.useState(true);
    const [JobData, setJobdata] = useState();
    const [description, SetDescription] = useState('');
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
        const options = { day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
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

    const handleApplyJob = async id => {
        await applyTo_job(id);
        navigate('/candidate-dashboard/search-job');
    };

    // Save Jobs
    const handle_Save_jobs = async id => {
        await save_job(id);
    };
    useEffect(() => {
        SetDescription(JobData?.description);
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

    useEffect(() => {
        getSingleJobDetails();
    }, [id]);
    return (
        <>
            <p onClick={() => navigate('/candidate-dashboard/search-job')}>
                back
            </p>

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
                                        Loction:
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
                                        {formatDate(JobData?.createdDate)} days
                                        ago
                                    </span>
                                </td>
                            </tr>
                        </table>
                        <div
                            className="search-job-bnt mt-2"
                            // onClick={handleNavigate}
                        >
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
                                    onClick={() => handle_Save_jobs(id)}
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
                                    onClick={() => handleApplyJob(id)}
                                >
                                    Apply
                                </Button>
                            </OverlayTrigger>
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
        </>
    );
};

export default ViewJobDescription;
