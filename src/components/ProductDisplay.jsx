import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Star } from 'lucide-react'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const ProductDisplay = (props) => {
  const { product } = props
  const { addToCart } = useContext(ShopContext)
  const [mainImage, setMainImage] = useState(product.image)
  const [zoomStyle, setZoomStyle] = useState({})

  useEffect(() => {
    setMainImage(product.image)
  }, [product])

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.clientX - left) / width * 100
    const y = (e.clientY - top) / height * 100
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2)'
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center',
      transform: 'scale(1)'
    })
  }

  // Use product.images if available, otherwise fallback to repeating main image for demo
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image, product.image, product.image, product.image];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 my-20 md:gap-10 px-6 md:px-0'>
      <div className='flex md:1/2 gap-4'>
        <div className='flex flex-col gap-4 md:h-[500px] overflow-y-auto scrollbar-hide'>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className={`md:h-[100px] w-[100px] object-cover cursor-pointer border-2 ${mainImage === img ? 'border-red-500' : 'border-transparent'}`}
              onClick={() => setMainImage(img)}
              onMouseEnter={() => setMainImage(img)}
            />
          ))}
        </div>
        <div className='overflow-hidden relative w-full md:h-[580px] bg-gray-100 flex items-center justify-center'>
          <img
            src={mainImage}
            alt=""
            className='w-full h-full object-contain transition-transform duration-200 ease-out cursor-zoom-in'
            style={zoomStyle}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
      <div className='flex md:1/2 flex-col mt-8 md:mt-0'>
        <h1 className='text-[#3d3d3d] text-4xl font-bold'>{product.name}</h1>
        <div className='flex items-center gap-1 text-[#1c1c1c] text-lg mt-4'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>
        <div className='flex gap-5 font-semibold items-center my-5'>
          <div className='text-gray-500 text-2xl line-through'>${product.old_price}</div>
          <div className='text-red-500 text-3xl'>${product.new_price}</div>
        </div>

        <div className=''>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam dolore voluptatem nesciunt facere totam suscipit illum laboriosam nulla, corporis amet consequuntur, fugiat modi voluptate libero</div>
        <div>
          <h1 className='font-semibold text-gray-400 text-2xl mt-4'>Select Size</h1>
          <div className='flex gap-4 items-center my-4'>
            <div className='border bg-gray-100 p-4'>S</div>
            <div className='border bg-gray-100 p-4'>M</div>
            <div className='border bg-gray-100 p-4'>L</div>
            <div className='border bg-gray-100 p-4'>XL</div>
            <div className='border bg-gray-100 p-4'>XXL</div>
          </div>
        </div>
        <Link to='/cart'>
          <button onClick={() => addToCart(product.id)} className='bg-red-500 text-white px-6 py-3 my-4 w-max'>ADD TO CART</button>
        </Link>
        <p><span className='font-semibold'>Category:</span> Women, T-shirt, Crop top</p>
        <p><span className='font-semibold'>Tags:</span> Modern, Latest</p>
      </div>
    </div>

  )
}

export default ProductDisplay
