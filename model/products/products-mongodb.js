import mongoose from "mongoose";
import DBMongoDB from "../DBMongoDB.js";
import unlink from "fs-extra";
import path from "path";


const productSchema = mongoose.Schema({

    productName: String,
    price: Number,
    discountPercent: Number,
    vendor: String,
    stock: Number,
    category: String,
    shortDescription: String,
    longDescription: String,
    freeShip: Boolean,
    ageFrom: Number,
    ageTo: Number,
    ageSelect: Number,
    addedDate: Date,
    lastSell: Date,
    images: Object,
    colors: Array,
},
{
    versionKey: false
}
);

const ProductsModel = mongoose.model('products', productSchema);


class ProductModelMongoDB {

    // CRUD - C: CREATE
    async createProduct(product) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const newProduct = new ProductsModel(product);
            await newProduct.save();
            return DBMongoDB.getObjectWithId(newProduct.toObject());
        } catch (error) {
            console.error(`Error al intentar dar de alta el producto: ${error.message}`);
            return {};
        }
    }

    // CRUD - R: READ
    async readProducts() {
        if (! await DBMongoDB.connectDB()) {
            return [];
        }
        try {
            const products = await ProductsModel.find({}).lean();
            return DBMongoDB.getObjectWithId(products);
        } catch (error) {
            console.error(`Error al intentar obtener los productos: ${error.message}`);
            return [];
        }
    }

    async readProduct(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const product = await ProductsModel.findById(id).lean() || {};
            return DBMongoDB.getObjectWithId(product);
        } catch (error) {
            console.error(`Error al intentar obtener el producto: ${error.message}`);
            return {};
        }
    }

    // CRUD - U: UPDATE
    async updateProduct(id, product) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            /* 
            const productToUpdate = await ProductsModel.findById(id).lean() || {};

            await unlink.pathExists(path.resolve('./public/' + productToUpdate.images.portada)) ? unlink.remove(path.resolve('./public/' + productToUpdate.images.portada)) : console.log ("portada false"); ;
            await unlink.pathExists(path.resolve('./public/' + productToUpdate.images.galeria0)) ? unlink.remove(path.resolve('./public/' + productToUpdate.images.galeria0)) : console.log ("galeria0 false");
            await unlink.pathExists(path.resolve('./public/' + productToUpdate.images.galeria0)) ? unlink.remove(path.resolve('./public/' + productToUpdate.images.galeria0)) : console.log ("galeria0 false");
            await unlink.pathExists(path.resolve('./public/' + productToUpdate.images.galeria1)) ? unlink.remove(path.resolve('./public/' + productToUpdate.images.galeria1)) : console.log ("galeria1 false");
            await unlink.pathExists(path.resolve('./public/' + productToUpdate.images.galeria2)) ? unlink.remove(path.resolve('./public/' + productToUpdate.images.galeria2)) : console.log ("galeria2 false");
            */
            const updatedProduct = await ProductsModel.findByIdAndUpdate(id, { $set: product }, {
                returnDocument: 'after'
            }).lean();
            return DBMongoDB.getObjectWithId(updatedProduct);
        } catch (error) {
            console.error(`Error al intentar actualizar el producto: ${error.message}`);
            return {};
        }
    }

    // CRUD - D: DELETE
    async deleteProduct(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const productToDelete = await ProductsModel.findById(id).lean() || {};
            unlink.remove(path.resolve('./public/' + productToDelete.images.portada));

            await unlink.pathExists(path.resolve('./public/' + productToDelete.images.galeria0)) ? unlink.remove(path.resolve('./public/' + productToDelete.images.galeria0)) :  console.log ("galeria0 false");
            await unlink.pathExists(path.resolve('./public/' + productToDelete.images.galeria1)) ? unlink.remove(path.resolve('./public/' + productToDelete.images.galeria1)) :  console.log ("galeria1 false");
            await unlink.pathExists(path.resolve('./public/' + productToDelete.images.galeria2)) ? unlink.remove(path.resolve('./public/' + productToDelete.images.galeria2)) :  console.log ("galeria2 false");

            const deletedProduct = await ProductsModel.findByIdAndDelete(id).lean();
            return DBMongoDB.getObjectWithId(deletedProduct);
        } catch (error) {
            console.error(`Error al intentar eliminar el producto: ${error.message}`);
            return {};
        }
    }

}

export default ProductModelMongoDB;
