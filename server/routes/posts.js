import { Router } from 'express'
import { createPost, getAll, getById, getMyPosts, removeMyPost, updatePost, getPostComments } from '../controllers/posts.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

//create post
router.post('/', checkAuth, createPost)
//get all posts
router.get('/', getAll)
//get post by id
router.get('/:id', getById)
//get my posts
router.get('/user/me', checkAuth, getMyPosts)
//delete my post
router.delete('/:id', checkAuth, removeMyPost)
//update post
router.put('/:id', checkAuth, updatePost)
//get comments
//http://localhost/5000/api/posts/comments/:id
router.get('/comments/:id', getPostComments)

export default router
