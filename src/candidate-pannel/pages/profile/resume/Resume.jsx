import React, { useContext, useEffect, useState } from 'react';
import './resume.css';
import html2pdf from 'html2pdf.js';
import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AiSearch from '../../../../assets/images/AiSearch.png';
import { CandidateProfileContext } from '../../../../context/candidateContext/CandidateProfileContext';
const Resume = () => {
    const { CandidateProfile } = useContext(CandidateProfileContext);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);

    // Generate Resume from Backend
    const GenerateResume = async () => {
        const custom_id = CandidateProfile?.data?.custom_id;
        try {
            setLoading(true);
            const response = await axios.post(
                'http://65.20.91.47:5000/pythonapi/generate_resume',
                {
                    custom_id: 828
                }
            );
            setResume(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error generating resume:', error);
            setLoading(false);
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
            {/* <Row>
                <Col md={2}></Col>
                <Col md={8}>
                    <InputGroup style={{ width: '100%' }}>
                        <Form.Control
                            as="textarea"
                            name="description"
                            required
                            rows={1}
                            // value={formData.description}
                            // onChange={handleChange}
                            placeholder="Enter description or Prompt"
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
                        >
                            <img src={AiSearch} alt="" width="30px" />
                        </Button>
                    </InputGroup>
                </Col>
                <Col md={2}></Col>
            </Row> */}
            <div className="download-candidate-resume mt-2">
                <Button size="sm" onClick={GenerateResume}>
                    {loading ? (
                        <Button size="sm">
                            <Spinner size="sm" />{' '}
                        </Button>
                    ) : (
                        'Regenerate'
                    )}
                </Button>
                <Button size="sm" onClick={downloadResume}>
                    Download
                </Button>
                <Button size="sm">Apply</Button>
            </div>
        </div>
    );
};

export default Resume;
