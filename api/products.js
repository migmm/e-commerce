import config from '../config.js';
import ProductModel from "../model/products/products.js";
import { LANGUAGE_CONFIG, SEARCH_FIELDS, FIELDS_WITH_LANG } from '../config.js';
const modelProducts = ProductModel.get(config.PERSISTENCE_TYPE);
import { getLanguageInfo } from '../controller/lang.js';

const DEFAULT_LANG = LANGUAGE_CONFIG.DEFAULT_LANGUAGE;
const AvailableLangs = await getLanguageInfo();


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
            filter = generateFilterForAllFields(value);
        } else if (field === "_id") {
            filter[field] = value;
        } else if (isMultilingualField(field)) {
            filter = generateFilterForMultilingualField(field, value);
        } else {
            filter[field] = { $regex: value, $options: 'i' };
        }
    }

    const { products, totalPages } = await modelProducts.readProducts(filter, sortBy, sortOrder, page, perPage);

    const productsWithLang = products
        .map(product => adjustLanguage(product, lang))
        .filter(product => product !== null);

    const productCount = productsWithLang.length;
    const pageCount = productCount > 0 ? totalPages - 1 : 0;

    return {
        page,
        perPage,
        totalProducts: productCount,
        totalPages: pageCount,
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
    const createdProduct = await modelProducts.createProduct(product);
    return createdProduct;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateProduct = async (id, product) => {
    const updatedProduct = await modelProducts.updateProduct(id, product);
    return updatedProduct;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////

const deleteProduct = async id => {
    const removedProduct = await modelProducts.deleteProduct(id);
    return removedProduct;
};


///////////////////////////////////////////////////////////////////////////////
//                                Functions                                  //
///////////////////////////////////////////////////////////////////////////////

const generateFilterForAllFields = (value) => {
    const searchFields = SEARCH_FIELDS;
    return {
        $or: searchFields.map(fieldName => ({
            [fieldName]: { $regex: value, $options: 'i' }
        }))
    };
};

const isMultilingualField = (field) => {
    return ['productName', 'shortDescription', 'longDescription'].includes(field);
};

const generateFilterForMultilingualField = (field, value) => {
    const fieldsToSearch = FIELDS_WITH_LANG;
    return {
        $expr: {
            $or: fieldsToSearch.map((fieldName, index) => ({
                $regexMatch: { input: { $toLower: `$${fieldName}.${AvailableLangs.availableLangs[index]}` }, regex: value, options: 'i' }
            }))
        }
    };
};


export default {
    getProducts,
    getProductToUpdate,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
