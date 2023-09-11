import express from 'express';
import productsController from '../controller/products.js';
import upload, { handleMulterError } from '../middlewares/multer.js';
import resizeImagesMiddleware from '../middlewares/resizeImage.js';

const routerProducts = express.Router();

routerProducts.get('/:lang?', productsController.getProducts);
routerProducts.get('/:id/:lang', productsController.getProduct);

routerProducts.post('/', upload.array('images', 10), handleMulterError, resizeImagesMiddleware, productsController.postProduct);

routerProducts.put('/:id', upload.array('images', 10), handleMulterError, resizeImagesMiddleware, productsController.putProduct);
routerProducts.delete('/:id/:lang', productsController.deleteProduct);

export default routerProducts;
