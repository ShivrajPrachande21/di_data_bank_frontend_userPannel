// router.js
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Registration from '../registration/Registration';
import Login from '../login/Login';
import CompanyRegistration from '../registration/company_registration/CompanyRegistration';
import CompanyLogin from '../login/companyLogin/CompanyLogin';
import Profile from '../company-pannel/pages/profile/Profile';
import DashboardLayout from '../layouts/DashboardLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: 'registration',
        element: <Registration />
    },
    {
        path: 'company-registration',
        element: <CompanyRegistration />
    },
    {
        path: 'company-login',
        element: <CompanyLogin />
    },
    {
        path: 'profilr-page',
        element: <Profile />
    },
    {
        path: 'dashboard',
        element: <DashboardLayout />
    }
]);

export default router;
