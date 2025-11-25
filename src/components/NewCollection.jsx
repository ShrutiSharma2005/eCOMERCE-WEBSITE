import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Item from './Item'

const NewCollection = () => {
    const { all_product } = useContext(ShopContext)
    return (
        <div>
            <div className='mx-auto max-w-2xl px-4 py-16 sm:pt-24 lg:max-w-7xl lg:px-8'>
                <h2 className='text-4xl font-bold tracking-tight text-gray-900 text-center font-serif'>New Collection</h2>
                <p className='text-center mt-3 md:px-56'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum nulla quis in similique officia, cupiditate fugit mollitia saepe necessitatibus.</p>
                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-10 px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                    {all_product && all_product.slice(0, 8).map((product) => {
                        return <Item key={product.id} product={product} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default NewCollection
