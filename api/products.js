import config from '../config.js';
import ProductModel from "../model/products/products.js";
import ProductValidator from '../model/products/validators/ProductValidator.js';
import { LANGUAGE_CONFIG } from '../config.js';

const modelProducts = ProductModel.get(config.PERSISTENCE_TYPE);

const DEFAULT_LANG = LANGUAGE_CONFIG.DEFAULT_LANGUAGE;

///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const getProducts = async lang => {
    const products = await modelProducts.readProducts();

    const productsWithLang = products.map(product => ({
        ...product,
        productName: product.productName[lang] || product.productName[DEFAULT_LANG],
        shortDescription: product.shortDescription[lang] || product.shortDescription[DEFAULT_LANG],
        longDescription: product.longDescription[lang] || product.longDescription[DEFAULT_LANG]
    }));

    return productsWithLang;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Get ONE                                //
///////////////////////////////////////////////////////////////////////////////

const getProduct = async (id, lang) => {
    const product = await modelProducts.readProduct(id);

    const productWithLang = {
        ...product,
        productName: product.productName[lang] || product.productName[DEFAULT_LANG],
        shortDescription: product.shortDescription[lang] || product.shortDescription[DEFAULT_LANG],
        longDescription: product.longDescription[lang] || product.longDescription[DEFAULT_LANG]
    };

    return productWithLang;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createProduct = async product => {

    const validationError = ProductValidator.validate(product);

    if (!validationError) {
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

    if (!validationError) {
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
