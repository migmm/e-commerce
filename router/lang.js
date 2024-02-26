import express from 'express';
const routerLang = express.Router();

import { changeLanguage, getLanguageInfo } from '../controller/lang.js';


/**
 * @openapi
 * /api/lang/availablelangs:
 *   get:
 *     summary: Get information about available languages.
 *     tags: [Localization]
 *     responses:
 *       200:
 *         description: Successfully retrieved information about available languages.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 availableLangs:
 *                   type: array
 *                   description: An array of available language codes (e.g., ["en", "es"]).
 *                   items:
 *                     type: string
 *                 availableLangsWithName:
 *                   type: object
 *                   description: An object containing language codes as keys and their corresponding names as values.
 *                   additionalProperties:
 *                     type: string
 *                     description: The name of the language.
*/
routerLang.get('/availablelangs', getLanguageInfo);

/**
 * @openapi
 * /api/lang/changelanguage/{language}:
 *   get:
 *     summary: Get UI language translation data.
 *     tags: [Localization]
 *     parameters:
 *       - in: path
 *         name: language
 *         required: false
 *         description: The desired language for UI translations (e.g., 'en' for English).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved UI language translation data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 language:
 *                   type: string
 *                   description: The language name (e.g., 'English').
 *                 language-abbreviation:
 *                   type: string
 *                   description: The language abbreviation (e.g., 'EN').
 *                 main-header:
 *                   type: object
 *                   description: Translation data for the main header section.
 *                   properties:
 *                     header-logo-alt:
 *                       type: string
 *                     search-input-placeholder:
 *                       type: string
 *                     view-search-results:
 *                       type: string
 *                     hamburger-button-title:
 *                       type: string
 *                 user-button:
 *                   type: object
 *                   description: Translation data for user buttons.
 *                   properties:
 *                     signin:
 *                       type: string
 *                     signup:
 *                       type: string
 *                 navbar:
 *                   type: object
 *                   description: Translation data for the navigation bar.
 *                   properties:
 *                     home:
 *                       type: string
 *                     products:
 *                       type: string
 *                     about-us:
 *                       type: string
 *                     contact:
 *                       type: string
 *                     login:
 *                       type: string
 *                     register:
 *                       type: string
 *                     new-product:
 *                       type: string
 *                     edit-product:
 *                       type: string
 *                 cart-preview:
 *                   type: object
 *                   description: Translation data for the cart preview.
 *                   properties:
 *                     your-cart:
 *                       type: string
 *                     check-out:
 *                       type: string
 *                     continue-shopping:
 *                       type: string
 *                     empty-cart:
 *                       type: string
 *                     price-with-sign:
 *                       type: string
 *                     subtotal:
 *                       type: string
 *       500:
 *         description: Internal Server Error indicating an error while retrieving language data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: 'Error retrieving language data'
 */
routerLang.post('/changeLanguage/:language?', changeLanguage);


export default routerLang;
