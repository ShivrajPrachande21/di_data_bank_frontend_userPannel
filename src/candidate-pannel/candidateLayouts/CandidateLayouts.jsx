import React, { useContext, useState } from 'react';
import SideBar from '../../components/sidebar/SideBar';
import { Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../../../src/layouts/dashboardlayout.css';
import List from '../../assets/images/List.png';
import { CandidateSupportContext } from '../../context/candidateContext/CandidateSupportContext';
const CandidateLayouts = () => {
    const { hideSidebar, sethidSidebar } = useContext(CandidateSupportContext);
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

export default CandidateLayouts;
