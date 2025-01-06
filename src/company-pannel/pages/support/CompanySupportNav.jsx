import React, { useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import Support from './Support';
import CompanyMailTickets from './MailTicketsCompany/CompanyMailTickets';
import { useSupport } from '../../../context/SupportContext';

const CompanySupportNav = () => {
    const {
        fetch_all_issue,
        data,
        modalShow,
        setModalShow,
        mailModelShow,
        setMailModelShow
    } = useSupport();
    const [hide, setHide] = useState(1);
    return (
        <div>
            <Col
                md={3}
                xs={12}
                style={{
                    padding: 3,
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'space-around',
                    background: 'white'
                }}
            >
                <Button
                    size="sm"
                    onClick={() => setHide(1)}
                    style={{
                        background: hide === 1 ? '#3B96E1' : '#B4DDFF',
                        color: hide == 1 ? 'white' : 'black'
                    }}
                >
                    {' '}
                    Portal Tickets{' '}
                </Button>
                <Button
                    size="sm"
                    onClick={() => setHide(2)}
                    style={{
                        background: hide === 2 ? '#3B96E1' : '#B4DDFF',
                        color: hide == 2 ? 'white' : 'black'
                    }}
                >
                    {' '}
                    Mail Tickets{' '}
                </Button>
            </Col>
            <div style={{ marginTop: '10px' }}>
                {hide == 1 && <Support />}
                {hide === 2 && <CompanyMailTickets />}
            </div>
        </div>
    );
};

export default CompanySupportNav;
