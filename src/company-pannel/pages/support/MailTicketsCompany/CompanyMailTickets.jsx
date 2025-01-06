import React, { useEffect, useState } from 'react';
import SendMail from '../Sendmail/SendMail';

import {
    Button,
    Modal,
    OverlayTrigger,
    Row,
    Table,
    Tooltip
} from 'react-bootstrap';
import { useSupport } from '../../../../context/SupportContext';
import SearchIconS from '../../../../assets/images/SearchIconS.png';
const CompanyMailTickets = () => {
    const {
        mailData,
        modalShow,
        setModalShow,
        mailModelShow,
        setMailModelShow,
        formatDate,
        toCamelCase_Name,
        RemovePath,
        setMailData,
        fetchCompanyMails
    } = useSupport();
    const [SeacrhInput, SetSeacrhInput] = useState('');
    // const fiteredData = mailData?.filter(item => {
    //     const subject = item?.subject;
    //     return (
    //         typeof subject == 'string' &&
    //         subject.toLowerCase().includes(SeacrhInput.toLowerCase())
    //     );
    // });

    // const fiteredData = mailData?.filter(item => {
    //     return (
    //         item?.subject &&
    //         item?.subject.toLowerCase().includes(SeacrhInput.toLowerCase())
    //     );
    // });

    const [filteredData, setFilteredData] = useState(mailData);

    const handleSearch = e => {
        let search = e.target.value;
        setFilteredData(
            mailData.filter(item =>
                item.Ticket.toLowerCase().includes(search.toLowerCase())
            )
        );
    };
    const SendMails = props => (
        <Tooltip id="save-tooltip" {...props}>
            Click this button to send an email directly to the support team.
        </Tooltip>
    );

    useEffect(() => {
        const fun = async () => {
            await fetchCompanyMails();
        };
        fun();

        return () => {
            setFilteredData([]);
        };
    }, []);

    useEffect(() => {
        setFilteredData(mailData);
    }, [mailData]);

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
                <SendMail />
            </Modal>
            <div className="support">
                <Row>
                    <div className="Search-support">
                        <OverlayTrigger placement="bottom" overlay={SendMails}>
                            <Button
                                size="sm"
                                className="add-issue-btn"
                                onClick={() => setMailModelShow(true)}
                            >
                                Send Mail
                            </Button>
                        </OverlayTrigger>
                        <div className="search-bar-suport">
                            <img src={SearchIconS} alt="" width="20px" />
                            <input
                                type="text"
                                placeholder="Search"
                                name="SeacrhInput"
                                onChange={e => handleSearch(e)}
                            />
                        </div>
                    </div>
                </Row>

                <Row className="mt-2">
                    <Table bordered responsive className="custom-table">
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
                            {filteredData?.map((item, index) => (
                                <>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item?.Ticket}</td>
                                        <td>{item?.subject}</td>
                                        <td>{item?.description}</td>

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
                                                {toCamelCase_Name(item?.status)}
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

export default CompanyMailTickets;
