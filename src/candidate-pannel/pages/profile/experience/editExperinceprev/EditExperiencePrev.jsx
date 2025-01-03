import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { CandidateProfileContext } from '../../../../../context/candidateContext/CandidateProfileContext';
import Calendar from '../../../../../assets/images/Calendar.png';
import oui_cross from '../../../../../assets/images/oui_cross.png';
const EditExperiencePrev = () => {
    const {
        expData,
        Edit_ExpData,
        setEdit_ExpData,
        setExpData,
        Submit_edit_experience,
        showEditExp
    } = useContext(CandidateProfileContext);
    // const [start_date, setstart_date] = useState('');

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

    const handleInputChange = e => {
        const { name, type, checked, value } = e.target;
        if (expData.CTC <= 0 && value < 0) {
            return;
        } else {
            if (type === 'checkbox') {
                setExpData({ ...expData, [name]: checked });
            } else {
                setExpData({ ...expData, [name]: value });
            }
        }
    };

    // Submit the Edited Data
    const handle_Edit_Exp = async e => {
        e.preventDefault();
        Submit_edit_experience();
    };

    const start_date = expData.start_date
        ? new Date(expData.start_date).toISOString().split('T')[0]
        : '';

    const end_date = expData.end_date
        ? new Date(expData.end_date).toISOString().split('T')[0]
        : '';
    return (
        <>
            <div style={{ height: '100vh' }}>
                <img
                    src={oui_cross}
                    alt=""
                    style={{
                        float: 'right',
                        width: '24px',
                        cursor: 'pointer'
                    }}
                    onClick={showEditExp}
                />
                <p
                    style={{
                        textAlign: 'center',
                        color: '#051F50',
                        fontWeight: '600'
                    }}
                >
                    Edit Experience Details
                </p>
                <Form noValidate onSubmit={e => handle_Edit_Exp(e)}>
                    <Form.Group controlId="email" style={{ marginTop: '-8px' }}>
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Designation
                            <span className="text-danger">*</span>
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
                                    onChange={e => handleInputChange(e)}
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
                                    onChange={e => handleInputChange(e)}
                                    style={{
                                        height: '35px',
                                        border: '1px solid gray',

                                        fontSize: '0.8rem'
                                    }}
                                >
                                    <option value="Full-Time">Select</option>
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
                            Company name
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="companyName"
                            value={expData?.companyName}
                            onChange={e => handleInputChange(e)}
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
                            CTC
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="CTC"
                            value={expData?.CTC}
                            onChange={e => handleInputChange(e)}
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
                            Location
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={expData?.location}
                            onChange={e => handleInputChange(e)}
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
                            Location type
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="location_type"
                            value={expData?.location_type}
                            onChange={e => handleInputChange(e)}
                            placeholder="Enter "
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
                            onChange={e => handleInputChange(e)}
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
                                onChange={e => handleInputChange(e)}
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
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Notice Period
                        </Form.Label>
                        <Row style={{ marginLeft: '0px' }}>
                            <Col
                                xs={5}
                                className="d-flex p-1"
                                style={{
                                    marginTop: '-6px',
                                    fontSize: '0.8rem',
                                    height: '34px',
                                    border: '1.5px solid #AEAEAE',
                                    borderRadius: '6px',
                                    marginRight: '22px',
                                    width: '46%'
                                }}
                            >
                                <Form.Control
                                    type="number"
                                    name="notice_period"
                                    value={expData?.notice_period}
                                    onChange={e => handleInputChange(e)}
                                    placeholder="Enter No"
                                    style={{
                                        border: 'none',
                                        borderRadius: '6px'
                                    }}
                                />
                                <p className="days">Days</p>
                            </Col>
                            <Col
                                xs={5}
                                className="d-flex p-1"
                                style={{
                                    marginTop: '-6px',
                                    fontSize: '0.8rem',
                                    height: '34px',
                                    border: '1.5px solid #AEAEAE',
                                    borderRadius: '6px',
                                    width: '46%'
                                }}
                            >
                                <Form.Control
                                    type="number"
                                    name="negotiation_day"
                                    value={expData?.negotiation_day}
                                    onChange={e => handleInputChange(e)}
                                    placeholder="Enter Negotiable No"
                                    style={{
                                        border: 'none',
                                        borderRadius: '6px'
                                    }}
                                />
                                <p className="days">Days</p>
                            </Col>
                        </Row>
                    </Form.Group>

                    {/* Start Date */}
                    <Form.Group controlId="Start_date" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Start date
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Row style={{ marginLeft: '-2px' }}>
                            <Col xs={6} className="custom-option-exp">
                                <Form.Group controlId="formBasicDate">
                                    <input
                                        type="date"
                                        class="custom-date-input"
                                        name="start_date"
                                        value={start_date}
                                        onChange={e => handleInputChange(e)}
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
                    {expData?.current_workingStatus ? null : (
                        <Form.Group controlId="End_date" className="mt-2">
                            <Form.Label
                                style={{
                                    fontSize: '0.8rem',
                                    fontWeight: '500'
                                }}
                            >
                                End date
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <Row style={{ marginLeft: '-2px' }}>
                                <Col xs={6} className="custom-option-exp">
                                    <Form.Group controlId="formBasicDate">
                                        <input
                                            type="date"
                                            class="custom-date-input"
                                            name="end_date"
                                            value={end_date}
                                            onChange={e => handleInputChange(e)}
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
                            checked={expData?.End_posistion}
                            onChange={e => handleInputChange(e)}
                        />
                        <label for="custom-checkbox" className="lable-custom">
                            End current position.
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

export default EditExperiencePrev;
