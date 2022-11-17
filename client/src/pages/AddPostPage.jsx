import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createPost } from '../redux/features/post/postSlice'

export default function AddPostPage() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)
      dispatch(createPost(data))
      toast.success('Congratulations! Create Post!', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!')
    }
  }

  const clearFormHandler = () => {
    setTitle('')
    setText('')
  }

  return (
    <div>
      <form
        className="w-1/3 mx-auto py-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-solid cursor-pointer rounded-lg">
          ADD IMAGE:
          <input
            type="file"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <div className="flex object-cover py-6">
          {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
        </div>

        <label className="text-xs text-white opacity-70">
          Title post:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title post"
            className="mt-1 mb-4 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 placeholder:italic"
          />
        </label>
        <label className="text-xs text-white opacity-70">
          Text post:
          <textarea
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text post"
            className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-44 placeholder:text-gray-700 placeholder:italic"
          />
        </label>

        <div className="flex gap-10 items-center justify-center mt-4">
          <button
            onClick={submitHandler}
            className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-1 w-[100px]"
          >
            ADD POST
          </button>
          <button
            onClick={clearFormHandler}
            className="flex justify-center items-center bg-red-900 text-xs text-white rounded-sm py-2 px-1 w-[100px]"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  )
}
