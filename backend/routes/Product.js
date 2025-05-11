const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const JWT_SECRET = "your_secret_key";
const jwt = require("jsonwebtoken");
const User = require("../models/User");



// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Save files in the "uploads" folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // Rename file to avoid conflicts
    },
  });
  
const upload = multer({ storage: storage });
router.post("/",upload.single("image"), async (req, res)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decode = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decode.id);
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "admin") { // Only admins can add products
        const { name, description, price, category, quantity, isActive } = req.body;
        const image = req.file ? req.file.path : null; // Save the file path
        try {
          const product = new Product({
            name,
            description,
            price,
            category,
            quantity,
            image,
            isActive,
          });
          await product.save(); // Use await to ensure the product is saved
          res.status(201).json(product);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      } else {
        res.status(403).json({ message: "Only admins can add products" });
      }
});

router.get("/", async (req, res)=>{
    try{
      const products = await Product.find();
      res.status(200).json(products);
    }catch(error){
      res.status(500).json({error: error.message});
    }
});
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/:id", upload.single("image"), async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      const { name, description, price, category, quantity, isActive } = req.body;
      const image = req.file ? req.file.path : null; // Save the file path if a new image is uploaded

      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update product fields
      if (name) product.name = name;
      if (description) product.description = description;
      if (price) product.price = price;
      if (category) product.category = category;
      if (quantity) product.quantity = quantity;
      if (isActive !== undefined) product.isActive = isActive;
      if (image) product.image = image; // Update the image if a new one is uploaded

      await product.save();
      res.status(200).json(product);
    } else {
      res.status(403).json({ message: "Only admins can update products" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/:id", async (req, res) =>{
    try{
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const decode = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decode.id);
      if(!user){
        return res.status(404).json({ message: "User not found" });
      }
      if(user.role === "admin"){
        const idproduct = req.params.id;
        await Product.findByIdAndDelete(idproduct);
        res.status(200).json({ message: "User deleted successfully" });
      }
    }catch(error){
      res.status(200).json({error: error.message});
    }
});
module.exports = router;