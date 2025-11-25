import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy load all page components for better code-splitting
const Home = lazy(() => import('./Pages/Home'))
const Mens = lazy(() => import('./Pages/Mens'))
const Womens = lazy(() => import('./Pages/Womens'))
const Kids = lazy(() => import('./Pages/Kids'))
const Login = lazy(() => import('./Pages/Login'))
const AdminLogin = lazy(() => import('./Pages/AdminLogin'))
const Cart = lazy(() => import('./Pages/Cart'))
const Wishlist = lazy(() => import('./Pages/Wishlist'))
const SingleProduct = lazy(() => import('./components/SingleProduct'))
const AdminDashboard = lazy(() => import('./Pages/AdminDashboard'))
const AdminHome = lazy(() => import('./components/Admin/AdminHome'))
const ProductList = lazy(() => import('./components/Admin/ProductList'))
const ProductEdit = lazy(() => import('./components/Admin/ProductEdit'))
const Checkout = lazy(() => import('./Pages/Checkout'))
const Profile = lazy(() => import('./Pages/Profile'))
const OrderList = lazy(() => import('./components/Admin/OrderList'))

// Loading fallback component - smaller, inline version
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    fontSize: '1rem',
    color: '#999'
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #ef4444',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: "search/:keyword",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Profile />
          </Suspense>
        )
      },
      {
        path: "mens",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Mens />
          </Suspense>
        )
      },
      {
        path: "womens",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Womens />
          </Suspense>
        )
      },
      {
        path: "kids",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Kids />
          </Suspense>
        )
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        )
      },
      {
        path: "admin-login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminLogin />
          </Suspense>
        )
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Cart />
          </Suspense>
        )
      },
      {
        path: "wishlist",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Wishlist />
          </Suspense>
        )
      },
      {
        path: "products/:productId",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SingleProduct />
          </Suspense>
        )
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Checkout />
          </Suspense>
        )
      },
    ]
  },
  {
    path: "/admin",
    errorElement: <ErrorBoundary />,
    element: (
      <Suspense fallback={<PageLoader />}>
        <AdminDashboard />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminHome />
          </Suspense>
        )
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductList />
          </Suspense>
        )
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<PageLoader />}>
            <OrderList />
          </Suspense>
        )
      },
      {
        path: "product/:id/edit",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductEdit />
          </Suspense>
        )
      },
    ]
  }
])

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  )
}

export default App
