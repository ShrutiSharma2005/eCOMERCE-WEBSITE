import React, { useEffect, useState } from 'react';
import authService from '../../services/api';
import { Link } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await authService.getOrders();
                setOrders(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchOrders();
    }, []);

    const deliverHandler = async (id) => {
        try {
            await authService.deliverOrder(id);
            setOrders(orders.map(order => order._id === id ? { ...order, isDelivered: true, deliveredAt: Date.now() } : order));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="py-3 px-4 border-b">ID</th>
                            <th className="py-3 px-4 border-b">USER</th>
                            <th className="py-3 px-4 border-b">DATE</th>
                            <th className="py-3 px-4 border-b">TOTAL</th>
                            <th className="py-3 px-4 border-b">PAID</th>
                            <th className="py-3 px-4 border-b">DELIVERED</th>
                            <th className="py-3 px-4 border-b">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b">{order._id}</td>
                                <td className="py-3 px-4 border-b">{order.user && order.user.name}</td>
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
                                    {!order.isDelivered && (
                                        <button
                                            onClick={() => deliverHandler(order._id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                                        >
                                            Mark Delivered
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
