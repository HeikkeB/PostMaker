import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createComment } from '../controllers/comments.js';

const routerComment = new Router();

// http://localhost:5000/api/comments/:id
routerComment.post('/:id', checkAuth, createComment);

export default routerComment;
