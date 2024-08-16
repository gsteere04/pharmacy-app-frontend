import React from "react";
import { Link } from "react-router-dom";
import "./NavBarItems.css";
import logo from "/src/assets/image.png";
const NavBarItems: React.FC = () => {
  return (
    <nav className="navbaritems">
      <div className="logos">
        <a href="/">
         <img src={logo} alt="Logo" className="navbar-logo" />
        </a>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/prescription">Presciptions</Link>
        </li>
        <li className="nav-item">
          <Link to="/doctors">Doctors</Link>
        </li>
        <li className="nav-item">
          <Link to="/patient">Patients</Link>
        </li>
        <li className="nav-item">
          <Link to="/medication">Medicine</Link>
        </li>
        <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBarItems;
