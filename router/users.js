import express from 'express';
import usersController from '../controller/users.js';

const routerUsers = express.Router();

routerUsers.get('/', usersController.getUsers);
routerUsers.get('/:id', usersController.getUser);
routerUsers.post('/',  usersController.postUser);
routerUsers.put('/:id', usersController.putUser);
routerUsers.delete('/:id', usersController.deleteUser);

export default routerUsers;
