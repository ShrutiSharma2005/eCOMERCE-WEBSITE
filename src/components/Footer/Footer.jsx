import React from 'react'
import { Link } from 'react-router-dom'
import footer_logo from '../../assets/logo_big.png'
import instagram_icon from '../../assets/instagram_icon.png'
import pintester_icon from '../../assets/pintester_icon.png'
import whatsapp_icon from '../../assets/whatsapp_icon.png'
import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='bg-gray-900 text-white py-16 mt-20'
        >
            <div className='container mx-auto px-4 flex flex-col items-center'>
                <div className="flex items-center gap-4 mb-8">
                    <img src={footer_logo} alt="" className='w-12 h-12 brightness-0 invert' />
                    <p className='text-3xl font-bold'>ShopEase</p>
                </div>

                <ul className="flex flex-wrap justify-center gap-8 mb-10 text-gray-300">
                    <li><Link to="/" className='cursor-pointer hover:text-red-500 transition'>Company</Link></li>
                    <li><Link to="/mens" className='cursor-pointer hover:text-red-500 transition'>Products</Link></li>
                    <li><Link to="/admin-login" className='cursor-pointer hover:text-red-500 transition'>Admin</Link></li>
                    <li className='cursor-pointer hover:text-red-500 transition'>About</li>
                    <li className='cursor-pointer hover:text-red-500 transition'>Contact</li>
                </ul>

                <div className="flex gap-6 mb-10">
                    <div className="p-3 bg-gray-800 rounded-full hover:bg-red-500 transition cursor-pointer">
                        <img src={instagram_icon} alt="" className='w-6 h-6 brightness-0 invert' />
                    </div>
                    <div className="p-3 bg-gray-800 rounded-full hover:bg-red-500 transition cursor-pointer">
                        <img src={pintester_icon} alt="" className='w-6 h-6 brightness-0 invert' />
                    </div>
                    <div className="p-3 bg-gray-800 rounded-full hover:bg-red-500 transition cursor-pointer">
                        <img src={whatsapp_icon} alt="" className='w-6 h-6 brightness-0 invert' />
                    </div>
                </div>

                <div className="w-full border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>Copyright @ 2024 - All Right Reserved.</p>
                </div>
            </div>
        </motion.div>
    )
}

export default Footer
