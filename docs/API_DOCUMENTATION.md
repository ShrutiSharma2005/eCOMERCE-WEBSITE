# API Documentation

## Base URL
`http://localhost:5000/api/v1`

## 1. Authentication (Auth)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | Login user (Email/Password) | Public |
| POST | `/auth/login-otp` | Login with OTP (Request) | Public |
| POST | `/auth/verify-otp` | Verify OTP and Login | Public |
| POST | `/auth/logout` | Logout user | Private |
| GET | `/auth/me` | Get current user profile | Private |

## 2. Products
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/products` | Get all products (Pagination, Search, Filter) | Public |
| GET | `/products/:id` | Get single product details | Public |
| POST | `/products` | Create product | Seller/Admin |
| PUT | `/products/:id` | Update product | Seller/Admin |
| DELETE | `/products/:id` | Delete product | Seller/Admin |
| POST | `/products/:id/reviews` | Add review | Private |

## 3. Orders
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/orders` | Create new order | Private |
| GET | `/orders/myorders` | Get logged-in user's orders | Private |
| GET | `/orders/:id` | Get order by ID | Private |
| PUT | `/orders/:id/pay` | Update order to paid | Private |
| PUT | `/orders/:id/status` | Update order status (Admin/Seller) | Admin/Seller |

## 4. Users
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/users` | Get all users | Admin |
| PUT | `/users/profile` | Update user profile | Private |
| POST | `/users/address` | Add new address | Private |
| DELETE | `/users/address/:id` | Delete address | Private |

## 5. Sellers
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/sellers/register` | Register as seller | Private |
| GET | `/sellers/dashboard` | Get seller stats | Seller |
| GET | `/sellers/orders` | Get orders for seller | Seller |

## 6. Payment
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/payment/create-intent` | Create Stripe Payment Intent | Private |
| POST | `/payment/razorpay` | Create Razorpay Order | Private |
