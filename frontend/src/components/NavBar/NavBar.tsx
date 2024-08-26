import React from "react";
import NavBarItems from "./NavBarItems";
import "./NavBar.css";

const NavBar: React.FC = () => {
    return (
        <div className="navbar">
            <NavBarItems />
        </div>
    );
};

export default NavBar;