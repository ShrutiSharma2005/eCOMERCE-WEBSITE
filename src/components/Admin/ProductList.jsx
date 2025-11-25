import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/api';
import { Plus, Trash2, Edit } from 'lucide-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await authService.getProducts();
            setProducts(data.products || []);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await authService.deleteProduct(id);
                fetchProducts();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const product = await authService.createProduct();
            navigate(`/admin/product/${product._id}/edit`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Products</h2>
                <button
                    onClick={createProductHandler}
                    className="flex items-center px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Product
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product._id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link to={`/admin/product/${product._id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        <Edit className="w-5 h-5 inline" />
                                    </Link>
                                    <button
                                        onClick={() => deleteHandler(product._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 className="w-5 h-5 inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
