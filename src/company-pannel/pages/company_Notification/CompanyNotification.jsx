import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
import { Link,useNavigate } from 'react-router-dom';
import { HireCandidateContext } from '../../../context/HireCandidateContex';
import blackCross from '../../../assets/images/blackCross.png';
import Cross from '../../../assets/images/Cross.png';
//const socket = io('http://65.20.91.47:4000');
//const socket = io('http://localhost:4000');
const socket = io('https://boardsearch.ai');
import NotificationList from './Notification';

const CompanyNotification = ({ handleClose }) => {
    const { handleCloseHire, showHire, SetShowHire, show, setShow } =
        useContext(HireCandidateContext);
    const [notifications, setNotifications] = useState([]);
    const [NewCandidate, setNewCandidate] = useState([]);
    const [newCompanyNot, SetNewCompanyNote] = useState([]);
    const [profileView, SetProfileView] = useState([]);
    const [ShortlistNot, SetShortlistNot] = useState([]);
    const [candidateToken, setCandidateToken] = useState('');
    const [changeButton, setChangeButton] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const render = localStorage.getItem('render');
        if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const company_id = decodedToken?._id;
            socket.connect();

            socket.emit('issuenotification', company_id);

            socket.on('notification', newNotification => {
                setNotifications(newNotification);
            });

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });

            return () => {
                socket.off('notification');
                socket.disconnect();
            };
        } else {
            const token = localStorage.getItem('Candidate_token');
            const decodedToken = jwtDecode(token);
            const candidate_id = decodedToken?._id;

            socket.connect();

            socket.emit('CandidateIssuenotification', candidate_id);

            socket.on('CandidateNotification', newNotification => {
                setNotifications(newNotification);
            });

            socket.emit('newCompannynotification', candidate_id);

            socket.on('companynotification', newNotification => {
                SetNewCompanyNote(newNotification);
            });

            socket.emit('getcvviewnotification', candidate_id);
            socket.on('companyViewnotification', data => {
                SetProfileView(data);
            });

            socket.emit('getshortlistnotification', candidate_id);
            socket.on('shortlistenotification', data => {
                SetShortlistNot(data);
            });

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });

            return () => {
                socket.off('notification');
                socket.disconnect();
            };
        }
    }, []);

    // New Candidate Notification
    useEffect(() => {
        const render = localStorage.getItem('render');
        if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const company_id = decodedToken?._id;

            socket.connect(company_id);

            socket.emit('newCandidatenotification', company_id);

            socket.on('candidatenotification', newNotification => {
                setNewCandidate(newNotification);
            });

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });

            return () => {
                socket.off('notification');
                socket.disconnect();
            };
        }
    }, []);

    const handle_notification = () => {
        const render = localStorage.getItem('render');
        if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            const decodedToken = jwtDecode(token);
            const company_id = decodedToken?._id;
            socket.emit('viewissuenotification', company_id);
            handleClose();
        } else {
            const token = localStorage.getItem('Candidate_token');
            const decodedToken = jwtDecode(token);
            const candidate_id = decodedToken?._id;
            socket.emit('viewissuenotifications', candidate_id);
            handleClose();
        }
    };
    useEffect(() => {
        const render = localStorage.getItem('render');
        if (render == 'candidate') {
            const Candiatetoken = localStorage.getItem('Candidate_token');

            const decodedToken = jwtDecode(Candiatetoken);
            const company_id = decodedToken?._id;
            setCandidateToken(company_id);
        } else {
        }
    }, []);

    const handleCloseNewCompany = id => {
        socket.emit('companyviewnotification', candidateToken, id);
        socket.on('companyview', data => {});
        setShow(false);
    };

    const handleCloseViewProfile = cmpId => {
        socket.emit('companyviewnotification', candidateToken, cmpId);
        socket.on('companyview', data => {});
        setShow(false);
    };

    const handleCloseShortlist = jobId => {
        socket.emit('userviewshortlist', candidateToken, jobId);
        socket.on('candidateview', data => {});
        setShow(false);
    };
    // const handleClearALL =async () => {
    //     NewCandidate?.map(item => {
    //        await handleCloseHire(item?._id);
    //     });
    // };

    const handleClearALL = async () => {
        for (const item of NewCandidate || []) {
            await handleCloseHire(item?._id);
        }
    };
    const handleClearALLCandidate = async () => {
        for (const item of profileView || []) {
            handleCloseViewProfile(item?.profile_view_company?.company_id);
        }
        for (const item of ShortlistNot || []) {
            handleCloseShortlist(item?._id);
        }
        for (const item of newCompanyNot || []) {
            handleCloseNewCompany(item?._id);
        }

        for(const item of notifications){
            handle_notification(item?._id);
        }
    };

    const handleCloseShortlistAndView=async(jobId)=>{
        // socket.emit('userviewshortlist', candidateToken, jobId);
        // socket.on('candidateview', data => {});
        setShow(false);
        localStorage.setItem('job_id',jobId);
    }

    useEffect(() => {
        const render = localStorage.getItem('render');

        if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            if (!token) {
                return;
            } else {
                setChangeButton(true);
            }
        } else {
            setChangeButton(false);
        }
    }, []);

       const [notificationss, setNotificationss] = useState([]);
   
       const handleMouseEnter = () => {
           const newNotifications = Array(profileView.length).fill(
           'Congratulations! Your profile has been shortlisted!'
           );
           setNotificationss(newNotifications);
       };
    return (
        <>
            <div
                style={{
                    position: 'relative',
                    height: '80vh',
                    overflowY: 'auto'
                }}
            >

                {/* {ShortlistNot.map((item, index) => (
                    <>
                        <p
                            key={index}
                            style={{
                                fontSize: '0.8rem',
                                background: '#B4DDFF',
                                padding: '6px',
                                display: 'flex',
                                justifyContent: 'space-around',
                                borderRadius: '10px'
                            }}
                        >
                            Congratulations! Your profile has been shortlisted!
                            <Link
                             to={`/candidate-dashboard/viewAppliedJobDetails/${item?._id}`}
                                onClick={() => handleCloseShortlistAndView(item?._id)}
                                style={{
                                    color: '#3B96E1',
                                    fontSize: '0.8rem',
                                    marginLeft: '10px',
                                    cursor: 'pointer'
                                }}
                            >
                                View
                            </Link>
                        </p>
                    </>
                ))} */}


{ShortlistNot.length > 0 &&notificationss.length==0&& (
                <div
                    style={{
                        background: 'linear-gradient(90deg, #B4DDFF, #80C2FF)',
                        padding: '12px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: '12px',
                        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)',
                        marginBottom: '15px',
                        transition: 'all 0.3s ease-in-out',
                        cursor: 'pointer',
                    }}
                   // onMouseEnter={handleMouseEnter}
                    onClick={handleMouseEnter}
                >
                    <p
                        style={{
                            margin: 0,
                            color: '#003366',
                            fontSize: '0.8rem',
                            fontWeight: 'normal',
                        }}
                    >
                      Congratulations! Your profile has been shortlisted!
                    </p>
                  
                         <span
                         style={{
                             background: '#0056D2',
                             color: '#FFFFFF',
                             padding: '1px 7px',
                             borderRadius: '25px',
                             fontSize: '0.85rem',
                             fontWeight: 'bold',
                             textAlign: 'center',
                             boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.2)',
                         }}
                     >
                         {ShortlistNot.length}
                     </span>
                
                   
                </div>
            )}
           {notificationss.map((notification, index) => (
  <div
    key={index}
    style={{
        background: 'linear-gradient(90deg, #B4DDFF, #80C2FF)',
      padding: '12px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '12px',
      boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)',
      marginBottom: '10px',
      animation: `slideIn 0.5s ease-in-out ${index * 0.2}s both`, // Add animation
    }}
  >
    <p
      style={{
        margin: 0,
         color: '#003366',
        fontSize: '0.8rem',
        fontWeight: 'normal',
      }}
    >
      {notificationss[index]}
       <Link
                                   to={`/candidate-dashboard/viewAppliedJobDetails/${ShortlistNot[index]?._id}`}
                                onClick={() => handleCloseShortlistAndView(ShortlistNot[index]?._id)}
                                      style={{
                                          color: '#3B96E1',
                                          fontSize: '0.8rem',
                                          marginLeft: '10px',
                                          cursor: 'pointer'
                                      }}
                                  >
                                      View
                                  </Link>
      
    </p>
  </div>
))}



{changeButton?(
                     <NotificationList profileView={notifications} message={` Your support request has been solved.`} Path={'/main/support'} Btn={true}/>
                ):(
                    <NotificationList profileView={notifications} message={` Your support request has been solved.`} Path={'/candidate-dashboard/support-candidate'} Btn={true}/>
                )}

                
<NotificationList profileView={NewCandidate} message={`  New Candidte Registered.`}/>

<NotificationList profileView={profileView} message={` Good news! A company just viewed your CV.`}/>

<NotificationList profileView={newCompanyNot} message={` A new company has joined our platform!`}/>


            </div>
            {changeButton ? (
                <button
                    style={{
                        position: 'absolute',
                        bottom: '14px',
                        right: '16px',
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        background: '#3B96E1'
                    }}
                    onClick={handleClearALL}
                >
                    CLear All
                </button>
            ) : (
                <button
                    style={{
                        position: 'absolute',
                        bottom: '14px',
                        right: '16px',
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        background: '#3B96E1'
                    }}
                    onClick={handleClearALLCandidate}
                >
                    Clear All{' '}
                </button>
            )}
        </>
    );
};

export default CompanyNotification;
