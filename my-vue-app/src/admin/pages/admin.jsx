import React from "react";
import { Link } from "react-router-dom";
import "../style/admin.css"; // Ensure you have this CSS file for styling

function Admin() {
  return (
    <div className="admin-sidebar">
      <h2 className="admin-title">📊 Admin Panel</h2>
      <nav className="admin-nav">
        <ul>
          <li>
            <Link to="/"><i className="bi bi-house-door"></i> Home</Link>
          </li>
          <li>
            <Link to="/admin/users"><i className="bi bi-people"></i> Users</Link>
          </li>
          <li>
            <Link to="/admin/categories"><i className="bi bi-tags"></i> Categories</Link>
          </li>
          <li>
            <Link to="/admin/productsAdmin"><i className="bi bi-box"></i> Products</Link>
          </li>
          <li>
            <Link to="/admin/group-product"><i className="bi bi-boxes"></i> Group Products</Link>
          </li>
          <li>
            <Link to="/admin/ordersAdminPage"><i className="bi bi-receipt"></i> Orders</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Admin;
