import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import the Quill CSS
import './newjob.css';
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import oui_cross from '../../../../assets/images/oui_cross.png';
import Plus from '../../../../assets/images/Plus.png';

import axios from 'axios';
import BaseUrl from '../../../../services/BaseUrl';
import debounce from 'lodash.debounce';
import { toast } from 'react-toastify';
import { CreateJobContext } from '../../../../context/CreateJobContext';
import Loader from '../../loader/Loader';
import { useNavigate } from 'react-router-dom';

const CreateNewJob = () => {
    const navigate = useNavigate();
    const {
        lgShow,
        setLgShow,
        initiate_Payment,
        paymentLoading,
        fetch_job_status
    } = useContext(CreateJobContext);
    const [createJobData, setcreateJobData] = useState({
        job_title: '',
        industry: '',
        salary: '',
        experience: '',
        No_openings: '',
        location: '',
        job_type: '',
        work_type: '',
        education: '',
        country: '',
        Phone_Screening: false,
        HR_Round: false,
        Technical_Round: false,
        Managerial_Round: false,
        Panel_Round: false,
        Leadership_Round: false,
        Project_Round: false,
        GD_Round: false,
        Behavioral_Testing: false,
        Peer_Round: false
    });
    const [modalShowhide, setModalShow] = React.useState(false);
    const [suggestion, setSuggestion] = useState(null);
    const [filteredData, setFilteredData] = useState(suggestion);
    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState(''); // State to hold the current input skill

    const [editorHtml, setEditorHtml] = useState(''); // State to hold editor content
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [hide, setHide] = useState(null);
    const [pramot, setPramote] = useState('');

    // Handle the input change for skill field
    const handleCurrentSkillChange = e => {
        setCurrentSkill(e.target.value); // Set the value of the current skill
    };

    // Add the current skill to the array
    // Add the current skill directly to the array
    const addSkill = () => {
        if (currentSkill.trim() !== '' && skills.length < 5) {
            setSkills([...skills, currentSkill]); // Add the skill directly as a string
            setCurrentSkill(''); // Clear the input after adding the skill
        }
    };

    // Remove a skill from the list by its value (the skill string itself)
    const removeSkill = indexToRemove => {
        setSkills(skills.filter((_, index) => index !== indexToRemove)); // Remove skill by index
    };

    const handleFormChange = e => {
        const { name, value } = e.target;

        if (name === 'salary') {
            // If the value is not a number, return without updating state
            if (isNaN(value)) {
                alert('Please enter a valid number for salary');
                return;
            }
        }

        // Update createJobData with the new form input and include skillsData
        setcreateJobData(prev => ({
            ...prev, // Spread the existing state
            [name]: value, // Dynamically update the property based on the input's name
            skills: skills, // Ensure skillsData is always part of the updated state
            description: editorHtml
        }));
    };

    const handleCheckboxChange = field => {
        // Toggle the specified checkbox field
        setcreateJobData(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };
    const fetch_suggestion = async () => {
        try {
            const response = await axios.get(
                `${BaseUrl}/company/job/suggestion_description`
            );
            setSuggestion(response?.data);
        } catch (error) {}
    };

    const handleChange = html => {
        setEditorHtml(html); // Update the state with editor content
        filterData(html);
    };

    const convertToPlainText = searchTerm => {
        // Create a temporary DOM element
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = searchTerm; // Set the HTML content
        return tempDiv.innerText || tempDiv.textContent; // Return the plain text
    };

    const filterData = debounce(searchTerm => {
        const plainText = convertToPlainText(searchTerm).trim();

        if (plainText === '') {
            setFilteredData([]); // Clear any previous filtered data
            setShowSuggestions(false); // Hide suggestions
            return;
        }

        // console.log('searchTerm', plainText);

        // Filter suggestion data and ensure description is defined
        const filtered = suggestion.filter(item => {
            if (!item.description) return false; // Skip items with undefined description
            const words = item.description.toLowerCase().split(/\s+/);
            return words.some(word => word.includes(plainText.toLowerCase()));
        });

        setFilteredData(filtered);
        setShowSuggestions(filtered.length > 0); // Show suggestions if any are found
    }, 300);

    const handleSuggestionClick = suggestion => {
        setEditorHtml(suggestion?.description); // Update the editor with the clicked suggestion
        setShowSuggestions(false); // Hide suggestions after selection
    };

    // console.log('Suggestion', suggestion);
    const handleSubmit = async e => {
        e.preventDefault(); // Prevent default form submission
        setModalShow(prev => !prev);

        const token = localStorage.getItem('companyToken');

        // Decode the token to get the payload
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;

        // const plainText = convertToPlainText(editorHtml).trim();
        const jobDataWithSkillsAndDescription = {
            ...createJobData, // Spread existing job data
            skills: skills, // Add skills array
            description: editorHtml // Add the description from the editor
        };
        if (
            createJobData.Phone_Screening == false &&
            createJobData.HR_Round == false &&
            createJobData.Technical_Round == false &&
            createJobData.Managerial_Round == false &&
            createJobData.Panel_Round == false &&
            createJobData.Leadership_Round == false &&
            createJobData.Project_Round == false &&
            createJobData.GD_Round == false &&
            createJobData.Behavioral_Testing == false &&
            createJobData.Peer_Round == false
        ) {
            toast.error('Please select atleast one interview round');
        } else {
            try {
                const response = await axios.post(
                    `${BaseUrl}company/create_job/${companyId}`,
                    jobDataWithSkillsAndDescription
                );
                if (response?.status == 201 || response?.status == 200) {
                    toast.success('Job created successfully');
                    setLgShow(false);
                    await fetch_job_status();
                }
            } catch (error) {
                const customError = error?.response?.data?.error;
                toast.error(customError);
            }
        }
    };

    const handleSelect = e => {
        const selectedValue = e.target.value;
        setPramote(selectedValue);

        // Use the selectedValue directly instead of pramote, since setPramote is async
        if (selectedValue === 'Pramotejob') {
            setHide(false); // Show "Pramote job" button
        } else if (selectedValue === 'Createjob') {
            setHide(true); // Show "Create" button
        }
    };

    const handle_payment = () => {
        initiate_Payment(createJobData);
    };

    useEffect(() => {}, [filteredData]);

    useEffect(() => {
        fetch_suggestion();
    }, []);

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            if (!token) {
                navigate('/login');
            } else {
                navigate('/main/create-job');
            }
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        rendering();
    }, []);

    return (
        <>
            {paymentLoading ? (
                // <Spinner animation="border" variant="primary" />
                <div className="loader-div">
                    <Loader />
                </div>
            ) : (
                ''
            )}
            <div className="new-job">
                <img
                    src={oui_cross}
                    alt=""
                    style={{ float: 'right', width: '24px', cursor: 'pointer' }}
                    onClick={() => setLgShow(prev => !prev)}
                />
                <div className="heading-new-job">
                    <p>Create Job</p>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Label className="custom-input-group-label">
                                Job Title
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Ex: React.js"
                                    required
                                    name="job_title"
                                    value={createJobData?.job_title}
                                    onChange={handleFormChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Label className="custom-input-group-label">
                                Industry
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Ex: Technology"
                                    name="industry"
                                    value={createJobData?.industry}
                                    onChange={handleFormChange}
                                    required
                                />
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6} md={3}>
                            <Form.Label className="custom-input-group-label">
                                Salary
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    placeholder="Ex: 50000"
                                    name="salary"
                                    value={createJobData?.salary}
                                    onChange={handleFormChange}
                                    required
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Label className="custom-input-group-label">
                                Experience Required
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    placeholder="Ex: 3 years"
                                    name="experience"
                                    value={createJobData?.experience}
                                    onChange={handleFormChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Label className="custom-input-group-label">
                                No. of Openings
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    placeholder="Ex: 5"
                                    name="No_openings"
                                    value={createJobData?.No_openings}
                                    onChange={handleFormChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Label className="custom-input-group-label">
                                Location
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    placeholder="Ex: New York"
                                    name="location"
                                    value={createJobData?.location}
                                    onChange={handleFormChange}
                                />
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6} md={3}>
                            <Form.Label className="custom-input-group-label">
                                Job Type
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup>
                                <Form.Select
                                    name="job_type"
                                    value={createJobData?.job_type}
                                    onChange={handleFormChange}
                                    aria-label="Job Type"
                                >
                                    <option>Select</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Label className="custom-input-group-label">
                                Workplace Type
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup>
                                <Form.Select
                                    name="work_type"
                                    value={createJobData?.work_type}
                                    onChange={handleFormChange}
                                    aria-label="Workplace Type"
                                >
                                    <option>Select</option>
                                    <option value="On-site">On-site</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Label className="custom-input-group-label">
                                Education Required
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                placeholder="Ex: Degree"
                                name="education"
                                value={createJobData?.education}
                                onChange={handleFormChange}
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Label className="custom-input-group-label">
                                Country
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                placeholder="Ex: India"
                                name="country"
                                value={createJobData?.country}
                                onChange={handleFormChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col xs={12}>
                            <p className="skills-required">
                                Skills Required (Upto 5 keywords)
                                <span className="text-danger">*</span>
                            </p>
                        </Col>
                        <div className="sekils-display-section">
                            {skills.map((item, index) => (
                                <>
                                    <p key={index}>
                                        {item}{' '}
                                        <img
                                            src={oui_cross}
                                            alt="delete"
                                            onClick={() => removeSkill(index)}
                                        />
                                    </p>
                                </>
                            ))}
                        </div>
                        <Col xs={10}>
                            <Form.Control
                                type="text"
                                name="currentSkill"
                                placeholder="Add skill here"
                                value={currentSkill} // Bind the input to the current skill state
                                onChange={handleCurrentSkillChange} // Handle skill input change
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault(); // Prevent form submission
                                        addSkill(); // Call addSkill function when Enter is pressed
                                    }
                                }}
                            />
                        </Col>

                        <Col xs={2}>
                            <Button
                                variant="link"
                                disabled={skills.length >= 5}
                                onClick={addSkill}
                            >
                                <img
                                    src={Plus}
                                    alt="add"
                                    width="30px"
                                    style={{
                                        marginLeft: '-20px',
                                        marginTop: '-4px'
                                    }}
                                />
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={3}>
                            <Form.Check
                                className="check-boxes"
                                type="checkbox"
                                label="Phone Screening"
                                checked={createJobData.Phone_Screening}
                                onChange={() =>
                                    handleCheckboxChange('Phone_Screening')
                                }
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Check
                                className="check-boxes"
                                type="checkbox"
                                label="Hr round"
                                checked={createJobData.HR_Round}
                                onChange={() =>
                                    handleCheckboxChange('HR_Round')
                                }
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Check
                                className="check-boxes"
                                type="checkbox"
                                label="Technical round"
                                checked={createJobData.Technical_Round}
                                onChange={() =>
                                    handleCheckboxChange('Technical_Round')
                                }
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Check
                                className="check-boxes"
                                type="checkbox"
                                label="Managerial round"
                                checked={createJobData.Managerial_Round}
                                onChange={() =>
                                    handleCheckboxChange('Managerial_Round')
                                }
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Check
                                className="check-boxes"
                                type="checkbox"
                                label="Panel round"
                                checked={createJobData.Panel_Round}
                                onChange={() =>
                                    handleCheckboxChange('Panel_Round')
                                }
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Check
                                className="check-boxes"
                                type="checkbox"
                                label="Gd round"
                                checked={createJobData.GD_Round}
                                onChange={() =>
                                    handleCheckboxChange('GD_Round')
                                }
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Check
                                className="check-boxes"
                                type="checkbox"
                                label="Leadership round"
                                checked={createJobData.Leadership_Round}
                                onChange={() =>
                                    handleCheckboxChange('Leadership_Round')
                                }
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Check
                                className="check-boxes"
                                type="checkbox"
                                label="Project round"
                                checked={createJobData.Project_Round}
                                onChange={() =>
                                    handleCheckboxChange('Project_Round')
                                }
                            />
                        </Col>

                        <Col xs={6} md={3}>
                            <Form.Check
                                className="check-boxes"
                                type="checkbox"
                                label="Behavioral Testing"
                                checked={createJobData.Behavioral_Testing}
                                onChange={() =>
                                    handleCheckboxChange('Behavioral_Testing')
                                }
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <Form.Check
                                className="check-boxes"
                                type="checkbox"
                                label="Peer Round"
                                checked={createJobData.Peer_Round}
                                onChange={() =>
                                    handleCheckboxChange('Peer_Round')
                                }
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label className="custom-input-group-label">
                                Description
                                <span className="text-danger">*</span>
                            </Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <ReactQuill
                            value={editorHtml}
                            onChange={handleChange} // Update content on change
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link'],
                                    ['clean'] // Remove formatting button
                                ]
                            }}
                            formats={[
                                'header',
                                'bold',
                                'italic',
                                'underline',
                                'link',

                                'list' // Include list formats
                            ]}
                        />
                        {showSuggestions && (
                            <div className="suggestions-dropdown">
                                {filteredData.map((item, index) => (
                                    <div
                                        className="suggection-click"
                                        key={index}
                                        onClick={() =>
                                            handleSuggestionClick(item)
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: item.description
                                        }} // Correctly using dangerouslySetInnerHTML
                                    />
                                ))}
                            </div>
                        )}
                    </Row>

                    <Row className="mt-4">
                        <div className="mt-4 saveprofile">
                            {/* <select
                                onChange={e => handleSelect(e)}
                                style={{
                                    background: 'white',
                                    color: 'black',
                                    marginRight: '20px ',
                                    marginTop: '10px',
                                    padding: '6px',
                                    borderRadius: '8px'
                                }}
                            >
                                <option value="1">Create job </option>
                                <option value="2">Promote job</option>
                            </select> */}
                            {/* {pramot == '2' ? (
                                <Button
                                    className="create-job-btn-last"
                                    style={{ background: '#3B96E1' }}
                                    onClick={() => handle_payment()}
                                >
                                    Promote job
                                </Button>
                            ) : ( */}
                            <Button
                                className="create-job-btn-last"
                                type="submit"
                                style={{ background: '#3B96E1' }}
                                // onClick={handleSubmit}
                            >
                                Create
                            </Button>
                            {/* )} */}
                        </div>
                    </Row>
                </Form>
            </div>
        </>
    );
};

export default CreateNewJob;
