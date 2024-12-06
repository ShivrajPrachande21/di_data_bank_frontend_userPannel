import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import blackCross from '../../../../assets/images/blackCross.png';
import { useContext } from 'react';
import { AccessManagementContext } from '../../../../context/AccessManagementContext';
const EditUser = () => {
    const { showEditModule, setEditModule, formData, setFormData, EditUser } =
        useContext(AccessManagementContext);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleInputChange = e => {
        const { name, value, type, checked } = e.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevVisible => !prevVisible);
    };

    const SubmitHrDetails = async e => {
        e.preventDefault();
        await EditUser(formData);
    };
    return (
        <>
            {' '}
            <Row>
                <Col md={11} xs={10}>
                    Add New Role
                </Col>
                <Col md={1} xs={2}>
                    <img
                        src={blackCross}
                        alt=""
                        width="20px"
                        onClick={() => setEditModule(prev => !prev)}
                        style={{ cursor: 'pointer' }}
                    />
                </Col>
            </Row>
            <Form onSubmit={e => SubmitHrDetails(e)}>
                <Row>
                    <Col md={12} className="mb-2">
                        <Form.Label
                            className="mt-2"
                            style={{ fontSize: '0.8rem' }}
                        >
                            Enter Email
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="email"
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            placeholder="Ex: www@gmail.com"
                            required
                            name="email"
                            value={formData?.email}
                            disabled
                            onChange={e => handleInputChange(e)}
                        />
                        {/* <Form.Control
                            type="password"
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            placeholder="Ex: www@gmail.com"
                            required
                            name="password"
                            value={formData?.password}
                            disabled
                            onChange={e => handleInputChange(e)}
                        /> */}
                    </Col>

                    {/* Checkbox Inputs */}
                    {[
                        { name: 'hire_candidate', label: 'Hire Candidate' },
                        { name: 'create_job', label: 'Create Job' },
                        { name: 'creadibility', label: 'Creadibility' },
                        { name: 'subscription', label: 'Subscription' },
                        { name: 'transaction', label: 'Transaction' },
                        {
                            name: 'access_management',
                            label: 'Access Management'
                        },
                        { name: 'support', label: 'Support' }
                    ].map(({ name, label }) => (
                        <Col md={4} xs={12} className="mt-2" key={name}>
                            <Form.Check
                                className="check-box-hr"
                                type="checkbox"
                                label={label}
                                name={name}
                                checked={formData[name]}
                                onChange={handleInputChange}
                            />
                        </Col>
                    ))}
                </Row>
                <Row className="mt-3">
                    <Button style={{ background: '#3b96e1' }} type="submit">
                        Submit
                    </Button>
                </Row>
            </Form>
        </>
    );
};

export default EditUser;
