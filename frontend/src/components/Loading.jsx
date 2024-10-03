import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-enter h-screen'>
      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-blue-500 border-r-blue-500 border-b-gray-300 border-l-gray-300"></div>
    </div>
  )
}

export default Loading
