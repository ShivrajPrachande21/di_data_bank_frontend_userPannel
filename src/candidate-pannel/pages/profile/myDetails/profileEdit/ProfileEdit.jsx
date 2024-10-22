import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Accordion,
    Col,
    Row,
    Table,
    Image,
    Button,
    Form
} from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import avatar from '../../../../../assets/images/avatar.png';
import Profile from './../../../../../company-pannel/pages/profile/Profile';
import { useLocation } from 'react-router-dom';
import BaseUrl from '../../../../../services/BaseUrl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CandidateProfileContext } from '../../../../../context/candidateContext/CandidateProfileContext';
const ProfileEdit = () => {
    const { showEditModle, fetchCandidateProfile } = useContext(
        CandidateProfileContext
    );

    const fileinputRef = useRef();
    const [formData, setformData] = useState({
        summary: '',
        file: ''
    });
    const [file, SetFile] = useState(null);
    const [bgColor, setBgColor] = useState('white');

    const [personalDetails, setpersonalDetails] = useState(null);
    const locate = useLocation();

    const handleInputChange = e => {
        const { name, value } = e.target;

        setformData({ ...formData, [name]: value });
    };
    const handleImageChange = event => {
        const file = event.target.files[0]; // Get the first file from input
        if (file && file.type.match('image.*')) {
            // Validate if the file is an image
            SetFile(file);
            setformData(prevState => ({
                ...prevState,
                file: file // Store the image file in formData
            })); // Store the image file in state
        } else {
            alert('Please upload a valid image file.');
        }
    };

    const handleFileChange = () => {
        fileinputRef.current.click();
    };

    const fetchPersonaldetails = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        } else {
            const decodedToken = jwtDecode(token);
            const id = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate/profile/${id}`
                );

                const { summary, profileUrl } = response?.data?.data;
                setformData({
                    summary: summary || '',
                    file: response?.data?.profileUrl || ''
                });

                setpersonalDetails(response?.data);
            } catch (error) {}
        }
    };

    const editProfileData = async e => {
        e.preventDefault();

        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken?._id;
        const data = new FormData();
        data.append('summary', formData?.summary);
        data.append('file', file);

        try {
            const response = await axios.put(
                `${BaseUrl}candidate/profile/add_summary/${userId}`,
                data
            );

            if (response?.status === 200 || response?.status === 201) {
                toast.success('Profile updated successfully');
                await fetchCandidateProfile();
                showEditModle();
            }
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    useEffect(() => {
        const fun = async () => {
            await fetchPersonaldetails();
        };
        fun();
    }, [locate]);

    function Imagetester(url) {
        if (url instanceof File) {
            // Ensure formData.profile is a valid File object before creating the URL
            return URL.createObjectURL(url);
        } else {
            return url; // Return null if no valid file is present
        }
    }
    return (
        <>
            <Form noValidate onSubmit={editProfileData}>
                <div style={{ height: '100vh' }}>
                    <p
                        style={{
                            marginTop: '-10px',
                            textAlign: 'center',
                            color: '#051F50',
                            fontWeight: '600'
                        }}
                    >
                        Profile Details
                    </p>
                    <div className="text-start" style={{ fontSize: '0.8rem' }}>
                        <p style={{ marginBottom: '4px', fontWeight: '600' }}>
                            Profile Image
                        </p>
                    </div>
                    <div
                        className="text-start"
                        style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50px',
                            background: '#F8F8F8',
                            border: '1.2px solid #AEAEAE',
                            marginLeft: '6px'
                        }}
                    >
                        {formData?.file && (
                            <>
                                <Image
                                    src={Imagetester(formData?.file)}
                                    roundedCircle
                                    alt=""
                                    width="64"
                                    height="64"
                                />
                            </>
                        )}
                    </div>
                    <div className="mt-2">
                        <Button
                            size="sm"
                            style={{
                                fontSize: '0.7rem',
                                border: '1.2px solid #AEAEAE',
                                color: '#AEAEAE',
                                background: bgColor,

                                marginLeft: '-5px'
                            }}
                            onMouseOver={() => setBgColor('#3B96E1')} // Change to blue on hover
                            onMouseOut={() => setBgColor('white')}
                            onClick={handleFileChange}
                        >
                            Select Image
                        </Button>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            ref={fileinputRef}
                            style={{ display: 'none' }}
                        />
                    </div>

                    <Form.Group controlId="phone" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Summary
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="4"
                            name="summary"
                            value={formData?.summary}
                            onChange={e => handleInputChange(e)}
                            placeholder="Ex: World Development Corporation  "
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',

                                border: '1.3px solid #AEAEAE'
                            }}
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
                </div>
            </Form>
        </>
    );
};

export default ProfileEdit;
