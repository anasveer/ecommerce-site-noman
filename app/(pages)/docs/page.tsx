import { ShoppingCart, Heart, Package, Truck, RefreshCcw, Shield, Search, Star, CreditCard, Phone, MessageCircle, User, Bell } from 'lucide-react';

const cards = [
  {
    icon: <ShoppingCart className="w-6 h-6 text-[#1EBD87]" />,
    title: "Shopping Cart",
    desc: "Add any product to your cart by clicking 'Add to Cart' button on product cards or product detail page. Your cart is saved on your device — items stay even if you close the browser. Cart count is always visible in the navbar."
  },
  {
    icon: <Heart className="w-6 h-6 text-red-500" />,
    title: "Wishlist / Favourites",
    desc: "Save your favourite products by clicking the Heart icon on any product card or product detail page. Your wishlist is stored on your device. Access it anytime from the Heart icon in the navbar."
  },
  {
    icon: <Search className="w-6 h-6 text-[#1EBD87]" />,
    title: "Search Products",
    desc: "Use the search bar in the navbar to find products by title or barcode. Search results show all matching products instantly. Works on both desktop and mobile."
  },
  {
    icon: <Package className="w-6 h-6 text-[#1EBD87]" />,
    title: "Product Categories",
    desc: "Browse products by category from the Collections menu in the navbar. Categories include: 3pcs Bedsheet, Single Pair Bedsheet, Comforter Set, and Water Proof Mattress Cover. Each category has fabric filters to narrow down your search."
  },
  {
    icon: <Star className="w-6 h-6 text-[#1EBD87]" />,
    title: "Product Details",
    desc: "Click on any product to view full details including images, price, fabric specifications, available colors, and product dimensions. You can add to cart or wishlist directly from the product page."
  },
  {
    icon: <CreditCard className="w-6 h-6 text-[#1EBD87]" />,
    title: "Checkout & Payment",
    desc: "We offer two payment methods: Cash on Delivery (COD) — pay when your order arrives. Advance Bank Transfer — transfer payment before delivery (recommended for faster processing). For advance payment, upload your payment screenshot during checkout."
  },
  {
    icon: <Truck className="w-6 h-6 text-[#1EBD87]" />,
    title: "Shipping Policy",
    desc: "Shipping is charged per kg of your order. Rates vary from Rs. 250 (1kg) up to Rs. 1500 (10kg). Orders are dispatched within 1–2 business days. Delivery time is 3–5 business days depending on your city."
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-[#1EBD87]" />,
    title: "Return & Refund Policy",
    desc: "We offer a 7-day return and exchange policy from the date of delivery. Items must be unused and in original condition. Quality is guaranteed for 2 months — if any defect is found, we will replace the product free of charge."
  },
  {
    icon: <Bell className="w-6 h-6 text-[#1EBD87]" />,
    title: "Order Status Guide",
    desc: "🕐 Pending — Your order has been placed. We are processing and preparing your parcel. | 🚚 On the Way — Your parcel has been dispatched and is on its way to you. | ✅ Completed — Your parcel has been successfully delivered. Order is complete."
  },
  {
    icon: <Bell className="w-6 h-6 text-[#1EBD87]" />,
    title: "Order Tracking",
    desc: "After placing your order, visit 'My Orders' page and enter your phone number to view all your orders. Each order shows its current status: Pending, On the Way, or Completed. You will be notified when your order status changes."
  },
  {
    icon: <User className="w-6 h-6 text-[#1EBD87]" />,
    title: "My Orders",
    desc: "Access your order history anytime by going to 'My Orders' in the navbar. Enter the phone number you used during checkout to see all your past and current orders with full details."
  },
  {
    icon: <Shield className="w-6 h-6 text-[#1EBD87]" />,
    title: "Quality Guarantee",
    desc: "All our products are made from premium quality fabrics. Colour and fabric quality is lifetime guaranteed. Each product goes through strict quality control before dispatch. We ensure you receive exactly what you see in the product images."
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-[#1EBD87]" />,
    title: "Customer Support",
    desc: "Need help? Contact us directly on WhatsApp for quick support. Our team is available to assist you with orders, products, returns, and any other queries. Click the WhatsApp button on any page to start a conversation."
  },
  {
    icon: <Phone className="w-6 h-6 text-[#1EBD87]" />,
    title: "WhatsApp Order",
    desc: "You can also place orders directly via WhatsApp. On any product detail page, click 'WhatsApp Order' to send us the product details instantly. Our team will confirm your order and arrange delivery."
  },
];

export default function DocsPage() {
  return (
    <section className="min-h-screen bg-white py-20 px-4 mt-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#1EBD87] text-xs font-bold uppercase tracking-[0.4em] mb-3">Documentation</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">How It Works</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Everything you need to know about shopping at Universal Bedding — features, policies, and how to get the best experience.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white border border-[#1EBD87]/20 rounded-2xl p-6 shadow-[0_4px_20px_rgba(30,189,135,0.08)] hover:shadow-[0_8px_30px_rgba(30,189,135,0.18)] hover:border-[#1EBD87]/40 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#1EBD87]/10 rounded-xl flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-gray-800 font-bold text-base mb-2">{card.title}</h3>
              <div className="text-gray-500 text-sm leading-relaxed space-y-2">
                {card.desc.split('|').map((line, j) => (
                  <p key={j}>{line.trim()}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-14 text-center bg-[#1EBD87]/5 border border-[#1EBD87]/20 rounded-2xl p-8">
          <p className="text-gray-700 font-semibold text-lg mb-2">Still have questions?</p>
          <p className="text-gray-500 text-sm mb-5">Our support team is ready to help you anytime via WhatsApp.</p>
          <a
            href="https://wa.me/923290135661?text=Hi, I need help with my order"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1EBD87] text-white px-6 py-3 rounded-full font-bold hover:bg-[#17a876] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Contact on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
