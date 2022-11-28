import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import PopularPost from '../components/PopularPost'
import PostItem from '../components/PostItem'
import { getAllPosts } from '../redux/features/post/postSlice'
import { checkAuth } from '../redux/features/auth/authSlice'

export default function MainPage() {

  const dispatch = useDispatch()
  const {posts, popularPosts} = useSelector((state) => state.post)
  const isAuth = useSelector(checkAuth)
  useEffect(() => {
    dispatch(getAllPosts())
   
  }, [dispatch]);

  if(!posts.length) {
    return (
      <div className='text-xl text-center text-white py-10'>
        NO POSTS
      </div>
    )
  }

  if(isAuth) {
    return (
      <div className="max-w-[1080px] mx-auto py-10">
        <div className="flex justify-between gap-14">
        
          <div className="flex flex-col gap-10 basis-3/5 text-xs uppercase">
          
          {
  
            posts?.map((post) => (<PostItem key={post.id} post={post} />))
          }
           
          </div>
          <div className="basis-2/5">
            <div className="text-xs uppercase text-white">POPULAR POSTS:</div>
  
            {
              popularPosts?.map((post) => (
                <Link to={`/${post._id}`}>
                <PopularPost key={post.id}  post={post} />
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    )
  } else {
    return <Navigate to='/login' />
  }  
}
