import React, { useContext, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import whiteplus from '../../../../../assets/images/whiteplus.png';
import { jwtDecode } from 'jwt-decode';

const EditEducation = () => {
    const [certificate, setCertificate] = useState([{}]);
    return (
        <div className="edit-education">
            <p className="edit-education-p">Experience Details</p>
            <Form noValidate>
                <Form.Group controlId="email" style={{ marginTop: '-8px' }}>
                    <Form.Label className="edit-lable-edu">
                        Designation
                    </Form.Label>

                    <Form.Control
                        type="text"
                        name="designation"
                        // value={expData?.designation}
                        // onChange={handleInputChange}
                        placeholder="Ex: Junior UI UX Designer"
                        className="education-form"
                    />
                </Form.Group>
                <Form.Group controlId="email" style={{ marginTop: '4px' }}>
                    <Form.Label className="edit-lable-edu">
                        Employment type
                    </Form.Label>

                    <Form.Control
                        name="employee_type"
                        placeholder="jahgd jahsgd"
                        // value={expData?.employee_type}
                        // onChange={handleInputChange}
                        className="education-form"
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="mobile" className="mt-1">
                    <Form.Label className="edit-lable-edu">
                        Company name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="companyName"
                        // value={expData?.companyName}
                        // onChange={handleInputChange}
                        placeholder="Ex: World Development Corporation"
                        className="education-form"
                    />
                </Form.Group>
                <Row>
                    <Col xs={7}>
                        <Form.Label className="edit-lable-edu">
                            Certificate name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="companyName"
                            // value={expData?.companyName}
                            // onChange={handleInputChange}
                            placeholder="Ex: World Development Corporation"
                            className="education-form"
                        />
                    </Col>
                    <Col xs={5}>
                        <button className="education-btn" type="button">
                            Browse from files
                        </button>
                    </Col>
                </Row>
                <button className="add-certi" type="button">
                    <img src={whiteplus} alt="" /> Add Certificate{' '}
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
