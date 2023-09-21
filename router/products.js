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

/**
 * @openapi
 * /api/products/{id}/{lang}:
 *   get:
 *     summary: Get product by ID and language.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique product identifier.
 *         example: '64e3d1095e958d300be4b5a2'
 *       - in: path
 *         name: lang
 *         required: true
 *         schema:
 *           type: string
 *         description: Language code to fetch the product in.
 *         example: 'es'
 *     responses:
 *       200:
 *         description: Successfully retrieved product by ID and language.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique product identifier.
 *                   example: '64e3d1095e958d300be4b5a2'
 *                 name:
 *                   type: string
 *                   description: Product name.
 *                   example: 'Smartphone'
 *                 price:
 *                   type: number
 *                   description: Product price.
 *                   example: 299.99
 *                 category:
 *                   type: string
 *                   description: Product category.
 *                   example: 'electronics'
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of product image URLs.
 *                   example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
 *       400:
 *         description: Bad Request indicating an invalid language or product ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: 'Not a valid language or product ID'
 *       500:
 *         description: Internal Server Error indicating a server-side error while fetching the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: 'Error obtaining product'
 */
routerProducts.get('/:id/:lang', productsController.getProduct);

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Create a new product.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productData:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   JSON data containing product details.
 *                   
 *                   Example JSON data:
 *                   ```json
 *                   {
 *                     "id": "64e3d1095e958d300be4b5a2",
 *                     "productName": {
 *                       "es": "Nombre del producto",
 *                       "en": "Product Name"
 *                     },
 *                     "price": {
 *                       "usd": 10.99,
 *                       "eur": 9.99
 *                     },
 *                     "tax": 5.5,
 *                     "vat": 21.0,
 *                     "discountPercent": 10,
 *                     "vendor": "Proveedor A",
 *                     "stock": 100,
 *                     "category": "Categoría",
 *                     "shortDescription": {
 *                       "es": "Descripción corta en español",
 *                       "en": "Short description in English"
 *                     },
 *                     "longDescription": {
 *                       "es": "Descripción larga en español",
 *                       "en": "Long description in English"
 *                     },
 *                     "freeShip": true,
 *                     "ageFrom": 5,
 *                     "ageTo": 12,
 *                     "ageSelect": "Rango de edad",
 *                     "addedDate": "2023-09-20T12:00:00Z",
 *                     "status": true,
 *                     "lastSell": "2023-09-21T14:30:00Z",
 *                     "lastModified": "2023-09-21T10:15:00Z",
 *                     "views": 1000,
 *                     "lastVisited": "2023-09-21T15:45:00Z",
 *                     "images": ["url1.jpg", "url2.jpg"],
 *                     "colors": ["Red", "Blue"],
 *                     "urlName": "nombre-del-producto"
 *                   }
 *                   ```
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Product images.
 *     responses:
 *       201:
 *         description: Successfully created a new product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique product identifier.
 *                   example: '64e3d1095e958d300be4b5a2'
 *                 productName:
 *                   type: object
 *                   properties:
 *                     es:
 *                       type: string
 *                       description: Product name in Spanish.
 *                       example: 'Nombre del producto'
 *                     en:
 *                       type: string
 *                       description: Product name in English.
 *                       example: 'Product Name'
 *                 price:
 *                   type: object
 *                   description: Product price in multiple currencies.
 *                   example:
 *                     {
 *                       usd: 10.99,
 *                       eur: 9.99
 *                     }
 *                 tax:
 *                   type: number
 *                   description: Tax rate applied to the product.
 *                   example: 5.5
 *                 vat:
 *                   type: number
 *                   description: VAT (Value Added Tax) rate applied to the product.
 *                   example: 21.0
 *                 discountPercent:
 *                   type: number
 *                   description: Discount percentage applied to the product.
 *                   example: 10
 *                 vendor:
 *                   type: string
 *                   description: Product vendor or supplier.
 *                   example: 'Proveedor A'
 *                 stock:
 *                   type: number
 *                   description: Available stock quantity.
 *                   example: 100
 *                 category:
 *                   type: string
 *                   description: Product category.
 *                   example: 'Categoría'
 *                 shortDescription:
 *                   type: object
 *                   properties:
 *                     es:
 *                       type: string
 *                       description: Short product description in Spanish.
 *                       example: 'Descripción corta en español'
 *                     en:
 *                       type: string
 *                       description: Short product description in English.
 *                       example: 'Short description in English'
 *                 longDescription:
 *                   type: object
 *                   properties:
 *                     es:
 *                       type: string
 *                       description: Detailed product description in Spanish.
 *                       example: 'Descripción larga en español'
 *                     en:
 *                       type: string
 *                       description: Detailed product description in English.
 *                       example: 'Long description in English'
 *                 freeShip:
 *                   type: boolean
 *                   description: Indicates if shipping is free for the product.
 *                   example: true
 *                 ageFrom:
 *                   type: number
 *                   description: Minimum age requirement for the product.
 *                   example: 5
 *                 ageTo:
 *                   type: number
 *                   description: Maximum age requirement for the product.
 *                   example: 12
 *                 ageSelect:
 *                   type: string
 *                   description: Age selection criteria for the product.
 *                   example: 'Rango de edad'
 *                 addedDate:
 *                   type: string
 *                   format: date-time
 *                   description: Date when the product was added.
 *                   example: '2023-09-20T12:00:00Z'
 *                 status:
 *                   type: boolean
 *                   description: Product status (active/inactive).
 *                   example: true
 *                 lastSell:
 *                   type: string
 *                   format: date-time
 *                   description: Date of the last sale of the product.
 *                   example: '2023-09-21T14:30:00Z'
 *                 lastModified:
 *                   type: string
 *                   format: date-time
 *                   description: Date when the product was last modified.
 *                   example: '2023-09-21T10:15:00Z'
 *                 views:
 *                   type: number
 *                   description: Number of views for the product.
 *                   example: 1000
 *                 lastVisited:
 *                   type: string
 *                   format: date-time
 *                   description: Date when the product was last visited.
 *                   example: '2023-09-21T15:45:00Z'
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of product image URLs.
 *                   example: ['url1.jpg', 'url2.jpg']
 *                 colors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of available product colors.
 *                   example: ['Red', 'Blue']
 *                 urlName:
 *                   type: string
 *                   description: URL-friendly product name.
 *                   example: 'nombre-del-producto'
 *       400:
 *         description: Bad Request indicating an error while creating the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: 'Error creating the product'
 *       415:
 *         description: Unsupported Media Type indicating an issue with the request format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: 'Unsupported media type'
 *       500:
 *         description: Internal Server Error indicating a server-side error while creating the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: 'Error creating the product'
 */


routerProducts.post('/', upload.array('images', 10), handleMulterError, resizeImagesMiddleware, productsController.postProduct);

routerProducts.put('/:id', upload.array('images', 10), handleMulterError, resizeImagesMiddleware, productsController.putProduct);
routerProducts.delete('/:id', productsController.deleteProduct);

export default routerProducts;
