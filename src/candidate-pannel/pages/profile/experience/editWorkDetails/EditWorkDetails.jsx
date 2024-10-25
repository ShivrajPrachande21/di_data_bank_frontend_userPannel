import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import BaseUrl from '../../../../../services/BaseUrl';
import { replace, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CandidateProfileContext } from '../../../../../context/candidateContext/CandidateProfileContext';

const EditWorkDetails = () => {
    const { handleShowWork, fetchCandidateProfile } = useContext(
        CandidateProfileContext
    );
    const [resumeFile, setResumeFile] = useState(null);
    const resumeRef = useRef();
    const locate = useLocation();
    const [workDetails, setWorkDetails] = useState({
        industry: '',
        current_ctc: '',
        aspiring_position: '',
        work_experience: '',
        career_highlight: '',
        recognation: '',
        functions: '',
        preferred_location: '',
        current_location: "'",
        country: '',
        skill: ''
    });
    console.log('checking ', workDetails);
    const handleFileChange = e => {
        setResumeFile(e.target.files[0]); // Capture the uploaded file
    };

    const handle_Upload_resume = () => {
        resumeRef.current.click();
    };

    const handleInputChange = e => {
        const { name, value } = e.target;

        setWorkDetails({
            ...workDetails,
            [name]: value
        });
    };
    const get_work_details = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken?._id;
            try {
                let response = await axios.get(
                    `${BaseUrl}candidate/profile/get_work/${user_id}`
                );

                const workdetails = response?.data;

                setWorkDetails({
                    industry: workdetails?.industry || '',
                    current_ctc: workdetails?.current_ctc || '',
                    aspiring_position: workdetails?.aspiring_position || '',
                    work_experience: workdetails?.work_experience || '',
                    career_highlight: workdetails?.career_highlight || '',
                    recognation: workdetails?.recognation || '',
                    functions: workdetails?.functions || '',
                    preferred_location: workdetails?.preferred_location || '',
                    current_location: workdetails?.current_location || '',
                    country: workdetails?.country || '',
                    skill: workdetails?.skill || ''
                });
            } catch (error) {}
        }
    };
    const handle_Edit_submit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', resumeFile);
        formData.append('industry', workDetails?.industry);
        formData.append('current_ctc', Number(workDetails?.current_ctc));
        formData.append('aspiring_position', workDetails?.aspiring_position);
        formData.append('work_experience', workDetails?.work_experience);
        formData.append('career_highlight', workDetails?.career_highlight);
        formData.append('recognation', workDetails?.recognation);
        formData.append('functions', workDetails?.functions);
        formData.append('preferred_location', workDetails?.preferred_location);
        formData.append('current_location', workDetails?.current_location);
        formData.append('country', workDetails?.country);
        formData.append('skill', workDetails?.skill);

        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken?._id;
            try {
                const response = await axios.put(
                    `${BaseUrl}candidate/profile/edit_work/${user_id}`,
                    formData
                );
                if (response?.status == 200 || response?.status == 201) {
                    toast.success('Work Detials Updated SUccesfully');
                    handleShowWork();
                    await fetchCandidateProfile();
                }
            } catch (error) {
                toast.error('failed to edit');
            }
        }
    };

    useEffect(() => {
        const fun = async () => {
            await get_work_details();
        };
        fun();
    }, [locate]);
    return (
        <>
            <div>
                <p
                    style={{
                        textAlign: 'center',
                        color: '#051F50',
                        fontWeight: '600'
                    }}
                >
                    EditWorkDetails
                </p>
                <Form noValidate onSubmit={e => handle_Edit_submit(e)}>
                    <Form.Group controlId="email" style={{ marginTop: '-8px' }}>
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Total Experience
                        </Form.Label>
                        <Row style={{ marginTop: '-6px' }}>
                            <Col
                                xs={12}
                                style={{
                                    border: 'none',

                                    marginLeft: '10px',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Form.Control
                                    type="number"
                                    name="work_experience"
                                    value={workDetails?.work_experience}
                                    onChange={e => handleInputChange(e)}
                                    placeholder="Enter total experience"
                                    style={{
                                        outline: 'none',
                                        height: '35px',
                                        border: '1px solid gray',
                                        marginLeft: '-12px',

                                        fontSize: '0.8rem'
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="email" style={{ marginTop: '6px' }}>
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Current CTC
                        </Form.Label>
                        <Row style={{ marginTop: '-6px' }}>
                            <Col
                                xs={12}
                                style={{
                                    border: 'none',

                                    marginLeft: '12px',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Form.Control
                                    type="number"
                                    name="current_ctc"
                                    value={workDetails?.current_ctc}
                                    onChange={e => handleInputChange(e)}
                                    placeholder="Enter Current CTC"
                                    style={{
                                        outline: 'none',
                                        height: '35px',
                                        border: '1px solid gray',
                                        marginLeft: '-12px',

                                        fontSize: '0.8rem'
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group controlId="mobile" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Aspiring Position/Role
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="aspiring_position"
                            value={workDetails?.aspiring_position}
                            onChange={e => handleInputChange(e)}
                            placeholder="Enter Aspiring Position/Role"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.4px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="mobile" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Skills
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="skill"
                            value={workDetails?.skill}
                            onChange={e => handleInputChange(e)}
                            placeholder="Ex: Leadership, Time Management,etc"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.4px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="mobile" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Resume
                        </Form.Label>
                        <Form.Control
                            type="file"
                            ref={resumeRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <div
                            className="d-flex align-item-center justify-content-center"
                            style={{
                                border: '1.4px dashed #AEAEAE',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                            onClick={handle_Upload_resume}
                        >
                            <p
                                style={{
                                    marginTop: '6px',
                                    fontSize: '0.8rem',
                                    marginBottom: '6px',
                                    textDecoration: 'underline',
                                    color: '#3B96E1'
                                }}
                            >
                                Browse from files
                            </p>
                        </div>
                    </Form.Group>

                    <Form.Group controlId="family_member" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Career highlight details
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            name="career_highlight"
                            value={workDetails?.career_highlight}
                            onChange={e => handleInputChange(e)}
                            placeholder="Enter Career highlight "
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',

                                border: '1.4px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="father_name" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Awards & Recognition
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            name="recognation"
                            value={workDetails?.recognation}
                            onChange={e => handleInputChange(e)}
                            placeholder="Enter Awards & Recognition "
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',

                                border: '1.4px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>

                    <div className="text-end">
                        <Button
                            style={{
                                background: '#3B96E1',
                                padding: '4px 50px',
                                borderRadius: '4px'
                            }}
                            type="submit"
                            className="mt-3"
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default EditWorkDetails;
