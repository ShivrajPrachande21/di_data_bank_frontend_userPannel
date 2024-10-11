import React, { useEffect, useState } from 'react';
import avatar from '../../../../../assets/images/avatar.png';
import Verified from '../../../../../assets/images/Verified.png';
import { useLocation, useParams } from 'react-router-dom';
import BaseUrl from '../../../../../services/BaseUrl';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Reviews = () => {
    const { id } = useParams();
    const locate = useLocation();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true); // Set loading to true initially

    const getReviews = async () => {
        const token = localStorage.getItem('Candidate_token');
        if (!token) {
            setLoading(false);
            return;
        }

        const decodedToken = jwtDecode(token);
        const companyId = decodedToken?._id;

        try {
            const response = await axios.get(
                `${BaseUrl}/candidate/company/review/${id}`
            );
            console.log('Review Data', response?.data);
            setReviews(response?.data || []); // Ensure reviews is always an array
        } catch (error) {
            console.error('Error fetching reviews', error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched (success or error)
        }
    };

    useEffect(() => {
        getReviews();
    }, [id]);

    return (
        <div style={{ padding: '14px' }}>
            <div
                className="align"
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'start',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    width: '100%'
                }}
            >
                {loading ? (
                    // Display loading message or spinner while data is being fetched
                    <p>Loading reviews...</p>
                ) : reviews.length > 0 ? (
                    reviews.map((item, index) => (
                        <div className="pCards" key={index}>
                            <div className="profilecard">
                                <div className="profilimg">
                                    <img
                                        src={
                                            item?.candidate_id?.profileUrl ||
                                            avatar
                                        } // fallback to avatar if profileUrl is null
                                        alt="Profile"
                                        width="50px"
                                        height="50px"
                                        style={{ borderRadius: '50%' }}
                                    />
                                </div>
                                <div className="names">
                                    <span>
                                        {item?.candidate_id?.basic_details
                                            ?.name || 'Anonymous'}
                                    </span>
                                    <img
                                        src={Verified}
                                        alt="Verified"
                                        width="22px"
                                        className="mx-2"
                                    />
                                </div>
                                <p>
                                    {item?.Feedback || 'No feedback provided'}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    // Display "No reviews for this company" message when there are no reviews
                    <div className="pCards">
                        <div className="profilecard">
                            <div className="profilimg"></div>
                            <div className="names"></div>
                            <p>No reviews for this company</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reviews;
