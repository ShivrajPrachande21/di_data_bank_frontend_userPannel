import React from 'react';
import './navBar.css';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import favIcon from '../../assets/images/whiteLogo.png';
const NavBar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="navbar">
                <Image src={favIcon} rounded alt="Rounded" width="100px" />
                <div className="nav-bar-top-right">
                    <h3>
                        {' '}
                        <Link
                            to="Footer"
                            smooth={true}
                            offset={-260}
                            duration={500}
                            className="btn"
                        >
                            Contact us
                        </Link>
                    </h3>
                    <Button onClick={() => navigate('/login')}>Login</Button>
                </div>
            </div>
        </>
    );
};

export default NavBar;
