import { Eye, EyeOff, Lock, User } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../services/api';

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const user = await authService.login(formData.email, formData.password);
            if (user.role === 'admin' || user.role === 'superadmin') {
                navigate('/admin');
            } else {
                setError('Access denied. Not an admin account.');
                authService.logout(); // Ensure they aren't logged in as user
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-900 px-6 md:px-0'>
            <div className='w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-2xl rounded-xl border border-gray-700'>
                <div className="text-center">
                    <h2 className='text-3xl font-bold text-white mb-2'>
                        Admin Portal
                    </h2>
                    <p className="text-gray-400">Secure access for administrators</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded text-center text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-300'>Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="email"
                                id='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='admin@example.com'
                                className='w-full pl-10 pr-4 py-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent focus:outline-none transition-colors'
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-300'>
                            Password
                        </label>
                        <div className='relative'>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='••••••••'
                                className='w-full pl-10 pr-12 py-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent focus:outline-none transition-colors'
                                required
                            />
                            <button
                                type='button'
                                onClick={togglePassword}
                                className='absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors'
                            >
                                {showPassword ? <Eye className='w-5 h-5' /> : <EyeOff className='w-5 h-5' />}
                            </button>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='w-full px-4 py-3 text-white font-semibold bg-gradient-to-r from-red-600 to-red-500 rounded-lg hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform transition-all hover:scale-[1.02]'
                    >
                        Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
