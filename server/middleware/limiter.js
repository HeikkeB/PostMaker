import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 50, // Limit each IP to 100 requests per `window` (here, per 30 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 create account requests per `window` (here, per hour)
  message: 'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
