import React from 'react';
import { Container } from 'react-bootstrap';
import SideBar from '../components/sidebar/SideBar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <>
            <div
                className="main-section"
                style={{
                    background: 'rgba(248, 248, 248, 1)',
                    overflowY: 'scroll', // Enable scrolling
                    scrollbarWidth: 'none', // For Firefox
                    msOverflowStyle: 'none',
                    height: '100vh'
                }}
            >
                <div className="right" style={{ width: '16.875vw' }}>
                    <SideBar />
                </div>
                <div
                    className="left"
                    style={{
                        background: 'rgba(248, 248, 248, 1)',
                        width: '80vw'
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
