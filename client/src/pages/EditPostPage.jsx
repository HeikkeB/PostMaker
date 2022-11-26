import {useState, useCallback, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../redux/features/post/postSlice'
import axios from '../utils/axios'

export default function EditPostPage() {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const fetchPost = useCallback(async() => {
    const {data} = await axios.get(`/posts/${params.id}`)
    setTitle(data.title)
    setText(data.text)
    setOldImage(data.imgUrl)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost]);

const submitHandler = () => {
  try {
    const updatedPost = new FormData()
    updatedPost.append('title', title)
    updatedPost.append('text', text)
    updatedPost.append('id', params.id)
    updatedPost.append('image', newImage)
    dispatch(updatePost(updatedPost))
    navigate('/posts')
  } catch (error) {
    console.log(error)
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
            onChange={(e) => {
              setNewImage(e.target.files[0])
              setOldImage('')
              }}
          />
        </label>
        <div className="flex object-cover py-6">
          {oldImage && <img src={`http://localhost:5000/${oldImage}`} alt={oldImage.name} />}
          {newImage && <img src={URL.createObjectURL(newImage)} alt={newImage.name} />}
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
            UPDATE
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
