import { useNavigate } from 'react-router';

const Header = ({ setIsOpen, NavMenu }) => {
    const navigate = useNavigate();

    const onLogoClick = () => {
        navigate('/');
        setIsOpen(true);
    };

    return (
        <header className="header">
            <img onClick={onLogoClick} src="./images/get_fluent_logo.svg" alt="logo" height="125" width="125" />
            <NavMenu />
        </header>
    );
};

export default Header;