import React, { useContext, useEffect } from 'react';
import { Button, Col, Image } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Verified from '../../../../assets/images/Verified.png';
import { AppliedJobContext } from '../../../../context/candidateContext/AppliedJobContext';

const AppliedJobs = () => {
    const { id } = useParams();
    const locate = useLocation();
    const { fetch_applied_job, appliedJobData } = useContext(AppliedJobContext);
    const navigate = useNavigate();
    const handleNavigate = id => {
        navigate(`/candidate-dashboard/viewAppliedJobDetails/${id}`);
    };
    const formatDate = dateString => {
        const options = { day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
    };
    useEffect(() => {
        fetch_applied_job();
    }, [locate]);
    return (
        <>
            <div className="appliedJobs-card-div">
                {appliedJobData && appliedJobData.length > 0
                    ? appliedJobData.map((item, index) => (
                          <div
                              className="card-job search"
                              onClick={() => handleNavigate(item?._id)}
                              key={index}
                          >
                              <div className="search-job-top">
                                  <Image
                                      src={item?.profileUrl}
                                      roundedCircle
                                      alt="Profile"
                                      width="40" // Set the desired width
                                      height="40" // Set the desired height
                                  />
                                  <h6>
                                      {item?.job_title}{' '}
                                      <p
                                          style={{
                                              color: '#3B96E1',

                                              fontSize: '0.8rem',
                                              width: '180px' /* Adjust this value to your desired width */,
                                              wordWrap: 'break-word'
                                          }}
                                      >
                                          {item?.company_details
                                              ?.company_name || ''}
                                      </p>
                                  </h6>
                                  <div className="green-thik">
                                      {item?.company_details?.verified_batch
                                          .length > 0 ? (
                                          <img
                                              src={Verified}
                                              alt=""
                                              height="20px"
                                          />
                                      ) : null}
                                  </div>
                              </div>

                              <div>
                                  <table
                                      style={{
                                          cursor: 'pointer',
                                          marginTop: '-4px'
                                      }}
                                  >
                                      <tr>
                                          <th></th>
                                          <th></th>
                                      </tr>
                                      <tr>
                                          <td
                                              style={{
                                                  paddingRight: '30px'
                                              }}
                                          >
                                              <span className="card-table-span">
                                                  Experience:
                                              </span>{' '}
                                          </td>
                                          <td>
                                              {' '}
                                              <span className="card-table-span">
                                                  {item?.experience} Years
                                              </span>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td
                                              style={{
                                                  paddingRight: '30px'
                                              }}
                                          >
                                              <span className="card-table-span">
                                                  Loction:
                                              </span>{' '}
                                          </td>
                                          <td>
                                              {' '}
                                              <span className="card-table-span">
                                                  {item?.location}
                                              </span>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td
                                              style={{
                                                  paddingRight: '30px'
                                              }}
                                          >
                                              <span className="card-table-span">
                                                  Salary:
                                              </span>{' '}
                                          </td>
                                          <td>
                                              {' '}
                                              <span className="card-table-span">
                                                  {item?.salary} LPA
                                              </span>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td
                                              style={{
                                                  paddingRight: '30px'
                                              }}
                                          >
                                              <span className="card-table-span">
                                                  Qualification:
                                              </span>{' '}
                                          </td>
                                          <td>
                                              {' '}
                                              <span className="card-table-span">
                                                  {item?.education}
                                              </span>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td
                                              style={{
                                                  paddingRight: '30px'
                                              }}
                                          >
                                              <span className="card-table-span">
                                                  Poasted:
                                              </span>{' '}
                                          </td>
                                          <td>
                                              {' '}
                                              <span className="card-table-span">
                                                  {formatDate(
                                                      item?.createdDate
                                                  )}{' '}
                                                  days ago
                                              </span>
                                          </td>
                                      </tr>
                                  </table>
                                  <div
                                      className="search-job-bnt mt-2"
                                      // onClick={handleNavigate}
                                  >
                                      <Button
                                          size="sm"
                                          style={{
                                              background: '#B4DDFF',
                                              color: '#3B96E1',
                                              width: '100%',
                                              border: 'none'
                                          }}
                                      >
                                          Applied
                                      </Button>
                                  </div>
                                  <div className="status-div d-flex">
                                      <p>status:</p>
                                      <p
                                          className="application-p"
                                          style={{
                                              color:
                                                  item?.Shortlisted.length == 0
                                                      ? '#3B96E1'
                                                      : item?.Shortlisted
                                                            ?.length !== 0 &&
                                                        item?.Shortlisted[0]
                                                            ?.shorted_status ==
                                                            false &&
                                                        item?.Shortlisted[0]
                                                            ?.reject_status ==
                                                            false
                                                      ? 'green'
                                                      : item?.Shortlisted[0]
                                                            ?.shorted_status ==
                                                            true &&
                                                        item?.Shortlisted[0]
                                                            ?.short_Candidate
                                                            ?.offer_accepted_status ==
                                                            'Processing'
                                                      ? 'green'
                                                      : item?.Shortlisted[0]
                                                            ?.reject_status ==
                                                        true
                                                      ? 'red'
                                                      : item?.Shortlisted[0]
                                                            ?.short_Candidate
                                                            ?.offer_accepted_status ==
                                                        'Processing'
                                                      ? '#3B96E1'
                                                      : item?.Shortlisted[0]
                                                            ?.short_Candidate
                                                            ?.offer_accepted_status ==
                                                        'Accepted'
                                                      ? 'green'
                                                      : 'red'
                                          }}
                                      >
                                          {item?.Shortlisted.length == 0
                                              ? 'Application sent'
                                              : item?.Shortlisted?.length !==
                                                    0 &&
                                                item?.Shortlisted[0]
                                                    ?.shorted_status == false &&
                                                item?.Shortlisted[0]
                                                    ?.reject_status == false
                                              ? 'Application Shortlisted'
                                              : item?.Shortlisted[0]
                                                    ?.shorted_status == true &&
                                                item?.Shortlisted[0]
                                                    ?.short_Candidate
                                                    ?.offer_accepted_status ==
                                                    'Processing'
                                              ? 'Job offered'
                                              : item?.Shortlisted[0]
                                                    ?.reject_status == true
                                              ? 'Application Rejected'
                                              : item?.Shortlisted[0]
                                                    ?.short_Candidate
                                                    ?.offer_accepted_status ==
                                                'Processing'
                                              ? 'Application processing'
                                              : item?.Shortlisted[0]
                                                    ?.short_Candidate
                                                    ?.offer_accepted_status ==
                                                'Accepted'
                                              ? 'Hired'
                                              : 'Job offer rejected'}
                                      </p>
                                  </div>
                              </div>
                          </div>
                      ))
                    : ''}
            </div>
        </>
    );
};

export default AppliedJobs;
