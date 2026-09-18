import NavMenu from "./NavMenu";
import Header from "./Header";

const PublicHeader = ({ modalContent }) => {
    return ( <Header modalContent={modalContent} NavMenu={NavMenu} /> );
};

export default PublicHeader;