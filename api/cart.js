import config from '../config.js';
// import ProductModelMem from '../model/products-mem.js';
// import ProductModelFile from '../model/products-fs.js';
// import ProductModelMongoDB from '../model/products-mongodb.js';
import CartModel from "../model/cart/cart.js";

import ItemValidator from '../model/cart/validators/CartValidator.js';

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
const modelCart = CartModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const getItems = async () => {
    const Items = await modelCart.getItems();
    return Items;
};

///////////////////////////////////////////////////////////////////////////////
//                                API Get ONE                                //
///////////////////////////////////////////////////////////////////////////////

const getItem = async id => {
    const Item = await modelCart.getItem(id);
    return Item;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const addItem = async item => {

        const validationError = ItemValidator.validate(item);
        
        if(!validationError) {
            const createdItem = await modelCart.addItem(item);
            return createdItem;  
        } else {
            console.log(validationError);
            // throw new Error(`Error de validación en updateProduct: ${validationError.details[0].message}`);
            console.error(`Error de validación en createItem: ${validationError.details[0].message}`);
            return {};
        }
        
};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateItem = async (id, item) => {

    const validationError = ItemValidator.validate(item);

    if(!validationError) {
        const updatedItem = await modelCart.updateItem(id, item);
        return updatedItem;    
    } else {
        console.log(validationError);
        // throw new Error(`Error de validación en updateProduct: ${validationError.details[0].message}`);
        console.error(`Error de validación en updateItem: ${validationError.details[0].message}`);
        return {};
    }

};


///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////

const deleteItem = async id => {
    const removedItem = await modelCart.deleteItem(id);
    return removedItem;
};


export default {
    getItems,
    getItem,
    addItem,
    updateItem,
    deleteItem
};
