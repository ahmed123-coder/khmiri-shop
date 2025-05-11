import React from "react";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
          <li>
            <Link to="/admin/categories">Categories</Link>
          </li>
          <li>
            <Link to="/admin/productsAdmin">ProductsAdmin</Link>
          </li>
          <li>
            <Link to="/admin/group-product">Group Product Admin</Link>
          </li>
          <li>
            <Link to="/admin/ordersAdminPage">OrdersAdminPage</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Admin;