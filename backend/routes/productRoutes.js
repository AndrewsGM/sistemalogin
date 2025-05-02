const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

const seedProducts = async () => {
  try {
    const products = [
      {
        name: "Camiseta",
        price: 29.99,
        description: "Camiseta de algodão confortável",
      },
      {
        name: "Calça Jeans",
        price: 59.99,
        description: "Calça jeans resistente",
      },
    ];
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded successfully");
  } catch (error) {
    console.error("Error seeding products:", error.message);
  }
};
seedProducts();

router.get("/products", authenticateToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

router.post("/cart", authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = new Cart({
      userId: req.user.id,
      productId,
      quantity,
    });
    await cartItem.save();

    res.status(201).json({
      message: "Item added to cart",
      product: {
        _id: productId,
        name: product.name,
        quantity,
        price: product.price,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
});

router.get("/cart", authenticateToken, async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id }).populate(
      "productId"
    );
    const cart = cartItems.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      quantity: item.quantity,
      price: item.productId.price,
    }));
    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
});

module.exports = router;
