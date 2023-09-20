import express from 'express';
import authController from '../controller/auth.js';
import usersController from '../controller/users.js';
import loginLimiter from '../helpers/loginLimiter.js';

const routerAuth = express.Router();

/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     summary: User registration.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: |
 *                   Username. the API will check if this username is available.
 *                 example: 'exampleusername'
 *               email:
 *                 type: string
 *                 description: |
 *                   User email. The API will check if this email is already registered.
 *                 example: 'example@email.com'
 *               password:
 *                 type: string
 *                 description: Password.
 *                 example: 'password12345'
 *     responses:
 *       201:
 *         description: Successfully registered user response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message.
 *                   example: 'User registered successfully'
 *       400:
 *         description: Bad Request indicating missing or invalid fields in the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message.
 *                   example: 'All fields are required.'
 *       409:
 *         description: Conflict indicating duplicate registration data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: |
 *                     Response message indicating conflicts (e.g., username or email already exists).
 *                   example: 'Username or email already exists.'
 *       500:
 *         description: Internal Server Error indicating a server-side error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message.
 *                   example: 'Internal Server Error: Register error'
 */

routerAuth.post('/signup', authController.signup);
routerAuth.post('/login', loginLimiter, authController.login);
routerAuth.post('/refresh', authController.refreshToken);
routerAuth.post('/logout', authController.logout);
routerAuth.post('/verify-otp', authController.verifyOTP);
routerAuth.post('/send-otp', authController.sendOTP);


export default routerAuth;