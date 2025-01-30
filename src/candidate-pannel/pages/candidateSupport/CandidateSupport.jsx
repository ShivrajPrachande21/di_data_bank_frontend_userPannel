import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
//const socket = io('http://65.20.91.47:4000');
//const socket=io('http://localhost:4000');
const socket = io('https://boardsearch.ai');
import {
    Button,
    Modal,
    Row,
    Table,
    OverlayTrigger,
    Tooltip,
    Col
} from 'react-bootstrap';
import SearchIconS from '../../../assets/images/SearchIconS.png';
import chatIcon from '../../../assets/images/chatIcon.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { CandidateSupportContext } from '../../../context/candidateContext/CandidateSupportContext';
import AddCandidateIssue from './addCandidateIssue/AddCandidateIssue';
import Sendmails from './Sendmail/SendMail';
import { Helmet } from 'react-helmet';

const CandidateSupport = () => {
    const {
        supportData,
        fetch_Candidate_issue,
        modalShow,
        setModalShow,
        mailModelShow,
        setMailModelShow
    } = useContext(CandidateSupportContext);
    const location = useLocation();
    const [SeacrhInput, SetSeacrhInput] = useState('');
    useEffect(() => {
        fetch_Candidate_issue();
    }, [location]);

    const navigate = useNavigate();
    function navigateChate(id) {
        navigate(`/candidate-dashboard/candidate-chat/${id}`);
    }

    const formatDate = dateString => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' for DD/MM/YYYY format
    };
    const fiteredData = supportData?.filter(item => {
        return (
            item?.Issue_type.toLowerCase().includes(
                SeacrhInput.toLowerCase()
            ) ||
            (item?.Ticket &&
                item?.Ticket.toLowerCase().includes(SeacrhInput.toLowerCase()))
        );
    });
    function rendering() {
        const render = localStorage.getItem('render');

        if (render === 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/login');
            } else {
                navigate('/candidate-dashboard/support-candidate');
            }
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        rendering();
    }, []);

    function RemovePath(imageUrl) {
        if (imageUrl) {
            return imageUrl.split('\\').pop();
        }
        return 'N/A';
    }

    function toCamelCase_Name(input) {
        if (typeof input == 'string') {
            return input
                ? input
                      .toLowerCase()
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')
                : null;
        } else {
            return input;
        }
    }

    const SendMail = props => (
        <Tooltip id="save-tooltip" {...props}>
            Click this button to send an email directly to the support team.
        </Tooltip>
    );

    const AddIssue = props => (
        <Tooltip id="save-tooltip" {...props}>
            Click this button to report your issue directly to the support team.
        </Tooltip>
    );

    const getButtonStyle = path => {
        if (location.pathname.includes(path)) {
            return {
                background: '#B4DDFF',
                color: '#051F50',
                border: 'none',
                width: '200px',

                border: '0.5px solid #5baaff',
                width: '200px'
            };
        } else {
            return {
                background: 'white',
                color: '#AEAEAE',
                border: 'none',
                width: '200px'
            };
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('Candidate_token');
        const decodedToken = jwtDecode(token);
        const candidate_id = decodedToken?._id;
        socket.connect();
        socket.emit('ViewNewMessage', candidate_id);
        socket.emit('messageNotification', candidate_id);
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        return () => {
            socket.off('notification');
            socket.disconnect();
        };
    }, []);

    return (
        <>
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setModalShow(false)}
                dialogClassName="add-modal-width"
            >
                <AddCandidateIssue />
            </Modal>

            <div className="support mt-2">
                <Row>
                    <div className="Search-support">
                        <OverlayTrigger placement="bottom" overlay={AddIssue}>
                            <Button
                                size="sm"
                                className="add-issue-btn"
                                onClick={() => setModalShow(prev => !prev)}
                            >
                                Add Issue +
                            </Button>
                        </OverlayTrigger>

                        <div className="search-bar-suport">
                            <img src={SearchIconS} alt="" width="20px" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={SeacrhInput}
                                onChange={e => SetSeacrhInput(e.target.value)}
                            />
                        </div>
                    </div>
                </Row>
                <Row className="mt-2">
                    <Table
                        bordered
                        responsive
                        className="custom-table "
                        style={{
                            overflowX: 'auto',
                            overflowY: 'auto'
                        }}
                    >
                        <thead>
                            <tr style={{ borderTop: 'none' }}>
                                <th
                                    style={{
                                        fontSize: '0.8rem',
                                        borderLeft: 'none',
                                        color: '#051F50'
                                    }}
                                    className="p-3"
                                    scope="col"
                                >
                                    Sr. No
                                </th>
                                <th
                                    style={{
                                        fontSize: '0.8rem',
                                        borderLeft: 'none',
                                        color: '#051F50'
                                    }}
                                    className="p-3"
                                    scope="col"
                                >
                                    Tickets
                                </th>
                                <th
                                    className="p-3"
                                    scope="col"
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#051F50'
                                    }}
                                >
                                    Issue Type
                                </th>
                                <th
                                    className="p-3"
                                    scope="col"
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#051F50'
                                    }}
                                >
                                    Description
                                </th>
                                <th
                                    className="p-3"
                                    scope="col"
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#051F50'
                                    }}
                                >
                                    Chat
                                </th>
                                <th
                                    className="p-3"
                                    scope="col"
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#051F50'
                                    }}
                                >
                                    File
                                </th>
                                <th
                                    className="p-3"
                                    scope="col"
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#051F50'
                                    }}
                                >
                                    Date
                                </th>
                                <th
                                    className="p-3"
                                    scope="col"
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#051F50'
                                    }}
                                >
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '0.8rem' }}>
                            {fiteredData?.map((item, index) => (
                                <>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item?.Ticket}</td>
                                        <td>{item?.Issue_type}</td>
                                        <td>{item?.description}</td>
                                        <td>
                                            <img
                                                src={chatIcon}
                                                alt=""
                                                width="20px"
                                                onClick={() =>
                                                    navigateChate(item?._id)
                                                }
                                            />
                                        </td>
                                        <td>{RemovePath(item?.file)}</td>
                                        <td>{formatDate(item?.createdDate)}</td>
                                        <td>
                                            <p
                                                style={{
                                                    color:
                                                        item?.status == 'solved'
                                                            ? 'green'
                                                            : item?.status ===
                                                              'reject'
                                                            ? 'red'
                                                            : '#051F50'
                                                }}
                                            >
                                                {toCamelCase_Name(
                                                    item?.status === 'solved'
                                                        ? 'Solved'
                                                        : item?.status ===
                                                          'reject'
                                                        ? 'Rejected'
                                                        : 'Pending'
                                                )}
                                            </p>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </div>
        </>
    );
};

export default CandidateSupport;
