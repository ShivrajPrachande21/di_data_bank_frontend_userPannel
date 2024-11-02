import React, { useContext, useRef, useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import whiteplus from '../../../../../assets/images/whiteplus.png';
import { jwtDecode } from 'jwt-decode';
import BaseUrl from '../../../../../services/BaseUrl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CandidateProfileContext } from './../../../../../context/candidateContext/CandidateProfileContext';

const EditEducation = () => {
    const { handleShowEducation, fetchCandidateProfile } = useContext(CandidateProfileContext);
    const [educationData, setEducationData] = useState({
        highest_education: '',
        board_represent: '',
        articles: '',
        certificates: []
    });

    const [rows, setRows] = useState([
        { 
            Certificate: '', image: null, fileInputRef: React.createRef() }
    ]);

    const addCertificateRow = (e) => {
        e.preventDefault();
        setRows([
            ...rows,
            { 
                Certificate: '', image: null, fileInputRef: React.createRef() }
        ]);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEducationData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCertificateInputChange = (index, e) => {
        const updatedRows = [...rows];
        updatedRows[index].
        Certificate = e.target.value; 
        setRows(updatedRows);
        setEducationData((prevData) => ({
            ...prevData,
            certificates: updatedRows
        }));
    };

    const handleFileChange = (index, e) => {
        const updatedRows = [...rows];
        updatedRows[index].image = e.target.files[0];
        setRows(updatedRows);
        setEducationData((prevData) => ({
            ...prevData,
            certificates: updatedRows
        }));
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
            const { highest_education, board_represent, articles, certificates } = response?.data?.education_details;

            setEducationData({
                highest_education: highest_education || '',
                board_represent: board_represent || '',
                articles: articles || '',
                certificates: certificates || []
            });
            setRows(certificates);
        } catch (error) {
            console.error('Error fetching education details', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('Candidate_token');
        if (!token) return;

        const decodedToken = jwtDecode(token);
        const user_Id = decodedToken?._id;

        const formData = new FormData();
        formData.append('highest_education', educationData.highest_education);
        formData.append('board_represent', educationData.board_represent);
        formData.append('articles', educationData.articles);

        rows.forEach((cert, index) => {
            formData.append(`certificates[${index}][certificateName]`, cert.certificateName);
            if (cert.image) {
                formData.append(`certificates[${index}][image]`, cert.image);
            }
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
            <p className="edit-education-p">Education Details</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="highestEducation" style={{ marginTop: '-8px' }}>
                    <Form.Label className="edit-label-edu" style={{ fontSize: '0.8rem', fontWeight: '500' }}>
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
                <Form.Group controlId="boardRepresent" style={{ marginTop: '4px' }}>
                    <Form.Label className="edit-label-edu" style={{ fontSize: '0.8rem', fontWeight: '500' }}>
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
                    <Form.Label className="edit-label-edu" style={{ fontSize: '0.8rem', fontWeight: '500' }}>
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
                {rows.map((cert, index) => (
                    <Row key={index}>
                        <Col xs={7}>
                            <Form.Label className="edit-label-edu" style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                                Certificate name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={cert.Certificate}
                                onChange={(event) => handleCertificateInputChange(index, event)}
                                placeholder="Ex: World Development Corporation"
                                className="education-form"
                                required
                            />
                        </Col>
                        <Col xs={5}>
                            <button
                                className="education-btn"
                                type="button"
                                onClick={() => cert.fileInputRef.current.click()}
                            >
                                 Browse from files
                               
                                <input
                                    type="file"
                                    ref={cert.fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={(event) => handleFileChange(index, event)}
                                />
                            </button>
                        </Col>
                    </Row>
                ))}

                <button className="add-certi" type="button" onClick={addCertificateRow}>
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
