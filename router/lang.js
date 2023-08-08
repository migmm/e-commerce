import express from 'express';
const langRouter = express.Router();

import { changeLanguage, availableLanguages } from '../controller/lang.js';

langRouter.post('/availablelangs', availableLanguages );
langRouter.post('/:language?', changeLanguage);

export default langRouter;
