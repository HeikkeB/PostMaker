import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'


import PopularPost from '../components/PopularPost'
import PostItem from '../components/PostItem'
import { getAllPosts } from '../redux/features/post/postSlice'

export default function MainPage() {

  const dispatch = useDispatch()
  const {posts, popularPosts} = useSelector((state) => state.post)

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

  return (
    <div className="max-w-[1080px] mx-auto py-10">
      <div className="flex justify-between gap-10">
        <div className="flex flex-col gap-10 basis-3/5 text-xs uppercase">
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </div>
        <div className="basis-2/5">
          <div className="text-xs uppercase text-white">POPULAR POSTS:</div>
          <PopularPost />
          <PopularPost />
          <PopularPost />
          <PopularPost />
          <PopularPost />
          <PopularPost />
        </div>
      </div>
    </div>
  )
}
