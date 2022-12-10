import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';
import { createAccountLimiter } from '../middleware/limiter.js';

const routerAuth = new Router();

// Register
routerAuth.post('/register', createAccountLimiter, register);
// Login
routerAuth.post('/login', login);
// Get Me
routerAuth.get('/me', checkAuth, getMe);

export default routerAuth;
