import React, { useRef, useState } from 'react';
import './editprofile.css';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import Cross from '../../../../assets/images/Cross.png';
import EditprofileData from '../../../../hooks/company_dashboard/EditprofileData';
import clarity_note_edit_line from '../../../../assets/images/clarity_note-edit-line.png';
const EditCompanyProfile = () => {
    const [Gstimage, setGstImage] = useState(null);
    const [Panimage, setPAnImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [ProfileImageURL, setProfileImageURL] = useState('');
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const fileInputRefPan = useRef(null);
    const profileInputref = useRef(null);
    const [formFields, setFormFields] = useState({
        company_name: '',
        email: '',
        mobile: '',
        overView: '',
        address: '',
        industry: '',
        company_size: '',
        GST: '',
        PAN: '',
        website_url: '',
        location: '',
        contact_email: '',
        contact_No: '',
        headQuater_add: ''
    });
    const { submitForm, loading, error, success } = EditprofileData();
    const handleFieldChange = e => {
        const { name, value } = e.target;

        setFormFields(prevState => ({
            ...prevState,
            [name]: value
        }));
        const regex = /^\d{0,10}$/;

        if (regex.test(value)) {
        }
    };
    const handleImageUpload = event => {
        const file = event.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setGstImage(imageUrl);
            setProfileImageURL(imageUrl);
        } else {
            console.error('error While uploading Profile Image file ');
        }
    };
    const remove_gst = () => {
        setGstImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input so the user can upload again
        }
    };
    const handleImageUploadPan = event => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPAnImage(imageUrl);
        }
    };
    const remove_pan = () => {
        setPAnImage(null);
        if (fileInputRefPan.current) {
            fileInputRefPan.current.value = ''; // Reset the file input so the user can upload again
        }
    };
    const handleProfileUpload = event => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl); // Store the file in state
            setPreview(URL.createObjectURL(file)); // Generate a URL for the image preview
        }
    };
    const handleSubmit = async e => {
        e.preventDefault();
        // Call the submitForm function from the custom hook
        await submitForm(formFields, Gstimage, Panimage, profileImage);
    };

    console.log('Formdata', formFields);
    return (
        <>
            <div className="editProfilepage">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={12} className="custom-img">
                            <div className="profileImageEdit">
                                <div className="imahesection">
                                    <img
                                        src={preview}
                                        alt=""
                                        className="profileView"
                                    />
                                    <img
                                        src={clarity_note_edit_line}
                                        alt=""
                                        className="profile"
                                        onClick={() =>
                                            profileInputref.current.click()
                                        }
                                    />
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="fileInputprofile"
                                    style={{ display: 'none' }}
                                    onChange={handleProfileUpload}
                                    ref={profileInputref}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs={4}>
                            {' '}
                            <Form.Label className="custom-input-group-label">
                                Company name*
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Ex: World Development Corporation"
                                    name="company_name"
                                    value={formFields.company_name}
                                    onChange={handleFieldChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={4}>
                            {' '}
                            <Form.Label className="custom-input-group-label">
                                Email*
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                                placeholder="email"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Ex: example@gmail.com"
                                    name="email"
                                    value={formFields.email}
                                    onChange={handleFieldChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={4}>
                            {' '}
                            <Form.Label className="custom-input-group-label">
                                Mobile no*
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Ex: 88888 88888"
                                    pattern="\d{1,10}"
                                    name="mobile"
                                    value={formFields.mobile}
                                    onChange={handleFieldChange}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="">
                        <Col xs={4}>
                            {' '}
                            <Form.Label className="custom-input-group-label">
                                Confirm website URL
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Ex: Company123.com"
                                    name="website_url"
                                    value={formFields.website_url}
                                    onChange={handleFieldChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={4}>
                            {' '}
                            <Form.Label className="custom-input-group-label">
                                Contact email address
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Ex: hr.company@gmail.com"
                                    name="contact_email"
                                    value={formFields.contact_email}
                                    onChange={handleFieldChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={4}>
                            {' '}
                            <Form.Label className="custom-input-group-label">
                                Contact no.
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Ex: 77778 98888"
                                    name="contact_No"
                                    value={formFields.contact_No}
                                    onChange={handleFieldChange}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="">
                        <Col xs={4}>
                            {' '}
                            <Form.Label className="custom-input-group-label">
                                Location(s)
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Ex: Pune, Mumbai"
                                    name="location"
                                    value={formFields.location}
                                    onChange={handleFieldChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={4}>
                            {' '}
                            <Form.Label className="custom-input-group-label">
                                Industry
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Ex: IT"
                                    name="industry"
                                    value={formFields.industry}
                                    onChange={handleFieldChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={4}>
                            {' '}
                            <Form.Label className="custom-input-group-label">
                                Company size
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Ex: 100-200"
                                    name="company_size"
                                    value={formFields.company_size}
                                    onChange={handleFieldChange}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label className="custom-input-group-label">
                                Overview
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    as="textarea"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Enter description about company"
                                    name="overView"
                                    value={formFields.overView}
                                    onChange={handleFieldChange}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label className="custom-input-group-label">
                                Headquarters address
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Enter full address"
                                    name="headQuater_add"
                                    value={formFields.headQuater_add}
                                    onChange={handleFieldChange}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <Form.Label className="custom-input-group-label">
                                GSTIN*
                            </Form.Label>

                            <div className="verify">
                                <input
                                    type="text"
                                    placeholder="Ex: PCMNP7474G"
                                    name="GST"
                                    value={formFields.GST}
                                    onChange={handleFieldChange}
                                />
                                {/* <button className="verify-btn">Verify</button> */}
                            </div>
                        </Col>
                        <Col xs={2}>
                            {Gstimage ? (
                                <div className="UploadImagediv">
                                    <img
                                        src={Gstimage}
                                        alt="Uploaded"
                                        style={{
                                            width: '80px',

                                            objectFit: 'cover'
                                        }}
                                    />
                                    {}
                                    <img
                                        src={Cross}
                                        alt=""
                                        width="20px"
                                        className="cross"
                                        onClick={remove_gst}
                                    />
                                </div>
                            ) : (
                                <Button
                                    className="btn-upload"
                                    onClick={() =>
                                        document
                                            .getElementById('fileInput')
                                            .click()
                                    }
                                >
                                    Uplaod Image
                                </Button>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                id="fileInput"
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                                ref={fileInputRef}
                            />
                        </Col>
                        <Col xs={4}>
                            <Form.Label className="custom-input-group-label">
                                PAN*
                            </Form.Label>
                            <div className="verify">
                                <input
                                    type="text"
                                    placeholder="Ex: PCMNP7474G"
                                    name="PAN"
                                    value={formFields.PAN}
                                    onChange={handleFieldChange}
                                />
                            </div>
                        </Col>
                        <Col xs={2}>
                            {Panimage ? (
                                <div className="UploadImagediv">
                                    <img
                                        src={Panimage}
                                        alt="Uploaded"
                                        style={{
                                            width: '80px',

                                            objectFit: 'cover'
                                        }}
                                    />
                                    {}
                                    <img
                                        src={Cross}
                                        alt=""
                                        width="20px"
                                        className="cross"
                                        onClick={remove_pan}
                                    />
                                </div>
                            ) : (
                                <Button
                                    className="btn-upload"
                                    onClick={() =>
                                        document
                                            .getElementById('fileInputpan')
                                            .click()
                                    }
                                >
                                    Uplaod Image
                                </Button>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                id="fileInputpan"
                                style={{ display: 'none' }}
                                onChange={handleImageUploadPan}
                                ref={fileInputRefPan}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <div className=" mt-3 saveprofile">
                            <Button className="saveprofile-btn" type="submit">
                                Update profile
                            </Button>
                        </div>
                    </Row>
                </Form>
            </div>
        </>
    );
};

export default EditCompanyProfile;
