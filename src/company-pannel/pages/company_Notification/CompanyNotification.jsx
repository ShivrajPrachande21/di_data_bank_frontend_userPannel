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
    const token = localStorage.getItem('companyToken');
    const decodedToken = jwtDecode(token);
    const company_id = decodedToken?._id;

    useEffect(() => {
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
    }, []);
    // New Candidate Notification
    useEffect(() => {
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
    }, []);

    const handle_notification = () => {
        socket.emit('viewissuenotification', company_id);
        handleClose();
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
