import React, { useEffect, useState } from 'react';
import './resume.css';
import html2pdf from 'html2pdf.js';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import resumeImg from '../../../../assets/images/resume.png';
const Resume = () => {
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);

    // Generate Resume from Backend
    const GenerateResume = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                'http://65.20.91.47:5000/pythonapi/generate_resume',
                {
                    custom_id: 1
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
                        <img
                            src={resumeImg}
                            alt="Resume Preview"
                            style={{ marginLeft: '330px', height: '80vh' }}
                        />
                    )
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: resume }} />
                )}
            </div>
            <div className="download-candidate-resume">
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
