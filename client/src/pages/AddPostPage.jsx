import React from 'react'

export default function AddPostPage() {
  return (
    <div>
      <form
        className="w-1/3 mx-auto py-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-solid cursor-pointer rounded-lg">
          ADD IMAGE:
          <input type="file" className="hidden" />
        </label>
        <div className="flex object-cover py-6">IMAGE</div>

        <label className="text-xs text-white opacity-70">
          Title post:
          <input
            type="text"
            placeholder="Title post"
            className="mt-1 mb-4 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 placeholder:italic"
          />
        </label>
        <label className="text-xs text-white opacity-70">
          Text post:
          <textarea
            type="text"
            placeholder="Text post"
            className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-44 placeholder:text-gray-700 placeholder:italic"
          />
        </label>

        <div className="flex gap-10 items-center justify-center mt-4">
          <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-1 w-[100px]">
            ADD POST
          </button>
          <button className="flex justify-center items-center bg-red-900 text-xs text-white rounded-sm py-2 px-1 w-[100px]">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  )
}
