import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import BaseUrl from '../../../../../services/BaseUrl';
import { boolean } from 'yup';
import { toast, useToast } from 'react-toastify';
import { CandidateProfileContext } from '../../../../../context/candidateContext/CandidateProfileContext';
import Verified from '../../../../../assets/images/Verified.png';

function EditPersonalForm() {
    const { EditPersonalDetails } = useContext(CandidateProfileContext);
    const locate = useLocation();
    const panRef = useRef();
    const aadharRef = useRef();
    const [otp, setOtp] = useState('');
    const [ref_id, setRef_ID] = useState('');
    const [hideOTP, sethideOtp] = useState(false);
    const [name, setname] = useState('');
    const [personalData, setPersonalData] = useState([
        {
            PAN: '',

            aadhar_number: '',
            age: '',
            country: '',

            family_member: '',
            father_name: '',
            gender: '',
            location: '',
            marriag_status: '',
            son_name: '',
            spouse_profession: '',
            disability: false,
            disbility_name: ''
        }
    ]);
    const [aadharverify, Setaadharverify] = useState(null);
    const [PanVerify, SetPanVerify] = useState(null);

    const handleInputChange = e => {
        const { name, value } = e.target;
        if (personalData.age <= 0 && value < 0) {
            return;
        } else {
            setPersonalData({ ...personalData, [name]: value });
        }
    };

    const fetchPersonalDetail = async () => {
        const token = localStorage.getItem('Candidate_token');
        // const combinedData = {
        //     ...formData, // Spread the formData (email, phone, linkedin)
        //     other_profile: other_profile // Add other_profile array to the combined object
        // };
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/profile/get_personal/${user_id}`
                );

                const {
                    PAN,

                    aadhar_number,
                    age,
                    country,

                    family_member,
                    father_name,
                    gender,
                    location,
                    marriag_status,
                    son_name,
                    spouse_profession,
                    disability,
                    disbility_name,
                    Aadhar_verified_status,
                    Pan_verified_status
                } = response?.data?.personal_details;
                Setaadharverify(Aadhar_verified_status);
                SetPanVerify(Pan_verified_status);

                setPersonalData({
                    PAN: PAN || '',

                    aadhar_number: aadhar_number || '',
                    age: age || '',
                    country: country || '',

                    family_member: family_member || '',
                    father_name: father_name || '',
                    gender: gender || '',
                    location: location || '',
                    marriag_status: marriag_status || '',
                    son_name: son_name || '',
                    spouse_profession: spouse_profession || '',
                    disability: disability || null,
                    disbility_name: disbility_name || ''
                });
            } catch (error) {}
        }
    };

    // handlePAn Click
    const handlePanClick = () => {
        panRef.current.click();
    };
    // handle Aadhar  Click
    const handleAadharClick = () => {
        aadharRef.current.click();
    };

    const handlePanChange = () => {
        const file = panRef.current.files[0];
    };

    // Handle Aadhar file change
    const handleAadharChange = () => {
        const file = aadharRef.current.files[0];
    };

    // Verify Aadhar Number
    const VerifyAadhar = async () => {
        const token = localStorage.getItem('Candidate_token');

        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken?._id;
            const aadhar_number = personalData?.aadhar_number.toString();
            try {
                const response = await axios.post(
                    `${BaseUrl}candidate/profile/aadhar_verification/verify`,
                    { aadhar_number }
                );

                if (response?.status == 200 || response?.status == 201) {
                    sethideOtp(true);

                    setRef_ID(response?.data?.responseData?.ref_id);
                    toast.success(`${response?.data?.responseData?.message}`);
                }
            } catch (error) {
                toast.error(`${error?.response?.data?.responseData?.message}`);
            }
        }
    };

    // Verify Add with OTP
    const VerifyAadharOpt = async () => {
        const token = localStorage.getItem('Candidate_token');
        const aadhar_number = personalData?.aadhar_number.toString();
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken?._id;
            try {
                const response = await axios.post(
                    `${BaseUrl}candidate/aadhar_otp/${user_id}`,
                    { ref_id, otp, aadhar_number }
                );
                if (response?.status == 200 || response?.status == 201) {
                    toast.success(`Aadhar verified successfully`);
                    setOtp('');
                    await fetchPersonalDetail();
                }
                console.log('opt data', response?.data);
            } catch (error) {
                toast.error(`${error?.response?.data?.responseData?.message}`);
            }
        }
    };

    const verify_pan = async e => {
        if (name.trim() == '') {
            toast.error('Please provide PAN holder name');
        } else {
            const token = localStorage.getItem('Candidate_token');

            if (!token) {
                return;
            } else {
                const decodedToken = jwtDecode(token);
                const user_id = decodedToken?._id;
                const PAN = personalData?.PAN;
                try {
                    const response = await axios.post(
                        `${BaseUrl}candidate/pan_verification/${user_id}`,
                        {
                            PAN,
                            name
                        }
                    );
                    if (response?.status == 200 || response?.status == 201) {
                        toast.success('Pan Verifed Successfully');
                        await fetchPersonalDetail();
                    }
                } catch (error) {
                    toast.error(
                        `${error?.response?.data?.responseData?.message}`
                    );
                }
            }
        }
    };

    // Edit Personal Detials
    const handle_Edit_personal = async e => {
        e.preventDefault();
        await EditPersonalDetails(personalData);
    };

    useEffect(() => {
        fetchPersonalDetail();
    }, [locate]);

    return (
        <>
            <div style={{ height: '100vh' }}>
                <p
                    style={{
                        textAlign: 'center',
                        color: '#051F50',
                        fontWeight: '600'
                    }}
                >
                    Personal Details
                </p>
                <Form noValidate onSubmit={handle_Edit_personal}>
                    <Form.Group controlId="email" style={{ marginTop: '-8px' }}>
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Aadhaar Card No.
                        </Form.Label>
                        <Row style={{ marginTop: '-6px' }}>
                            <Col
                                xs={11}
                                style={{
                                    border: '1px solid gray',

                                    marginLeft: '10px',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Form.Control
                                    type="text"
                                    name="aadhar_number"
                                    value={personalData?.aadhar_number}
                                    onChange={handleInputChange}
                                    placeholder="Ex: 8974 5464 566"
                                    disabled={aadharverify == true}
                                    style={{
                                        outline: 'none',
                                        height: '35px',
                                        border: 'none',
                                        marginLeft: '-12px',
                                        marginRight: '10px',
                                        fontSize: '0.8rem'
                                    }}
                                />
                                {aadharverify ? (
                                    <img src={Verified} alt="" width="30px" />
                                ) : (
                                    <Button
                                        size="sm"
                                        className="verify-pan-adhar-btn"
                                        onClick={VerifyAadhar}
                                    >
                                        Verify
                                    </Button>
                                )}
                            </Col>

                            {/* {aadharverify ? null : (
                                <>
                                    <Col
                                        xs={3}
                                        style={{
                                            textDecoration: 'underline',
                                            color: '#3B96E1',
                                            fontWeight: '500',
                                            border: '1.7px dashed #AEAEAE',
                                            fontSize: '0.56rem',
                                            marginLeft: '10px',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer'
                                        }}
                                        onClick={handleAadharClick}
                                    >
                                        Browse from files
                                    </Col>
                                    <input
                                        ref={aadharRef}
                                        onChange={handleAadharChange}
                                        type="file"
                                        name=""
                                        id=""
                                        className="d-none"
                                    />
                                </>
                            )} */}
                        </Row>
                        {/* OTO SEction */}
                        {aadharverify ? null : hideOTP ? (
                            <Row
                                style={{ marginLeft: '-12px' }}
                                className="mt-2"
                            >
                                <Col
                                    xs={8}
                                    style={{
                                        border: '1px solid gray',

                                        marginLeft: '10px',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Form.Control
                                        type="text"
                                        name="otp"
                                        value={otp}
                                        onChange={e => setOtp(e.target.value)}
                                        placeholder="Ex: 2 3 4 4 1 "
                                        style={{
                                            outline: 'none',
                                            height: '35px',
                                            border: 'none',
                                            marginLeft: '-11px',
                                            marginRight: '10px',
                                            fontSize: '0.8rem'
                                        }}
                                    />
                                    <Button
                                        size="sm"
                                        className="verify-pan-adhar-btn"
                                        style={{ width: '110px' }}
                                        onClick={VerifyAadharOpt}
                                    >
                                        Verify OTP
                                    </Button>
                                </Col>
                            </Row>
                        ) : null}
                    </Form.Group>
                    <Form.Group controlId="email" style={{ marginTop: '8px' }}>
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            PAN
                        </Form.Label>
                        <Row style={{ marginTop: '-6px' }}>
                            <Col
                                xs={11}
                                style={{
                                    border: '1px solid gray',

                                    marginLeft: '10px',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Form.Control
                                    type="text"
                                    name="PAN"
                                    value={personalData?.PAN}
                                    onChange={handleInputChange}
                                    placeholder="Ex: PGDH9874G"
                                    disabled={PanVerify == true}
                                    style={{
                                        outline: 'none',
                                        height: '35px',
                                        border: 'none',
                                        marginLeft: '-12px',
                                        marginRight: '10px',
                                        fontSize: '0.8rem'
                                    }}
                                />

                                {PanVerify ? (
                                    <img src={Verified} alt="" width="30px" />
                                ) : (
                                    <Button
                                        size="sm"
                                        className="verify-pan-adhar-btn"
                                        onClick={verify_pan}
                                    >
                                        Verify
                                    </Button>
                                )}
                            </Col>
                        </Row>
                        {/* Pan Holder Name section*/}

                        {PanVerify ? null : (
                            <Col xs={8}>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={e => setname(e.target.value)}
                                    placeholder="Ex: GURU"
                                    style={{
                                        outline: 'none',
                                        height: '35px',
                                        border: '1px solid gray',
                                        marginLeft: '0px',
                                        marginRight: '10px',
                                        fontSize: '0.8rem'
                                    }}
                                    className="mt-2"
                                />
                            </Col>
                        )}
                    </Form.Group>

                    <Form.Group controlId="email" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Gender
                        </Form.Label>
                        <Form.Select
                            name="gender"
                            value={personalData?.gender}
                            onChange={handleInputChange}
                            style={{
                                marginTop: '-6px',
                                height: '35px',
                                border: '1.3px solid #AEAEAE',
                                fontSize: '0.8rem'
                            }}
                        >
                            <option>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other's</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="mobile" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Country
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={personalData?.country}
                            onChange={handleInputChange}
                            placeholder="Enter Country"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.3px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="mobile" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Location
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={personalData?.location}
                            onChange={handleInputChange}
                            placeholder="Enter Location"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.3px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="mobile" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Age
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            value={personalData?.age || 0}
                            onChange={handleInputChange}
                            placeholder="Enter Age"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.3px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="family_member" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Members in Family
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="family_member"
                            value={personalData?.family_member}
                            onChange={handleInputChange}
                            placeholder="Enter Members in family"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.3px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="father_name" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Father/ Mother Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="father_name"
                            value={personalData?.father_name}
                            onChange={handleInputChange}
                            placeholder="Enter Father , Mother Name"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.3px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="marriag_status" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Marriage Status
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="marriag_status"
                            value={personalData?.marriag_status}
                            onChange={handleInputChange}
                            placeholder="Enter Marriage Status"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.3px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="son_name" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Son/Daughter
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="son_name"
                            value={personalData?.son_name}
                            onChange={handleInputChange}
                            placeholder="Enter Son/Daughter"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.3px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="spouse_profession" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Spouse Profession
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="spouse_profession"
                            value={personalData?.spouse_profession}
                            onChange={handleInputChange}
                            placeholder="Enter Spouse Profession"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.3px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="email" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Do you have any disabilities?
                        </Form.Label>

                        <div className="d-flex ">
                            <Form.Check
                                type="radio"
                                id="email1"
                                name="disability"
                                label="Yes"
                                value="true"
                                onChange={handleInputChange}
                                className="custom-radio "
                            />

                            {/* Second radio option */}
                            <Form.Check
                                type="radio"
                                id="email2"
                                name="disability"
                                label="No"
                                value="false"
                                onChange={handleInputChange}
                                className="custom-radio mx-3"
                            />
                        </div>
                    </Form.Group>
                    <Form.Group controlId="disbility_name" className="mt-2">
                        {personalData?.disability == 'true' ? (
                            <Form.Control
                                type="text"
                                name="disbility_name"
                                value={personalData?.disbility_name}
                                onChange={handleInputChange}
                                placeholder="Enter desiablities name"
                                style={{
                                    marginTop: '-6px',
                                    fontSize: '0.8rem',
                                    height: '34px',
                                    border: '1.3px solid #AEAEAE'
                                }}
                            />
                        ) : (
                            ''
                        )}
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

                {/* {validated &&
                    !errors.email &&
                    !errors.phone &&
                    !errors.linkedin && (
                        <Alert variant="success" className="mt-3">
                            Form is valid!
                        </Alert>
                    )} */}
            </div>
        </>
    );
}

export default EditPersonalForm;
