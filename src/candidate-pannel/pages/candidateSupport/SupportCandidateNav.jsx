import React, { useContext, useState } from 'react';
import { use } from 'react';
import { Button, Col } from 'react-bootstrap';
import CandidateSupport from './CandidateSupport';

import { CandidateSupportContext } from '../../../context/candidateContext/CandidateSupportContext';
import MailTickets from './MailTickets/MailTickets';
import { useSupport } from '../../../context/SupportContext';

const SupportCandidateNav = () => {
    const { hide, setHide } = useContext(CandidateSupportContext);
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
                {hide == 1 && <CandidateSupport />}
                {hide === 2 && <MailTickets />}
            </div>
        </div>
    );
};

export default SupportCandidateNav;
