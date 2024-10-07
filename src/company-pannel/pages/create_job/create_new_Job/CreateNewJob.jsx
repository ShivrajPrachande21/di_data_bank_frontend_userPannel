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

const CreateNewJob = () => {
    const { lgShow, setLgShow, initiate_Payment, paymentLoading } =
        useContext(CreateJobContext);
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
        country: ''
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

        console.log('searchTerm', plainText);

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

    console.log('Suggestion', suggestion);
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
        try {
            const response = await axios.post(
                `${BaseUrl}company/create_job/${companyId}`,
                jobDataWithSkillsAndDescription
            );
            if (response?.status == 201 || response?.status == 200) {
                toast.success('Job created successfully');
                setLgShow(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.error);
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

    useEffect(() => {
        console.log('Filered Suggestion', filteredData);
    }, [filteredData]);

    useEffect(() => {
        fetch_suggestion();
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
                <div className="heading-new-job">
                    <p>Create Job</p>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={6}>
                            <Form.Label className="custom-input-group-label">
                                Job Title
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Ex: World Development Corporation"
                                    required
                                    name="job_title"
                                    value={createJobData?.job_title}
                                    onChange={handleFormChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={6}>
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
                        <Col xs={3}>
                            <Form.Label className="custom-input-group-label">
                                Salary
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
                        <Col xs={3}>
                            <Form.Label className="custom-input-group-label">
                                Experience Required
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
                        <Col xs={3}>
                            <Form.Label className="custom-input-group-label">
                                No. of Openings
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
                        <Col xs={3}>
                            <Form.Label className="custom-input-group-label">
                                Location
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
                        <Col xs={3}>
                            <Form.Label className="custom-input-group-label">
                                Job Type
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
                        <Col xs={3}>
                            <Form.Label className="custom-input-group-label">
                                Workplace Type
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
                        <Col xs={3}>
                            <Form.Label className="custom-input-group-label">
                                Education Required
                            </Form.Label>
                            <Form.Control
                                placeholder="Ex:Degree"
                                name="education"
                                value={createJobData?.education}
                                onChange={handleFormChange}
                            />
                        </Col>
                        <Col xs={3}>
                            <Form.Label className="custom-input-group-label">
                                Country
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
                        <Col>
                            <Form.Label className="custom-input-group-label">
                                Description
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
                                    >
                                        {item.description}
                                    </div>
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
