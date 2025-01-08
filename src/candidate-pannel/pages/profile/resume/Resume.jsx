import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './resume.css';
import html2pdf, { f } from 'html2pdf.js';
import {
    Button,
    Col,
    Form,
    InputGroup,
    Modal,
    Row,
    Spinner
} from 'react-bootstrap';
import axios from 'axios';
import AiSearch from '../../../../assets/images/AiSearch.png';
import { CandidateProfileContext } from '../../../../context/candidateContext/CandidateProfileContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BaseUrl from '../../../../services/BaseUrl';
const Resume = () => {
    const { CandidateProfile } = useContext(CandidateProfileContext);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [smShow, setSmShow] = useState(false);
    const [hideInput, setHideInput] = useState(false);
    const [description, setDescription] = useState('');
    const [resumeCount, setResumeCoun] = useState(0);
    const [applyLoading, setApplyLoading] = useState(false);
    const navigate = useNavigate();
    // Generate Resume from Backend
    const GenerateResume = async () => {
        const custom_id = CandidateProfile?.data?.custom_id;
        try {
            setLoading(true);
            const response = await axios.post(
                'http://65.20.91.47:5000/pythonapi/generate_resume',
                {
                    custom_id: custom_id
                }
            );
            if (response.status == 200 || response?.status == 201) {
                setResume(response.data);
                setHideInput(true);
                setLoading(false);
                await decreaseCount();
            }
        } catch (error) {
            console.error('Error generating resume:', error);
            setLoading(false);
            setHideInput(false);
        }
    };

    const decreaseCount = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.put(
                    `${BaseUrl}candidate/resume_generate/count/${userId}`
                );
            } catch (error) {}
        }
    };
    const generateUsingPrompt = async () => {
        const custom_id = CandidateProfile?.data?.custom_id;
        if (description.trim() == '') {
            toast.error(
                'Please add text to generate or regenerate the resume.'
            );
        } else {
            try {
                setLoading(true);
                const response = await axios.post(
                    'http://65.20.91.47:5000/pythonapi/generate_resume',
                    {
                        custom_id: custom_id,
                        discriptions_data: description
                    }
                );
                if (response.status == 200 || response?.status == 201) {
                    setResume(response.data);
                    setHideInput(true);
                    setLoading(false);
                    await decreaseCount();
                }
            } catch (error) {
                console.error('Error generating resume:', error);
                setLoading(false);
                setHideInput(false);
            }
        }
    };
    // Download Resume

    const downloadResume = () => {
        if (!resume) {
            alert('No resume content available to download!');
            return;
        }

        // Configure html2pdf options
        const options = {
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Select the HTML element to convert
        const resumeElement = document.querySelector('.resume-view-section');

        // Generate and download the PDF
        html2pdf().set(options).from(resumeElement).save();
    };

    const getCount = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/resume_generate/sub_count/${userId}`
                );

                if (response?.status == 200 || response?.status == 201) {
                    setResumeCoun(response?.data?.resum_count);
                }
            } catch (error) {
                console.log('error', error);
            }
        }
    };

    const storeResume = async () => {
        setApplyLoading(true);
        const token = localStorage.getItem('Candidate_token');
        const base64Content = btoa(resume);
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            try {
                const response = await axios.put(
                    `${BaseUrl}candidate/stor/resume/${userId}`,
                    {
                        resume: base64Content
                    }
                );

                if (response?.status == 200 || response?.status == 201) {
                    setApplyLoading(false);
                }
            } catch (error) {
                toast.error('Failed to apply Job');
                setApplyLoading(false);
            }
        }
    };

    const NavigateToSavedJobs = async () => {
        let name = 'profile';
        await storeResume();
        navigate(`/candidate-dashboard/applied-job/saved-jobs/${name}`);
    };

    useEffect(() => {
        const fun = async () => {
            await getCount();
        };
        fun();
    }, []);
    return (
        <div className="resume">
            <div className="resume-view-section">
                {resume === null || loading ? (
                    loading ? (
                        <div className="spinnerdiv">
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                style={{ marginRight: '20px' }}
                            />
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                style={{ marginRight: '20px' }}
                            />
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        </div>
                    ) : (
                        <div className="resume-template">
                            <h4>Resume</h4>
                        </div>
                    )
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: resume }} />
                )}
            </div>
            {hideInput ? (
                <Row className="mt-2">
                    <Col md={2}></Col>
                    <Col md={8}>
                        <InputGroup style={{ width: '100%' }}>
                            <Form.Control
                                as="textarea"
                                name="description"
                                required
                                rows={1}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="If you want  add some data Enter description or Prompt"
                                style={{
                                    border: '1px solid #B4DDFF',
                                    background: '#F5F5F5',
                                    resize: 'vertical', // Allow the user to resize if needed
                                    fontSize: '0.9rem' // Optional for placeholder text size
                                }}
                            />
                            <Button
                                size="sm"
                                style={{
                                    background: 'none',
                                    border: '1px solid #B4DDFF'
                                }}
                                onClick={generateUsingPrompt}
                            >
                                <img src={AiSearch} alt="" width="30px" />
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            ) : (
                ''
            )}

            <div className="download-candidate-resume mt-2">
                {loading ? (
                    <Button size="sm" style={{ width: '10%' }}>
                        <Spinner size="sm" />{' '}
                    </Button>
                ) : (
                    <Button
                        disabled={resumeCount == 0 || hideInput}
                        size="sm"
                        onClick={GenerateResume}
                    >
                        Generate
                    </Button>
                )}

                {/* <Button size="sm" onClick={downloadResume}>
                    Download
                </Button> */}
                <Button
                    size="sm"
                    className="btn-sm w-25 px-2"
                    disabled={!hideInput}
                    onClick={() => setSmShow(true)}
                >
                    Apply
                </Button>
            </div>

            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="example-modal-sizes-title-sm"
                        style={{ fontSize: '1rem' }}
                    >
                        Would you like to apply for saved job
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        size="sm"
                        onClick={() => setSmShow(false)}
                        style={{ width: '50%' }}
                    >
                        No
                    </Button>
                    {applyLoading ? (
                        <Button
                            size="sm"
                            onClick={NavigateToSavedJobs}
                            style={{ width: '50%' }}
                        >
                            <Spinner size="sm" />{' '}
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            onClick={NavigateToSavedJobs}
                            style={{ width: '50%' }}
                        >
                            Yes
                        </Button>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Resume;
