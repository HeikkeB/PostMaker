import { Router } from 'express'
import { createPost } from '../controllers/posts.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

//create post
router.post('/', checkAuth, createPost)

export default router
