const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

const seedUsers = [
  { email: "admin@example.com", password: "admin123" },
  { email: "user@example.com", password: "user123" },
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

    mongoose.connection.close();
    console.log("Seeding completed, connection closed");
  } catch (err) {
    console.error("Seeding error:", err.message);
    process.exit(1);
  }
};

seedDatabase();
