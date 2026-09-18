import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { ModalContext } from '../../context/ModalContext';

const Header = ({ NavMenu, notify, modalContent }) => {
    const navigate = useNavigate();

    const { handleOpenModal } = useContext(ModalContext);

    const onLogoClick = () => {
        navigate('/');
        handleOpenModal(modalContent, 'INFO', 'info-modal');
    };

    return (
        <header className="header">
            <img onClick={onLogoClick} src="./images/get_fluent_logo.svg" alt="logo" height="125" width="125" />
            <NavMenu notify={notify} />
        </header>
    );
};

export default Header;