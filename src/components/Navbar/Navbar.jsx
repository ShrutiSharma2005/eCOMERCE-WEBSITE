import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShopContext } from '../../Context/ShopContext' // Assuming Context exists
import SearchBox from '../SearchBox'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className='sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm'
    >
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <Link to="/" className='text-2xl font-bold text-gray-800'>
          Shop<span className='text-red-500'>Ease</span>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center space-x-8'>
          <Link to="/" className='text-gray-600 hover:text-red-500 transition font-medium'>Home</Link>
          <Link to="/mens" className='text-gray-600 hover:text-red-500 transition font-medium'>Men</Link>
          <Link to="/womens" className='text-gray-600 hover:text-red-500 transition font-medium'>Women</Link>
          <Link to="/kids" className='text-gray-600 hover:text-red-500 transition font-medium'>Kids</Link>
        </div>

        <div className='hidden md:block mx-4'>
          <SearchBox />
        </div>

        <div className='hidden md:flex items-center space-x-6'>
          <Link to="/login" className='text-gray-600 hover:text-red-500 transition'>
            <User className='w-6 h-6' />
          </Link>
          <Link to="/wishlist" className='text-gray-600 hover:text-red-500 transition'>
            <Heart className='w-6 h-6' />
          </Link>
          <Link to="/cart" className='relative text-gray-600 hover:text-red-500 transition'>
            <ShoppingCart className='w-6 h-6' />
            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
              {getTotalCartItems()}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)} className='text-gray-600 focus:outline-none'>
            {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='md:hidden bg-white border-t'
          >
            <div className='flex flex-col px-4 py-4 space-y-4'>
              <Link to="/" onClick={() => setIsOpen(false)} className='text-gray-600 hover:text-red-500 font-medium'>Home</Link>
              <Link to="/mens" onClick={() => setIsOpen(false)} className='text-gray-600 hover:text-red-500 font-medium'>Men</Link>
              <Link to="/womens" onClick={() => setIsOpen(false)} className='text-gray-600 hover:text-red-500 font-medium'>Women</Link>
              <Link to="/kids" onClick={() => setIsOpen(false)} className='text-gray-600 hover:text-red-500 font-medium'>Kids</Link>
              <div className='flex items-center justify-between pt-4 border-t'>
                <Link to="/login" onClick={() => setIsOpen(false)} className='flex items-center text-gray-600 hover:text-red-500'>
                  <User className='w-5 h-5 mr-2' /> Login
                </Link>
                <Link to="/cart" onClick={() => setIsOpen(false)} className='flex items-center text-gray-600 hover:text-red-500'>
                  <ShoppingCart className='w-5 h-5 mr-2' /> Cart (0)
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
