import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ التصحيح هنا
import "../styles/CartSidebar.css";

function CartUserSidebar({ cartProducts = [], cartGroups = [], onQuantityChange, onRemove, onClose, isOpen }) {
  const navigate = useNavigate();  

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>🛒 سلة المشتريات</h2>

      {cartProducts.length === 0 && cartGroups.length === 0 ? (
        <p>السلة فارغة</p>
      ) : (
        <div className="cart-items">
          {cartProducts.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-details">
                <h3>name: {item.name}</h3>
                <img src={`http://localhost:4000/${item.image}`} alt={item.name} className="cart-item-image" />
                <p>السعر: {item.price} دولار</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => onQuantityChange(item.product, "product", item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onQuantityChange(item.product, "product", item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button className="remove-btn" onClick={() => onRemove(item.product, "product")}>
                  حذف
                </button>
              </div>
            </div>
          ))}

          {cartGroups.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-details">
                <h3>name: {item.name}</h3>
                <img src={`http://localhost:4000/${item.image}`} alt={item.name} className="cart-item-image" />
                <p>السعر: {item.price} دولار</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => onQuantityChange(item.group, "groupproduct", item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onQuantityChange(item.group, "groupproduct", item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button className="remove-btn" onClick={() => onRemove(item.group, "groupproduct")}>
                  حذف
                </button>
              </div>
            </div>
          ))}

          <div className="total-price">
            <h3>إجمالي السعر:</h3>
            <p>
              {cartProducts.reduce((total, item) => total + item.price * item.quantity, 0) +
                cartGroups.reduce((total, item) => total + item.price * item.quantity, 0)}{" "}
              دولار
            </p>
          </div>

          <div className="checkout-btn-container">
            <button className="checkout-btn" onClick={() => navigate("/detailClient")}>
              إتمام الشراء
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartUserSidebar;
