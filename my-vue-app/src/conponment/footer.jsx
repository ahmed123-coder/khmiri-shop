import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Quick Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li>Email: support@myecommerce.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 123 Main St, City, Country</li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} My E-Commerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;