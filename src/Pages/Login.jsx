import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../services/api';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
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
      if (isLogin) {
        const user = await authService.login(formData.email, formData.password);
        if (user.role === 'admin' || user.role === 'superadmin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        await authService.register(formData.name, formData.email, formData.password);
        // Auto login after register or redirect to login
        setIsLogin(true);
        toast.success('Registration successful! Please login.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-6 md:px-0'>
      <div className='w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-xl'>
        <h2 className='text-2xl font-bold text-center text-gray-800'>
          {isLogin ? 'Login to Your Account' : 'Create an Account'}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-6'>
          {!isLogin && (
            <div>
              <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-600'>Name</label>
              <input
                type="text"
                id='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter Your Name'
                className='w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none'
                required={!isLogin}
              />
            </div>
          )}
          {/* email input */}
          <div>
            <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-600'>Email Address</label>
            <input
              type="email"
              id='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter Your Email'
              className='w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none'
              required />
          </div>
          {/* password input */}
          <div className='relative'>
            <label htmlFor="password" className='block mb-2 font-medium text-gray-600'>
              Password
            </label>
            <div className='items-center flex relative'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter Your Password'
                className='w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-red-300 focus:outline-none'
                required
              />
              <button type='button' onClick={togglePassword} className='absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700'>
                {showPassword ? <Eye className='w-5 h-5' /> : <EyeOff className='w-5 h-5' />}
              </button>
            </div>
          </div>
          {/* submit button */}
          <button type='submit' className='w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300'>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

        </form>
        {/* additional link */}
        <div className='text-center'>
          <p className='text-sm text-gray-600'>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className='text-red-500 hover:underline'>
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
