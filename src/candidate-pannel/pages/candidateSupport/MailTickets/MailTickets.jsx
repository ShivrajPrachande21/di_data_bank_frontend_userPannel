import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
const socket = io('http://65.20.91.47:4000');
//const socket=io('http://localhost:4000');
import {
    Button,
    Modal,
    Row,
    Table,
    OverlayTrigger,
    Tooltip,
    Col
} from 'react-bootstrap';
import SendMails from '../Sendmail/SendMail';
import { CandidateSupportContext } from '../../../../context/candidateContext/CandidateSupportContext';
import BaseUrl from '../../../../services/BaseUrl';
import axios from 'axios';
const MailTickets = () => {
    const {
        mailModelShow,
        setMailModelShow,
        RemovePath,
        formatDate,
        toCamelCase_Name
    } = useContext(CandidateSupportContext);
    const [mailData, setMailData] = useState(null);

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

    const [loading, setLoading] = useState(true); // Add loading state

    const getAllMails = async () => {
        const token = localStorage.getItem('Candidate_token');

        if (!token) {
            setLoading(false); // Stop loading if no token
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id;
            const response = await axios.get(
                `${BaseUrl}candidate/get_mail_issue/${userId}`
            );
            setMailData(response?.data?.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

    useEffect(() => {
        getAllMails();
    }, []);
    return (
        <>
            <Modal
                show={mailModelShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setMailModelShow(false)}
                dialogClassName="add-modal-width"
            >
                <SendMails />
            </Modal>
            <div className="support mt-2">
                <Row>
                    <div className="Search-support">
                        <OverlayTrigger placement="bottom" overlay={SendMail}>
                            <Button
                                size="sm"
                                className="add-issue-btn"
                                onClick={() => setMailModelShow(true)}
                            >
                                Send Mail
                            </Button>
                        </OverlayTrigger>

                        <div className="search-bar-suport">
                            {/* <img src={SearchIconS} alt="" width="20px" /> */}
                            <input
                                type="text"
                                placeholder="Search"
                                onChange={e => SetSeacrhInput(e.target.value)}
                            />
                        </div>
                    </div>
                </Row>
                <Row className="mt-2">
                    {loading ? ( //e Show loading stat
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <span>Loading...</span>
                        </div>
                    ) : (
                        <Table
                            bordered
                            responsive
                            className="custom-table"
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
                                        className="p-3"
                                        scope="col"
                                        style={{
                                            fontSize: '0.8rem',
                                            color: '#051F50'
                                        }}
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
                                        Subject
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
                                {mailData && mailData.length > 0 ? (
                                    mailData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.Ticket}</td>
                                            <td>{item?.Issue_type}</td>
                                            <td>{item?.description}</td>
                                            <td>{RemovePath(item?.file)}</td>
                                            <td>
                                                {formatDate(item?.createdDate)}
                                            </td>
                                            <td>
                                                <p
                                                    style={{
                                                        color:
                                                            item?.status ===
                                                            'solved'
                                                                ? 'green'
                                                                : item?.status ===
                                                                  'reject'
                                                                ? 'red'
                                                                : '#051F50'
                                                    }}
                                                >
                                                    {toCamelCase_Name(
                                                        item?.status
                                                    )}
                                                </p>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            style={{ textAlign: 'center' }}
                                        >
                                            No data to show...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </Row>
            </div>
        </>
    );
};

export default MailTickets;
