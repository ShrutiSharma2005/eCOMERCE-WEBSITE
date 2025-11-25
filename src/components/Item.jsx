import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { ShopContext } from '../Context/ShopContext'
import { fadeIn } from '../Utils/animations'

const Item = ({ product }) => {
  const { addToWishlist, removeFromWishlist, wishlistItems } = useContext(ShopContext);
  const isWishlisted = wishlistItems[product.id];

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <motion.div
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className='group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'
    >
      <Link to={`/products/${product.id}`}>
        <div className='relative overflow-hidden'>
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={product.image}
            alt={product.name}
            className='w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500'
          />
          <button
            onClick={handleWishlistClick}
            className='absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-10'
          >
            <Heart
              className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`}
            />
          </button>
        </div>
        <div className='p-4'>
          <h3 className='text-lg font-semibold text-gray-800 mb-2 truncate'>{product.name}</h3>
          <div className='flex items-center space-x-3'>
            <span className='text-xl font-bold text-red-500'>${product.new_price}</span>
            {product.old_price && (
              <span className='text-sm text-gray-400 line-through'>${product.old_price}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default Item
