import React, { useEffect } from 'react';
import './LandingPage.css';
import { Container } from 'react-bootstrap';
import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import Featured from './Featured/Featured';
import ManageHirings from './ManageHiring/ManageHirings';
import VerifiedBadge from './VerifiedBadge/VerifiedBadge';
import Testimonials from './testimonials/Testimonials';
import Footer from './footer/Footer';
import { Element } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
    const navigate = useNavigate();
    function rendering() {
        const render = localStorage.getItem('render');

        if (render == 'candidate') {
            const token = localStorage.getItem('Candidate_token');
            if (token) {
                navigate('/candidate-dashboard/search-job');
            }
        } else if (render == 'company') {
            const token = localStorage.getItem('companyToken');
            if (token) {
                navigate('/main/dashboard');
            }
        }
    }

    useEffect(() => {
        rendering();
    }, []);
    return (
        <div style={{ background: '#3B96E1' }}>
            <Container style={{ background: '#3B96E1' }}>
                <NavBar />
                <Home />
            </Container>
            <Featured />
            <ManageHirings />
            <VerifiedBadge />
            <Testimonials />
            <Element name="Footer">
                <Footer />
            </Element>
        </div>
    );
};

export default LandingPage;
