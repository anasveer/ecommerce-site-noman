const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

console.log("MONGODB_URI loaded:", !!uri);
console.log("ADMIN_EMAIL loaded:", !!adminEmail);
console.log("ADMIN_PASSWORD loaded:", !!adminPassword);

if (!uri || !adminEmail || !adminPassword) {
  throw new Error("Missing required env vars");
}

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db();
    const admins = db.collection("admins");

    await admins.createIndex({ email: 1 }, { unique: true });

    const existing = await admins.findOne({
      email: adminEmail.toLowerCase(),
    });

    if (existing) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    await admins.insertOne({
      email: adminEmail.toLowerCase(),
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
    });

    console.log("Admin created successfully");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await client.close();
  }
}

seed();