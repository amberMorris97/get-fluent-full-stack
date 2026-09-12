import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Button from '../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../context/AuthContext';
import { requestLogout } from '../../services/authService';
import { removeTokenFromStorage } from '../../services/storageService';

library.add(fas)

const NavLinks = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogOut = async () => {
        try {
            await requestLogout();
            setAuth({
                token: null,
                email: null,
                isAuthenticated: false,
            });
            removeTokenFromStorage();
            navigate('/');
        } catch (error) {
            console.error(error);
            // TODO: Give user feedback
        }
       
}
    return (
        <div className='nav-links'>
            <Link to="/">
              Get Fluent
            </Link>
            <Link to="/about">
              About
            </Link>
            <Link to="/profile">
              Profile
            </Link>
            <Link to="/" onClick={handleLogOut}>
              Logout
            </Link>
        </div>
    )
}

const UserNavMenu = () => {
    const [isOpen, setIsOpen] = useState(false);


    const toggleIcon = <FontAwesomeIcon icon="fa-solid fa-align-justify" />;
    
    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="nav-menu">
            <div className={`nav-container ${isOpen ? 'open' : ''}`}>
                <NavLinks />
            </div>
            <span className="nav-toggle" onClick={toggleNavBar}>{toggleIcon}</span>
        </nav>
    );
};

export default UserNavMenu;