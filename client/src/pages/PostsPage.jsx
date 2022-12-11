/* eslint-disable import/no-unresolved */
/* eslint-disable semi */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';
import { checkAuth } from '../redux/features/auth/authSlice';
import PostItem from '../components/PostItem';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  const isAuth = useSelector(checkAuth);

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (isAuth) {
        try {
          const { data } = await axios.get('/posts/user/me');
          setPosts(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchMyPosts();
  }, [isAuth]);

  if (isAuth) {
    return <div className='w-1/2 mx-auto py-10 flex flex-col gap-4'>

    {posts.length === 0 ? (<div className='titlePage py-10'>
      NO POSTS
    </div>) : (posts?.map((post, index) => (
      <PostItem key={index} post={post} />
    )))}
  </div>
  }
}
