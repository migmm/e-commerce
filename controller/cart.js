// const {getProduct, getProducts} = require('../api/products');
import api from '../api/cart.js';

////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getItems = async (req, res) => {
    res.json(await api.getItems());
};

const getItem = async (req, res) => {
    // const id = Number(req.params.id);
    const id = req.params.id;
    res.json(await api.getItem(id));
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postItem = async (req, res) => {
    let item = req.body;
    const newItem = await api.addItem(item);
    res.json(newItem);
};


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putItem = async (req, res) => {
    // const id = Number(req.params.id);
    const id = req.params.id;
    const item = req.body;

    const updatedItem = await api.updateItem(id, item) || {};
    res.json(updatedItem);
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteItem = async (req, res) => {
    // const id = Number(req.params.id);
    const id = req.params.id;

    const removedItem = await api.deleteItem(id) || {};
    res.json(removedItem);
};


export default {
    getItems,    // getProducts: getProducts
    getItem,
    postItem,
    putItem,
    deleteItem,
};
