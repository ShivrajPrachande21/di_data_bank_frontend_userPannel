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
            <Outlet />
        </div>
    );
};

export default AccessManagement;
