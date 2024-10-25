import React, { useContext, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

function AddNewEducation() {
    return (
        <div>
            <div className="add-eduction-details">
                <p>Add Education</p>
                <Form.Group controlId="mobile" className="mt-1">
                    <Form.Label className="edit-lable-edu">school*</Form.Label>
                    <Form.Control
                        type="text"
                        name="companyName"
                        // value={expData?.companyName}
                        // onChange={handleInputChange}
                        placeholder="Ex: World Development Corporation"
                        className="education-form"
                    />
                </Form.Group>
                <Form.Group controlId="mobile" className="mt-1">
                    <Form.Label className="edit-lable-edu">Degree</Form.Label>
                    <Form.Control
                        type="text"
                        name="companyName"
                        // value={expData?.companyName}
                        // onChange={handleInputChange}
                        placeholder="Ex: World Development Corporation"
                        className="education-form"
                    />
                </Form.Group>
                <Form.Group controlId="mobile" className="mt-1">
                    <Form.Label className="edit-lable-edu">
                        Field of study
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
            </div>
        </div>
    );
}

export default AddNewEducation;
