import React from "react";
import { Link } from "react-router-dom";
import './NavBarItems.css';

const NavBarItems: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item"><Link to="/">Home</Link></li>
                <li className="nav-item"><Link to="/prescription">Presciptions</Link></li>
                <li className="nav-item"><Link to="/doctors">Doctors</Link></li>
                <li className="nav-item"><Link to="/patients">Patients</Link></li>
                <li className="nav-item"><Link to="/medication">Medicine</Link></li>

            </ul>
        </nav>
    );
};

export default NavBarItems;