import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotificationList = ({ profileView, message, Path, Btn }) => {
    const [notificationss, setNotificationss] = useState([]);

    const handleMouseEnter = () => {
        const newNotifications = Array(profileView.length).fill(message);
        setNotificationss(newNotifications);
    };

    return (
        <div>
            {profileView.length > 0 && notificationss.length == 0 && (
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
                        cursor: 'pointer'
                    }}
                    //onMouseEnter={handleMouseEnter}
                    onClick={handleMouseEnter}
                >
                    <p
                        style={{
                            margin: 0,
                            color: '#003366',
                            fontSize: '0.8rem',
                            fontWeight: 'normal'
                        }}
                    >
                        {message}
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
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        {profileView.length}
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
                        animation: `slideIn 0.5s ease-in-out ${
                            index * 0.2
                        }s both` // Add animation
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            color: '#003366',
                            fontSize: '0.8rem',
                            fontWeight: 'normal'
                        }}
                    >
                        {notificationss[index]}
                        {Btn ? (
                            <Link
                                to={Path}
                                style={{
                                    color: '#3B96E1',
                                    fontSize: '0.8rem',
                                    marginLeft: '10px',
                                    cursor: 'pointer'
                                }}
                            >
                                View
                            </Link>
                        ) : null}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default NotificationList;
