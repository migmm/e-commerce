import express from 'express';
import productsController from '../controller/products.js';

const routerProducts = express.Router();

routerProducts.get('/', productsController.getProducts);
routerProducts.get('/:id', productsController.getProduct);

routerProducts.post('/', productsController.fieldConfig, productsController.postProduct);

routerProducts.put('/:id', productsController.fieldConfig, productsController.putProduct);
routerProducts.delete('/:id', productsController.deleteProduct);

export default routerProducts;
