
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/Product.css";
import Admin from "./admin";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    image: null,
  });

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategory();
  }, []);

  const handleedit = (product) => {
    setEditProduct(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      quantity: product.quantity,
      image: product.image,
    });
  };

  const deleteproduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/categorys", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategorys(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("quantity", formData.quantity);
    data.append("image", formData.image);

    try {
      if (editProduct) {
        // Update existing product
        const response = await axios.put(
          `http://localhost:4000/api/products/${editProduct}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Product updated:", response.data);
      } else {
        // Add new product
        const response = await axios.post(
          "http://localhost:4000/api/products",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Product added:", response.data);
      }

      // Reset form and fetch updated product list
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        image: null,
      });
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="products-admin">
      <Admin />
      <h1>Add a New Product</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            {categorys.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" name="image" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="submit-btn">
          {editProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h2>Product List</h2>
      <div className="row">
          {products.filter(product => product.isActive).map((product) => (
            <div key={product._id} className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mb-4">
              <div className="card h-100 text-center">
                <img
                  src={`http://localhost:4000/${product.image}`} 
                  alt={product.name}
                  className="card-img-top"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                <h3>{product.name}</h3>
            <p>Description:{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
                  <p className="card-text"><strong>السعر:</strong> {product.price} دولار</p>
                  <button className="edit-btn" onClick={() => handleedit(product)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteproduct(product._id)}>
                Delete
              </button>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default ProductsAdmin;