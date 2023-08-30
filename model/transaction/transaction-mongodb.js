import mongoose from "mongoose";
import DBMongoDB from "../DBMongoDB.js";

const transactionSchema = new mongoose.Schema({
    sellDate: Date,
    country: String,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        price: Number
    }],
    totalCart: Number,
    discount: String,
    cardBrand: String
},
    {
        versionKey: false
    });

const TransactionModel = mongoose.model('transaction', transactionSchema);

class TransactionModelMongoDB {

    // CRUD - C: CREATE
    async addItem(item) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }

        try {
            const newItem = new TransactionModel(item);
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
            const item = await TransactionModel.find({}).lean();
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
            const item = await TransactionModel.findById(id).lean() || {};
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
            const updatedItem = await TransactionModel.findByIdAndUpdate(id, { $set: item }, {
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
            const deletedItem = await TransactionModel.findByIdAndDelete(id).lean();
            return DBMongoDB.getObjectWithId(deletedItem);
        } catch (error) {
            console.error(`Error al intentar eliminar el Item: ${error.message}`);
            return {};
        }
    }
}

export default TransactionModelMongoDB;
