import React from 'react';
import SideBar from '../../components/sidebar/SideBar';
import { Outlet } from 'react-router-dom';

const CandidateLayouts = () => {
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
                        width: '80vw',
                        height: '100vh',
                        overflow: 'hidden',
                        overflowY: 'auto',
                        padding: '10px'
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default CandidateLayouts;
