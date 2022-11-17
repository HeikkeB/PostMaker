import React from 'react'

export default function MainPage() {
  return (
    <div className="max-w-[1080px] mx-auto py-10">
      <div className="flex justify-between gap-10">
        <div className="flex flex-col gap-10 basis-4/5 text-xs uppercase">
          POSTS
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">POPULAR POSTS:</div>
        </div>
      </div>
    </div>
  )
}
