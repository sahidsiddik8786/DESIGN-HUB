import React from "react";
//import { Link } from "react-router-dom";
import "./HeaderFooter.css";

const Footer = () => (
  <div>
    <footer className="footer">
      <div className="footer-content">
        <center>
          <p>Interior Designs Studio</p>
        
          </center>
        <div className="footer-right">
          <button className="back-to-top" onClick={() => window.scrollTo(0, 0)}>
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
