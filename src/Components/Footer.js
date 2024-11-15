import React from 'react';
import './Footer.css'; // Make sure to import the CSS file for styling
import { FaTwitter , FaSquareFacebook, FaSquareInstagram ,  FaLinkedin} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo and Description */}
        <div className="footer-logo">
          <h1>CarMan</h1>
          <p>Your trusted Car Management Solution</p>
        </div>

        {/* Quick Links */}
        <div className="footer-nav">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="https://www.spyne.ai/contact-us" target="_blank" rel="noreferrer">Contact</a></li>
            <li><a href="https://www.spyne.ai/about-us" target="_blank" rel="noreferrer">About Us</a></li>
            <li><a href="https://www.spyne.ai/faqs" target="_blank" rel="noreferrer">FAQs</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
             <FaSquareFacebook/>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter/>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaSquareInstagram/>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              < FaLinkedin/>
            </a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="cta-btn">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 CarMan. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
