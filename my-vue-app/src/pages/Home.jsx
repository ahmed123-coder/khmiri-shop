import React, { useState, useEffect } from "react";
import Products from "../conponment/products";
import Groups from "../conponment/groupproducts";
import CartUserSidebar from "../conponment/cartuser";
import Navbar from "../conponment/navbare";
import DetailsOrder from "../conponment/detailsorder";
import Hero from "../conponment/Hero";
import ContactSection from "../conponment/ContactSection";
import axios from "axios";
import "../styles/home_layout.css";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [token] = useState(localStorage.getItem("token") || "");
  const [products, setProducts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartGroups, setCartGroups] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartorderdetails, setCartOrderDetails] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm));
  const filteredGroups = groups.filter(g => g.name.toLowerCase().includes(searchTerm));

  useEffect(() => {
    axios.get("https://khmiri-shop.onrender.com/api/products").then((res) => {
      setProducts(res.data);
    });

    axios.get("https://khmiri-shop.onrender.com/api/groupproducts").then((res) => {
      setGroups(res.data);
    });

    const storedCart = JSON.parse(localStorage.getItem("guestCart")) || {
      products: [],
      groupproducts: [],
    };
    
    setCartProducts(storedCart.products || []);
    setCartGroups(storedCart.groupproducts || []);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const updateLocalStorage = (updatedProducts, updatedGroups) => {
    localStorage.setItem(
      "guestCart",
      JSON.stringify({ products: updatedProducts, groupproducts: updatedGroups })
    );
  };

  const onAddToCart = (id, type, details) => {
    if (type === "product") {
      const exists = cartProducts.find((item) => item.product === id);
      const updated = exists
        ? cartProducts.map((item) =>
            item.product === id
              ? { ...item, quantity: item.quantity + 1, image: details.image, name: details.name, price: details.price }
              : item
          )
        : [...cartProducts, { product: id, quantity: 1, image: details.image, name: details.name, price: details.price }];

      setCartProducts(updated);
      updateLocalStorage(updated, cartGroups);
    } else {
      const exists = cartGroups.find((item) => item.group === id);
      const updated = exists
        ? cartGroups.map((item) =>
            item.group === id
              ? { ...item, quantity: item.quantity + 1, image: details.image, name: details.name, price: details.price }
              : item
          )
        : [...cartGroups, { group: id, quantity: 1, image: details.image, name: details.name, price: details.price }];
      setCartGroups(updated);
      updateLocalStorage(cartProducts, updated);
    }
  };

  const handleUpdateQuantity = (id, type, newQty) => {
    if (type === "product") {
      const updated = cartProducts.map((item) =>
        item.product === id ? { ...item, quantity: newQty } : item
      );
      setCartProducts(updated);
      updateLocalStorage(updated, cartGroups);
    } else {
      const updated = cartGroups.map((item) =>
        item.group === id ? { ...item, quantity: newQty } : item
      );
      setCartGroups(updated);
      updateLocalStorage(cartProducts, updated);
    }
  };

  const handleRemoveItem = (id, type) => {
    if (type === "product") {
      const updated = cartProducts.filter((item) => item.product !== id);
      setCartProducts(updated);
      updateLocalStorage(updated, cartGroups);
    } else {
      const updated = cartGroups.filter((item) => item.group !== id);
      setCartGroups(updated);
      updateLocalStorage(cartProducts, updated);
    }
  };

  return (
    <div className="homepage-new">
      <Navbar 
        token={token}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setcartorderdetails={setCartOrderDetails}
        iscartorderdetails={cartorderdetails}
        onSearchChange={handleSearch}
      />
      
      <CartUserSidebar
        cartProducts={cartProducts}
        cartGroups={cartGroups}
        onQuantityChange={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        darkMode={darkMode}
      />

      {cartorderdetails === true ? (
        <div className="details-container">
            <DetailsOrder onClose={() => setCartOrderDetails(false)} />
        </div>
      ) : (
        <main>
          <Hero onExplore={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })} />
          
          <div id="products-section" className="section-container">
            <Products products={filteredProducts} onAddToCart={onAddToCart} darkMode={darkMode} />
          </div>

          <div className="section-container gray-bg">
            <Groups groups={filteredGroups} onAddToCart={onAddToCart} darkMode={darkMode} />
          </div>

          <ContactSection />
        </main>
      )}
    </div>
  );
}

export default HomePage;
