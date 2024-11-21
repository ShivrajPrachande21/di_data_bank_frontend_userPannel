import React from 'react';
import './notfound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    let navigate=useNavigate()
    function handleBack(){
        navigate(-1)
    }
    return (
        <div className="error-page-wrapper">
            <h1 className="error-heading">Oops! Page Not Found</h1>
            <div className="error-code-container">
                <span className="error-digit">4</span>
                <span className="error-digit">0</span>
                <span className="error-digit">4</span>
            </div>
            <p className="error-message">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className="error-link-container">
                <a  onClick={handleBack} className="error-link">
                    Go Back Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;
