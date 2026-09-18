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

const NavLinks = ({ notify, toggleNavBar }) => {
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
            notify(true, "Successfully logged out.");
            navigate('/');
        } catch (error) {
            notify(false, "There was an error logging you out.");
        }
       
}
    return (
        <div className='nav-links'>
            <Link to="/" onClick={toggleNavBar}>
              Get Fluent
            </Link>
            <Link to="/about" onClick={toggleNavBar}>
              About
            </Link>
            <Link to="/profile" onClick={toggleNavBar}>
              Profile
            </Link>
            <Link to="/flashcards" onClick={toggleNavBar}>
              Flashcards
            </Link>
            <Link to="/" onClick={handleLogOut}>
              Logout
            </Link>
        </div>
    );
};

const UserNavMenu = ({ notify }) => {
    const [isOpen, setIsOpen] = useState(false);


    const toggleIcon = <FontAwesomeIcon icon="fa-solid fa-align-justify" />;
    
    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="nav-menu">
            <div className={`nav-container ${isOpen ? 'open' : ''}`}>
                <NavLinks notify={notify} toggleNavBar={toggleNavBar} />
            </div>
            <span className="nav-toggle" onClick={toggleNavBar}>{toggleIcon}</span>
        </nav>
    );
};

export default UserNavMenu;