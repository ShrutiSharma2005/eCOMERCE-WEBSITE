import React, { useState } from 'react';
import Rating from './Rating';
import authService from '../services/api';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductReviews = ({ product, onReviewAdded }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const { productId } = useParams();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await authService.createProductReview(productId, { rating, comment });
            setRating(0);
            setComment('');
            setError('');
            toast.success('Review Submitted!');
            if (onReviewAdded) onReviewAdded();
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            toast.error(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-0 my-12">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            {(!product.reviews || product.reviews.length === 0) && <div className="p-4 bg-blue-50 text-blue-700 rounded">No Reviews</div>}

            <div className="grid md:grid-cols-2 gap-8">
                {/* List Reviews */}
                <div className="space-y-4">
                    {product.reviews && product.reviews.map((review) => (
                        <div key={review._id} className="p-4 border rounded-lg shadow-sm bg-white">
                            <div className="flex items-center justify-between mb-2">
                                <strong className="text-lg">{review.name}</strong>
                                <Rating value={review.rating} />
                            </div>
                            <p className="text-gray-600 mb-2">{review.createdAt.substring(0, 10)}</p>
                            <p className="text-gray-800">{review.comment}</p>
                        </div>
                    ))}
                </div>

                {/* Write Review */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Write a Customer Review</h3>
                    {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">{error}</div>}

                    {localStorage.getItem('auth-token') ? (
                        <form onSubmit={submitHandler}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Rating</label>
                                <select
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="">Select...</option>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Comment</label>
                                <textarea
                                    rows="3"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={rating === 0}
                                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
                            >
                                Submit
                            </button>
                        </form>
                    ) : (
                        <div className="p-4 bg-yellow-50 text-yellow-700 rounded">
                            Please <a href="/login" className="underline font-bold">sign in</a> to write a review
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;
