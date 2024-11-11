import React from 'react';
import './cerdibility.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import carbon_send from '../../../assets/images/carbon_send.png';
const CredibilityEstablishment = () => {
    return (
        <div className="CredibilityEstablishment">
            <div className="cerdibility-search">
                <div className="c-search">
                    <p>Track Offer letters</p>
                    <Form.Control
                        width="20%"
                        size="sm"
                        placeholder="Search Company/Candidate "
                        name=""
                        // value={createJobData?.country}
                        // onChange={handleFormChange}
                    />

                    <Button size="sm">
                        <img src={carbon_send} alt="" />
                    </Button>
                </div>
                <div className="accpeted-rejected">
                    <p>Accepted : 150</p>

                    <p>Accepted : 150</p>

                    <p>Accepted : 150</p>
                </div>
            </div>
        </div>
    );
};

export default CredibilityEstablishment;
