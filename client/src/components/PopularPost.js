import React from 'react'

export default function PopularPost({post}) {

  return <div className='bg-gray-600 my-1 rounded-lg'>
<div className='flex text-xs py-2 px-2 text-gray-300 hover:bg-gray-800 hover:text-white'>
{post.title}
</div>
  </div>
}