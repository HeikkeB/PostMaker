import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { register, login, getMe } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';
import { createAccountLimiter } from '../middleware/limiter.js';

const routerAuth = new Router();

// Register
routerAuth.post('/register', celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().min(5).max(20),
    password: Joi.string().required().min(8).max(24),
  }),
}), createAccountLimiter, register);
// Login
routerAuth.post('/login', login);
// Get Me
routerAuth.get('/me', checkAuth, getMe);

export default routerAuth;
