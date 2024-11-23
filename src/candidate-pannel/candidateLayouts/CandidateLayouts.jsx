import React, { useState } from 'react';
import SideBar from '../../components/sidebar/SideBar';
import { Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../../../src/layouts/dashboardlayout.css';
const CandidateLayouts = () => {
    const [hideSidebar, sethidSidebar] = useState(false);
    return (
        <>
            <div className="right-top-navbar">
                <Button onClick={() => sethidSidebar(prev => !prev)}>
                    Hide
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

export default CandidateLayouts;
