import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3>EduPortal</h3>
            <p className="footer-contact">
              Your gateway to academic excellence and seamless student management.
            </p>
          </div>
          
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4>Contact Info</h4>
            <div className="footer-contact">
              <p>📧 info@eduportal.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>🏢 University Campus, Education City</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 EduPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;