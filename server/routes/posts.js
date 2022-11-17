import { Router } from 'express'
import { createPost, getAll } from '../controllers/posts.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

//create post
router.post('/', checkAuth, createPost)

router.get('/', getAll)

export default router
