import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import routerComment from './comments.js';
import routerPost from './posts.js';

const router = new Router();
router.use('/comments', checkAuth, routerComment);
router.use('/posts', checkAuth, routerPost);

export default router;
