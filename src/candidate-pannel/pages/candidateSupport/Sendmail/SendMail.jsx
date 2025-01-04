import React, { useContext, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ep_back from '../../../../assets/images/ep_back.png';
import uploadImg from '../../../../assets/images/uploadImg.png';
import blackCross from '../../../../assets/images/blackCross.png';
import { useSupport } from '../../../../context/SupportContext';
import axios from 'axios';
import BaseUrl from '../../../../services/BaseUrl';
import { CandidateSupportContext } from '../../../../context/candidateContext/CandidateSupportContext';

import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { f } from 'html2pdf.js';
const SendMails = () => {
    const { mailModelShow, setMailModelShow } = useContext(
        CandidateSupportContext
    );
    const [loading, setLoading] = useState(false);
    const [FileData, setFileData] = useState(null);
    const [SeacrhInput, SetSeacrhInput] = useState('');
    const [formData, setFormData] = useState({
        Subject: '',
        Message: '',
        file: null
    });

    const fileRef = useRef();

    // Handle text input changes
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle file input changes
    const handleFileChange = e => {
        setFormData({
            ...formData,
            file: e.target.files[0] // Only select the first file if multiple files are selected
        });
        const file = e.target.files[0];
        setFileData(file);
    };

    // Handle form submission
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        if (!formData?.file) {
            toast.error('please uplaod File');
            setLoading(false);
            return;
        }
        try {
            // Prepare form data
            const formDataToSend = new FormData();
            formDataToSend.append('Subject', formData.Subject);
            formDataToSend.append('Message', formData.Message);
            formDataToSend.append('file', formData.file);

            const token = localStorage.getItem('Candidate_token');
            if (!token) throw new Error('No token found');

            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            // Send the form data via POST request
            const response = await axios.post(
                `${BaseUrl}candidate/send/mail/${userId}`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token in headers
                        'Content-Type': 'multipart/form-data' // Necessary for file uploads
                    }
                }
            );

            // Check if the response status is OK
            if (response.status == 200 || response.status == 201) {
                toast.success('Mail Send Successfully');
                setMailModelShow(prev => !prev);
                setLoading(false);
                setFormData({
                    Subject: '',
                    Message: '',
                    file: null
                });
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            const customError = error?.response?.data?.error;
            toast.error(customError);
            setLoading(false);
        }
    };

    const handle_file = () => {
        fileRef.current.click();
    };

    return (
        <div className="add-issue" style={{ padding: '30px 40px' }}>
            <img
                src={ep_back}
                alt=""
                width="20px"
                onClick={() => setMailModelShow(prev => !prev)}
                style={{ cursor: 'pointer' }}
            />

            <p
                style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    color: '#424242'
                }}
            >
                Send Mail
            </p>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName">
                    <Form.Label style={{ fontSize: '0.8rem' }}>
                        Enter your subject{' '}
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="Subject"
                        required
                        value={formData.Subject}
                        onChange={handleChange}
                        placeholder="Enter subject"
                        style={{ background: '#F5F5F5' }}
                    />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mt-3">
                    <Form.Label style={{ fontSize: '0.8rem' }}>
                        Describe your Issue
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        name="Message"
                        required
                        value={formData.Message}
                        onChange={handleChange}
                        placeholder="Enter Message "
                        style={{ background: '#F5F5F5' }}
                    />
                </Form.Group>

                <div
                    className="upload-img mt-2"
                    style={{ display: 'flex', cursor: 'pointer' }}
                    onClick={handle_file}
                >
                    <img
                        src={uploadImg}
                        alt=""
                        height="20px"
                        style={{ marginRight: '10px' }}
                    />
                    <p style={{ fontSize: '0.8rem' }}>
                        {FileData
                            ? FileData?.name
                            : 'Upload a screenshot of the Issue'}
                    </p>
                </div>

                <input
                    style={{ display: 'none' }}
                    type="file"
                    ref={fileRef}
                    onChange={handleFileChange}
                />

                {loading ? (
                    <Button
                        variant="primary"
                        type="submit"
                        className="mt-3"
                        style={{ width: '100%', background: '#3B96E1' }}
                    >
                        Loading
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        type="submit"
                        className="mt-3"
                        style={{ width: '100%', background: '#3B96E1' }}
                    >
                        Submit
                    </Button>
                )}
            </Form>
        </div>
    );
};

export default SendMails;
