import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import oui_cross from '../../../../../assets/images/oui_cross.png';
import axios from 'axios';
import BaseUrl from '../../../../../services/BaseUrl';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { CandidateProfileContext } from '../../../../../context/candidateContext/CandidateProfileContext';

const AddNewProject = () => {
    const {
        handleShowProject,
        fetchCandidateProfile,
        handleShowEditProject,
        setShowEditProject
    } = useContext(CandidateProfileContext);
    const [year, setYears] = useState([
        '1 Year',
        '2 Year',
        '3 Year',
        '4 Year',
        '5 Year'
    ]);
    const [months, setMonths] = useState([
        '1 Month',
        '2 Month',
        '3 Month',
        '4 Month',

        '5 Month',
        '6 Month',
        '7 Month',
        '8 Month',
        '9 Month',
        '10 Month',
        '11 Month',
        '12 Month'
    ]);

    const [projectData, setProjectData] = useState({
        project_title: '',
        Project_status: '',
        Project_duration: '',
        project_details: '',
        project_site: '',
        role: '',
        skills_used: '',
        project_url: '',
        year: '',
        month: ''
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        setProjectData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handle_Experience_submit = async e => {
        e.preventDefault();

        const {
            project_title,
            Project_status,
            year,
            month,
            project_details,
            project_site,
            role,
            skills_used,
            project_url
        } = projectData;

        // Combine year and month to form project duration
        const Project_duration = {
            ...projectData,
            Project_duration: `${projectData.year} , ${projectData.month} `
        };

        // Create a new object with the data you want to send
        const data = {
            project_title,
            Project_status,
            Project_duration,
            project_details,
            project_site,
            role,
            skills_used,
            project_url
        };

        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            toast.error('No token found');
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken?._id;

        try {
            const response = await axios.put(
                `${BaseUrl}candidate/profile/pojects/${userId}`, // Adjust the endpoint path if necessary
                Project_duration // Send the data as JSON
            );
            if (response.status == 200 || response.status == 201) {
                toast.success('Project Details Added Successfully');
                await fetchCandidateProfile();
                handleShowProject();
            }
        } catch (error) {
            const errorMessage =
                error?.response?.data?.error || 'Something went wrong';
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <div>
                <img
                    src={oui_cross}
                    alt=""
                    style={{
                        float: 'right',
                        width: '24px',
                        cursor: 'pointer',
                        marginTop: '-10px'
                    }}
                    onClick={handleShowProject}
                />
                <p
                    style={{
                        textAlign: 'center',
                        color: '#051F50',
                        fontWeight: '600'
                    }}
                >
                    Project Details
                </p>
                <Form noValidate onSubmit={handle_Experience_submit}>
                    <Form.Group controlId="email" style={{ marginTop: '-8px' }}>
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Project Title <span className="text-danger">*</span>
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
                                    name="project_title"
                                    value={projectData?.project_title}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Food Delivery"
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
                            style={{ fontSize: '0.8rem', fontWeight: '400' }}
                        >
                            Details of Project{' '}
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
                                    name="project_details"
                                    value={projectData?.project_details}
                                    onChange={handleInputChange}
                                    placeholder="Ex: www.xyz.com"
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
                            style={{ fontSize: '0.8rem', fontWeight: '400' }}
                        >
                            Project URL <span className="text-danger">*</span>
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
                                    name="project_url"
                                    value={projectData?.project_url}
                                    onChange={handleInputChange}
                                    placeholder="Ex: www.xyz.com"
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
                            style={{ fontSize: '0.8rem', fontWeight: '400' }}
                        >
                            Project Status
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
                                <Form.Check
                                    className="peoject-radio"
                                    type="radio"
                                    id="radio1"
                                    name="Project_status"
                                    label="Inprogress"
                                    value="InProgress"
                                    checked={
                                        projectData.Project_status ===
                                        'InProgress'
                                    }
                                    onChange={handleInputChange}
                                    inline
                                />
                                <Form.Check
                                    className="peoject-radio"
                                    type="radio"
                                    id="radio1"
                                    name="Project_status"
                                    label=" Finished"
                                    value="Finished"
                                    checked={
                                        projectData.Project_status ===
                                        'Finished'
                                    }
                                    onChange={handleInputChange}
                                    inline
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="email" style={{ marginTop: '8px' }}>
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Project Duration
                            <span className="text-danger">*</span>
                        </Form.Label>
                        <Row style={{ marginTop: '-6px' }}>
                            <Col
                                md={6}
                                xs={12}
                                style={{
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Form.Select
                                    name="year"
                                    value={projectData?.year}
                                    onChange={handleInputChange}
                                    style={{
                                        height: '35px',
                                        border: '1px solid gray',

                                        fontSize: '0.8rem'
                                    }}
                                >
                                    <option>0 Year</option>
                                    {year.map((item, index) => (
                                        <>
                                            {' '}
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        </>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col
                                md={6}
                                xs={12}
                                style={{
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Form.Select
                                    name="month"
                                    value={projectData?.month}
                                    onChange={handleInputChange}
                                    style={{
                                        height: '35px',
                                        border: '1px solid gray',

                                        fontSize: '0.8rem'
                                    }}
                                >
                                    <option>0 Month</option>
                                    {months.map((item, index) => (
                                        <>
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        </>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group controlId="mobile" className="mt-2">
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '500' }}
                        >
                            Role <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="role"
                            value={projectData?.role}
                            onChange={handleInputChange}
                            placeholder="Ex:Team Lead"
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
                            Skills Used<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="skills_used"
                            value={projectData?.skills_used}
                            onChange={handleInputChange}
                            placeholder="Ex: Java , Ms Excel , Html"
                            style={{
                                marginTop: '-6px',
                                fontSize: '0.8rem',
                                height: '34px',
                                border: '1.4px solid #AEAEAE'
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="email" style={{ marginTop: '8px' }}>
                        <Form.Label
                            style={{ fontSize: '0.8rem', fontWeight: '400' }}
                        >
                            Project Site
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
                                <Form.Check
                                    type="radio"
                                    id="radio1"
                                    name="project_site"
                                    label="OnSite"
                                    value="OnSite"
                                    checked={
                                        projectData.project_site === 'OnSite'
                                    }
                                    onChange={handleInputChange}
                                    className="peoject-radio"
                                    inline
                                />
                                <Form.Check
                                    type="radio"
                                    id="radio2"
                                    name="project_site"
                                    label="OffSite"
                                    value="OffSite"
                                    className="peoject-radio"
                                    checked={
                                        projectData.project_site === 'OffSite'
                                    }
                                    onChange={handleInputChange}
                                    inline
                                />
                            </Col>
                        </Row>
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
            </div>
        </>
    );
};

export default AddNewProject;
