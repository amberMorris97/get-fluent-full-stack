import UserNavMenu from "./UserNavMenu";
import Header from "./Header";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { removeTokenFromStorage } from "../../services/storageService";

const UserHeader = ({ setIsOpen }) => { 
    return ( <Header setIsOpen={setIsOpen} NavMenu={UserNavMenu} /> );
};

export default UserHeader;