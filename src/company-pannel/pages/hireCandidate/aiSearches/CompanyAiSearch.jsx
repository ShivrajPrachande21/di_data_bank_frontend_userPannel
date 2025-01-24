import React, { useContext, useEffect, useRef, useState } from 'react';
import './aiSearch.css';
import arrow_back from '../../../../assets/images/arrow_back.png';
import aiIcon from '../../../../assets/images/aiIcon.png';
import attachment from '../../../../assets/images/attachment.png';
import upload from '../../../../assets/images/upload.png';
import Verified from '../../../../assets/images/Verified.png';
import altprofile from '../../../../assets/images/altprofile.jpg';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, OverlayTrigger, Row } from 'react-bootstrap';
import { Axis } from 'echarts';
import axios from 'axios';
import AiLoader from './aiLoadier/AiLoader';
import { toast } from 'react-toastify';
import BaseUrl from '../../../../services/BaseUrl';
import { HireCandidateContext } from '../../../../context/HireCandidateContex';
const CompanyAiSearch = () => {
      const navigate = useNavigate();
     const {
            downloadSelectedEmails,
            handleDownload_Resume,
            get_Candidate_detials,
            AiData, setAiData
        } = useContext(HireCandidateContext);
    const [hideFile, setHideFile] = useState(false);
    const [fileData, setFileData] = useState(null);
    const [description, setSearchData] = useState('');

    const [aiPrompts, setAiprompts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [AllCustomId,SetAllCustomId]=useState([]);
    const nvaigate = useNavigate();
    const fileRef = useRef();


     const [selectAllChecked, setSelectAllChecked] = useState(false);
        const [selectedCandidates, setSelectedCandidates] = useState(
            AiData.map(() => false)
        );
        const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);

         const download_emails = async () => {
                    await downloadSelectedEmails(selectedCandidateIds);
            };

             const download_resumes = async () => {
                        await handleDownload_Resume(selectedCandidateIds);
                };


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
    const handleFileChange = async e => {
        const file = e.target.files[0];
        if (file) {
            setFileData(file);
            await UploadFileWithGetSuggetion(file);
        }
    };

    async function UploadFileWithGetSuggetion(file) {
        const formData = new FormData();

        formData.append('file', file);

        try {
            setLoading(true);
            const response = await axios.post(
                'http://65.20.91.47:5000/pythonapi/company_process_input',
                formData
            );

            setAiprompts(response?.data);

            if (response?.status == 200 || response?.status == 201) {
                setLoading(false);
                setHideFile(false);
                // setFileData(null);
            }
        } catch (error) {
            setLoading(false);
            setFileData(null);
            setHideFile(false);
            const errorMessage =
                error?.response?.data?.error || 'An unknown error occurred';
            toast.error(errorMessage);
        }
    }

    const fetchAIData = async () => {
        try {
            setAiData([])
            SetAllCustomId([])
            setLoading(true);
            let response;
            if (fileData && description) {
                response = await axios.post(
                    'http://65.20.91.47:5000/pythonapi/company_process_input',

                    { description: description }
                );
            } else {
                response = await axios.post(
                    'http://65.20.91.47:5000/pythonapi/company_process_input/one',

                    { description: description }
                );
            }
            SetAllCustomId()
            // setAiData(response?.data?.basic_results);
            let BasicData = response?.data?.basic_results;
            let EnterpriseData = response?.data?.enterprise_results;
            let PremiumData = response?.data?.premium_results;
            const allCustomIds = [
                ...(BasicData?.map((item) => item?.custom_id) || []),
                ...(EnterpriseData?.map((item) => item?.custom_id) || []),
                ...(PremiumData?.map((item) => item?.custom_id) || [])
            ];
            SetAllCustomId(allCustomIds);
            
            if (response?.status == 200 || response?.status == 201) {
                setAiprompts(null);
                setLoading(false);
                setHideFile(false);
                setFileData(null);
            }
        } catch (error) {
            setLoading(false);
            setFileData(null);
            setHideFile(false);
            const errorMessage =
                error?.response?.data?.error || 'A error occurred';
            toast.error(errorMessage);
        }
    };
    let len = AiData ? AiData.length : 0;


    useEffect(() => {
        if (AllCustomId.length > 0) {
            const fetchData = async () => {
                const response = await axios.post(
                    `${BaseUrl}company/get_ai/candidate`,
                    {AllCustomId:AllCustomId}
                );
                setAiData(response?.data?.data);
            };
            fetchData();
        }
    }, [AllCustomId]);

    const handleSelectAllChange = e => {
        const isChecked = e.target.checked;
        setSelectAllChecked(isChecked);
        setSelectedCandidates(AiData.map(() => isChecked));

        if (isChecked) {
            setSelectedCandidateIds(
                AiData.map(candidate => candidate._id)
            );
        } else {
            setSelectedCandidateIds([]);
        }
    };

    const handleCheckboxChange = (index, candidate_id) => e => {
        const isChecked = e.target.checked;
        const updatedSelections = [...selectedCandidates];
        updatedSelections[index] = isChecked;
        setSelectedCandidates(updatedSelections);

        setSelectedCandidateIds(prevIds => {
            if (isChecked) {
                return [...prevIds, candidate_id];
            } else {
                return prevIds.filter(id => id !== candidate_id);
            }
        });

        setSelectAllChecked(updatedSelections.every(Boolean));
    };

      const naviagte_view_candidate = async id => {
            if (!id) {
                return;
            } 
                    await get_Candidate_detials(id);
    
                    navigate(`/main/view-candidate-details/${id}`);
        };

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
                            <img
                                src={fileData?.name ? Verified : upload}
                                alt=""
                            />
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

                <p
                    style={{
                        color: '#051F50',
                        fontSize: '0.8rem',
                        marginTop: '6px'
                    }}
                >
                    Example:
                </p>
                {aiPrompts && (
                    <Row>
                        <Col>
                            <div className="ai-prompts-suggescton">
                                <div
                                    className="ai-prompts-cards"
                                    onClick={() =>
                                        setSearchData(aiPrompts?.suggestion1)
                                    }
                                >
                                    <p>{aiPrompts?.suggestion1}</p>
                                </div>
                                <div
                                    className="ai-prompts-cards"
                                    onClick={() =>
                                        setSearchData(aiPrompts?.suggestion2)
                                    }
                                >
                                    <p>{aiPrompts?.suggestion2}</p>
                                </div>
                                <div
                                    className="ai-prompts-cards"
                                    onClick={() =>
                                        setSearchData(aiPrompts?.suggestion3)
                                    }
                                >
                                    <p>{aiPrompts?.suggestion3}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                )}

                {AiData ? (
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
                                        onClick={download_resumes}
                                    >
                                        <span>Download Resume</span>
                                    </Button>
                                    <Button
                                        className="download-btn1"
                                        size="sm"

                                        onClick={download_emails}
                                    >
                                        <span style={{ fontSize: '0.7rem' }}>
                                            Download Email
                                        </span>
                                    </Button>
                                    <div className="select-all" style={{height:'33px',marginTop:'6px'}}>
                                        <label htmlFor="">Select all</label>
                                        <Form>
                                            <Form.Check
                                                type="checkbox"
                                                id="custom-checkbox"
                                                checked={selectAllChecked}
                                                onChange={handleSelectAllChange}
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                ) : (
                    ''
                )}
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
                                                              onClick={() =>
                                                                  naviagte_view_candidate(candidate?._id)
                                                              }
                                                          >
                                                              <div className="result-img">
                                                                  <img
                                                                      src={
                                                                          candidate
                                                                              ?.profile
                                                                              ? candidate
                                                                                    ?.profile
                                                                              : altprofile
                                                                      }
                                                                      style={{
                                                                          width: '100%',
                                                                          height: '100%'
                                                                      }}
                                                                  />
                                                              </div>
                                                              <div className="result-text">
                                                                  <h4>
                                                                      {candidate?.BasicDetails[0]?.name}
                          
                                                                      {/* Tool-tip componet */}
                                                                      {/* {candidate?.personalDetails[0]
                                                                          ?.Aadhar_verified_status &&
                                                                      candidate?.personalDetails[0]
                                                                          ?.Pan_verified_status ? (
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
                                                                                  src={Verified}
                                                                                  alt="Verified"
                                                                                  width="19"
                                                                              />
                                                                          </OverlayTrigger>
                                                                      ) : null} */}
                                                                  </h4>
                                                                  <p>
                                                                      {
                                                                          candidate?.WorkDetails
                                                                              ?.aspiring_position
                                                                      }
                                                                  </p>
                                                              </div>
                                                          </div>
                                                          <div className="right-">
                                                              <Form>
                                                                  <Form.Check
                                                                      type="checkbox"
                                                                      id="custom-checkbox"
                                                                      style={{
                                                                          marginTop: '10px',
                                                                          marginRight: '6px'
                                                                      }}
                                                                      checked={selectedCandidates[index]}
                                                                      onChange={handleCheckboxChange(
                                                                          index,
                                                                          candidate?._id
                                                                      )}
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
