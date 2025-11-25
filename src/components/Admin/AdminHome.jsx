import React from 'react'
import AdminAnalytics from './AdminAnalytics'

const AdminHome = () => {
  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Dashboard Overview</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-blue-500 text-white p-6 rounded-lg shadow'>
          <h3 className='text-xl font-semibold'>Total Sales</h3>
          <p className='text-3xl font-bold mt-2'>$12,340</p>
        </div>
        <div className='bg-green-500 text-white p-6 rounded-lg shadow'>
          <h3 className='text-xl font-semibold'>Total Orders</h3>
          <p className='text-3xl font-bold mt-2'>56</p>
        </div>
        <div className='bg-yellow-500 text-white p-6 rounded-lg shadow'>
          <h3 className='text-xl font-semibold'>Total Products</h3>
          <p className='text-3xl font-bold mt-2'>120</p>
        </div>
      </div>

      <AdminAnalytics />
    </div>
  )
}

export default AdminHome;
