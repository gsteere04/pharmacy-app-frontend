import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/prescription">Presciptions</Link></li>
                <li><Link to="/doctors">Doctors</Link></li>
                <li><Link to="/patients">Patients</Link></li>
                <li><Link to="/medication">Medicine</Link></li>

            </ul>
        </nav>
    );
};

export default NavBar;