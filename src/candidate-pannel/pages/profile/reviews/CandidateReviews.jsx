import React, { useContext } from 'react';

import { CandidateProfileContext } from '../../../../context/candidateContext/CandidateProfileContext';
import { Button, Image } from 'react-bootstrap';
import Verified from '../../../../assets/images/Verified.png';
import avatar from '../../../../assets/images/avatar.png';
function CandidateReviews() {
    const { CandidateProfile } = useContext(CandidateProfileContext);
    console.log('CandidateProfile', CandidateProfile);
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
