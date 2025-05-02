const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
require("dotenv").config();

const seedUsers = [
  { email: "admin@example.com", password: "admin123" },
  { email: "user@example.com", password: "user123" },
];

const seedProducts = [
  {
    name: "Camiseta",
    price: 29.99,
    description: "Camiseta de algodão confortável",
  },
  { name: "Calça Jeans", price: 59.99, description: "Calça jeans resistente" },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding");

    await User.deleteMany();
    console.log("Cleared existing users");

    for (const user of seedUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = new User({
        email: user.email,
        password: hashedPassword,
      });
      await newUser.save();
      console.log(`User created: ${user.email}`);
    }

    await Product.deleteMany();
    await Product.insertMany(seedProducts);
    console.log("Products seeded successfully");

    await Cart.deleteMany();
    console.log("Cleared existing cart items");

    mongoose.connection.close();
    console.log("Seeding completed, connection closed");
  } catch (err) {
    console.error("Seeding error:", err.message);
    process.exit(1);
  }
};

seedDatabase();
