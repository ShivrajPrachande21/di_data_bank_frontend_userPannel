import React, { useState } from 'react';
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Table,
    Pagination
} from 'react-bootstrap';
import './accessManagment.css';
import accessWhite from '../../../assets/images/accessWhite.png';
import { Outlet, useNavigate } from 'react-router-dom';
const AccessManagement = () => {
    const [activeButton, setActiveButton] = useState('add-new-user');
    const naviggate = useNavigate();

    const handleNavigate = buttonName => {
        setActiveButton(buttonName);

        if (buttonName === 'add-new-role') {
            naviggate('add-new-role');
        } else if (buttonName === 'add-new-user') {
            naviggate('add-new-user');
        }
    };
    return (
        <div className="access">
            <Col
                md={3}
                xs={12}
                className="p-2 bg-white d-flex justify-content-between mx-2 mt-2"
            >
                <Button
                    size="sm"
                    style={{
                        fontSize: '0.8rem',
                        width: '100%',
                        background: `${
                            activeButton === 'add-new-user'
                                ? 'rgba(59, 150, 225, 1)'
                                : 'white'
                        }`,
                        color: `${
                            activeButton === 'add-new-user' ? 'white' : 'black'
                        }`,
                        padding: '6px'
                    }}
                    onClick={() => handleNavigate('add-new-user')}
                >
                    <img
                        src={accessWhite}
                        width="20px"
                        alt=""
                        style={{ marginRight: '20px    ' }}
                    />
                    Access Management{' '}
                </Button>
            </Col>

            <Outlet />
        </div>
    );
};

export default AccessManagement;
