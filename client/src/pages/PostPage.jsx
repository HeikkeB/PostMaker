import { useCallback, useState, useEffect } from 'react';
import {
  AiFillEye, AiTwotoneEdit, AiFillDelete, AiOutlineMessage,
} from 'react-icons/ai';
import Moment from 'react-moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from '../utils/axios';
import { removePost } from '../redux/features/post/postSlice';
import { createComment, getPostComments } from '../redux/features/comment/commentSlice';
import CommentItem from '../components/CommentItem';

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm();

  const handleRemovePost = () => {
    try {
      dispatch(removePost(params.id));
      toast.error('Post has been deleted');
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleSubmitCom = () => {
    try {
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

const fetchComments = useCallback( async () => {
    try {
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, params.id])

useEffect(() => {
fetchComments()
}, [fetchComments])

  if(!post) {
    return  <div className='titlePage py-10'>
    NO POSTS
  </div>
  }
  return <div className='relative'>
<button className='absolute top-8 left-10 btnPage'><Link to={'/'}>BACK</Link></button>  
    <div className='flex justify-center items-center flex-col gap-10 py-8'>    
      <div className='w-2/3'>        
        <div className='flex justify-center basis-1/4 flex-grow'>      
        <div className={
      post?.imgUrl ? 'flex h-full' : 'flex rounded-sm'
    }>{
      post?.imgUrl && (<img src={`http://localhost:5000/${post.imgUrl}`} alt='img' className='object-cover w-full rounded-lg' />)
    }</div>
        </div>
        <div className='flex justify-between items-center pt-3 px-2'>
      <div className='text-xs text-[#cbd5e1] opacity-50 mb-1'>{post.username}</div>
      <div className='text-xs text-[#cbd5e1] opacity-50 flex gap-2'>
        <div> <Moment date={post.createdAt} format='HH:mm' /></div>
        <div> <Moment date={post.createdAt} format='DD-MMM-YYYY' /></div>
      </div> 
    </div>
    <div className='text-[#cbd5e1] text-xl px-2 mt-3'>{post.title}</div>
    <p className='text-[#cbd5e1] opacity-90 text-xs pt-5 px-2'>{post.text}</p>


    <div className='flex gap-3 items-center mt-4 justify-between'>
     <div className='flex gap-3'>
     <button className='flex items-center justify-center gap-2 text-[12px] text-[#cbd5e1] opacity-50'>
        <AiFillEye /> <span>{post.views}</span>
      </button>
      <button className='flex items-center justify-center gap-2 text-[12px] text-[#cbd5e1] opacity-50'><AiOutlineMessage /> <span>{post.comments?.length}</span></button>
     </div>
     {
  user?._id === post.author && ( 
     <div className='flex gap-3'>
     <button className='flex items-center justify-center gap-2 text-[16px] opacity-50'>
        <Link to={`/${params.id}/edit`}><AiTwotoneEdit /></Link>
      </button>
      <button onClick={handleRemovePost} className='flex items-center justify-center gap-2 text-[16px] opacity-50'><AiFillDelete /></button>
     </div> 
  )
}
     
    </div>
      </div>

      <div className='w-2/3 p-8 flex flex-col gap-4 rounded-lg'>
      <form className='flex gap-3 mb-5' onSubmit={handleSubmit(()=> {
        if(comment.length > 0) {
        handleSubmitCom()
        }
      })}>
        <textarea
          type='text'
          {...register('comment', {
            required: 'required field',
          })}
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder='Comment'
          className='inputPageBig h-20 max-h-24'
        />
        <button type='submit' className='btnPage h-[32px]'>SUBMIT</button>
      </form>
      {
        comments?.map((cmt) => (
         <CommentItem key={cmt.id} cmt={cmt} />
        ))
      }
      </div>
    </div>
  </div>
}