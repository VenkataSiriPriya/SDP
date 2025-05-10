import React, { useState } from "react";
import "../css/Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail(""); // Clear input after subscription
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* About Section */}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            At Property Management Solutions, we specialize in providing top-tier real estate services. 
            Our goal is to make property investment effortless, transparent, and rewarding.
          </p>
        </div>

        {/* Newsletter Section */}
        <div className="footer-section newsletter">
          <h3>Stay Connected</h3>
          <p>Subscribe to receive exclusive property insights and investment opportunities.</p>
          <div className="newsletter-form">
            {subscribed ? (
              <div className="subscription-message">
                <p>🎉 Thanks for subscribing!</p>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="signup-btn" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </>
            )}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#">Our Properties</a></li>
             <li><Link to="/services">Services</Link></li>
             <li><Link to="/contact">Contact</Link></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <p>Stay updated on our latest offerings and industry news.</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/login" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com/login" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/accounts/login" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/login" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
        
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025 Property Management Solutions | 1234 Main St, New York, NY 10001 | Support: (123) 456-7890</p>
        <div className="footer-policy">
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <Link to="/sitemap">Sitemap</Link>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;
