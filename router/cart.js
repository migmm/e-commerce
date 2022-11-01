import express from 'express';
import cartController from '../controller/cart.js';

const routerCart = express.Router();
routerCart.get('/', cartController.getItems);
routerCart.get('/:id', cartController.getItem);
routerCart.post('/', cartController.postItem);
routerCart.put('/:id', cartController.putItem);
routerCart.delete('/:id', cartController.deleteItem);

export default routerCart;
