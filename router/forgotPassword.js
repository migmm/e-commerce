import express from 'express';
import passwordResetController from '../controller/forgotPassword.js';

const routerPasswordReset = express.Router();

routerPasswordReset.post('/token', passwordResetController.forgotPassword);
routerPasswordReset.post('/password/:token', passwordResetController.resetPassword);

export default routerPasswordReset;
