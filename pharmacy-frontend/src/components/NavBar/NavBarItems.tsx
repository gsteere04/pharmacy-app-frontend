import React from "react";
import { Link } from "react-router-dom";
import './NavBarItems.css';
import logo from '/src/assets/image.png'
import logo2 from '/src/assets/rx-icon-25472.png';
const NavBarItems: React.FC = () => {
    return (
        <nav className="navbaritems">
            <div className="logos">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <img src={logo2} alt="Logo2" className="navbar-rxlogo" /> 
            </div>
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