'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, Menu, X, ChevronDown, Heart } from 'lucide-react';
import { FaBed, FaCouch } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const hideNavbar = pathname === '/login' || pathname.startsWith('/dashboard');
  if (hideNavbar) return null;

  const categories = [
    { name: 'Fabrics', icon: <FaCouch className="h-5 w-5" />, href: '/category/fabric', sub: [] },
    { name: 'Bedsheets', icon: <FaBed className="h-5 w-5" />, href: '#', sub: [
      { name: 'Comforter Set', href: '/category/bedsheet/comforter-set', icon: <FaBed className="h-4 w-4" /> },
      { name: '3 Pcs Bedsheet', href: '/category/bedsheet/3pcs-bedsheet', icon: <FaBed className="h-4 w-4" /> },
      { name: 'Single Pair Bedsheet', href: '/category/bedsheet/single-pair-bedsheet', icon: <FaBed className="h-4 w-4" /> },
    ] },
  ];

  return (
    <nav className="text-white fixed top-0 left-0 right-0 z-50 border-b border-gray-800 font-sans bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#d4af37] to-[#f1d592] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] overflow-hidden">
                <img src="/logo.png" alt="universal" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className=" text-lg sm:text-2xl text-gray-800 font-bold italic font-serif">
                  Universal <span className="text-[#1EBD87] font-light">Bedding</span>
                </span>
                {/* <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium hidden sm:block">
                  Premium Collections
                </span> */}
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <a href="/" className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200 hover:bg-white/5 ${pathname === "/" ? "text-[#1EBD87] border-b-2 border-[#1EBD87]" : "text-gray-800 hover:text-[#1EBD87]"}`}>
              Home
            </a>
            <div className="relative group">
              <button className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200 ${pathname.startsWith("/category") ? "text-[#1EBD87] border-b-2 border-[#1EBD87]" : "text-gray-800 group-hover:text-[#1EBD87]"}`}>
                Collections <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50">
                <div className="p-2">
                  {categories.map((cat) => (
                    <div key={cat.name}>
                      <a href={cat.href} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-[#1EBD87] hover:bg-gray-50 rounded-lg transition-colors">
                        <span className="text-[#1EBD87] bg-[#1EBD87]/10 p-2 rounded-lg">{cat.icon}</span>
                        <span className="font-medium">{cat.name}</span>
                      </a>
                      {cat.sub && cat.sub.length > 0 && (
                        <div className="ml-8 mt-1 space-y-1">
                          {cat.sub.map((sub) => (
                            <a key={sub.name} href={sub.href} className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#1EBD87] hover:bg-gray-50 rounded-lg transition-colors">
                              <span className="text-[#1EBD87]">{sub.icon}</span>
                              <span>{sub.name}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <a href="/my-orders" className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200 hover:bg-white/5 ${pathname === "/my-orders" ? "text-[#1EBD87] border-b-2 border-[#1EBD87]" : "text-gray-800 hover:text-[#1EBD87]"}`}>My Orders</a>
            <a href="/cart" className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200 hover:bg-white/5 ${pathname === "/cart" ? "text-[#1EBD87] border-b-2 border-[#1EBD87]" : "text-gray-800 hover:text-[#1EBD87]"}`}>View Cart</a>
            <a href="/docs" className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200 hover:bg-white/5 ${pathname === "/docs" ? "text-[#1EBD87] border-b-2 border-[#1EBD87]" : "text-gray-800 hover:text-[#1EBD87]"}`}>Docs</a>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-[240px] xl:max-w-xs mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search by title, barcode..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:border-gray-400"
              />
              <button type="submit" className="absolute right-3 top-2 text-gray-500">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wishlist Icon */}
            <Link href="/wishlist" className="p-2 text-gray-800 hover:text-red-500 transition-colors relative">
              <Heart className="h-6 w-6" />
              {totalWishlist > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 animate-bounce">
                  {totalWishlist > 99 ? '99+' : totalWishlist}
                </span>
              )}
            </Link>
            {/* Cart Icon with Badge */}
            <Link href="/cart" className="p-2 text-gray-800 hover:text-[#1EBD87] transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#1EBD87] text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 animate-bounce">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-800 hover:text-[#1EBD87] hover:bg-gray-100 transition-all active:scale-95"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl flex flex-col border-l border-gray-200">
          <div className="p-6 flex items-center justify-between border-b border-gray-200">
            <span className="text-xl font-bold italic text-gray-800">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-500 hover:text-[#1EBD87]">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            <div className="mb-6">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                />
                <button type="submit" className="absolute right-3 top-2 text-gray-500">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            <a href="/" className={`block px-4 py-4 text-lg font-medium rounded-xl transition-all ${pathname === '/' ? 'text-[#1EBD87] border-l-4 border-[#1EBD87] bg-[#1EBD87]/5' : 'text-gray-800 hover:bg-gray-50 hover:text-[#1EBD87]'}`}>Home</a>

            <div className="space-y-1">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`w-full flex items-center justify-between px-4 py-4 text-lg font-medium rounded-xl transition-all ${pathname.startsWith('/category') ? 'text-[#1EBD87] border-l-4 border-[#1EBD87] bg-[#1EBD87]/5' : 'text-gray-800 hover:bg-gray-50 hover:text-[#1EBD87]'}`}
              >
                Collections
                <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isCategoryOpen ? 'max-h-96' : 'max-h-0'}`}>
                {categories.map((cat) => (
                  <div key={cat.name}>
                    <a href={cat.href} className="flex items-center gap-4 px-8 py-3 text-gray-700 hover:text-[#1EBD87] hover:bg-gray-50 transition-colors rounded-lg">
                      <span className="text-[#1EBD87] bg-[#1EBD87]/10 p-2 rounded-lg">{cat.icon}</span>
                      {cat.name}
                    </a>
                    {cat.sub && cat.sub.length > 0 && (
                      <div className="ml-12 space-y-1">
                        {cat.sub.map((sub) => (
                          <a key={sub.name} href={sub.href} className="flex items-center gap-3 px-8 py-2 text-sm text-gray-500 hover:text-[#1EBD87] transition-colors">
                            <span className="text-[#1EBD87]">{sub.icon}</span>
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/cart"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-4 text-lg font-medium rounded-xl transition-all ${pathname === '/cart' ? 'text-[#1EBD87] border-l-4 border-[#1EBD87] bg-[#1EBD87]/5' : 'text-gray-800 hover:bg-gray-50 hover:text-[#1EBD87]'}`}
            >
              <ShoppingCart className="h-5 w-5" />
              Cart
              {totalItems > 0 && (
                <span className="ml-auto bg-[#1EBD87] text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>
              )}
            </Link>

            <a href="/my-orders" className={`block px-4 py-4 text-lg font-medium rounded-xl transition-all ${pathname === '/my-orders' ? 'text-[#1EBD87] border-l-4 border-[#1EBD87] bg-[#1EBD87]/5' : 'text-gray-800 hover:bg-gray-50 hover:text-[#1EBD87]'}`}>My Orders</a>
            <a href="/docs" className={`block px-4 py-4 text-lg font-medium rounded-xl transition-all ${pathname === '/docs' ? 'text-[#1EBD87] border-l-4 border-[#1EBD87] bg-[#1EBD87]/5' : 'text-gray-800 hover:bg-gray-50 hover:text-[#1EBD87]'}`}>Docs</a>

          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-center gap-6 text-gray-400 py-2">
              <span className="text-xs uppercase tracking-widest">Est. 2024</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
