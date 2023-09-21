import express from 'express';
import productsController from '../controller/products.js';
import upload, { handleMulterError } from '../middlewares/multer.js';
import resizeImagesMiddleware from '../middlewares/resizeImage.js';

const routerProducts = express.Router();

/**
 * @openapi
 * /api/products/{lang}:
 *   get:
 *     summary: Get products based on language and query parameters.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: lang
 *         required: true
 *         schema:
 *           type: string
 *         description: Language code to fetch products in.
 *         example: 'es'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination.
 *         example: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: Number of products per page.
 *         example: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort products by (e.g., 'addedDate').
 *         example: 'addedDate'
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         description: Sort order for products ('asc' or 'desc').
 *         example: 'desc'
 *       - in: query
 *         name: field
 *         schema:
 *           type: string
 *         description: Field to filter products by (e.g., 'vendor').
 *         example: 'vendor'
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         description: Value to filter products by (e.g., 'marvel').
 *         example: 'marvel'
 *     responses:
 *       200:
 *         description: Successfully retrieved products based on language and query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: number
 *                   description: Current page number.
 *                   example: 1
 *                 perPage:
 *                   type: number
 *                   description: Number of products per page.
 *                   example: 10
 *                 totalProducts:
 *                   type: number
 *                   description: Total number of products.
 *                   example: 100
 *                 totalPages:
 *                   type: number
 *                   description: Total number of pages.
 *                   example: 10
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique product identifier.
 *                         example: '12345'
 *                       name:
 *                         type: string
 *                         description: Product name.
 *                         example: 'Smartphone'
 *                       price:
 *                         type: number
 *                         description: Product price.
 *                         example: 299.99
 *                       category:
 *                         type: string
 *                         description: Product category.
 *                         example: 'electronics'
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Array of product image URLs.
 *                         example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
 *       400:
 *         description: Bad Request indicating an invalid language or query parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: 'Not a valid language'
 *       500:
 *         description: Internal Server Error indicating a server-side error while fetching products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: 'Error obtaining products'
 */
routerProducts.get('/:lang?', productsController.getProducts);


routerProducts.get('/:id/:lang', productsController.getProduct);

routerProducts.post('/', upload.array('images', 10), handleMulterError, resizeImagesMiddleware, productsController.postProduct);

routerProducts.put('/:id', upload.array('images', 10), handleMulterError, resizeImagesMiddleware, productsController.putProduct);
routerProducts.delete('/:id', productsController.deleteProduct);

export default routerProducts;
