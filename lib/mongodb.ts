import "server-only";
import mongoose from "mongoose";

function getMongoURI() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("⚠️ MONGODB_URI is not set");
    return null;
  }

  return uri;
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  const uri = getMongoURI();

  // ❌ agar URI nahi hai to DB connect skip karo
  if (!uri) {
    throw new Error("MongoDB not configured");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}