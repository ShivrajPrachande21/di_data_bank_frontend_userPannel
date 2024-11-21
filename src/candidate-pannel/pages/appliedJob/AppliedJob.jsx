import React, { useEffect } from 'react';
import { Row, Button, Col } from 'react-bootstrap';
import './appliedjob.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
const AppliedJob = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = data => {
        if (data === 'applied-jobs') {
            navigate('applied-jobs');
        } else if (data === 'saved-jobs') {
            navigate('saved-jobs');
        }
    };

    // Function to determine button style based on the path
    const getButtonStyle = path => {
        if (location.pathname.includes(path)) {
            return {
                background: '#B4DDFF',
                color: '#051F50',
                border: 'none'
            };
        } else {
            return {
                background: 'white',
                color: '#AEAEAE',
                border: 'none'
            };
        }
    };
    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/login');
            } else {
                navigate('/candidate-dashboard/applied-job/applied-jobs');
            }
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        rendering();
    }, []);
    return (
        <div className="applied-job">
            <Row>
                <Col>
                    <div className="applied-btns">
                        <Button
                            size="sm"
                            style={getButtonStyle('applied-jobs')}
                            onClick={() => handleNavigate('applied-jobs')}
                        >
                            Applied Jobs{' '}
                        </Button>
                        <Button
                            size="sm"
                            style={getButtonStyle('saved-jobs')}
                            onClick={() => handleNavigate('saved-jobs')}
                        >
                            Saved Jobs{' '}
                        </Button>
                    </div>
                </Col>
            </Row>
            <Outlet />
        </div>
    );
};

export default AppliedJob;
