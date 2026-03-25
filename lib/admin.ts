import { getDb } from "./mongodb";

export type AdminUser = {
  _id?: string;
  email: string;
  password: string;
  role: "admin";
  createdAt: Date;
};

export async function getAdminCollection() {
  const db = await getDb();
  return db.collection<AdminUser>("admins");
}