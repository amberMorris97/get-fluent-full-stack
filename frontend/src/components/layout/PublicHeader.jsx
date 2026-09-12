import NavMenu from "./NavMenu";
import Header from "./Header";

const PublicHeader = ({ setIsOpen }) => {
    return ( <Header setIsOpen={setIsOpen} NavMenu={NavMenu} /> );
};

export default PublicHeader;