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
import SendMails from '../Sendmail/SendMail';
import { CandidateSupportContext } from '../../../../context/candidateContext/CandidateSupportContext';
import BaseUrl from '../../../../services/BaseUrl';
import axios from 'axios';
import { Helmet } from 'react-helmet';
const MailTickets = () => {
    const {
        mailModelShow,
        setMailModelShow,
        RemovePath,
        formatDate,
        toCamelCase_Name,
        getAllMails,
        mailData,
        setMailData,
        loading,
        setLoading
    } = useContext(CandidateSupportContext);
    const [SeacrhInput, SetSeacrhInput] = useState('');

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

    const fiteredData = mailData?.filter(item => {
        return (
            (item?.Issue_type &&
                item?.Issue_type.toLowerCase().includes(
                    SeacrhInput.toLowerCase()
                )) ||
            (item?.Ticket &&
                item?.Ticket.toLowerCase().includes(SeacrhInput.toLowerCase()))
        );
    });

    useEffect(() => {
        getAllMails();
    }, []);
    return (
        <>
            <Helmet>
                <title>Mail Support</title>
                <meta
                    name="description"
                    content="Find your dream job on our platform."
                />
                <meta
                    name="keywords"
                    content="jobs, career, search jobs, employment"
                />
            </Helmet>
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
                                {fiteredData && fiteredData.length > 0 ? (
                                    fiteredData.map((item, index) => (
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
                                                        item?.status ===
                                                            'solved'
                                                            ? 'Solved'
                                                            : item?.status ===
                                                              'reject'
                                                            ? 'Rejected'
                                                            : 'Pending'
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
