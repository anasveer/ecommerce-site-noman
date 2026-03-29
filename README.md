# Ecommerce Site

A professional e-commerce website built with Next.js, featuring admin dashboard, order management, and Google Sheets integration for permanent data storage.

## Features

- 🛍️ Product catalog with categories and subcategories
- 🛒 Shopping cart with user-specific persistence
- 📦 Order management with status tracking
- 👨‍💼 Admin dashboard for product and order management
- 📊 Google Sheets integration for permanent data storage
- 📱 Responsive design with Tailwind CSS
- 🔐 User authentication and authorization
- 🖼️ Cloudinary image uploads

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Google Cloud account (for Sheets API)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   JWT_SECRET=your_jwt_secret

   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Google Sheets API (see setup below)
   GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account_email
   GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
   ```

4. Set up Google Sheets integration:
   ```bash
   node setup-google-sheets.js
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Google Sheets Setup

For permanent order storage, follow these steps:

1. **Create Google Cloud Project**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google Sheets API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API" and enable it

3. **Create Service Account**
   - Go to "IAM & Admin" > "Service Accounts"
   - Create new service account (e.g., "ecommerce-orders")
   - Grant "Editor" role
   - Create JSON key and download the file

4. **Create Google Sheet**
   - Visit [Google Sheets](https://sheets.google.com/)
   - Create new spreadsheet named "Ecommerce Orders"
   - Add these headers in row 1:
     - A1: Order ID
     - B1: Email
     - C1: Items (JSON)
     - D1: Total
     - E1: Shipping Cost
     - F1: Amount Payable
     - G1: Payment Mode
     - H1: Payment Info
     - I1: Payment Screenshot
     - J1: Status
     - K1: Created At

5. **Share the Sheet**
   - Share the spreadsheet with your service account email (Editor access)

6. **Update Environment Variables**
   - Copy the `client_email` from the JSON key file to `GOOGLE_SHEETS_CLIENT_EMAIL`
   - Copy the `private_key` to `GOOGLE_SHEETS_PRIVATE_KEY`
   - Copy the spreadsheet ID from the URL to `GOOGLE_SHEETS_SPREADSHEET_ID`

7. **Test Integration**
   ```bash
   node test-google-sheets.js
   ```

## Usage

- **Customer Features:**
  - Browse products by category
  - Add items to cart
  - Place orders with multiple payment options
  - View order history at `/my-orders`

- **Admin Features:**
  - Login at `/login` with admin credentials
  - Manage products at `/dashboard/add-product`
  - View all orders at `/dashboard/orders`
  - Update order status and delete orders

## API Routes

- `GET/POST /api/orders` - Order management
- `GET/POST/PUT/DELETE /api/products` - Product management
- `POST /api/login` - Admin authentication
- `POST /api/upload` - Image uploads

## Technologies Used

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB (products), Google Sheets (orders)
- **Authentication:** JWT
- **Image Storage:** Cloudinary
- **Icons:** Lucide React

## Deployment

Deploy to Vercel, Netlify, or any Node.js hosting platform. Make sure to set environment variables in your deployment platform.
