import React, { useEffect, useState } from 'react';
import { Button, Container, Offcanvas } from 'react-bootstrap';
import SideBar from '../components/sidebar/SideBar';
import List from '../assets/images/BlueList.png';
import { Outlet } from 'react-router-dom';
import './dashboardlayout.css';

const DashboardLayout = () => {
    const [hideSidebar, sethidSidebar] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                sethidSidebar(false);
            }
        };

        // Initial check on mount
        if (window.innerWidth > 768) {
            sethidSidebar(prev => !prev);
        }

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
            <div className="right-top-navbar">
                <Button size="sm" onClick={() => sethidSidebar(prev => !prev)}>
                    <img src={List} alt="" width="20px" />
                </Button>
            </div>
            <div className="layouts">
                <div className={hideSidebar ? 'right-2' : 'right'}>
                    <SideBar />
                </div>
                <div
                    className="custom-scroll"
                    style={{
                        background: 'rgba(248, 248, 248, 1)',

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
