import { Router } from 'express';
import routerAuth from './auth.js';
import routerComment from './comments.js';
import routerPost from './posts.js';

const router = new Router();

router.use('/auth', routerAuth);
router.use('/comments', routerComment);
router.use('/posts', routerPost);

export default router;
