import React, { useContext, useEffect } from 'react';

import { CandidateProfileContext } from '../../../../context/candidateContext/CandidateProfileContext';
import { Button, Image } from 'react-bootstrap';
import Verified from '../../../../assets/images/Verified.png';
import avatar from '../../../../assets/images/avatar.png';
import { useLocation, useNavigate } from 'react-router-dom';
function CandidateReviews() {
    const { CandidateProfile } = useContext(CandidateProfileContext);
    const navigate = useNavigate();
    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (!token) {
                navigate('/login');
            } else {
                navigate('/profile-candidate/reviews');
            }
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        rendering();
    }, []);
    return (
        <>
            <div className="exp-review">
                <div className=""></div>
                <div
                    className="align"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexWrap: 'nowrap', // Prevent wrapping so it scrolls horizontally
                        overflowX: 'auto', // Enable horizontal scrolling
                        overflowY: 'hidden', // Prevent vertical scrolling (optional)
                        width: '100%',
                        gap: '20px'
                    }}
                >
                    {CandidateProfile?.data?.Interviewed?.map((item, index) => (
                        <div
                            className="pCards"
                            key={index}
                            style={{ marginBottom: '20px' }}
                        >
                            <div className="profilecard">
                                <div className="profilimg">
                                    <Image
                                        src={avatar}
                                        // alt={profileimg}
                                        width="50px"
                                        height="50px"
                                        roundedCircle
                                    />
                                </div>
                                <p className="mt-2">{item?.feedBack}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CandidateReviews;
