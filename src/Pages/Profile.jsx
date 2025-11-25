import React, { useState, useEffect } from 'react';
import authService from '../services/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        } else {
            setName(user.name);
            setEmail(user.email);
            fetchMyOrders();
        }
    }, [navigate]);

    const fetchMyOrders = async () => {
        try {
            // Assuming getMyOrders is implemented in api.js and backend
            // If not, we need to implement it. 
            // For now, let's try to call it.
            const data = await authService.getMyOrders();
            setOrders(data);
        } catch (error) {
            console.error(error);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                const user = await authService.updateUserProfile({ id: JSON.parse(localStorage.getItem('user'))._id, name, email, password });
                localStorage.setItem('user', JSON.stringify(user));
                setMessage('Profile Updated');
                setPassword('');
                setConfirmPassword('');
            } catch (error) {
                setMessage('Error updating profile');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <h2 className="text-2xl font-bold mb-6">User Profile</h2>
                    {message && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{message}</div>}
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter to change"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Confirm to change"
                            />
                        </div>
                        <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition w-full">
                            Update
                        </button>
                    </form>
                </div>

                <div className="md:col-span-3">
                    <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                    {orders.length === 0 ? (
                        <div className="bg-gray-50 p-4 rounded text-gray-600">No orders found</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="py-3 px-4 border-b">ID</th>
                                        <th className="py-3 px-4 border-b">DATE</th>
                                        <th className="py-3 px-4 border-b">TOTAL</th>
                                        <th className="py-3 px-4 border-b">PAID</th>
                                        <th className="py-3 px-4 border-b">DELIVERED</th>
                                        <th className="py-3 px-4 border-b"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <td className="py-3 px-4 border-b">{order._id.substring(0, 10)}...</td>
                                            <td className="py-3 px-4 border-b">{order.createdAt.substring(0, 10)}</td>
                                            <td className="py-3 px-4 border-b">${order.totalPrice}</td>
                                            <td className="py-3 px-4 border-b">
                                                {order.isPaid ? (
                                                    <span className="text-green-600 font-bold">Paid</span>
                                                ) : (
                                                    <span className="text-red-600 font-bold">Not Paid</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 border-b">
                                                {order.isDelivered ? (
                                                    <span className="text-green-600 font-bold">Delivered</span>
                                                ) : (
                                                    <span className="text-red-600 font-bold">Not Delivered</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 border-b">
                                                <button className="text-blue-600 hover:underline">Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
