import React from 'react'

export default function PopularPost({post}) {

  return <div className='postItem my-1 mb-4'>
     <div className={
        post.imgUrl ? 'flex rounded-t-sm h-26' : 'flex rounded-t-sm'
      }>{
        post.imgUrl && (<img src={`http://localhost:5000/${post.imgUrl}`} alt='img' className='object-cover w-full rounded-t-lg' />)
      }</div>
  <div className='flex text-xs my-2 px-2 text-[#cbd5e1] line-clamp-2'>
  {post.title}
  </div>
    </div>
  }