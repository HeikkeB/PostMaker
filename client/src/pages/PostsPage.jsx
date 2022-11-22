import { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import axios from '../utils/axios'

export default function PostsPage() {
  const [posts, setPosts] = useState([])
  const fetchMyPosts = async () => {
    try {
      const {data} = await axios.get('/posts/user/me')
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchMyPosts()
  }, [])


  return <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
    {posts?.map((post, index) => (
      <PostItem key={index} post={post} />
    ))}
  </div>
}