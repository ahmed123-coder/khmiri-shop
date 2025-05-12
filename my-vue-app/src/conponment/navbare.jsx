import React, { useState, useEffect } from "react";
import "../styles/navbar.css"; // Import your CSS file for styling
const Navbar = ({ isCartOpen, setIsCartOpen, darkMode, setDarkMode }) => {
  // State to toggle the navbar
  const [isOpen, setIsOpen] = useState(false);
  // when click on the hamburger icon, toggle the navbar
  const toggleNavbar = () => setIsOpen(!isOpen);
  // when click on the cart icon, toggle the cart sidebar
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  useEffect(() => {
    const cartSidebar = document.querySelector(".cart-sidebar");
  
    if (darkMode) {
      document.body.classList.add("dark-mode");
      if (cartSidebar) {
        cartSidebar.classList.add("dark-mode");
      }
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      if (cartSidebar) {
        cartSidebar.classList.remove("dark-mode");
      }
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);
  

  return (
    <div>
    <div className="header__top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-7">
                        <div className="header__top__left">
                            <p>Free shipping, 30-day return or refund guarantee.</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-5">
                        <div className="header__top__right">
                            <div className="header__top__links">
                                <a href="/login">Login</a>
                                <a href="#">FAQs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo navbar-brand">
        <a href="/">My Shop</a>
      </div>
      {/* Navbar Links */}
      <div id="navbarNav" className={`navbar-links ${isOpen ? "active" : ""}`}>
        <ul>
          <li><a href="/" onClick={toggleNavbar}>Home</a></li>
          <li><a href="/about" onClick={toggleNavbar}>About</a></li>
          <li><a href="/services" onClick={toggleNavbar}>Services</a></li>
          <li><a href="/contact" onClick={toggleNavbar}>Contact</a></li>
          <li><a href="/login" onClick={toggleNavbar}>Login</a></li>
          <li><a href="/logout" onClick={toggleNavbar}>Logout</a></li>
          <li><a href="/details-order" onClick={toggleNavbar}>order</a></li>
        </ul>
      </div>

      {/* Icons Section (Cart, Dark Mode, Hamburger) */}
      <div>
        <div className="navbar-icons">
          {/* Cart Icon */}
          <button className="cart-icon" onClick={toggleCart}>
            <i className="bi bi-bag"></i>
          </button>
          {/* Dark Mode Toggle */}
          <button
            className="toggle-dark-mode"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <div><i className="bi bi-sun-fill"></i> </div>// Sun icon for light mode
            ) : (
              <div><i className="bi bi-moon"></i> </div>// Moon icon for dark mode
            )}
          </button>

          {/* Hamburger Menu (Mobile) */}
          <div className="navbar-toggle" onClick={toggleNavbar}>
            <i className="bi bi-list"></i>
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;