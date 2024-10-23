import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { HireCandidateContext } from '../../../context/HireCandidateContex';

const socket = io('http://localhost:4000');
const CompanyNotification = ({ handleClose }) => {
    const { handleCloseHire, showHire, SetShowHire, show, setShow } =
        useContext(HireCandidateContext);
    const [notifications, setNotifications] = useState([]);
    const [NewCandidate, setNewCandidate] = useState([]);
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
    }else{
        const token = localStorage.getItem('Candidate_token');
        const decodedToken = jwtDecode(token);
        const candidate_id = decodedToken?._id;

        socket.connect();

        socket.emit('CandidateIssuenotification', candidate_id);

        socket.on('CandidateNotification', newNotification => {
            setNotifications(newNotification);
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
        socket.connect();

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
        }else{
            const token = localStorage.getItem('Candidate_token');
            const decodedToken = jwtDecode(token);
            const candidate_id = decodedToken?._id;  
            socket.emit('viewissuenotifications', candidate_id);
        handleClose();
        }
    };

    return (
        <div>
            {notifications?.map((item, index) => (
                <p key={index}>
                    Your support request has been solved.
                    <Link
                        to="/main/support"
                        onClick={handle_notification}
                        style={{
                            color: '#3B96E1',
                            fontSize: '0.8rem',
                            marginLeft: '10px'
                        }}
                    >
                        View
                    </Link>
                </p>
            ))}
            {NewCandidate.map((item, index) => (
                <>
                    <p key={index}>
                        New Candidte Registered
                        <span
                            onClick={() => handleCloseHire(item?._id)}
                            style={{
                                color: '#3B96E1',
                                fontSize: '0.8rem',
                                marginLeft: '10px'
                            }}
                        >
                            View
                        </span>
                    </p>
                </>
            ))}
        </div>
    );
};

export default CompanyNotification;
