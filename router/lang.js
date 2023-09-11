import express from 'express';
const routerLang = express.Router();

import { changeLanguage, getLanguageInfo } from '../controller/lang.js';

routerLang.get('/availablelangs', getLanguageInfo);
routerLang.post('/changeLanguage/:language?', changeLanguage);

export default routerLang;
