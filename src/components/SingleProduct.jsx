import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams, useNavigate } from 'react-router-dom'
import Breadcrum from './Breadcrum'
import ProductDisplay from './ProductDisplay'
import DescriptionBox from './DescriptionBox'
import NewCollection from './NewCollection'
import ProductReviews from './ProductReviews'
import authService from '../services/api'
import Meta from './Meta'

const SingleProduct = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        try {
          const data = await authService.getProductDetails(productId);
          const mappedData = {
            ...data,
            id: data._id,
            new_price: data.price,
            old_price: data.price * 1.2,
          };
          setProduct(mappedData);
        } catch (apiError) {
          console.error("Product not found:", apiError);
          setError("Product not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product", error);
        setError("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">{error || "The product you're looking for doesn't exist."}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto mb-32 mt-32'>
      <Meta title={product.name} description={product.description || `Shop ${product.name} at ShopEase`} />
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <ProductReviews product={product} onReviewAdded={() => { }} />
      <DescriptionBox />
      <NewCollection />
    </div>
  )
}

export default SingleProduct

