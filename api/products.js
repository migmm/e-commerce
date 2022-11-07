import config from '../config.js';
import ProductModel from "../model/products/products.js";
import ProductValidator from '../model/products/validators/ProductValidator.js';

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
