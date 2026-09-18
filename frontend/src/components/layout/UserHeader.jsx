import UserNavMenu from "./UserNavMenu";
import Header from "./Header";

const UserHeader = ({ notify, modalContent }) => { 
    return ( <Header modalContent={modalContent} NavMenu={UserNavMenu} notify={notify} /> );
};

export default UserHeader;