import axios from 'axios';

const API_URL = '/api/users';

// Create axios instance
const api = axios.create({
    baseURL: '/api',
});

// Add a request interceptor to add the auth token to headers
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const register = async (name, email, password) => {
    const response = await axios.post(API_URL, { name, email, password });
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const createProduct = async () => {
    const response = await api.post(`/products`, {});
    return response.data;
};

const getProductDetails = async (id) => {
    const response = await axios.get(`${API_URL.replace('/users', '/products')}/${id}`);
    return response.data;
};

const updateProduct = async (product) => {
    const response = await api.put(`/products/${product._id}`, product);
    return response.data;
};

const createProductReview = async (id, review) => {
    const response = await api.post(`/products/${id}/reviews`, review);
    return response.data;
};

const updateUserProfile = async (user) => {
    const response = await api.put(`/users/profile`, user);
    return response.data;
};

// Order Services
const createOrder = async (order) => {
    const response = await api.post(`/orders`, order);
    return response.data;
};

const getMyOrders = async () => {
    const response = await api.get(`/orders/myorders`);
    return response.data;
};

const getOrders = async () => {
    const response = await api.get(`/orders`);
    return response.data;
};

const deliverOrder = async (id) => {
    const response = await api.put(`/orders/${id}/deliver`, {});
    return response.data;
};

const getMonthlySales = async () => {
    const response = await api.get(`/orders/analytics`);
    return response.data;
};

const getOrderDetails = async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
};

const payOrder = async (orderId, paymentResult) => {
    const response = await api.put(`/orders/${orderId}/pay`, paymentResult);
    return response.data;
};

// Payment Service
const createPaymentIntent = async (amount) => {
    const response = await api.post(`/payment/create-payment-intent`, { amount });
    return response.data;
};

// Auth Service
const logout = () => {
    localStorage.removeItem('user');
};

// Product Services
const getProducts = async () => {
    const response = await axios.get(`${API_URL.replace('/users', '/products')}`);
    return response.data;
};

const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};

const authService = {
    login,
    register,
    logout,
    getProducts,
    deleteProduct,
    createProduct,
    getProductDetails,
    updateProduct,
    createProductReview,
    createOrder,
    getOrderDetails,
    payOrder,
    createPaymentIntent,
    updateUserProfile,
    getMyOrders,
    getOrders,
    deliverOrder,
    getMonthlySales,
};

export default authService;
