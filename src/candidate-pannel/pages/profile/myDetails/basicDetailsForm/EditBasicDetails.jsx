import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import BaseUrl from '../../../../../services/BaseUrl';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { CandidateProfileContext } from '../../../../../context/candidateContext/CandidateProfileContext';
import { toast } from 'react-toastify';
const EditBasicDetails = () => {
    const { modalShow, showModal, fetchCandidateProfile } = useContext(
        CandidateProfileContext
    );
    const [formData, setFormData] = useState({
        email: '',
        mobile: '',
        linkedIn: '',
        name: ''
    });

    // State for errors
    const [errors, setErrors] = useState({
        email: '',
        phone: '',
        linkedin: ''
    });

    const locate = useLocation();

    const [validated, setValidated] = useState(false);

    // State for dynamic input fields (other profiles)
    const [other_profile, setInputFields] = useState([
        { profile_name: '', link: '' }
    ]);

    // Handle basic field changes
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle dynamic input field changes
    const handleProfileChange = (index, field, value) => {
        const updatedFields = [...other_profile];
        updatedFields[index][field] = value;
        setInputFields(updatedFields);
    };

    // Add new dynamic profile input fields
    const handleAddProfile = () => {
        setInputFields([...other_profile, { profile_name: '', link: '' }]); // Add new blank row
    };

    // Validation for email, phone, and LinkedIn
    const validateEmail = email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = phone => {
        const phoneRegex = /^\d{10}$/; // Validates a 10-digit phone number
        return phoneRegex.test(phone);
    };

    const validateLinkedIn = linkedin => {
        const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/;
        return linkedInRegex.test(linkedin);
    };

    // Handle form submission
    const handleSubmit = async e => {
        e.preventDefault();

        console.log('Form Data:', formData);
        console.log('Other Profiles:', other_profile); // Log dynamic profile data

        // const Data = new FormData();
        // Data.append('other_profile', other_profile);
        // Data.append('email', formData?.email);
        // Data.append('mobile', formData?.mobile);
        // Data.append('name', formData?.name);
        // Data.append('linkedIn', formData?.linkedIn);
        const token = localStorage.getItem('Candidate_token');
        const combinedData = {
            ...formData, // Spread the formData (email, phone, linkedin)
            other_profile: other_profile // Add other_profile array to the combined object
        };
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken?._id;
            try {
                const response = await axios.put(
                    `${BaseUrl}candidate/profile/edit_basic/${user_id}`,
                    combinedData
                );
                if (response?.status == 200 || response?.status == 201) {
                    await fetchCandidateProfile();
                    toast.success('Profile updated Successfully');

                    showModal();
                }
            } catch (error) {
                toast.error(`${error?.response?.data?.error}`);
            }
        }

        // Validate basic fields
        const newErrors = {
            email: validateEmail(formData.email) ? '' : 'Invalid email format.',
            mobile: validatePhone(formData.phone)
                ? ''
                : 'Phone number must be 10 digits.',
            linkedIn: validateLinkedIn(formData.linkedin)
                ? ''
                : 'Invalid LinkedIn profile URL.'
        };

        setErrors(newErrors);
        setValidated(true);

        // Check if there are no errors in the basic details
        if (!newErrors.email && !newErrors.phone && !newErrors.linkedIn) {
        }
    };

    const fetchCandidateMydetails = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const id = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/profile/get_basic/${id}`
                );

                const { email, mobile, linkedIn, name } =
                    response?.data?.basic_details;

                // Set the API data into formData
                setFormData({
                    email: email || '',
                    mobile: mobile || '',
                    linkedIn: linkedIn || '',
                    name: name || ''
                });
            } catch (error) {}
        }
    };

    useEffect(() => {
        const fun = async () => {
            await fetchCandidateMydetails();
        };
        fun();
    }, [locate]);
    return (
        <>
            <div style={{ height: '100vh' }}>
                <p
                    style={{
                        marginTop: '-10px',
                        textAlign: 'center',
                        color: '#051F50',
                        fontWeight: '600'
                    }}
                >
                    Basic Details
                </p>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="email" style={{ marginTop: '-8px' }}>
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={formData.name}
                            onChange={handleChange}
                            // isInvalid={validated && !!errors.email}
                            style={{
                                marginTop: '-6px',

                                height: '30px',
                                border: '1.3px solid #AEAEAE'
                            }}
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            style={{ marginTop: '1px' }}
                        >
                            {/* {errors.email} */}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="email" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Email address
                        </Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={validated && !!errors.email}
                            style={{
                                marginTop: '-6px',

                                height: '30px',
                                border: '1.3px solid #AEAEAE'
                            }}
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            style={{ marginTop: '1px' }}
                        >
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="phone" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Phone Number
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="mobile"
                            placeholder="Enter phone number"
                            value={formData.mobile}
                            onChange={handleChange}
                            isInvalid={validated && !!errors.phone}
                            style={{
                                marginTop: '-6px',

                                height: '30px',
                                border: '1.3px solid #AEAEAE'
                            }}
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            style={{ marginTop: '1px' }}
                        >
                            {errors.phone}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="linkedin" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            LinkedIn Profile
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="linkedIn"
                            placeholder="Enter LinkedIn profile URL"
                            value={formData.linkedIn}
                            onChange={handleChange}
                            isInvalid={validated && !!errors.linkedin}
                            style={{
                                marginTop: '-6px',

                                height: '30px',
                                border: '1.3px solid #AEAEAE'
                            }}
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            style={{ marginTop: '1px' }}
                        >
                            {errors.linkedin}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="profile" className="mt-1">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Add other profiles
                        </Form.Label>
                        {other_profile.map((field, index) => (
                            <Row key={index} className="mt-2">
                                <Col xs={3}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ex: Github"
                                        style={{
                                            height: '30px',
                                            border: '1.3px solid #AEAEAE'
                                        }}
                                        value={field.profile_name}
                                        onChange={e =>
                                            handleProfileChange(
                                                index,
                                                'profile_name',
                                                e.target.value
                                            )
                                        }
                                    />
                                </Col>
                                <Col xs={9}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Paste or Enter Link"
                                        style={{
                                            height: '30px',
                                            border: '1.3px solid #AEAEAE'
                                        }}
                                        value={field.link}
                                        onChange={e =>
                                            handleProfileChange(
                                                index,
                                                'link',
                                                e.target.value
                                            )
                                        }
                                    />
                                </Col>
                            </Row>
                        ))}
                    </Form.Group>

                    <div className="text-start">
                        <Button
                            size="sm"
                            style={{
                                background: '#F8F8F8',
                                color: '#141416',
                                border: 'none',
                                fontWeight: '500'
                            }}
                            className="mt-3"
                            onClick={handleAddProfile}
                        >
                            + ADD
                        </Button>
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

                {validated &&
                    !errors.email &&
                    !errors.phone &&
                    !errors.linkedin && (
                        <Alert variant="success" className="mt-3">
                            Form is valid!
                        </Alert>
                    )}
            </div>
        </>
    );
};

export default EditBasicDetails;
