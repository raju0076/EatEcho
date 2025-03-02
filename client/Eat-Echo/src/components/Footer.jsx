import React from "react";
import "../styles/Footer.css"

const Footer = () => {
  return (
    <div className="container">
      <footer className="footer">
        <div className="footer-column">
          <h3>About Eat_Echo</h3>
          <ul>
          <li><a href="#">Who We Are</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Work With Us</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Report Fraud</a></li>
            <li><a href="#">Press Kit</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-column">
        <h3>NomVerse</h3>
          <ul>
            <li><a href="#">EatEcho</a></li>
            <li><a href="#">Blinkit</a></li>
            <li><a href="#">Feeding India</a></li>
            <li><a href="#">Hyperpure</a></li>
            <li><a href="#">EatEcho Live</a></li>
          </ul>
        </div>
        <div className="footer-column">
        <h3>FOR RESTAURANTS</h3>
          <ul>
            <li><a href="#">Partner With Us</a></li>
            <li><a href="#">Apps For You</a></li>
          </ul>
        </div>
        <div className="footer-column">
        <h3>LEARN MORE</h3>
          <ul>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
          
        </div>
        <div className="footer-column">
        <h3>SOCIAL</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>YouTube</li>
            <li>Github</li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p>© 2025,Eat_Echo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
