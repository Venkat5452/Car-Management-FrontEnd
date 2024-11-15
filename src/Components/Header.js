import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation using React Router
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu on small screens
  const navigate = useNavigate(); // To navigate programmatically after logout

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('logintoken'); // Remove token from local storage
    localStorage.removeItem('username');   // Optionally remove username
    navigate("/"); // Redirect to home page
    window.location.reload();
  };

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('logintoken');

  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="logo">CarMan</h1>
      </div>
      {/* Navigation - Show either the full menu or collapsed menu */}
      <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isLoggedIn && (<li><Link to="/dashboard">Dashboard</Link></li>)}
          <li><Link to="https://www.spyne.ai/contact-us" target="_blank" rel="noreferrer">Contact</Link></li>
          <li><Link to="https://www.spyne.ai/about-us" target="_blank" rel="noreferrer">About Us</Link></li>
          <li><Link to="https://www.spyne.ai/faqs" target="_blank" rel="noreferrer">FAQs</Link></li>
          {isLoggedIn && (
            
            <li>
              {/* Logout Icon */}
              <span onClick={handleLogout} className="logout-icon">
                Logout
              </span>
            </li>
          )}
        </ul>
      </nav>
      {/* Hamburger menu icon for small screens */}
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
};

export default Header;
