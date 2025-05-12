import React, { useState, useEffect } from "react";
import Products from "../conponment/products";
import Groups from "../conponment/groupproducts";
import CartUserSidebar from "../conponment/cartuser";
import Footer from "../conponment/footer";
import Navbar from "../conponment/navbare";
import axios from "axios";
import "../styles/Global.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartGroups, setCartGroups] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  useEffect(() => {
    axios.get("http://localhost:4000/api/products").then((res) => {
      setProducts(res.data);
    });

    axios.get("http://localhost:4000/api/groupproducts").then((res) => {
      setGroups(res.data);
    });
    const storedCart = JSON.parse(localStorage.getItem("guestCart")) || {
      products: [],
      groupproducts: [],
    };
    
    setCartProducts(storedCart.products || []);
    setCartGroups(storedCart.groupproducts || []);
  }, []);

  const updateLocalStorage = (products, groups) => {
    localStorage.setItem(
      "guestCart",
      JSON.stringify({ products, groupproducts: groups })
    );
  };

  const onAddToCart = (id, type, details) => {
    if (type === "product") {
      const exists = cartProducts.find((item) => item.product === id);
      let updated = exists
        ? cartProducts.map((item) =>
            item.product === id
              ? { ...item, quantity: item.quantity + 1, image: details.image, name: details.name , price: details.price }
              : item
          )
        : [...cartProducts, { product: id, quantity: 1 , image: details.image, name: details.name , price: details.price }];

      setCartProducts(updated);
      updateLocalStorage(updated, cartGroups);
    } else {
      const exists = cartGroups.find((item) => item.group === id);
      let updated = exists
        ? cartGroups.map((item) =>
            item.group === id
              ? { ...item, quantity: item.quantity + 1, image: details.image, name: details.name , price: details.price }
              : item
          )
        : [...cartGroups, { group: id, quantity: 1 , image: details.image , name: details.name , price: details.price }];
      setCartGroups(updated);
      updateLocalStorage(cartProducts, updated);
    }
    console.log("cartproducts", cartProducts);
    console.log("cartgroups", cartGroups);
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
    <div className="homepage">
            <Navbar 
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <CartUserSidebar
        cartProducts={cartProducts}
        cartGroups={cartGroups}
        onQuantityChange={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      <div className="projectsandservices">
      <Products products={products} onAddToCart={onAddToCart} />
      <Groups groups={groups} onAddToCart={onAddToCart} />
      <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}

export default HomePage;