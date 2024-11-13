import React, { useRef, useState } from 'react';
import './aiSearch.css';
import arrow_back from '../../../../assets/images/arrow_back.png';
import aiIcon from '../../../../assets/images/aiIcon.png';
import attachment from '../../../../assets/images/attachment.png';
import upload from '../../../../assets/images/upload.png';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, OverlayTrigger, Row } from 'react-bootstrap';
import { Axis } from 'echarts';
import axios from 'axios';
import AiLoader from './aiLoadier/AiLoader';
import { toast } from 'react-toastify';
const CompanyAiSearch = () => {
    const [hideFile, setHideFile] = useState(false);
    const [fileData, setFileData] = useState(null);
    const [description, setSearchData] = useState('');
    const [AiData, setAiData] = useState(null);
    const [loading, setLoading] = useState(false);
    const nvaigate = useNavigate();
    const fileRef = useRef();
    const handleHideFile = () => {
        setHideFile(prev => !prev);
        setFileData(null);
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        if (description == '') {
            setHideFile(false);
        } else {
        }
        setSearchData(value);
    };

    const handleFileUpload = () => {
        fileRef.current.click();
    };
    const handleFileChange = e => {
        const file = e.target.files[0];
        if (file) {
            setFileData(file);
        }
    };

    const fetchAIData = async () => {
        const formData = new FormData();
        if (fileData?.name) {
            formData.append('file', fileData);
        }

        if (description.trim() == '') {
            toast.error('Enter a prompt to Search');
        } else {
            try {
                setLoading(true);
                const response = await axios.post(
                    'http://65.20.91.47:5000/pythonapi/company_process_input',

                    // description: description

                    description ? { description: description } : formData
                );
                response && console.log('AI data:', response.data);
                setAiData(response?.data);
                if (response?.status == 200 || response?.status == 201) {
                    setLoading(false);
                    setHideFile(false);
                    setFileData(null);
                }
            } catch (error) {
                setLoading(false);
                setFileData(null);
                setHideFile(false);
                const errorMessage =
                    error?.response?.data?.error || 'An unknown error occurred';
                toast.error(errorMessage);
                console.error('Error fetching AI data:', error);
            }
        }
    };
    let len = AiData ? AiData.length : 0;

    return (
        <div
            style={{
                height: '100vh',
                width: '100%',
                padding: '10px',
                marginTop: '-12px'
            }}
        >
            <div className="top-ai-search-section">
                <div className="back-to-hire">
                    <img
                        src={arrow_back}
                        alt=""
                        onClick={() => nvaigate('/main/hire-candidate')}
                    />
                    <p>AI Assistant Search</p>
                </div>
                <div className="ai-seachBar">
                    <img src={attachment} alt="" onClick={handleHideFile} />
                    <input
                        type="text"
                        name="SearchData"
                        value={description}
                        onChange={e => handleInputChange(e)}
                        disabled={hideFile}
                        id=""
                        placeholder="Enter your prompt or Job Description:"
                    />
                    <button onClick={fetchAIData}>
                        <img src={aiIcon} alt="" />
                    </button>
                </div>
                {hideFile ? (
                    <div className="ai-file-uplaod">
                        <p>Upload Job Description</p>
                        <button onClick={handleFileUpload}>
                            {fileData ? fileData?.name : 'Browse from files'}{' '}
                            <img src={upload} alt="" />
                        </button>
                        <input
                            type="file"
                            className="d-none"
                            accept=".doc,.docx,.pdf"
                            ref={fileRef}
                            onChange={e => handleFileChange(e)}
                        />
                        <span>File Format : PDF , Word only.</span>
                    </div>
                ) : (
                    ''
                )}

                {/* <p
                style={{
                    color: '#051F50',
                    fontSize: '0.8rem',
                    marginTop: '6px'
                }}
            >
                Example:
            </p> */}
                <Row className="mt-2">
                    <Col xs={12}>
                        <div className="serach-result">
                            <div className="para1">
                                <p>AI Based Search Results : Top {len} </p>
                            </div>

                            <div className="download-email">
                                <Button
                                    size="sm"
                                    className="download-btn1"

                                    // disabled={isEmail_Disabled}
                                    // onClick={download_emails}
                                >
                                    <span>Download Resume</span>
                                </Button>
                                <Button
                                    className="download-btn1"
                                    size="sm"

                                    // onClick={download_resumes}
                                    // disabled={
                                    //     Subscription_Data[0]?.download_cv_limit ===
                                    //     false
                                    // }
                                >
                                    <span style={{ fontSize: '0.7rem' }}>
                                        Download Resume
                                    </span>
                                </Button>
                                <div className="select-all">
                                    <label htmlFor="">Select all</label>
                                    <Form>
                                        <Form.Check
                                            type="checkbox"
                                            id="custom-checkbox"
                                            // checked={selectAllChecked}
                                            // onChange={handleSelectAllChange}
                                        />
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="ai-search-result-section">
                <Row>
                    {loading ? (
                        <AiLoader />
                    ) : (
                        AiData?.map((candidate, index) => (
                            <Col xs={12} className="mb-2" key={index}>
                                <div className="result-array">
                                    {}
                                    <div
                                        className="result-left"
                                        // onClick={() =>
                                        // naviagte_view_candidate(candidate?._id)
                                        // }
                                    >
                                        <div className="result-img">
                                            <img
                                                // src={
                                                //     candidate?.candidateDetails?.profile
                                                //         ? candidate?.candidateDetails
                                                //               ?.profile
                                                //         : altprofile
                                                // }
                                                style={{
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                            />
                                        </div>
                                        <div className="result-text">
                                            <h4>
                                                {candidate?.city}

                                                {/* Tool-tip componet */}
                                                {/* {candidate?.state ? (
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                backgroundColor:
                                                                    'white',
                                                                padding:
                                                                    '2px 10px',
                                                                color: '#008000',
                                                                borderRadius: 3,
                                                                border: '1px solid #008000'
                                                            }}
                                                        >
                                                            Verified
                                                        </div>
                                                    }
                                                >
                                                    <img
                                                        // src={Verified}
                                                        alt="Verified"
                                                        width="19"
                                                    />
                                                </OverlayTrigger>
                                            ) : null} */}
                                            </h4>
                                            <p>{candidate?.state}</p>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <Form>
                                            <Form.Check
                                                type="checkbox"
                                                id="custom-checkbox"
                                                style={{
                                                    marginTop: '10px',
                                                    marginRight: '6px'
                                                }}
                                                // checked={selectedCandidates[index]}
                                                // onChange={handleCheckboxChange(
                                                //     index,
                                                //     candidate?._id
                                                // )}
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            </div>
        </div>
    );
};

export default CompanyAiSearch;
