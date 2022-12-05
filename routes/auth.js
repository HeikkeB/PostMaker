import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';

const routerAuth = new Router();

// Register
routerAuth.post('/register', register);
// Login
routerAuth.post('/login', login);
// Get Me
routerAuth.get('/me', checkAuth, getMe);

export default routerAuth;
