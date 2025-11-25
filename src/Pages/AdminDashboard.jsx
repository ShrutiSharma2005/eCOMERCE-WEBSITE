import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import authService from '../services/api';
import { LayoutDashboard, ShoppingBag, Users, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-red-500">Admin Panel</h1>
                </div>
                <nav className="mt-6">
                    <Link to="/admin" className="flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-500">
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link to="/admin/products" className="flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-500">
                        <ShoppingBag className="w-5 h-5 mr-3" />
                        Products
                    </Link>
                    <Link to="/admin/users" className="flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-500">
                        <Users className="w-5 h-5 mr-3" />
                        Users
                    </Link>
                    <button onClick={handleLogout} className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-500">
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
