import React, { useContext, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { CandidateProfileContext } from '../../../../../context/candidateContext/CandidateProfileContext';
import Calendar from '../../../../../assets/images/Calendar.png';
import Verified from '../../../../../assets/images/Verified.png';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import axios from 'axios';
import BaseUrl from '../../../../../services/BaseUrl';
import oui_cross from '../../../../../assets/images/oui_cross.png';
const EditExperience = () => {
    const { showExperiencelModal, fetchCandidateProfile } = useContext(
        CandidateProfileContext
    );
    const calendarRef = useRef(null);
    const calederRef2 = useRef();

    // Function to programmatically trigger the click event on the date input
    const handleCalendarClick = () => {
        if (calendarRef.current) {
            calendarRef.current.showPicker();
        }
    };

    const handleCalederClickEnd = () => {
        if (calederRef2.current) {
            calederRef2.current.showPicker();
        }
    };
    const [expData, setExpData] = useState({
        End_posistion: false,
        companyName: '',
        current_workingStatus: false,
        designation: '',
        location: '',
        location_type: '',
        negotiation_day: 0,
        notice_period: 0,
        reporting_structure: '',
        start_date: '',
        employee_type: '',
        end_date: '',
        CTC: ''
    });
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = date => {
        setStartDate(date);
    };

    const handleInputChange = e => {
        const { name, type, checked, value } = e.target;

        if (expData.notice_period <= 0 && value < 0) {
            return;
        } else {
            if (type === 'checkbox') {
                setExpData({ ...expData, [name]: checked });
            } else {
                setExpData({ ...expData, [name]: value });
            }
        }
    };

    const handle_Experience_submit = async e => {
        e.preventDefault();
        const dateValue = new Date(expData?.start_date || new Date());
        const isoDate = dateValue.toISOString();
        const formData = { ...expData, start_date: isoDate };
        if (
            expData?.companyName.trim() == '' ||
            expData?.designation.trim() == '' ||
            expData?.start_date.trim() == '' ||
            expData?.employee_type.trim() == '' ||
            expData?.location.trim() == '' ||
            expData?.reporting_structure.trim() == '' ||
            expData?.location_type.trim() == ''
        ) {
            toast.error(' All fields are required');
        } else {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                return;
            } else {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken?._id;
                try {
                    const response = await axios.put(
                        `${BaseUrl}candidate/profile/experience/${userId}`,
                        formData
                    );
                    if (response?.status == 200 || response?.status == 200) {
                        toast.success('Added Successfully');
                        showExperiencelModal();
                        await fetchCandidateProfile();
                    }
                } catch (error) {
                    toast.error('Failed to Submit');
                }
            }
        }
    };

    return (
        <>
            <div style={{ height: '100vh' }}>
                <img
                    src={oui_cross}
                    alt=""
                    style={{
                        float: 'right',
                        width: '24px',
                        cursor: 'pointer',
                        marginTop: '-10px'
                    }}
                    onClick={showExperiencelModal}
                />
                <p
                    style={{
                        textAlign: 'center',
                        color: '#051F50',
                        fontWeight: '600'
                    }}
                >
                    Experience Details
                </p>
                <Form noValidate onSubmit={handle_Experience_submit}>
                    <Form.Group controlId="email" style={{ marginTop: '-8px' }}>
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Designation <span className="text-danger">*</span>
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
                                    type="text"
                                    name="designation"
                                    value={expData?.designation}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Junior UI UX Designer"
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
                    <Form.Group controlId="email" style={{ marginTop: '8px' }}>
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Employment type
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Row style={{ marginTop: '-6px' }}>
                            <Col
                                xs={12}
                                style={{
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Form.Select
                                    name="employee_type"
                                    value={expData?.employee_type}
                                    onChange={handleInputChange}
                                    style={{
                                        height: '35px',
                                        border: '1px solid gray',

                                        fontSize: '0.8rem'
                                    }}
                                >
                                    <option value="">Select</option>
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Freelance">Freelance</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group controlId="mobile" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Company name<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="companyName"
                            value={expData?.companyName}
                            onChange={handleInputChange}
                            placeholder="Ex: World Development Corporation"
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
                            CTC<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="CTC"
                            value={expData?.CTC}
                            onChange={handleInputChange}
                            placeholder="Ex: World Development Corporation"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.4px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="family_member" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Location<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={expData?.location}
                            onChange={handleInputChange}
                            placeholder="Ex: Pune"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.4px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="father_name" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Location type<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="location_type"
                            value={expData?.location_type}
                            onChange={handleInputChange}
                            placeholder="Ex: Pune , Maharashtra "
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.4px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="marriag_status" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Reporting structure
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="reporting_structure"
                            value={expData?.reporting_structure}
                            onChange={handleInputChange}
                            placeholder="Ex: subordinates or team members"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.4px solid #AEAEAE'
                            }}
                        />
                        {/* Check Box */}
                        <div className="d-flex mt-3 ">
                            <input
                                type="checkbox"
                                className="custom-checkbox"
                                name="current_workingStatus"
                                checked={expData.current_workingStatus}
                                onChange={handleInputChange}
                            />
                            <label
                                for="custom-checkbox"
                                className="lable-custom"
                            >
                                I am currently working here.
                            </label>
                            <span></span>
                        </div>
                    </Form.Group>

                    <Form.Group controlId="son_name" className="mt-2">
                        <Row>
                            <Col xs={6}>
                                <Form.Label
                                    style={{
                                        fontSize: '0.8rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    Notice Period
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="notice_period"
                                    value={expData?.notice_period}
                                    onChange={handleInputChange}
                                    placeholder="Enter No"
                                    style={{
                                        marginTop: '-6px',
                                        fontSize: '0.8rem',
                                        height: '34px',
                                        border: '1.4px solid #AEAEAE'
                                    }}
                                />
                            </Col>

                            <Col xs={6}>
                                <Form.Label
                                    style={{
                                        fontSize: '0.8rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    Negotiable Days
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="negotiation_day"
                                    value={expData?.negotiation_day}
                                    onChange={handleInputChange}
                                    placeholder="Enter Negotiable No"
                                    style={{
                                        marginTop: '-6px',
                                        fontSize: '0.8rem',
                                        height: '34px',
                                        border: '1.4px solid #AEAEAE'
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    {/* Start Date */}
                    <Form.Group controlId="Start_date" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Start date<span className="text-danger">*</span>
                        </Form.Label>
                        <Row style={{ marginLeft: '-2px' }}>
                            <Col xs={6} className="custom-option-exp">
                                <Form.Group controlId="formBasicDate">
                                    <input
                                        type="date"
                                        class="custom-date-input"
                                        name="start_date"
                                        value={expData.start_date}
                                        onChange={handleInputChange}
                                        ref={calendarRef}
                                    />
                                    <img
                                        src={Calendar}
                                        alt=""
                                        width="20px"
                                        onClick={handleCalendarClick}
                                        className="calender"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form.Group>
                    {/* End Date */}
                    {expData?.current_workingStatus ? (
                        ''
                    ) : (
                        <Form.Group controlId="End_date" className="mt-2">
                            <Form.Label
                                style={{
                                    fontSize: '0.8rem',
                                    fontWeight: '500'
                                }}
                            >
                                End date<span className="text-danger">*</span>
                            </Form.Label>
                            <Row style={{ marginLeft: '-2px' }}>
                                <Col xs={6} className="custom-option-exp">
                                    <Form.Group controlId="formBasicDate">
                                        <input
                                            type="date"
                                            class="custom-date-input"
                                            name="end_date"
                                            value={expData?.end_date}
                                            onChange={handleInputChange}
                                            ref={calederRef2}
                                            disabled={
                                                expData?.current_workingStatus
                                            }
                                        />
                                        <img
                                            src={Calendar}
                                            alt=""
                                            width="20px"
                                            onClick={handleCalederClickEnd}
                                            className="calender"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form.Group>
                    )}

                    <div className="d-flex mt-3 ">
                        <input
                            type="checkbox"
                            className="custom-checkbox"
                            name="End_posistion"
                            value={expData?.End_posistion}
                            onChange={handleInputChange}
                        />
                        <label for="custom-checkbox" className="lable-custom">
                            End current position.
                            <span className="text-danger">*</span>
                        </label>
                        <span></span>
                    </div>

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

export default EditExperience;
