import express from 'express';
import authController from '../controller/auth.js';
import usersController from '../controller/users.js';

const routerAuth = express.Router();

routerAuth.post('/signup', usersController.postUser);
routerAuth.post('/login', authController.login);
routerAuth.post('/refresh', authController.refreshToken);
routerAuth.post('/logout', authController.logout);
routerAuth.post('/verify-otp', authController.verifyOTP);
routerAuth.post('/send-otp', authController.sendOTP);
export default routerAuth;