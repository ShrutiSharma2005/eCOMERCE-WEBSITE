import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Item from '../components/Item'
import banner from '../assets/WomensBanner.png'
import FilterSort from '../components/FilterSort'

const Womens = () => {
  const { all_product } = useContext(ShopContext)
  const [sortType, setSortType] = useState('default')
  const [priceRange, setPriceRange] = useState(1000)

  const getProcessedProducts = () => {
    let products = all_product.filter((product) => product.category === "women")

    // Filter by Price
    products = products.filter(item => item.new_price <= priceRange)

    // Sort
    if (sortType === 'price-low-high') {
      products.sort((a, b) => a.new_price - b.new_price)
    } else if (sortType === 'price-high-low') {
      products.sort((a, b) => b.new_price - a.new_price)
    } else if (sortType === 'newest') {
      products.reverse() // Assuming default is oldest first
    }

    return products
  }

  const displayedProducts = getProcessedProducts()

  return (
    <div className='md:mt-32 mt-20 max-w-7xl mx-auto'>
      <div>
        <img src={banner} alt="" className='w-screen px-6' />
      </div>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:pt-24 lg:max-w-7xl lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Women's Collection</h2>
        </div>

        <FilterSort
          sortType={sortType}
          setSortType={setSortType}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => {
              return <Item key={product.id} product={product} />
            })
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found in this range.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Womens
