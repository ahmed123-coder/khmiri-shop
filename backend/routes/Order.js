const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const DetailsClient = require("../models/DetailsClient");
const ProductGroup = require("../models/ProductGroup");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_secret_key";



// Create a new order
router.post("/", async (req, res) => {
  try {
    console.log("Received Order Data:", req.body);
    const { customer, products, productGroups, paymentMethod } = req.body;

    let totalPrice = 0;

    // التحقق من المنتجات وتحديث الكميات
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item.product} not found` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient quantity for product ${product.name}` });
      }
      totalPrice += product.price * item.quantity;
      product.quantity -= item.quantity;
      await product.save();
    }

    // التحقق من مجموعات المنتجات وتحديث الكميات
    for (const groupItem of productGroups) {
      const group = await ProductGroup.findById(groupItem.group).populate("products.product");
      if (!group) {
        return res.status(404).json({ error: `Product group with ID ${groupItem.group} not found` });
      }
      for (const item of group.products) {
        if (item.product.quantity < item.quantity * groupItem.quantity) {
          return res.status(400).json({ error: `Insufficient quantity for product ${item.product.name} in group ${group.name}` });
        }
        item.product.quantity -= item.quantity * groupItem.quantity;
        await item.product.save();
      }
      totalPrice += group.price * groupItem.quantity;
    }

    // إنشاء الطلب
    const order = new Order({
      customer,
      products,
      productGroups,
      totalPrice,
      status: "pending",
      paymentMethod,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error.message || error);
    res.status(500).json({ error: error.message || "Error creating order" });
  }
});


// Get all orders
router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const orders = await Order.find()
      .populate({ path: "customer", select: "firstName lastName email", strictPopulate: false })
      .populate("products.product", "name price image")
      .populate("productGroups.group", "name price image")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message || "Error fetching orders" });
  }
});


// Update delivery status 
router.put("/:id/pending", async (req, res) => {
  try {
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
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      order.status = "pending";
      await order.save();
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating delivery status" });
  }
});
router.put("/:id/delivered", async (req, res) => {
  try {
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
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      order.status = "delivered";
      await order.save();
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating delivery status" });
  }
});
router.put("/:id/canceled", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decode = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decode.id);
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if(order.customer !== user._id){
      return res.status(403).json({ message: "You are not authorized to cancel this order" });
    }
      order.status = "cancelled";
      await order.save();
      res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Error updating delivery status" });
  }
});
router.put("/:id", async (req, res)=>{
  try{
    const token  =req.headers.authorization?.split(" ")[1];
    if(!token){
      return res.status(401).json({ message: "No token provided" });
    }
    const decode = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decode.id);
    if(!user){
      return res.status(404).json({ message: "No token provided" });
    }
    if(user.role === "admin"){
      const { customer, products, productGroups, paymentMethod } = req.body;

      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ error: "Order not found" });
  
      let totalPrice = 0;
  
      // استعادة الكميات السابقة
      for (const item of order.products) {
        const product = await Product.findById(item.product);
        if (product) product.quantity += item.quantity;
        await product.save();
      }
      for (const groupItem of order.productGroups) {
        const group = await ProductGroup.findById(groupItem.group).populate("products.product");
        if (group) {
          for (const item of group.products) {
            item.product.quantity += item.quantity * groupItem.quantity;
            await item.product.save();
          }
        }
      }
  
      // التحقق من المنتجات الجديدة وتحديث المخزون
      for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) return res.status(404).json({ error: `Product with ID ${item.product} not found` });
  
        if (product.quantity < item.quantity) {
          return res.status(400).json({ error: `Insufficient quantity for product ${product.name}` });
        }
  
        totalPrice += product.price * item.quantity;
        product.quantity -= item.quantity;
        await product.save();
      }
  
      // التحقق من مجموعات المنتجات الجديدة
      for (const groupItem of productGroups) {
        const group = await ProductGroup.findById(groupItem.group).populate("products.product");
        if (!group) return res.status(404).json({ error: `Product group with ID ${groupItem.group} not found` });
  
        for (const item of group.products) {
          if (item.product.quantity < item.quantity * groupItem.quantity) {
            return res.status(400).json({ error: `Insufficient quantity for product ${item.product.name} in group ${group.name}` });
          }
          item.product.quantity -= item.quantity * groupItem.quantity;
          await item.product.save();
        }
  
        totalPrice += group.price * groupItem.quantity;
      }
  
      // تحديث الطلب
      order.customer = customer || order.customer;
      order.products = products || order.products;
      order.productGroups = productGroups || order.productGroups;
      order.totalPrice = totalPrice;
      order.paymentMethod = paymentMethod;
  
      await order.save();
      res.status(200).json(order);
    }
  }catch(err){

  }
});
router.delete("/:id", async (req, res)=>{
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
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ error: "Order not found" });
  
      // استعادة الكميات السابقة عند الحذف
      for (const item of order.products) {
        const product = await Product.findById(item.product);
        if (product) {
          product.quantity += item.quantity;
          await product.save();
        }
      }
  
      for (const groupItem of order.productGroups) {
        const group = await ProductGroup.findById(groupItem.group).populate("products.product");
        if (group) {
          for (const item of group.products) {
            item.product.quantity += item.quantity * groupItem.quantity;
            await item.product.save();
          }
        }
      }
  
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Order deleted successfully" });
    }
  }catch(err){
    res.status(200).json({error: error.message});
  }
});

// GET /api/orders/:id => جلب الأوردر والتفاصيل المرتبطة به
router.get("/:id/detailclient", async (req, res) => {
  try {
    const orderId = req.params.id;

    // 1. جلب الأوردر
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "الطلب غير موجود" });

    // 2. جلب بيانات DetailsClient
    const detailsClient = await DetailsClient.findOne({ idorder: orderId });

    res.json(detailsClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "حدث خطأ أثناء جلب البيانات" });
  }
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ customer: userId })
      .populate({ path: "customer", select: "firstName lastName email", strictPopulate: false })
      .populate("products.product", "name price image")
      .populate("productGroups.group", "name price image")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
