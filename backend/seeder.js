import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/database.js';
import all_product from '../src/Utils/all_product.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: '123',
                role: 'admin'
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: '123',
            }
        ]);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = all_product.map((product) => {
            return {
                user: adminUser,
                name: product.name,
                image: product.image,
                images: [product.image, product.image1, product.image2, product.image3].filter(Boolean),
                brand: 'Generic',
                category: product.category,
                description: 'A high quality product.',
                price: product.new_price,
                countInStock: 100,
                rating: 0,
                numReviews: 0,
            };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
