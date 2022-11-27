import React from 'react'

export default function CommentItem({cmt}) {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm'>
        AVATAR
      </div>
      <div className='flex text-gray-300 rext-[10px]'>{cmt.comment}</div>
    </div>
  )
}
