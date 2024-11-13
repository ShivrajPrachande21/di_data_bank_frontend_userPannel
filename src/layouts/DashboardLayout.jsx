import React, { useState } from 'react';
import { Container, Offcanvas } from 'react-bootstrap';
import SideBar from '../components/sidebar/SideBar';
import { Outlet } from 'react-router-dom';
import './dashboardlayout.css';

const DashboardLayout = () => {
    return (
        <>
            <div className="layouts" style={{ display: 'flex', width: '100%' }}>
                <div className="right" style={{ width: '18.875vw' }}>
                    <SideBar />
                </div>
                <div
                    className="custom-scroll"
                    style={{
                        background: 'rgba(248, 248, 248, 1)',
                        width: '81vw',
                        height: '100vh',
                        overflow: 'hidden',
                        overflowY: 'auto'
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
