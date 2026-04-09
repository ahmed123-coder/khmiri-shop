import React, { useState, useEffect } from "react";
import "../styles/navbar.css";

const Navbar = ({
  isCartOpen,
  setIsCartOpen,
  darkMode,
  setDarkMode,
  setcartorderdetails,
  iscartorderdetails,
  token,
  onSearchChange
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  const toggleOrderDetails = () => setcartorderdetails(!iscartorderdetails);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="navbar-revamp minimalist">
      <div className="nav-top">
        <div className="nav-left">
          <button className="menu-trigger" onClick={toggleMobileMenu}>
            <i className={isMobileMenuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
            <span className="menu-label">MENU</span>
          </button>
        </div>

        <div className="nav-logo">
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>E-COM LAB</h1>
          </a>
        </div>

        <div className="nav-actions">
          <div className="search-container-new desktop-only">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="nav-search-input"
            />
            <i className="bi bi-search"></i>
          </div>
          
          {token && (
            <div className="action-item" onClick={toggleOrderDetails} title="Orders">
              <i className="bi bi-receipt-cutoff"></i>
            </div>
          )}
          <div className="action-item" onClick={() => setDarkMode(!darkMode)} title="Toggle Dark Mode">
            {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
          </div>
          <div className="cart-mini" onClick={() => setIsCartOpen(true)} title="Cart">
            <i className="bi bi-bag"></i>
            <span className="cart-badge">4</span>
          </div>
        </div>
      </div>

      {/* Unified Side Menu for all screens */}
      <nav className={`side-drawer ${isMobileMenuOpen ? 'drawer-active' : ''}`}>
        <div className="drawer-header">
           <h2>Navigation</h2>
           <button className="close-drawer" onClick={() => setIsMobileMenuOpen(false)}>
             <i className="bi bi-x-lg"></i>
           </button>
        </div>
        
        <div className="mobile-search-on-drawer">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="drawer-search-input"
            />
            <i className="bi bi-search"></i>
        </div>

        <div className="drawer-links">
          <a href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="bi bi-house-door"></i>
            <span>Home</span>
          </a>
          <a href="/about" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="bi bi-info-circle"></i>
            <span>About Us</span>
          </a>
          <a href="/services" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="bi bi-gear"></i>
            <span>Our Services</span>
          </a>
          <a href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="bi bi-envelope"></i>
            <span>Contact</span>
          </a>
          <div className="drawer-divider"></div>
          {token ? (
            <a href="/logout" onClick={() => setIsMobileMenuOpen(false)}>
              <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </a>
          ) : (
            <a href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <i className="bi bi-person"></i>
              <span>Login / Account</span>
            </a>
          )}
        </div>
      </nav>

      {/* Backdrop with CSS transition */}
      <div 
        className={`menu-backdrop ${isMobileMenuOpen ? 'backdrop-active' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
    </header>
  );
};





export default Navbar;

