# Project Folder Structure

```
eCOMERCE WEBSITE/
├── backend/
│   ├── config/
│   │   └── db.js             # Database connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js # Protect routes
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   ├── orderModel.js
│   │   ├── sellerModel.js    # New
│   │   └── reviewModel.js    # New
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── uploadRoutes.js   # Image upload
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── sendEmail.js
│   ├── server.js             # Entry point
│   └── .env
├── src/
│   ├── assets/               # Images, fonts
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── Product/
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductRating.jsx
│   │   ├── UI/               # Reusable UI components (Button, Input)
│   │   └── Admin/            # Admin components
│   ├── context/              # React Context (if not using Redux for everything)
│   ├── hooks/                # Custom hooks
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   └── Admin/
│   │       ├── Dashboard.jsx
│   │       └── ProductList.jsx
│   ├── redux/                # Redux Toolkit
│   │   ├── store.js
│   │   └── slices/
│   │       ├── cartSlice.js
│   │       ├── authSlice.js
│   │       └── productSlice.js
│   ├── utils/                # Helper functions
│   ├── App.jsx
│   └── main.jsx
├── docs/                     # Documentation
│   ├── ARCHITECTURE_AND_PLAN.md
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   └── ROADMAP.md
├── .gitignore
├── package.json
└── README.md
```
