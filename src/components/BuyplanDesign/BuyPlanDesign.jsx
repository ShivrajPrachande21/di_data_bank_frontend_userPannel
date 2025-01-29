import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './buyplan.css';
import { useNavigate } from 'react-router-dom';
import Crown from '../../assets/images/Crown.png';
const BuyPlanDesign = () => {
    const navigate = useNavigate();

    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            navigate('/candidate-dashboard/subscription-candidate');
        } else {
            navigate('/main/subscription-plan');
        }
    }

    return (
        <div>
            <Card className="p-4 mt-2" style={{ height: '94vh' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={Crown} alt="" />
                </div>
                <h2 style={{ textAlign: 'center', margin: '20px 10px' }}>
                    Please Buy Plan
                </h2>
                <p
                    style={{
                        fontSize: '0.8rem',
                        textAlign: 'center'
                    }}
                >
                    To use the features of the platform, please purchase a
                    subscription plan from boardsearch.ai.
                </p>
                <Button className="bnts-sub" onClick={rendering}>
                    Buy Now
                </Button>
            </Card>
        </div>
    );
};

export default BuyPlanDesign;
