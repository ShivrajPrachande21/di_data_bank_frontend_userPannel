import React, { useContext, useRef, useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import whiteplus from '../../../../../assets/images/whiteplus.png';
import { jwtDecode } from 'jwt-decode';
import BaseUrl from '../../../../../services/BaseUrl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CandidateProfileContext } from './../../../../../context/candidateContext/CandidateProfileContext';

const EditEducation = () => {
    const { handleShowEducation, fetchCandidateProfile } = useContext(
        CandidateProfileContext
    );
    const fileRef = useRef();
    const [educationData, setEducationData] = useState({
        highest_education: '',
        board_represent: '',
        articles: '',
        certificates: []
    });
    const [certificate, setCertificate] = useState([
        { certificateName: '', image: '' }
    ]);

    const addCertificateRow = () => {
        setCertificate([...certificate, { certificateName: '', image: '' }]);
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setEducationData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCertificateInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedCertificates = [...certificate];
        updatedCertificates[index][name] = value;
        setCertificate(updatedCertificates);
    };

    const handleFileChange = (index, event) => {
        // const file = event.target.files[0];
        // const updatedCertificates = [...certificate];
        // updatedCertificates[index].image = file;
        // setCertificate(updatedCertificates);

        const file = event.target.files[0];
        const updatedCertificates = [...certificate];
        updatedCertificates[index].image = file; // Update the image for this certificate
        setCertificate(updatedCertificates);
    };

    const handleClick = () => {
        fileRef.current.click();
    };

    const fetchEducationDetails = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) return;

        const decodedToken = jwtDecode(token);
        const user_Id = decodedToken?._id;

        try {
            const response = await axios.get(
                `${BaseUrl}candidate/profile/get_education/${user_Id}`
            );
            const {
                highest_education,
                board_represent,
                articles,
                certificates
            } = response?.data?.education_details;

            setEducationData({
                highest_education: highest_education || '',
                board_represent: board_represent || '',
                articles: articles || '',
                certificates: certificates || []
            });
            setCertificate(certificates); // Assuming cert.Certificate is the correct key
        } catch (error) {
            console.error('Error fetching education details', error);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('Candidate_token');
        if (!token) return;

        const decodedToken = jwtDecode(token);
        const user_Id = decodedToken?._id;

        // Create FormData instance
        const formData = new FormData();

        Object.entries(educationData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Ensure certificates are being added as an array of objects
        certificate.forEach(cert => {
            formData.append('certificates[]', JSON.stringify(cert));
        });
        try {
            const response = await axios.put(
                `${BaseUrl}candidate/profile/edit_education/${user_Id}`,
                formData
            );
            if (response?.status === 200 || response?.status === 201) {
                toast.success('Education Details Updated');
                await fetchCandidateProfile();
                handleShowEducation();
            }
        } catch (error) {
            toast.error(
                `${error.response?.data?.error || 'Error updating details'}`
            );
        }
    };

    useEffect(() => {
        fetchEducationDetails();
    }, []);

    return (
        <div className="edit-education">
            <p className="edit-education-p">Experience Details</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group
                    controlId="highestEducation"
                    style={{ marginTop: '-8px' }}
                >
                    <Form.Label className="edit-label-edu">
                        Highest level of education
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="highest_education"
                        value={educationData.highest_education}
                        onChange={handleInputChange}
                        placeholder="Ex: Junior UI UX Designer"
                        className="education-form"
                        required
                    />
                </Form.Group>
                <Form.Group
                    controlId="boardRepresent"
                    style={{ marginTop: '4px' }}
                >
                    <Form.Label className="edit-label-edu">
                        Boards represented names
                    </Form.Label>
                    <Form.Control
                        name="board_represent"
                        placeholder="Enter Boards represented names"
                        value={educationData.board_represent}
                        onChange={handleInputChange}
                        className="education-form"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="articles" className="mt-1">
                    <Form.Label className="edit-label-edu">
                        Book / Article Published
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="articles"
                        value={educationData.articles}
                        onChange={handleInputChange}
                        placeholder="Ex: World Development Corporation"
                        className="education-form"
                        required
                    />
                </Form.Group>
                {certificate.map((cert, index) => (
                    <Row key={index}>
                        <Col xs={7}>
                            <Form.Label className="edit-label-edu">
                                Certificate name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="certificateName"
                                value={cert.certificateName}
                                onChange={event =>
                                    handleCertificateInputChange(index, event)
                                }
                                placeholder="Ex: World Development Corporation"
                                className="education-form"
                                required
                            />
                        </Col>
                        <Col xs={5}>
                            <button
                                className="education-btn"
                                type="button"
                                onClick={handleClick}
                            >
                                Browse from files
                                <input
                                    type="file"
                                    ref={fileRef}
                                    style={{ display: 'none' }}
                                    onChange={event =>
                                        handleFileChange(index, event)
                                    }
                                />
                            </button>
                        </Col>
                    </Row>
                ))}

                <button
                    className="add-certi"
                    type="button"
                    onClick={addCertificateRow}
                >
                    <img src={whiteplus} alt="" /> Add Certificate
                </button>

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
    );
};

export default EditEducation;
