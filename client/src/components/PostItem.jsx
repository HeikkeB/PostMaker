import React from 'react'
import {AiFillEye, AiOutlineMessage} from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

export default function PostItem({post}) {
  if(!post) {
    return  <div className='titlePage py-10'>
    NO POSTS
  </div>
  }
  return <Link to={`/${post._id}`}>
    <div className='flex flex-col basis-1/4 flex-grow mt-5 postItem'>
    
    <div className={
      post.imgUrl ? 'flex rounded-t-sm h-80 object-cover' : 'flex rounded-t-sm'
    }>{
      post.imgUrl && (<img src={`http://localhost:5000/${post.imgUrl}`} alt='img' className='object-cover w-full rounded-t-lg' />)
    }</div>
    <div className='flex justify-between items-center pt-2 px-3'>
      <div className='text-xs text-[#cbd5e1] opacity-50 mb-1'>{post.username}</div>
      <div className='text-xs text-[#cbd5e1] opacity-50 flex gap-2'>
        <div> <Moment date={post.createdAt} format='HH:mm' /></div>
        <div> <Moment date={post.createdAt} format='DD-MMM-YYYY' /></div>
      </div> 
    </div>
    <div className='text-[#cbd5e1] text-xl line-clamp-2 px-3'>{post.title}</div>
    <p className='text-[#cbd5e1] opacity-90 text-xs pt-4 line-clamp-6 px-3'>{post.text}</p>

    <div className='flex gap-3 items-center mt-2 mb-1 px-3'>
      <button className='flex items-center justify-center gap-2 text-xs text-[#cbd5e1] opacity-50'>
        <AiFillEye /> <span>{post.views}</span>
      </button>
      <button className='flex items-center justify-center gap-2 text-xs text-[#cbd5e1] opacity-50'><AiOutlineMessage /> <span>{post.comments?.length}</span></button>
    </div>
  </div>
  </Link>
}
