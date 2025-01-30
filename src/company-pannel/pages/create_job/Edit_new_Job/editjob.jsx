import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import the Quill CSS
import '../create_new_Job/newjob.css'
import {
    Button,
    Col,
    Form,
    InputGroup,
    Modal,
    Row,
    Spinner
} from 'react-bootstrap';
import oui_cross from '../../../../assets/images/oui_cross.png';
import Plus from '../../../../assets/images/Plus.png';

import axios from 'axios';
import BaseUrl from '../../../../services/BaseUrl';
import debounce from 'lodash.debounce';
import { toast } from 'react-toastify';
import { CreateJobContext } from '../../../../context/CreateJobContext';
import Loader from '../../loader/Loader';
import { useNavigate } from 'react-router-dom';

const EditNewJob = () => {
    const navigate = useNavigate();
    const {
        SetEditShow,
        EditId
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
        salaryType: '',
        Job_Link: '',
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

    const [suggestion, setSuggestion] = useState(null);
    const [filteredData, setFilteredData] = useState(suggestion);
    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');

    const [editorHtml, setEditorHtml] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [JD_Status, SetJD_status] = useState();
    const [applyLoading, SetApplyLoading] = useState(false);

    const handleCurrentSkillChange = e => {
        setCurrentSkill(e.target.value);
    };

    const addSkill = () => {
        if (currentSkill.trim() !== '' && skills.length < 5) {
            setSkills([...skills, currentSkill]);
            setCurrentSkill('');
        }
    };

    const removeSkill = indexToRemove => {
        setSkills(skills.filter((_, index) => index !== indexToRemove)); // Remove skill by index
    };

    const handleFormChange = e => {
        const { name, value } = e.target;

        setcreateJobData(prev => ({
            ...prev,
            [name]: value,
            skills: skills,
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
        setEditorHtml(html);
        filterData(html);
    };

    const convertToPlainText = searchTerm => {
        // Create a temporary DOM element
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = searchTerm;
        return tempDiv.innerText || tempDiv.textContent;
    };

    const filterData = debounce(searchTerm => {
        const plainText = convertToPlainText(searchTerm).trim();

        if (plainText === '') {
            setFilteredData([]);
            setShowSuggestions(false);
            return;
        }

        const filtered = suggestion.filter(item => {
            if (!item.description) return false;
            const words = item.description.toLowerCase().split(/\s+/);
            return words.some(word => word.includes(plainText.toLowerCase()));
        });

        setFilteredData(filtered);
        setShowSuggestions(filtered.length > 0);
    }, 300);

    const handleSuggestionClick = suggestion => {
        setEditorHtml(suggestion?.description);
        setShowSuggestions(false);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (createJobData.salaryType == '') {
            toast.error('Please select Salary type');
            return;
        }
        const jobDataWithSkillsAndDescription = {
            ...createJobData,
            skills: skills,
            description: editorHtml
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
                const response = await axios.put(
                    `${BaseUrl}company/edit_job/${EditId}`,
                    jobDataWithSkillsAndDescription
                );
                if (response?.status == 201 || response?.status == 200) {
                    toast.success('Job edited successfully');
                    SetEditShow(false);
                }
            } catch (error) {
                const customError = error?.response?.data?.error;
                toast.error(customError);
            }
        }
    };

    const GetSingleData=async()=>{
        try{
            const response = await axios.get(
                `${BaseUrl}company/git_single_job/${EditId}`
            );
            if (response?.status == 201 || response?.status == 200) {
                setcreateJobData(response?.data);
                setSkills(response?.data?.skills);
                setEditorHtml(response?.data?.description);
                const salaryTypeYear = response?.data?.salary.includes('a year');
                const salaryTypeMonth = response?.data?.salary.includes('a month');

                const salary = response?.data?.salary
                .replace(/\s*a year$/, '')
                .replace(/\s*a month$/, '');
              
                setcreateJobData((prev) => ({ ...prev, salary:salary}));
                setcreateJobData((prev) => ({ 
                ...prev, 
                salaryType: salaryTypeYear ? 'a year' : salaryTypeMonth ? 'a month' : ''
            }));
            }
        }catch(error){
            toast.error(error?.response?.data?.error)
        }
    }

    useEffect(() => {
        GetSingleData()
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

    const AI_decrease_Token = async () => {
        const token = localStorage.getItem('companyToken');

        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;
        try {
            const response = await axios.put(
                `${BaseUrl}/company/ai_count/reduce/${companyId}`
            );
            if (response.status == 200 || response.status == 201) {
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Generat_AI_JD = async () => {
        const requiredFields = [
            'job_title',
            'industry',
            'salary',
            'experience',
            'No_openings',
            'location',
            'job_type',
            'work_type',
            'education',
            'country',
            'salaryType'
        ];

        const missingFields = requiredFields.filter(
            field => !createJobData[field] || createJobData[field]== ''
        );

        if (missingFields.length > 0) {
            toast.error('All fields are required');
            return;
        }

        const jobDataWithSkillsAndDescription = {
            ...createJobData,
            skills: skills
        };
        SetApplyLoading(true);
        try {
            const response = await axios.post(
                `https://boardsearch.ai/pythonapi/create_description`,
                jobDataWithSkillsAndDescription
            );
            if (response.status == 200 || response.status == 201) {
                await AI_decrease_Token();
                const responseHtml = response?.data
                    .replace(/^```html\s*/, '')
                    .replace(/```$/, '');
                setEditorHtml(responseHtml);
                SetApplyLoading(false);
            }
        } catch (error) {
            const customError = error?.response?.data?.error;
            toast.error(customError);
        }
    };

    const AI_Button_Token = async () => {
        const token = localStorage.getItem('companyToken');

        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;
        try {
            const response = await axios.get(
                `${BaseUrl}/company/ai_jd/count/${companyId}`
            );
            if (response.status == 200 || response.status == 201) {
                SetJD_status(response?.data?.ai_job_description);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        rendering();
        AI_Button_Token();
    }, []);

    return (
        <>
           
            <div className="new-job">
                <img
                    src={oui_cross}
                    alt=""
                    style={{ float: 'right', width: '24px', cursor: 'pointer' }}
                    onClick={() =>SetEditShow(prev => !prev)}
                />
                <div className="heading-new-job">
                    <p>Edit Job</p>
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
                        <Col xs={6} md={6}>
                            <Form.Label className="custom-input-group-label">
                                Salary
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    style={{ width: '100px' }}
                                    aria-label="Small"
                                    placeholder="Ex: 50000"
                                    name="salary"
                                    value={createJobData?.salary}
                                    onChange={handleFormChange}
                                />
                                <Form.Select
                                    required
                                    name="salaryType"
                                    value={createJobData?.salaryType}
                                    onChange={handleFormChange}
                                >
                                    <option value="a year">Year</option>
                                    <option value="a month">Month</option>
                                </Form.Select>
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
                        <Col xs={6} md={9}>
                            <Form.Label className="custom-input-group-label">
                                Job Link
                            </Form.Label>
                            <InputGroup
                                size="sm"
                                className="mb-1 custom-input-group"
                            >
                                <Form.Control
                                    aria-label="Small"
                                    placeholder="Ex: Job_Link"
                                    name="Job_Link"
                                    value={createJobData?.Job_Link}
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
                                value={currentSkill}
                                onChange={handleCurrentSkillChange}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addSkill();
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
                        <Col md={3}>
                            {/* {JD_Status!=0?(<Button size="sm" onClick={Generat_AI_JD}>
                                Ai Job Description
                            </Button>):null} */}

                            {JD_Status !== 0 ? (
                                applyLoading ? (
                                    <Button size="sm" style={{ width: '66%' }}>
                                        <Spinner size="sm" />{' '}
                                    </Button>
                                ) : (
                                    <Button size="sm" onClick={Generat_AI_JD}>
                                        AI Job Description
                                    </Button>
                                )
                            ) : null}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <ReactQuill
                            value={editorHtml}
                            onChange={handleChange}
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link'],
                                    ['clean']
                                ]
                            }}
                            formats={[
                                'header',
                                'bold',
                                'italic',
                                'underline',
                                'link',

                                'list'
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
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </Row>

                    <Row className="mt-4">
                        <div className="mt-4 saveprofile">
                            <Button
                                className="create-job-btn-last"
                                type="submit"
                                style={{ background: '#3B96E1' }}
                                //onClick={handleSubmit}
                            >
                                Edit
                            </Button>
                            {/* )} */}
                        </div>
                    </Row>
                </Form>
            </div>
        </>
    );
};

export default EditNewJob;
