import express from 'express';
import productsController from '../controller/products.js';
import multerFS from '../middlewares/multer.js';

const routerProducts = express.Router();

routerProducts.get('/', productsController.getProducts);
routerProducts.get('/:id', productsController.getProduct);

routerProducts.post('/', multerFS.fieldConfig, productsController.postProduct);

routerProducts.put('/:id', multerFS.fieldConfig, productsController.putProduct);
routerProducts.delete('/:id', productsController.deleteProduct);

export default routerProducts;
