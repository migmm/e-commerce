import express from 'express';
const langRouter = express.Router();

import { changeLanguage } from '../controller/lang.js';

langRouter.post('/:language?', changeLanguage);

export default langRouter;