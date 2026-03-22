require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const rawUsers = [
  { firstName: "Admin", lastName: "Khmiri", email: "admin@khmiri-shop.com", password: "admin123", role: "admin" },
  { firstName: "John", lastName: "Doe", email: "customer@khmiri-shop.com", password: "customer123", role: "customer" },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  await User.deleteMany({ email: { $in: rawUsers.map((u) => u.email) } });

  const users = await Promise.all(
    rawUsers.map(async (u) => ({ ...u, password: await bcrypt.hash(u.password, 10) }))
  );

  await User.insertMany(users);
  console.log("✅ Seeded 2 users: 1 admin, 1 customer");
  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
