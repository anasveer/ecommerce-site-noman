"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusSquare, Package2, ShoppingBag } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
   {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Add Product",
    href: "/dashboard/add-product",
    icon: PlusSquare,
  },
  {
    title: "All Products",
    href: "/dashboard/all-products",
    icon: Package2,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-[270px] md:min-h-screen border-r border-slate-200 bg-white/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(59,130,246,0.08)]">
      <div className="p-6">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 to-sky-500 p-5 text-white shadow-[0_18px_50px_rgba(59,130,246,0.28)]">
          <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
          <p className="mt-1 text-sm text-blue-100">Manage your store easily</p>
        </div>
      </div>

      <div className="px-4 pb-6">
        <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Navigation
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                    isActive
                      ? "bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-md"
                      : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}