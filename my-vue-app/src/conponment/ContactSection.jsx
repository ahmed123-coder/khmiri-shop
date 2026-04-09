import React from 'react';
import '../styles/contact_section.css';
import mapImg from '../assets/map.png';

const ContactSection = () => {
  return (
    <section className="contact-home" id="contact">
      <div className="contact-container">
        <div className="contact-info">
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Message" rows="4"></textarea>
            </div>
            <button type="submit" className="submit-btn">Contact</button>
          </form>
        </div>
        <div className="contact-map">
          <img src={mapImg} alt="Map Location" className="map-img" />
          <div className="map-overlay">
            <div className="marker"></div>
          </div>
        </div>
      </div>
      <div className="footer-mini">
        <div className="footer-links-row">
            <div className="footer-col">
                <h4>Follow Us</h4>
                <div className="social-links">
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-twitter"></i>
                    <i className="bi bi-instagram"></i>
                    <i className="bi bi-linkedin"></i>
                </div>
            </div>
            <div className="footer-col">
                <h4>Quick Links</h4>
                <p>Home</p>
                <p>About Us</p>
                <p>Services</p>
            </div>
            <div className="footer-col">
                <h4>Contact Us</h4>
                <p>Name</p>
                <p>Email</p>
                <p>Contact</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
