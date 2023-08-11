import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    message: {
        message: 'Too many login attempts from this IP, please try again after a 60 second pause',
    },
    statusCode: 429,
    headers: true,
});

export default loginLimiter;