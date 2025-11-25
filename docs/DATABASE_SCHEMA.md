# Database Schema Design (MongoDB)

## 1. User Schema
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true }, // Added for OTP
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'seller'], default: 'user' },
  
  // Profile Details
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  
  // Address Management
  addresses: [{
    name: String,
    mobile: String,
    pincode: String,
    locality: String,
    address: String,
    city: String,
    state: String,
    landmark: String,
    isDefault: { type: Boolean, default: false }
  }],

  // Wishlist
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],

  // Wallet (Flipkart SuperCoins style)
  walletBalance: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });
```

## 2. Seller Schema (Extension of User or Separate)
*We will use a separate collection for strict separation of concerns, linked to User.*

```javascript
const sellerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  businessName: { type: String, required: true },
  gstNumber: { type: String, required: true },
  pickupAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  kycStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  kycDocuments: {
    panCard: String, // URL
    gstCertificate: String // URL
  },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 }
}, { timestamps: true });
```

## 3. Product Schema
```javascript
const productSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  name: { type: String, required: true, index: true }, // Indexed for search
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  brand: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true }, // e.g., "Electronics"
  subCategory: { type: String }, // e.g., "Mobiles"
  
  // Images
  images: [{ type: String, required: true }], // Array of URLs
  
  // Variants (Crucial for Flipkart-like system)
  variants: [{
    color: String,
    size: String,
    ram: String,
    storage: String,
    price: { type: Number, required: true },
    mrp: { type: Number, required: true }, // For calculating discount
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String }
  }],

  // Specifications (Key-Value pairs)
  specifications: [{
    title: String, // e.g., "Display"
    details: [{ key: String, value: String }] // e.g., "Size": "6.1 inch"
  }],

  // Ratings
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],

  // Analytics
  viewCount: { type: Number, default: 0 },
  soldCount: { type: Number, default: 0 },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });
```

## 4. Order Schema
```javascript
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  orderItems: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: String }, // To track which variant was bought
    name: String,
    image: String,
    price: Number,
    qty: Number,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' } // For multi-seller orders
  }],

  shippingAddress: {
    name: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
    mobile: String
  },

  paymentInfo: {
    id: String,
    status: String, // 'pending', 'succeeded', 'failed'
    type: String, // 'Stripe', 'COD', 'Razorpay'
  },

  // Pricing
  itemsPrice: { type: Number, required: true },
  taxPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },

  // Order Status Lifecycle
  orderStatus: { 
    type: String, 
    enum: ['Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'], 
    default: 'Processing' 
  },

  // Timestamps for tracking
  packedAt: Date,
  shippedAt: Date,
  deliveredAt: Date,
  
  // Logistics
  trackingId: String,
  deliveryPartner: String,

}, { timestamps: true });
```

## 5. Review Schema
```javascript
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  images: [{ type: String }], // User review images
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Helpful votes
}, { timestamps: true });
```
