import React, { useContext, useEffect } from 'react';
import { AppliedJobContext } from '../../../../context/candidateContext/AppliedJobContext';
import Verified from '../../../../assets/images/Verified.png';
import { Button, Image } from 'react-bootstrap';
import { SearchJobContext } from '../../../../context/candidateContext/SearchJobContext';
import { useLocation, useNavigate } from 'react-router-dom';
import AppliedJobs from './../appliedJobs/AppliedJobs';
const SavedJobs = () => {
    const { applyTo_job } = useContext(SearchJobContext);
    const { fetchSavedJob, savedJobData } = useContext(AppliedJobContext);
    const locate = useLocation();
    const navigate = useNavigate();
    console.log('savedJobData', savedJobData);
    const formatDate = dateString => {
        const options = { day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
    };

    const handleApply = async id => {
        await applyTo_job(id);
        await fetchSavedJob();
    };
    useEffect(() => {
        fetchSavedJob();
    }, [locate]);

    const handleNavigate = async id => {
        navigate(`/candidate-dashboard/view-job-details/${id}`);
    };
    return (
        <>
            <div className="saved-jobs-card">
                {savedJobData && savedJobData.length > 0
                    ? savedJobData.map((item, index) => (
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
                                                  Posted:
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
                                      <tr>
                                          <td
                                              style={{
                                                  paddingRight: '30px'
                                              }}
                                          >
                                              <span className="card-table-span">
                                                  Applicants:
                                              </span>{' '}
                                          </td>
                                          <td>
                                              {' '}
                                              <span className="card-table-span">
                                                  {
                                                      item?.applied_candidates
                                                          ?.length
                                                  }
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
                                          onClick={() => handleApply(item?._id)}
                                      >
                                          Apply
                                      </Button>
                                  </div>
                              </div>
                          </div>
                      ))
                    : ''}
            </div>
        </>
    );
};

export default SavedJobs;
