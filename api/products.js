import config from '../config.js';
import ProductModel from "../model/products/products.js";
import ProductValidator from '../model/products/validators/ProductValidator.js';
import { LANGUAGE_CONFIG, SEARCH_FIELDS } from '../config.js';

const modelProducts = ProductModel.get(config.PERSISTENCE_TYPE);

const DEFAULT_LANG = LANGUAGE_CONFIG.DEFAULT_LANGUAGE;


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const adjustLanguage = (product, lang) => {
    const hasProductName = product.productName && (product.productName[lang] || product.productName[DEFAULT_LANG]);
    const hasShortDescription = product.shortDescription && (product.shortDescription[lang] || product.shortDescription[DEFAULT_LANG]);
    const hasLongDescription = product.longDescription && (product.longDescription[lang] || product.longDescription[DEFAULT_LANG]);

    if (hasProductName && hasShortDescription && hasLongDescription)
        return {
            ...product,
            productName: product.productName[lang] || product.productName[DEFAULT_LANG],
            shortDescription: product.shortDescription[lang] || product.shortDescription[DEFAULT_LANG],
            longDescription: product.longDescription[lang] || product.longDescription[DEFAULT_LANG]
        };
    return null;
};

const getProducts = async (lang, query) => {
    const { page, perPage, sortBy, sortOrder, field, value } = query;

    let filter = {};

    if (field && value) {
        if (field === "all") {
            const searchFields = SEARCH_FIELDS;
            filter = {
                $or: searchFields.map(fieldName => ({
                    [fieldName]: { $regex: value, $options: 'i' }
                }))
            };
        } else if (field === "_id") {
            filter[field] = value;
        } else {
            filter[field] = { $regex: value, $options: 'i' };
        }
    }

    const { products, totalPages } = await modelProducts.readProducts(filter, sortBy, sortOrder, page, perPage);

    const productsWithLang = products
        .map(product => adjustLanguage(product, lang))
        .filter(product => product !== null);

    const count = productsWithLang.length;

    const calculatedTotalPages = count <= perPage ? 1 : Math.ceil(count / perPage);

    return {
        page,
        perPage,
        totalProducts: count,
        totalPages: calculatedTotalPages,
        products: productsWithLang,
    };
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

const getProductToUpdate = async (id, lang) => {
    const product = await modelProducts.readProduct(id);
    return product;
};

///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createProduct = async product => {

    /*  const validationError = ProductValidator.validate(product); */
    /*     const validationError = true;
        if (!validationError) { */
    const createdProduct = await modelProducts.createProduct(product);
    return createdProduct;
    /*  } else {
         console.log(validationError);
         console.error(`Error de validación en createProduct: ${validationError.details[0].message}`);
         return {};
     } */
};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateProduct = async (id, product) => {
    /* 
        const validationError = ProductValidator.validate(product);
    
        if (!validationError) { */
    const updatedProduct = await modelProducts.updateProduct(id, product);
    return updatedProduct;
    /*}  else {
        console.log(validationError);
        console.error(`Error de validación en updateProduct: ${validationError.details[0].message}`);
        return {};
    } */
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
    getProductToUpdate,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
