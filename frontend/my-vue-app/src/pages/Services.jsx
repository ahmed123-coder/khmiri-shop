import React, { useEffect, useState } from "react";
import "../styles/services.css";
const Services = () => {
    const [darkMode, setDarkMode] = useState(() => {
      return localStorage.getItem("darkMode") === "enabled";
    });
  return (
    <div className={`services-page ${darkMode ? "dark-mode" : ""}`}>
      {/* Page Header */}
      <div className="services-header">
        <h1>Our Services</h1>
        <p>We offer a wide range of services to enhance your shopping experience.</p>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {/* Service Card 1: Fast Delivery */}
        <div className="service-card">
          <i className="bi bi-truck"></i>
          <h2>Fast Delivery</h2>
          <p>Get your products delivered to your doorstep in record time.</p>
        </div>

        {/* Service Card 2: Secure Payments */}
        <div className="service-card">
          <i className="bi bi-shield-lock"></i>
          <h2>Secure Payments</h2>
          <p>Enjoy safe and secure payment options for all your purchases.</p>
        </div>

        {/* Service Card 3: 24/7 Support */}
        <div className="service-card">
          <i className="bi bi-headset"></i>
          <h2>24/7 Support</h2>
          <p>Our support team is available around the clock to assist you.</p>
        </div>

        {/* Service Card 4: Easy Returns */}
        <div className="service-card">
          <i className="bi bi-arrow-left-right"></i>
          <h2>Easy Returns</h2>
          <p>Hassle-free return policy for all your orders.</p>
        </div>

        {/* Service Card 5: Exclusive Discounts */}
        <div className="service-card">
          <i className="bi bi-percent"></i>
          <h2>Exclusive Discounts</h2>
          <p>Get access to exclusive discounts and offers.</p>
        </div>

        {/* Service Card 6: Eco-Friendly Packaging */}
        <div className="service-card">
          <i className="bi bi-recycle"></i>
          <h2>Eco-Friendly Packaging</h2>
          <p>We use sustainable and eco-friendly packaging materials.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;