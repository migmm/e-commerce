import config from '../config.js';
import ProductModel from '../model/products.js';
// import ProductModelFile from '../model/products-fs.js';
// import ProductModelMem from '../model/products-mem.js';
// import modelProduct from '../model/products-fs.js';
// import ProductModelMongoDB from '../model/products-mongodb.js';

// const modelProduct = new ProductModelFile();
// const modelProduct = ProductModel.get('MEM');
// const modelProduct = ProductModel.get('FILE');
const modelProduct = ProductModel.get(config.PERSISTENCE_TYPE);
// creates PARA TESTING:
// modelProduct.createProduct({name: 'Licuadora', description: 'Con botón turbo', price: 24000});
// modelProduct.createProduct({name: 'TV', description: 'Smart TV de 55 pulgadas', price: 115000});
// modelProduct.createProduct({name: 'Parlante', description: 'Con batería', price: 21800});
// modelProduct.createProduct({name: 'PlayStation 4', description: 'Con 2 juegos', price: 175000});
// modelProduct.createProduct({name: 'PlayStation 5', description: 'Color blanco', price: 290000});


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////
const getProducts = async () => {
    const products = await modelProduct.readProducts();
    return products;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Get One                                //
///////////////////////////////////////////////////////////////////////////////
const getProduct = async id => {
    const product = await modelProduct.readProduct(id);
    return product;
};


////////////////////////////////////////////////////////////////////////////////
//                                 API Create                                 //
////////////////////////////////////////////////////////////////////////////////

const createProduct = async product => {
    const createdProduct = await modelProduct.createProduct(product);
    return createdProduct;
};


////////////////////////////////////////////////////////////////////////////////
//                                 API Update                                 //
////////////////////////////////////////////////////////////////////////////////

const updateProduct = async (id, product) => {
    const updatedProduct = await modelProduct.updateProduct(id, product);
    return updatedProduct;
};


////////////////////////////////////////////////////////////////////////////////
//                                 API Delete                                 //
////////////////////////////////////////////////////////////////////////////////

const deleteProduct = async id => {
    const removedProduct = await modelProduct.deleteProduct(id);
    return removedProduct;
};


export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
