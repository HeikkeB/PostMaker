import { Router } from 'express';
import {
  createPost, getAll, getById, getMyPosts, removeMyPost, updatePost, getPostComments,
} from '../controllers/posts.js';
import { checkAuth } from '../utils/checkAuth.js';

const routerPost = new Router();

// create post
routerPost.post('/', checkAuth, createPost);
// get all posts
routerPost.get('/', getAll);
// get post by id
routerPost.get('/:id', getById);
// get my posts
routerPost.get('/user/me', checkAuth, getMyPosts);
// delete my post
routerPost.delete('/:id', checkAuth, removeMyPost);
// update post
routerPost.put('/:id', checkAuth, updatePost);
// get comments
// http://localhost/5000/api/posts/comments/:id
routerPost.get('/comments/:id', getPostComments);

export default routerPost;
