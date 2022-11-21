import { Router } from 'express'
import { createPost, getAll, getById } from '../controllers/posts.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

//create post
router.post('/', checkAuth, createPost)
//get all posts
router.get('/', getAll)
//get post by id
router.get('/:id', getById)

export default router
