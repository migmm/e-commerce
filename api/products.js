import config from '../config.js';
// import ProductModelMem from '../model/products-mem.js';
// import ProductModelFile from '../model/products-fs.js';
// import ProductModelMongoDB from '../model/products-mongodb.js';
import ProductModel from "../model/products.js";

import ProductValidator from '../model/validators/ProductValidator.js';

// const modelProducts = new ProductModelMongoDB();
// const modelProducts = new ProductModelMem();
// Creates de prueba para TESTING
// modelProducts.createProduct({name: 'Licuadora', description: 'Con botón turbo', price: 24000});
// modelProducts.createProduct({name: 'TV', description: 'Smart TV de 55 pulgadas', price: 115000});
// modelProducts.createProduct({name: 'Parlante', description: 'Con batería', price: 21800});
// modelProducts.createProduct({name: 'PlayStation 4', description: 'Con 2 juegos', price: 175000});
// modelProducts.createProduct({name: 'PlayStation 5', description: 'Color blanco', price: 290000});
// const modelProducts = new ProductModelFile();

// const modelProducts = ProductModel.get('MEM');
const modelProducts = ProductModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const getProducts = async () => {
    const products = await modelProducts.readProducts();
    return products;
};

///////////////////////////////////////////////////////////////////////////////
//                                API Get ONE                                //
///////////////////////////////////////////////////////////////////////////////

const getProduct = async id => {
    const product = await modelProducts.readProduct(id);
    return product;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createProduct = async product => {

        const validationError = ProductValidator.validate(product);
        
        if(!validationError) {
            const createdProduct = await modelProducts.createProduct(product);
            return createdProduct;  
        } else {
            console.log(validationError);
            // throw new Error(`Error de validación en updateProduct: ${validationError.details[0].message}`);
            console.error(`Error de validación en createProduct: ${validationError.details[0].message}`);
            return {};
        }
        

};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateProduct = async (id, product) => {

    const validationError = ProductValidator.validate(product);

    if(!validationError) {
        const updatedProduct = await modelProducts.updateProduct(id, product);
        return updatedProduct;    
    } else {
        console.log(validationError);
        // throw new Error(`Error de validación en updateProduct: ${validationError.details[0].message}`);
        console.error(`Error de validación en updateProduct: ${validationError.details[0].message}`);
        return {};
    }

};


///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////

const deleteProduct = async id => {
    const removedProduct = await modelProducts.deleteProduct(id);
    return removedProduct;
};


export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
