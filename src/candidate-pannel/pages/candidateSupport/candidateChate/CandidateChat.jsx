import React, { useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import arrow_back from '../../../../assets/images/arrow_back.png';
import chatuser from '../../../../assets/images/chatuser.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
import BaseUrl from './../../../../services/BaseUrl';
import axios from 'axios';
//const socket = io('http://65.20.91.47:4000');
//const socket=io('http://localhost:4000')
const socket = io('https://boardsearch.ai');
function CandidateChat() {
    const location = useLocation();
    const { id } = useParams();

    const navigateBack = useNavigate();
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [timeStamp, settimeStamp] = useState('');
    const [profile, SetProfile] = useState(null);

    // const token = localStorage.getItem('Candidate_token');
    // const decodedToken = jwtDecode(token);
    // const companyId = decodedToken?._id;

    const CandidateProfiles = async () => {
        const token = localStorage.getItem('Candidate_token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const id = decodedToken?._id;
            try {
                const response = await axios.get(
                    `${BaseUrl}candidate.profile/details/${id}`
                );
                if (response.status === 200) {
                    SetProfile(response?.data?.profile);
                }
            } catch (error) {}
        }
    };

    const token = localStorage.getItem('Candidate_token');
    let companyId = null;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            companyId = decodedToken?._id;
        } catch (error) {
            console.error('Failed to decode token:', error);
            // Optionally handle invalid token case here
            companyId = null;
        }
    } else {
        console.warn('No token found in localStorage.');
    }

    const formatDateTime = dateString => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            // second: '2-digit',
            hour12: true // Use 24-hour format; set to true for 12-hour format with AM/PM
        };
        return new Date(dateString).toLocaleString('en-GB', options); // 'en-GB' for DD/MM/YYYY HH:mm:ss format
    };

    const chatContainerRef = useRef(null);
    useEffect(() => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }, [chat]);

    useEffect(() => {
        socket.connect();

        socket.on('connect', () => {
            socket.emit('getAllMessage', id);
        });

        socket.on('chat', receivedMessages => {
            setChat(receivedMessages);
        });

        socket.on('message', newMessage => {});

        const messageListener = newMessage => {
            setChat(prevMessages => [...prevMessages, newMessage]);
        };

        socket.on('message', messageListener);

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        return () => {
            socket.off('message', messageListener);
            socket.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        const timestamps = new Date();
        const data = {
            refference_id: companyId,
            Issue_id: id,
            message: message,
            User_view: true
        };
        socket.emit('newMessage', data);
        socket.emit('adminMessagNot');
        setMessage('');
        settimeStamp(timestamps);
    };

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigateBack('/login');
            } else {
                navigateBack(`/candidate-dashboard/candidate-chat/${id}`);
            }
        } else {
            navigateBack('/login');
        }
    }

    const bindUrlOrPath = url => {
        let cleanBaseUrl = BaseUrl?.replace(/\/api\b/, '');
        let temp = `${cleanBaseUrl?.replace(/\/$/, '')}/${url?.replace(
            /\\/g,
            '/'
        )}`;

        return temp.replace(/([^:]\/)\/+/g, '$1');
    };

    useEffect(() => {
        const fun = async () => {
            await CandidateProfiles();
        };
        fun();
        rendering();
    }, []);

    useEffect(() => {
        return () => {
            setChat([]);
        };
    }, []);

    // console.log('chat', chat);
    return (
        <>
            <div className="Chatpage">
                <div className="chatCenter">
                    <div
                        className="arrowback"
                        onClick={() =>
                            navigateBack(
                                '/candidate-dashboard/support-candidate'
                            )
                        }
                    >
                        <img src={arrow_back} alt="" width="24px" />
                    </div>

                    <div className="chatdiv">
                        {/* <div className="chat-top-section">
                            <p>
                                Issue ID: <span>85</span>
                            </p>
                            <p>
                                Issue Date: <span>12/09/2024</span>
                            </p>
                            <p>
                                Issue Type: <span>85</span>
                            </p>
                            <br />
                        </div> */}
                        <p className="description-s">Issue Description:</p>
                        {/* <h3 className="h3-date">April: 24</h3> */}
                        <div className="showchat-div" ref={chatContainerRef}>
                            {chat &&
                                chat?.map((item, index) => (
                                    <>
                                        {item?.refference_id === companyId ? (
                                            <div
                                                key={index}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        item?.refference_id ===
                                                        companyId
                                                            ? 'flex-end'
                                                            : 'flx-start'
                                                }}
                                            >
                                                <div>
                                                    <div className="show_img1">
                                                        <p>You</p>
                                                        <div className="show_profile">
                                                            <img
                                                                src={
                                                                    profile
                                                                        ? bindUrlOrPath(
                                                                              profile
                                                                          )
                                                                        : 'img'
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="show_message1">
                                                        <p>{item?.message} </p>
                                                    </div>
                                                    <h5
                                                        style={{
                                                            fontSize: '0.6rem',
                                                            color: 'gray',
                                                            marginTop: '-10px',
                                                            textAlign: 'end',
                                                            marginRight: '32px'
                                                        }}
                                                    >
                                                        {formatDateTime(
                                                            item?.timestamp
                                                        )}
                                                    </h5>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        item?.refference_id ===
                                                        companyId
                                                            ? 'flex-end'
                                                            : 'flx-start'
                                                }}
                                            >
                                                <div>
                                                    <div className="show_img">
                                                        <div className="show_profile">
                                                            <img
                                                                src={chatuser}
                                                                alt=""
                                                            />
                                                        </div>

                                                        <p>Adim</p>
                                                    </div>
                                                    <div className="show_message">
                                                        <p>{item?.message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ))}
                        </div>
                        <div className="chatinput">
                            <input
                                style={{ width: '84%' }}
                                type="text"
                                placeholder="write a message..."
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                            <Button
                                size="sm"
                                style={{
                                    background: '#3B96E1',
                                    padding: '4px 18px'
                                }}
                                onClick={handleSendMessage}
                            >
                                send
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CandidateChat;
