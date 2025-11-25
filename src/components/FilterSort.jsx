import React from 'react'

const FilterSort = ({ sortType, setSortType, priceRange, setPriceRange }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-lg shadow-sm">
            {/* Sort By */}
            <div className="flex items-center gap-2">
                <label className="text-gray-600 font-medium">Sort by:</label>
                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                >
                    <option value="default">Default</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest</option>
                </select>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-2">
                <label className="text-gray-600 font-medium">Max Price:</label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-32 md:w-48 accent-red-500"
                />
                <span className="text-gray-800 font-semibold min-w-[60px]">${priceRange}</span>
            </div>
        </div>
    )
}

export default FilterSort
