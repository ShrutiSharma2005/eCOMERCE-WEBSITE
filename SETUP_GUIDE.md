# E-Commerce Website - Setup & Run Guide

## 🚀 Quick Start

### Prerequisites
Before running the application, ensure you have:
- **Node.js** (v16 or higher)
- **MongoDB** (running on localhost:27017)

### Installation
```bash
npm install
```

### Running the Application

#### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```
This starts the Vite dev server on `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
npm run server
```
This starts the Express backend on `http://localhost:5000`

#### Option 2: Run Both Concurrently (Recommended)
```bash
npm install -D concurrently
npm run dev:all
```
This runs both frontend and backend in a single terminal.

### MongoDB Setup

1. **Install MongoDB** (if not already installed):
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas (cloud) - Update `.env` with your connection string

2. **Start MongoDB**:
   ```bash
   # Windows (if installed as service)
   net start MongoDB
   
   # Or run manually
   mongod
   ```

3. **Verify MongoDB is running**:
   - Open MongoDB Compass or connect via CLI
   - Default connection: `mongodb://localhost:27017`

### Environment Variables

The `.env` file contains:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=secret123
```

Update these if needed.

### Default Admin Credentials

After the database is seeded, you can login with:
- **Email**: admin@gmail.com
- **Password**: 123456

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder with:
- Code splitting for better performance
- Lazy loading for routes
- Vendor chunking for optimal caching
- Minified and optimized assets

### Troubleshooting

#### "Something went wrong" on Login
- ✅ Ensure MongoDB is running
- ✅ Ensure backend server is running (`npm run server`)
- ✅ Check that backend is accessible at `http://localhost:5000`

#### "Loading..." stuck on page
- ✅ Check browser console for errors
- ✅ Ensure all dependencies are installed
- ✅ Try clearing browser cache and reloading

#### Port already in use
- Frontend (5173): Change in `vite.config.js`
- Backend (5000): Change in `.env` file

### Project Structure

```
├── backend/              # Express backend
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── src/                 # React frontend
│   ├── components/      # Reusable components
│   ├── Pages/           # Page components
│   ├── Context/         # React Context
│   ├── services/        # API services
│   └── Utils/           # Utilities
└── dist/                # Production build
```

### Features

✨ **User Features:**
- Browse products by category (Men, Women, Kids)
- Search functionality
- Shopping cart with persistent state
- User authentication & profile
- Checkout with Stripe integration
- Order history

✨ **Admin Features:**
- Dashboard with analytics
- Product management (CRUD)
- Order management
- Sales analytics with charts

### Performance Optimizations

- ⚡ Lazy loading for all routes
- 📦 Vendor code splitting
- 🎯 Manual chunking for optimal caching
- 🗜️ Terser minification
- 🚀 Optimized production builds

---

**Need Help?** Check the console for detailed error messages or review the error boundary for user-friendly error displays.
