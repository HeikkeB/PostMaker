import React from 'react'

export default function PopularPost({post}) {

  return <div className='bg-gray-600 my-1 rounded-lg hover:bg-gray-800 hover:text-white hover:opacity-90'>
   <div className={
      post.imgUrl ? 'flex rounded-t-sm h-26' : 'flex rounded-t-sm'
    }>{
      post.imgUrl && (<img src={`http://localhost:5000/${post.imgUrl}`} alt='img' className='object-cover w-full rounded-t-lg' />)
    }</div>
<div className='flex text-xs py-2 px-2 text-gray-300'>
{post.title}
</div>
  </div>
}