import express from 'express';
import authController from '../controller/auth.js';
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

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: User login.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email. the API will check if this email is already registered.
 *                 example: 'example@email.com'
 *               password:
 *                 type: string
 *                 description: Password.
 *                 example: 'password12345'
 *     responses:
 *       200:
 *         description: Successfully logged in user response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message.
 *                   example: 'User sucessfully logged in'
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
 *       401:
 *         description: Unauthorized response for invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message if user does not exist or password is incorrect.
 *                   example: 'Unauthorized.'
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
 *                   example: 'Internal Server Error: Login error'
 */
routerAuth.post('/login', loginLimiter, authController.login);

/**
 * @openapi
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh token.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully refreshed token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Response message.
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
 *       401:
 *         description: Unauthorized response for invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message if token does not exist or if user is different from token.
 *                   example: 'Unauthorized.'
 *       403:
 *         description: Forbidden response indicating an issue with the refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message indicating that the refresh token is invalid or expired.
 *                   example: 'Forbidden: Invalid or expired refresh token.'
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
 *                   example: 'Internal Server Error: Error refreshing token.'
 */
routerAuth.post('/refresh', authController.refreshToken);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     summary: Logout and clear JWT cookie.
 *     tags: [Auth]
 *     responses:
 *       204:
 *         description: Successfully logged out and cleared JWT cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message.
 *                   example: 'Cookie cleared'
 *       401:
 *         description: Unauthorized response indicating the absence of a JWT cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message if no JWT cookie is present.
 *                   example: 'Unauthorized'
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
 *                   example: 'Internal Server Error: Error clearing cookie.'
 */
routerAuth.post('/logout', authController.logout);

/**
 * @openapi
 * /api/auth/sendOTP:
 *   post:
 *     summary: Send OTP (One-Time Password) to the user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email to send OTP to.
 *                 example: 'example@email.com'
 *               deliveryMethod:
 *                 type: string
 *                 description: Delivery method for OTP (sms or email).
 *                 example: 'email'
 *     responses:
 *       201:
 *         description: Successfully sent OTP.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message.
 *                   example: 'OTP sent'
 *       400:
 *         description: Bad Request indicating an invalid delivery method.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating an invalid delivery method.
 *                   example: 'Invalid delivery method'
 *       500:
 *         description: Internal Server Error indicating a server-side error while sending OTP.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message.
 *                   example: 'Internal Server Error: Error sending OTP'
 */
routerAuth.post('/verify-otp', authController.verifyOTP);

/**
 * @openapi
 * /api/auth/verifyOTP:
 *   post:
 *     summary: Verify OTP (One-Time Password) code for user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email for OTP verification.
 *                 example: 'example@email.com'
 *               otp:
 *                 type: string
 *                 description: OTP code to be verified.
 *                 example: '123456'
 *     responses:
 *       200:
 *         description: Successfully verified OTP code.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message indicating a valid OTP code.
 *                   example: 'Valid OTP code'
 *       401:
 *         description: Unauthorized response indicating an invalid OTP code.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating an invalid OTP code.
 *                   example: 'Invalid OTP code'
 *       500:
 *         description: Internal Server Error indicating a server-side error while verifying OTP code.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Response message.
 *                   example: 'Internal Server Error: Error verifying OTP code'
 */
routerAuth.post('/send-otp', authController.sendOTP);


export default routerAuth;