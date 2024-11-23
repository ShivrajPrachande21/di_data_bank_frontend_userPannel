import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { HireCandidateContext } from '../../../context/HireCandidateContex';
import blackCross from '../../../assets/images/blackCross.png';
import Cross from '../../../assets/images/Cross.png';
const socket = io('http://65.20.91.47:4000');
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
    };

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

    return (
        <>
            <div
                style={{
                    position: 'relative',
                    height: '80vh',
                    overflowY: 'auto'
                }}
            >
                {notifications?.map((item, index) => (
                    <p key={index} style={{ fontSize: '0.8rem' }}>
                        Your support request has been solved.
                        <Link
                            to={
                                candidateToken
                                    ? '/candidate-dashboard/support-candidate'
                                    : '/main/support'
                            }
                            onClick={handle_notification}
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
                ))}
                {NewCandidate.map((item, index) => (
                    <>
                        <p key={index} style={{ fontSize: '0.8rem' }}>
                            New Candidte Registered
                            {/* <span
                                onClick={() => handleCloseHire(item?._id)}
                                style={{
                                    color: '#3B96E1',
                                    fontSize: '0.8rem',
                                    marginLeft: '10px',
                                    cursor: 'pointer'
                                }}
                            >
                                View
                            </span> */}
                        </p>
                    </>
                ))}
                {ShortlistNot.map((item, index) => (
                    <>
                        <p key={index} style={{ fontSize: '0.8rem' }}>
                            Congratulations! Your profile has been shortlisted!
                            {/* <Link
                                to="/candidate-dashboard/applied-job/applied-jobs"
                                onClick={() => handleCloseShortlist(item?._id)}
                                style={{
                                    color: '#3B96E1',
                                    fontSize: '0.8rem',
                                    marginLeft: '10px',
                                    cursor: 'pointer'
                                }}
                            >
                                View
                            </Link> */}
                        </p>
                    </>
                ))}

                {profileView.map((item, index) => (
                    <>
                        <p key={index} style={{ fontSize: '0.8rem' }}>
                            Good news! A company just viewed your CV.
                            {/* <span
                                onClick={() =>
                                    handleCloseViewProfile(
                                        item?.profile_view_company?.company_id
                                    )
                                }
                                style={{
                                    color: '#3B96E1',
                                    fontSize: '0.8rem',
                                    marginLeft: '10px',
                                    cursor: 'pointer'
                                }}
                            >
                                View
                            </span> */}
                        </p>
                    </>
                ))}

                {newCompanyNot.map((item, index) => (
                    <>
                        <p key={index} style={{ fontSize: '0.8rem' }}>
                            A new company has joined our platform!
                            {/* <span
                                onClick={() => handleCloseNewCompany(item?._id)}
                                style={{
                                    color: '#3B96E1',
                                    fontSize: '0.8rem',
                                    marginLeft: '10px',
                                    cursor: 'pointer'
                                }}
                            >
                                View
                            </span> */}
                        </p>
                    </>
                ))}
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
                    CLear ALL
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
                    Clear ALL Notification{' '}
                    <img src={Cross} alt="" width="20px" />
                </button>
            )}
        </>
    );
};

export default CompanyNotification;
