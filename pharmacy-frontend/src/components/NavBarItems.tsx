import React from "react";
import { Link } from "react-router-dom";
import './NavBarItems.css';
import logo from '../assets/image.png'

const NavBarItems: React.FC = () => {
    return (
        <nav className="navbaritems">
            <img src={logo} alt="Logo" className="navbar-logo" />
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