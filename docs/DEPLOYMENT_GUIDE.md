# Deployment Guide

## 1. Backend Deployment (Render.com)

1.  **Create a Render Account**: Go to [render.com](https://render.com) and sign up.
2.  **New Web Service**: Click "New +" -> "Web Service".
3.  **Connect Repository**: Connect your GitHub repository.
4.  **Settings**:
    *   **Name**: `ecommerce-backend`
    *   **Region**: Choose closest to you.
    *   **Branch**: `main`
    *   **Root Directory**: `backend` (Important!)
    *   **Runtime**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
5.  **Environment Variables**:
    *   `NODE_ENV`: `production`
    *   `PORT`: `10000` (Render default)
    *   `MONGO_URI`: Your MongoDB Atlas connection string.
    *   `JWT_SECRET`: Your secret key.
    *   `STRIPE_SECRET_KEY`: Your Stripe secret.
    *   `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

## 2. Frontend Deployment (Vercel)

1.  **Create a Vercel Account**: Go to [vercel.com](https://vercel.com).
2.  **Import Project**: Click "Add New..." -> "Project" -> Import from GitHub.
3.  **Configure Project**:
    *   **Framework Preset**: Vite
    *   **Root Directory**: `./` (default)
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
4.  **Environment Variables**:
    *   `VITE_API_URL`: The URL of your deployed backend (e.g., `https://ecommerce-backend.onrender.com`)
    *   `VITE_STRIPE_PUBLIC_KEY`: Your Stripe public key.

## 3. MongoDB Atlas Setup

1.  **Create Cluster**: Go to [mongodb.com/atlas](https://www.mongodb.com/atlas).
2.  **Database Access**: Create a database user (username/password).
3.  **Network Access**: Whitelist IP `0.0.0.0/0` (allow access from anywhere) or specific Render IPs.
4.  **Get Connection String**: Click "Connect" -> "Connect your application" -> Copy string.

## 4. Post-Deployment Checks

1.  **Verify API**: Visit `https://your-backend.onrender.com/` to see "API is running...".
2.  **Verify Frontend**: Visit your Vercel URL.
3.  **Test Flow**: Register a user, login, add to cart, and checkout.
