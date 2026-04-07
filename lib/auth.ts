import { SignJWT, jwtVerify } from "jose";

// ✅ Safe getter (no crash on import)
function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  // 👉 agar missing hai to null return karo (crash nahi)
  if (!secret) {
    console.warn("⚠️ JWT_SECRET is not set");
    return null;
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: {
  userId: string;
  email: string;
  role: string;
}) {
  const secret = getJwtSecret();

  // ❌ agar secret nahi hai to token generate hi na karo
  if (!secret) {
    throw new Error("JWT not configured");
  }

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  try {
    const secret = getJwtSecret();

    // ❌ agar secret missing hai to always invalid treat karo
    if (!secret) return null;

    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}