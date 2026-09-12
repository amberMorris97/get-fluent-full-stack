import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Button from '../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const NavLinks = () => {
    return (
        <div className='nav-links'>
            <Link to="/">
              Get Fluent
            </Link>
            <Link to="/about">
              About
            </Link>
            <Link to="/flashcards">
              Flashcards
            </Link>
        </div>
    )
}

const NavMenu = () => {
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

export default NavMenu;