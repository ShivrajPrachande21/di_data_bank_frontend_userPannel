import React, { useContext, useEffect, useRef, useState } from 'react';
import './joboffered.css';
import arrow_back from '../../../../../assets/images/arrow_back.png';
import avatar from '../../../../../assets/images/avatar.png';
import alternet from '../../../../../assets/images/alternet.jpg';
import Calendar from '../../../../../assets/images/Calendar.png';
import { CreateJobContext } from '../../../../../context/CreateJobContext';
import { Button, Col, Form, Row,Modal } from 'react-bootstrap';
import { toast, useToast } from 'react-toastify';
import axios from 'axios';
import BaseUrl from '../../../../../services/BaseUrl';
import { useLocation, useNavigate } from 'react-router-dom';
const JobOffered = () => {
    const locate=useLocation()
    const navigate = useNavigate();
    const { job_offered, get_job_offered } = useContext(CreateJobContext);
    const [job_offerede, setjob_offered] = useState(job_offered);
    const [date,SetDate]=useState(null)
    const fileref = useRef();
    const [file, setFilename] = useState(null);
    const handle_submit = e => {
        e.preventDefault();
        alert('jhajag');
    };
    const handle_file_upload = () => {
        fileref.current.click();
    };
    const handle_file_change = e => {
        const fileData = e.target.files[0];
        setFilename(fileData);
    };

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

    const upload_offered_letter = async () => {
        const jobid = localStorage.getItem('job_id');
        const user_id = localStorage.getItem('getJobofferId');
        if(!file){
            toast.error("Please upload offer letter")
            return
        }
        if(!date){
            toast.error("Please select offer validity")
            return
        }
        const dateValue = new Date(date);  
const isoDate = dateValue.toISOString();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('date',isoDate)
        try {
            const response = await axios.put(
                `${BaseUrl}company/job_offer/${jobid}/${user_id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            if (response.status == 200 || 201) {
                toast.success('Offer letter uploaded successfully');
                navigate('/main/view-job-application/shortlisted');
            }
        } catch (error) {
            toast.error('file uplaod error');
        }
    };
    const handle_send_offerLetter = () => {
        upload_offered_letter();
    };

    const [modalShow, setModalShow] = useState(null);
    const [currentResume, setCurrentResume] = useState('');
    const getEmbedLink = link => {
        const fileId = link.split('/d/')[1].split('/')[0]; // Extract file ID
        return `https://drive.google.com/file/d/${fileId}/preview`; // Create preview link
    };

    const showModal = user_id => {
        setModalShow(prev => !prev);
    };
    const hanlde_resume_view = resume => {
        setCurrentResume(resume);
        showModal();
    };

    useEffect(() => {
        get_job_offered();
    }, [locate]);

    const isGoogleDriveLink = url => {
        return url && url.includes('drive.google.com');
    };
    return (
        <>
            <Modal
                show={modalShow}
                onHide={showModal}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                className="custommodule"
            >
                <div
                    style={{
                        height: '60vh',
                        width: '100%',
                        margin: '0px auto',
                        overflow: 'hidden'
                    }}
                >
                    <div>
                        <div>
                            {currentResume ? (
                                <iframe
                                    src={
                                        currentResume
                                            ? isGoogleDriveLink(currentResume)
                                                ? getEmbedLink(currentResume)
                                                : currentResume
                                            : null
                                    } // Ensure the src is set
                                    frameBorder="0"
                                    style={{
                                        width: '89%',
                                        height: '80vh',
                                        zoom: '1',
                                        margin: '0px 20px' // Prevent zoom feature
                                        // pointerEvents: 'none' // Disable interactions if needed
                                    }}
                                    title="Resume"
                                ></iframe>
                            ) : (
                                <p>No resume available</p>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="job-offered mt-2">
                <p className="hiredon">
                    Hired on {formatDate(job_offered?.createdDate)}
                </p>
                <div className="header-view" style={{ marginTop: '-10px' }}>
                    <Row>
                        <div>
                            <div
                                className="top-head"
                                style={{
                                    marginLeft: '-20px',
                                    marginBottom: '-10px'
                                }}
                            >
                                <div className="cmp-img">
                                    <img
                                    style={{width:"100%",height:"100%"}}
                                        src={
                                            job_offered?.profileUrl || alternet
                                        }
                                        alt=""
                                    />{' '}
                                </div>
                                <div className="view-top-content mx-2">
                                    <h3>
                                        {job_offered?.basicdetails[0]?.name}
                                    </h3>
                                    <p>{job_offered?.job_title}</p>
                                </div>
                            </div>
                        </div>
                    </Row>

                    <Row>
                        <div
                            className="job-job_offered-table"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
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
                                            {job_offered?.experience} Years
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingRight: '30px' }}>
                                        <span className="card-table-span">
                                            Current Company:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {' '}
                                            {job_offered?.location}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <td style={{ paddingRight: '30px' }}>
                                        <span className="card-table-span">
                                            Skills:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        {job_offered?.workdetails?.skill?.map(
                                            (items, index) => (
                                                <>
                                                    <span className="card-table-span">
                                                        {items}{' '}
                                                    </span>
                                                </>
                                            )
                                        )}
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
                                            {' '}
                                            {job_offered?.education}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <td style={{ paddingRight: '30px' }}>
                                        <span className="card-table-span">
                                            Email:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span className="card-table-span">
                                            {
                                                job_offered?.basicdetails[0]
                                                    ?.email
                                            }
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingRight: '30px' }}>
                                        <span className="card-table-span">
                                            resume:
                                        </span>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        <span
                                            className="hired-table-span"
                                            onClick={() =>
                                                hanlde_resume_view(
                                                    job_offered?.resumeUrl 
                                                )
                                            }
                                        >
                                            view
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </Row>
                </div>
                <Row>
                    <div className="job-offered-file mt-2">
                        <label
                            htmlFor="btnupload"
                            style={{ fontSize: '0.7rem', fontWeight: '500' }}
                        >
                            Upload Offere letter
                        </label>
                        <br />
                        <button
                            id="btnupload"
                            className="upload-job-offer"
                            onClick={handle_file_upload}
                        >
                            <span>
                                {file ? file?.name : 'browser from file'}
                            </span>
                        </button>
                        <input
                            ref={fileref}
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handle_file_change}
                        />{' '}
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                        <Form.Group controlId="Start_date" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                        </Form.Label>
                        <Row style={{ marginLeft: '-2px' }}>
                            <Col lg={8} className="custom-option-exps">
                            <Form.Group controlId="formBasicDate" style={{ backgroundColor: "white", padding: "3px", borderRadius: "4px", display: "flex", alignItems: "center" }}>
  <input
    type="date"
    name="start_date"
    value={date}
    onChange={(e) => SetDate(e.target.value)}
    style={{
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "5px",
      flex: "1",
      outline: "none",
      color:'black'
    }}
  />
  <img
    src={Calendar}
    alt=""
    width="30px"
    //onClick={handleCalendarClick}
    className="calendar"
    style={{
      marginLeft: "5px",
      cursor: "pointer",
      backgroundColor: "white",
      padding: "5px",
      borderRadius: "50%",
    }}
  />
</Form.Group>

                            </Col>
                        </Row>
                    </Form.Group>  
 
</div> 


                        <br />
                        <button
                            className="offered-send mt-2"
                            disabled={!file}
                            onClick={handle_send_offerLetter}
                        >
                            <span>send Offer</span>
                        </button>
                    </div>
                </Row>
            </div>
        </>
    );
};

export default JobOffered;
