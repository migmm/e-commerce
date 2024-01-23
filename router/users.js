import express from 'express';
import usersController from '../controller/users.js';
import authRole from '../middlewares/authRole.js';

const routerUsers = express.Router();

routerUsers.get('/', authRole(['admin']), usersController.getUsers);
routerUsers.get('/:id', authRole(['admin']), usersController.getUser);
routerUsers.post('/',  authRole(['admin']), usersController.postUser);
routerUsers.put('/:id', authRole(['admin']), usersController.putUser);
routerUsers.delete('/:id', authRole(['admin']), usersController.deleteUser);

export default routerUsers;
