const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

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

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

router.post("/cart", async (req, res) => {
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

router.get("/cart", async (req, res) => {
  try {
    const cart = [
      { productId: "1", name: "Camiseta", quantity: 2, price: 29.99 },
      { productId: "2", name: "Calça Jeans", quantity: 1, price: 59.99 },
    ];
    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
});

module.exports = router;
