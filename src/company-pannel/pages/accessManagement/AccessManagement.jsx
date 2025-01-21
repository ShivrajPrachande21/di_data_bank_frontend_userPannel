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
import { Helmet } from 'react-helmet';
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
              <Helmet>
                            <meta charSet="utf-8" />
                            <title>Access Management</title>
                            <link rel="canonical" href="http://mysite.com/example" />
                        </Helmet>
            <Outlet />
        </div>
    );
};

export default AccessManagement;
