import express from 'express';
// const {getProducts, getProduct, postProduct, putProduct, deleteProduct} = require('../controllers/products');
import productsController from '../controller/products.js';


const routerProducts = express.Router();

////////////////////////////////////////////////////////////////////////////////
//                                 GET Routes                                 //
////////////////////////////////////////////////////////////////////////////////

// routerProducts.get('/', getProducts);
routerProducts.get('/', productsController.getProducts);

routerProducts.get('/:id', productsController.getProduct);


///////////////////////////////////////////////////////////////////////////////
//                                POST Routes                                //
///////////////////////////////////////////////////////////////////////////////

routerProducts.post('/', productsController.postProduct);


//////////////////////////////////////////////////////////////////////////////
//                                PUT Routes                                //
//////////////////////////////////////////////////////////////////////////////

routerProducts.put('/:id', productsController.putProduct);


///////////////////////////////////////////////////////////////////////////////
//                               DELETE Routes                               //
///////////////////////////////////////////////////////////////////////////////
routerProducts.delete('/:id', productsController.deleteProduct);

// Método con CommonJS
// module.exports = routerProducts;

// Método con ES Modules


export default routerProducts;
