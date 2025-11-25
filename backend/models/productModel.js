import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        images: [{ type: String }], // Review images
    },
    {
        timestamps: true,
    }
);

const variantSchema = mongoose.Schema({
    color: { type: String },
    size: { type: String },
    ram: { type: String },
    storage: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String },
    images: [{ type: String }], // Variant specific images
});

const productSchema = mongoose.Schema(
    {
        user: { // Creator (Admin/Seller)
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        seller: { // Explicit seller reference (could be same as user or a Seller profile)
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
            index: true,
        },
        image: { // Main image (kept for backward compatibility)
            type: String,
            required: true,
        },
        images: [{ // Multiple images
            type: String,
        }],
        brand: {
            type: String,
            required: true,
            index: true,
        },
        category: {
            type: String,
            required: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
        },
        reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        variants: [variantSchema],
        specifications: [{
            title: String,
            details: [{ key: String, value: String }]
        }],
        isPublished: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
