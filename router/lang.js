import express from 'express';
const langRouter = express.Router();

import { changeLanguage, getLanguageInfo } from '../controller/lang.js';

langRouter.get('/availablelangs', getLanguageInfo);
langRouter.post('/changeLanguage/:language?', changeLanguage);

export default langRouter;
