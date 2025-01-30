import React from 'react';
import './home.css';
import { Button, Image } from 'react-bootstrap';
import HomeImage from '../../assets/images/HomeImage.png';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="home-conatiner">
                <div className="home-conatents">
                    <div className="home-p">
                        <p>
                            "Find Top Jobs and Hire Verified Talent with
                            AI-Powered Solutions"
                        </p>
                    </div>
                    <div className="home-span">
                        <span>
                            "Whether you're a candidate seeking your next
                            opportunity or a company looking for top talent, our
                            AI-powered platform has you covered."
                        </span>
                    </div>
                    <div className="home-buttons">
                        <Button onClick={() => navigate('/login')}>
                            Explore Jobs
                        </Button>
                        <Button onClick={() => navigate('/login')}>
                            Post a Job Now
                        </Button>
                    </div>
                    <div className="home-counts">
                        <div className="counts-home-card">
                            <h2>4K+</h2>
                            <p>Candidates</p>
                        </div>
                        <div className="counts-home-card">
                            <h2>25+</h2>
                            <p>Companies</p>
                        </div>
                    </div>
                </div>
                <div className="home-image-left">
                    <Image src={HomeImage} rounded alt="Rounded" width="100%" />
                </div>
            </div>
        </>
    );
};

export default Home;
