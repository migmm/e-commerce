import express from 'express';
import multer from 'multer';
import config from '../config.js';
import ProductModel from "../model/products/products.js";
import ProductValidator from '../model/products/validators/ProductValidator.js';
const modelProducts = ProductModel.get(config.PERSISTENCE_TYPE);


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



export default {

    createProduct

};