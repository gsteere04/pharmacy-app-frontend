import React from "react";
import "./NavBar.css";
import NavBarItems from "./NavBarItems";

const NavBar: React.FC = () => {
    return (
        <div className="navbar">
            <NavBarItems />
        </div>
    );
};

export default NavBar;