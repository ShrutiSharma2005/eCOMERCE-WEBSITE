import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Item from '../components/Item'

const Wishlist = () => {
    const { all_product, wishlistItems } = useContext(ShopContext)
    const wishlistProducts = all_product.filter((product) => wishlistItems[product.id])

    return (
        <div className='md:mt-32 mt-20 max-w-7xl mx-auto px-4'>
            <div className='mx-auto max-w-2xl py-16 sm:pt-24 lg:max-w-7xl'>
                <h2 className='text-3xl font-bold tracking-tight text-gray-900 text-center mb-10'>My Wishlist</h2>
                {wishlistProducts.length === 0 ? (
                    <div className='text-center text-gray-500 text-xl'>Your wishlist is empty.</div>
                ) : (
                    <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                        {
                            wishlistProducts.map((product) => {
                                return <Item key={product.id} product={product} />
                            })
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default Wishlist
