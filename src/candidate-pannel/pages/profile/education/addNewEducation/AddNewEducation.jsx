import React, { useContext, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import Calendar from '../../../../../assets/images/Calendar.png';
import BaseUrl from '../../../../../services/BaseUrl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CandidateProfileContext } from '../../../../../context/candidateContext/CandidateProfileContext';
import oui_cross from '../../../../../assets/images/oui_cross.png';
function AddNewEducation() {
    const { fetchCandidateProfile, showAdd_new_Education, CandidateProfile } =
        useContext(CandidateProfileContext);
    const [addNewData, setAddNewData] = useState({
        school: '',
        degree: '',
        Field_study: '',
        start_date: '',
        end_date: '',
        grade: '',
        description: ''
    });

    const cal_start = useRef();
    const cal_end = useRef();

    const handleStartdate = () => {
        cal_start.current.showPicker();
    };
    const handle_end_date = () => {
        cal_end.current.showPicker();
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setAddNewData({ ...addNewData, [name]: value });
    };

    const handle_submit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('Candidate_token');
        if (!token) return;

        const dateValue = new Date(addNewData?.start_date || new Date());
        const isoDate = dateValue.toISOString();
        const dateValue1 = new Date(addNewData?.end_date || new Date());
        const isoDate2 = dateValue1.toISOString();
        const formData = {
            ...addNewData,
            start_date: isoDate,
            end_date: isoDate2
        };

        const decodedToken = jwtDecode(token);
        const user_Id = decodedToken?._id;

        try {
            const response = await axios.put(
                `${BaseUrl}candidate/profile/add_education/${user_Id}`,
                formData
            );
            if (response?.status === 200 || response?.status === 201) {
                toast.success('Education details added successfully');
                await fetchCandidateProfile();
                showAdd_new_Education();
            }
        } catch (error) {
            toast.error(`${error.response?.data?.error}`);
        }
    };

    return (
        <div>
            <div className="add-eduction-details">
                <img
                    src={oui_cross}
                    alt=""
                    style={{
                        float: 'right',
                        width: '24px',
                        cursor: 'pointer'
                    }}
                    onClick={showAdd_new_Education}
                />
                <p>Add Education</p>
                <Form onSubmit={e => handle_submit(e)}>
                    <Form.Group controlId="mobile" className="mt-2">
                        <Form.Label className="edit-lable-edu">
                            College/School
                            <span style={{ color: 'red' }}> *</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="school"
                            value={addNewData?.school}
                            onChange={handleInputChange}
                            placeholder="Ex: Sent joshoph"
                            className="education-form"
                        />
                    </Form.Group>
                    <Form.Group controlId="mobile" className="mt-2">
                        <Form.Label className="edit-lable-edu">
                            Degree<span style={{ color: 'red' }}> *</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="degree"
                            value={addNewData?.degree}
                            onChange={handleInputChange}
                            placeholder="Ex: Mcom"
                            className="education-form"
                        />
                    </Form.Group>
                    <Form.Group controlId="mobile" className="mt-2">
                        <Form.Label className="edit-lable-edu">
                            Field of study{' '}
                            <span style={{ color: 'red' }}> *</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="Field_study"
                            value={addNewData?.Field_study}
                            onChange={handleInputChange}
                            placeholder="Ex:Electronics and communication engineering"
                            className="education-form"
                        />
                    </Form.Group>
                    <Row>
                        <Col xs={10}>
                            <Form.Group controlId="mobile" className="mt-2">
                                <Form.Label className="edit-lable-edu">
                                    Start date{' '}
                                    <span style={{ color: 'red' }}> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="start_date"
                                    ref={cal_start}
                                    value={addNewData?.start_date}
                                    onChange={handleInputChange}
                                    className="education-form"
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={2}>
                            <img
                                src={Calendar}
                                alt=""
                                className="education-calednder"
                                onClick={handleStartdate}
                            />
                        </Col>
                        <Col xs={10}>
                            <Form.Group controlId="mobile" className="mt-2">
                                <Form.Label className="edit-lable-edu">
                                    End date (or expected)
                                    <span style={{ color: 'red' }}> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    ref={cal_end}
                                    name="end_date"
                                    value={addNewData?.end_date}
                                    onChange={handleInputChange}
                                    className="education-form"
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={2}>
                            <img
                                src={Calendar}
                                alt=""
                                className="education-calednder"
                                onClick={handle_end_date}
                            />
                        </Col>
                    </Row>
                    <Form.Group controlId="mobile" className="mt-2">
                        <Form.Label className="edit-lable-edu">
                            Garde<span style={{ color: 'red' }}> *</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="grade"
                            value={addNewData?.grade}
                            onChange={handleInputChange}
                            placeholder="Enter Garde"
                            className="education-form"
                        />
                    </Form.Group>
                    <Form.Group controlId="mobile" className="mt-2">
                        <Form.Label className="edit-lable-edu">
                            Description
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={addNewData?.description}
                            onChange={handleInputChange}
                            placeholder="Eenter Description"
                            className="education-form"
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
        </div>
    );
}

export default AddNewEducation;
