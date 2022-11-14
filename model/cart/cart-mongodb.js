import mongoose from "mongoose";
import DBMongoDB from "../DBMongoDB.js";

// Esquema del documento Product
const cartSchema = mongoose.Schema({

    userID: String,
    cartContent: Object,

    
    /*   productID: Object,
    productName: Object,
    price: Number,
    shortDescription: Object,
    quantity: Number,
    discountPercent: Number,
    freeShip: Boolean,
    productLink: Object
     */
},
{
    versionKey: false
}
);

const CartModel = mongoose.model('cart', cartSchema);

class CartModelMongoDB {

    // CRUD - C: CREATE
    async addItem(item) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }

        try {
            const newItem = new CartModel(item);
            await newItem.save();
            return DBMongoDB.getObjectWithId(newItem.toObject());
        } catch (error) {
            console.error(`Error al intentar dar de alta el Item: ${error.message}`);
            return {};
        }
    }

    // CRUD - R: READ
    async getItems() {
        if (! await DBMongoDB.connectDB()) {
            return [];
        }

        try {
            const item = await CartModel.find({}).lean();
            return DBMongoDB.getObjectWithId(item);
        } catch (error) {
            console.error(`Error al intentar obtener los Items: ${error.message}`);
            return [];
        }
    }

    async getItem(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }

        try {
            const item = await CartModel.findById(id).lean() || {};
            return DBMongoDB.getObjectWithId(item);
        } catch (error) {
            console.error(`Error al intentar obtener el Item: ${error.message}`);
            return {};
        }
    }

    // CRUD - U: UPDATE
    async updateItem(id, item) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }

        try {
            const updatedItem = await CartModel.findByIdAndUpdate(id, { $set: item }, {
                returnDocument: 'after'
            }).lean();
            return DBMongoDB.getObjectWithId(updatedItem);
        } catch (error) {
            console.error(`Error al intentar actualizar el Item: ${error.message}`);
            return {};
        }
    }

    // CRUD - D: DELETE
    async deleteItem(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            // await ProductsModel.deleteOne({_id: id});
            const deletedItem = await CartModel.findByIdAndDelete(id).lean();
            return DBMongoDB.getObjectWithId(deletedItem);
        } catch (error) {
            console.error(`Error al intentar eliminar el Item: ${error.message}`);
            return {};
        }
    }

}

export default CartModelMongoDB;
