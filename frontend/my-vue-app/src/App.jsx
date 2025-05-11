import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import User from "./admin/pages/User";
import Category from "./admin/pages/Category";
import Login from "./pages/Login";
import Homepage from "./pages/Home";
import DetailClient from "./pages/DetailClient";
import ProductsAdmin from "./admin/pages/ProductsAdmin";
import AdminOrder from "./admin/pages/AdminGroupproducts";
import Register from "./pages/register";
import OrdersAdminPage from "./admin/pages/ordere";
import DetailsOrder from "./pages/detailsorder";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import About from "./pages/About";
import Admin from "./admin/pages/admin";
import Logout from "./pages/logout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/detailClient" element={<DetailClient />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details-order" element={<DetailsOrder />} />
        <Route path="/admin" element={<Admin />} />
        {/* Nested Admin Routes */}
        <Route path="/admin/users" element={<User />} />
        <Route path="/admin/categories" element={<Category />} />
        <Route path="/admin/productsAdmin" element={<ProductsAdmin />} />
        <Route path="/admin/group-product" element={<AdminOrder />} />
        <Route path="/admin/ordersAdminPage" element={<OrdersAdminPage />} />
      </Routes>
    </>
  );
}

export default App;