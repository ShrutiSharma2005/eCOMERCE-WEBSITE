import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import authService from '../../services/api';

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await authService.getProductDetails(id);
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setImages(product.images || []);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await authService.updateProduct({
                _id: id,
                name,
                price,
                image,
                images,
                brand,
                category,
                description,
                countInStock,
            });
            navigate('/admin/products');
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (index, value) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
    };

    const addImageField = () => {
        setImages([...images, '']);
    };

    const removeImageField = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    return (
        <div>
            <Link to="/admin/products" className="text-gray-600 hover:text-gray-900 mb-4 inline-block">
                &larr; Go Back
            </Link>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Main Image</label>
                        <input
                            type="text"
                            placeholder="Enter main image url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Images</label>
                        {images.map((img, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    placeholder={`Image URL ${index + 1}`}
                                    value={img}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImageField(index)}
                                    className="px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addImageField}
                            className="mt-2 px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                        >
                            + Add Image URL
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Brand</label>
                        <input
                            type="text"
                            placeholder="Enter brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Count In Stock</label>
                        <input
                            type="number"
                            placeholder="Enter countInStock"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            placeholder="Enter category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductEdit;
