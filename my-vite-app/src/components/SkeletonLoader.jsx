import React from 'react'

const SkeletonLoader = () => {
  return (
<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  {[...Array(6)].map((_, index) => (
    <li key={index} className="bg-white rounded shadow p-4 animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </li>
  ))}
</ul>
  )
}

export default SkeletonLoader
