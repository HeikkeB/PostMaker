import { useCallback, useState, useEffect } from 'react'
import {AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete} from 'react-icons/ai'
import Moment from 'react-moment'
import axios from '../utils/axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {removePost} from '../redux/features/post/postSlice'
import { toast } from 'react-toastify'

export default function PostPage() {
  const [post, setPost] = useState(null)
  const {user} = useSelector((state) => state.auth)
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
const handleRemovePost = () => {
  try {
    dispatch(removePost(params.id))   
    toast.error('Post has been deleted')
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

  const fetchPost = useCallback(async() => {
    const {data} = await axios.get(`/posts/${params.id}`)
    setPost(data)
  }, [params.id])

useEffect(() => {
  fetchPost()
}, [fetchPost]);

  if(!post) {
    return  <div className='text-xl text-center text-white py-10'>
    NO POSTS
  </div>
  }
  return <div>

    <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-1 px-4 mt-3'><Link to={'/'}>BACK</Link></button>

    <div className='flex gap-10 py-8'>
      <div className='w-2/3'>
        <div className='flex flex-col basis-1/4 flex-grow'>
        <div className={
      post?.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'
    }>{
      post?.imgUrl && (<img src={`http://localhost:5000/${post.imgUrl}`} alt='img' className='object-cover w-full' />)
    }</div>
        </div>
        <div className='flex justify-between items-center pt-2'>
      <div className='text-xs text-white opacity-50 mb-1'>{post.username}</div>
      <div className='text-xs text-white opacity-50 flex gap-2'>
        <div> <Moment date={post.createdAt} format='HH:mm' /></div>
        <div> <Moment date={post.createdAt} format='DD-MMM-YYYY' /></div>
      </div> 
    </div>
    <div className='text-white text-xl'>{post.title}</div>
    <p className='text-white opacity-40 text-xs pt-4'>{post.text}</p>


    <div className='flex gap-3 items-center mt-4 justify-between'>
     <div className='flex gap-3'>
     <button className='flex items-center justify-center gap-2 text-[12px] text-white opacity-50'>
        <AiFillEye /> <span>{post.views}</span>
      </button>
      <button className='flex items-center justify-center gap-2 text-[12px] text-white opacity-50'><AiOutlineMessage /> <span>{post.comments?.length}</span></button>
     </div>
     {
  user?._id === post.author && ( 
     <div className='flex gap-3'>
     <button className='flex items-center justify-center gap-2 text-[16px] opacity-50'>
        <AiTwotoneEdit />
      </button>
      <button onClick={handleRemovePost} className='flex items-center justify-center gap-2 text-[16px] opacity-50'><AiFillDelete /></button>
     </div> 
  )
}
     
    </div>
      </div>

      <div className='w-1/3'>COMMENTS</div>
    </div>
  </div>
}