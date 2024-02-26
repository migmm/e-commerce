import express from 'express';
import cartController from '../controller/cart.js';
import authRole from '../middlewares/authRole.js';


const routerCart = express.Router();

routerCart.get('/', authRole(['admin, user']), cartController.getItems);
routerCart.get('/:id', authRole(['admin, user']), cartController.getItem);
routerCart.post('/',authRole(['admin, user']), cartController.postItem);
routerCart.put('/:id', authRole(['admin, user']), cartController.putItem);
routerCart.delete('/:id', authRole(['admin, user']), cartController.deleteItem);

export default routerCart;
