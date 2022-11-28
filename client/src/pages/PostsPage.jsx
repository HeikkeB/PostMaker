import { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import axios from '../utils/axios'
import { checkAuth } from '../redux/features/auth/authSlice'
import { useSelector } from 'react-redux'

export default function PostsPage() {
  const [posts, setPosts] = useState([])

  const isAuth = useSelector(checkAuth)
  
  
  useEffect(() => {
    const fetchMyPosts = async () => {
      if(isAuth) {
        try {
          const {data} = await axios.get('/posts/user/me')
          setPosts(data)
        } catch (error) {
          console.log(error)
      }
      }
    }
    fetchMyPosts()
  }, [isAuth])

if(isAuth) {
  return <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
    {posts?.map((post, index) => (
      <PostItem key={index} post={post} />
    ))}
  </div>
}
}