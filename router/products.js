import express from 'express';
import productsController from '../controller/products.js';

const routerProducts = express.Router();
routerProducts.get('/', productsController.getProducts);
routerProducts.get('/:id', productsController.getProduct);
routerProducts.post('/', productsController.postProduct);
routerProducts.put('/:id', productsController.putProduct);
routerProducts.delete('/:id', productsController.deleteProduct);

// Método con CommonJS:
// module.exports = routerProducts;

// Método con ES Modules
export default routerProducts;
