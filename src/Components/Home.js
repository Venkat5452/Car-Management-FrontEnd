import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // You can style the homepage separately

const Home = () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('logintoken');

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to CarMan</h1>
          <p>Manage your cars with ease. Create, edit, and track all your car listings in one place.</p>
          
          {/* Conditionally render login and signup buttons */}
          {!isLoggedIn && (
            <div className="cta-buttons">
              <Link to="/login" className="cta-btn">Login</Link>
              <Link to="/signup" className="cta-btn cta-signup">Sign Up</Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose CarMan?</h2>
        <div className="features-container">
          <div className="feature">
            <h3>Manage Cars</h3>
            <p>Easily add, edit, and delete your car listings, including images, descriptions, and tags.</p>
          </div>
          <div className="feature">
            <h3>Secure Authentication</h3>
            <p>Only you can manage your cars with secure login/signup functionality.</p>
          </div>
          <div className="feature">
            <h3>Global Search</h3>
            <p>Quickly search through all your cars by title, description, or tags to find what you're looking for.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Get Started Today</h2>
        <p>Join our community and start managing your cars in the most efficient way possible.</p>
        
        {/* Conditionally render call-to-action buttons */}
        {!isLoggedIn && (
          <div className="cta-buttons">
            <Link to="/signup" className="cta-btn">Create Account</Link>
            <Link to="/login" className="cta-btn cta-login">Log In</Link>
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 CarMan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
