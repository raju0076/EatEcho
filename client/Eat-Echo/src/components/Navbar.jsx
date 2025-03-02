import React from "react";
import { NavLink,Link } from "react-router-dom";
import "../styles/nav.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logoDiv">
      <Link to="/" className="logo">  
          <h1>EatEcho</h1>
        </Link>

      </div>
      <div className="nav-links">
        <NavLink to="/Home" className="nav-item">Home</NavLink>
        <NavLink to="/about" className="nav-item">About</NavLink>
        <NavLink to="/contact" className="nav-item">Contact</NavLink>
        <NavLink to="/rest" className="nav-item">Restuarants</NavLink>
       
      </div>
    </nav>
  );
};

export default Navbar;
