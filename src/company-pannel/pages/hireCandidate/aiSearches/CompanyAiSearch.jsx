import React from 'react';
import './aiSearch.css';
import arrow_back from '../../../../assets/images/arrow_back.png';
const CompanyAiSearch = () => {
    return (
        <div style={{ height: '100vh', width: '100%', padding: '10px' }}>
            <div className="back-to-hire">
                <img src={arrow_back} alt="" />
                <p>AI Assistant Search</p>
            </div>
        </div>
    );
};

export default CompanyAiSearch;
